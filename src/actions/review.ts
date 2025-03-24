"use server";

import { db } from "@/lib/db";
import { ReviewsOrderType } from "@/types/ui";
import { requireUser } from "./user";
import { reviewSelect } from "@/constants/select";
import { SortOrder } from "@/types/enums";
import { Reviews_Page_Size } from "@/constants";
import { revalidatePath } from "next/cache";
import { ReviewInsert } from "@/types";
import { reviewFormSchema } from "@/lib/schema-validators";

export const upsertReview = async (
  productId: string,
  data: ReviewInsert,
  reviewId: string | undefined
) => {
  try {
    const user = await requireUser();

    if (!productId) throw new Error("Product ID is required.");
    const review = reviewFormSchema.parse(data);

    const reviewDetails = await db.review.upsert({
      where: {
        id: reviewId,
      },
      update: {
        ...review,
        userId: user.id,
      },
      create: {
        ...review,
        productId,
        userId: user.id,
      },
      select: reviewSelect,
    });

    const slug = await updateProductReviewStats(productId);
    revalidatePath(`/product/${slug}`);
    return reviewDetails;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    throw error;
  }
};

async function updateProductReviewStats(productId: string) {
  const productReviews = await db.review.findMany({
    where: {
      productId,
    },
    select: {
      rating: true,
    },
  });
  const totalRating = productReviews.reduce((acc, rev) => acc + rev.rating, 0);
  const averageRating = totalRating / productReviews.length;
  const { slug } = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      rating: averageRating,
      numReviews: productReviews.length,
    },
  });

  return slug;
}

export async function getProductFilteredReviews(
  productId: string,
  rating: number | undefined,
  sort: ReviewsOrderType,
  page: number = 1,
  pageSize: number = Reviews_Page_Size
) {
  const reviewFilter: any = {
    productId,
  };

  if (rating) {
    reviewFilter.rating = {
      in: [rating, rating + 0.5],
    };
  }

  const sortOption =
    sort === "latest"
      ? { createdAt: SortOrder.desc }
      : sort === "oldest"
      ? { createdAt: SortOrder.asc }
      : sort === "highest"
      ? { rating: SortOrder.desc }
      : { rating: SortOrder.asc };

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const reviews = await db.review.findMany({
    where: reviewFilter,
    select: reviewSelect,
    orderBy: sortOption,
    skip,
    take,
  });

  const count = await db.review.count({ where: reviewFilter });
  return { reviews, count };
}
