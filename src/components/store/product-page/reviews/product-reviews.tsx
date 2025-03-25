"use client";

import { useEffect, useState } from "react";

import { getProductFilteredReviews } from "@/actions/review";
import ReviewsFilters from "./filters";
import ReviewsSort from "./sort";
import {
  RatingStatisticsType,
  ReviewsOrderType,
  ReviewWithUserType,
  VariantInfoType,
} from "@/types/ui";
import RatingStatisticsCard from "../../cards/rating-statistics";
import Pagination from "@/components/shared/pagination";
import ReviewCard from "../../cards/review";
import ReviewDetails from "../../forms/review-details";
import RatingCard from "../../cards/product-rating";
import { Reviews_Page_Size } from "@/constants";

interface Props {
  productId: string;
  rating: number;
  statistics: RatingStatisticsType;
  reviews: ReviewWithUserType[];
  variantsInfo: VariantInfoType[];
}

export default function ProductReviews({
  productId,
  rating,
  statistics,
  reviews,
  variantsInfo,
}: Props) {
  const { totalReviews, ratingStatistics } = statistics;
  const [data, setData] = useState<ReviewWithUserType[]>(reviews);
  const [count, setCount] = useState<number>(totalReviews);

  const half = Math.ceil(data.length / 2);

  const [ratingFilter, setRatingFilters] = useState<number>();
  const [sort, setSort] = useState<ReviewsOrderType>("latest");

  const [page, setPage] = useState<number>(2);

  useEffect(() => {
    async function handleGetReviews() {
      const { reviews, count } = await getProductFilteredReviews(
        productId,
        ratingFilter,
        sort,
        page
      );
      setData(reviews);
      setCount(count);
    }

    handleGetReviews();
  }, [ratingFilter, sort, page, productId]);

  return (
    <div id="reviews" className="pt-6">
      <div className="h-12">
        <h2 className="text-main-primary text-2xl font-bold">
          Customers Reviews ({totalReviews})
        </h2>
      </div>
      <div className="w-full">
        <div className="flex lg:flex-row flex-col items-center gap-4">
          <RatingCard rating={rating} />
          <RatingStatisticsCard statistics={ratingStatistics} />
        </div>
      </div>
      {totalReviews > 0 && (
        <div>
          <div className="space-y-6">
            <ReviewsFilters
              rating={ratingFilter}
              setFilters={setRatingFilters}
              stats={statistics}
            />
            <ReviewsSort sort={sort} setSort={setSort} />
          </div>
          <div className="mt-6 grid lg:grid-cols-2 grid-cols-1 gap-4">
            {data.length > 0 ? (
              <>
                <div className="flex flex-col gap-3">
                  {data.slice(0, half).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {data.slice(half).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </>
            ) : (
              <span className="text-lg text-bold">No reviews yet.</span>
            )}
          </div>
          {count > Reviews_Page_Size && (
            <Pagination
              page={page}
              totalPages={count / Reviews_Page_Size}
              setPage={setPage}
            />
          )}
        </div>
      )}
      <div className="mt-10">
        <ReviewDetails
          productId={productId}
          variantsInfo={variantsInfo}
          setReviews={setData}
          reviews={data}
        />
      </div>
    </div>
  );
}
