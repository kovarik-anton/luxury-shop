"use server";

import { db } from "@/lib/db";
import { SortOrder } from "@/types/enums";
import { requireAdmin } from "./user";
import { OfferTagInsert } from "@/types";
import { offerTagFormSchema } from "@/lib/schema-validators";
import { revalidatePath } from "next/cache";

export async function getAllOfferTags() {
  const offerTags = await db.offerTag.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      products: {
        _count: SortOrder.desc,
      },
    },
  });

  return offerTags;
}

export async function upsertOfferTag(
  data: OfferTagInsert,
  offerTagId: string | undefined
) {
  try {
    await requireAdmin();
    const offerTag = offerTagFormSchema.parse(data);

    const result = await db.offerTag.upsert({
      where: {
        id: offerTagId,
      },
      update: offerTag,
      create: offerTag,
    });

    revalidatePath("/dashboard/offer-tags");

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOfferTag(offerTagId: string) {
  if (!offerTagId) throw new Error("Please provide offer tag ID.");

  const offerTag = await db.offerTag.findUnique({
    where: {
      id: offerTagId,
    },
  });
  return offerTag;
}

export async function deleteOfferTag(offerTagId: string) {
  requireAdmin();
  if (!offerTagId) throw new Error("Please provide the offer tag ID.");

  const offerTag = await db.offerTag.delete({
    where: {
      id: offerTagId,
    },
  });

  return offerTag;
}

export async function getOfferTagsFilter(take: number) {
  const offerTags = await db.offerTag.findMany({
    select: {
      name: true,
      url: true,
    },
    take,
  });

  return offerTags.map((offerTag) => ({
    label: offerTag.name,
    value: offerTag.url,
  }));
}

export async function getMainPageOffers() {
  const offers = await db.pageOffer.findMany({
    select: {
      image: true,
      offerTag: {
        select: {
          url: true,
        },
      },
    },
  });
  return offers.map((offer) => ({
    link: `/browse?offer=${offer.offerTag?.url}`,
    image: offer.image,
  }));
}
