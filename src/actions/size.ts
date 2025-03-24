"use server";

import { db } from "@/lib/db";

export const getFilteredSizes = async (
  filters: {
    category?: string[];
    subCategory?: string[];
    offer?: string[];
  },
  take: number
) => {
  const { category, subCategory, offer } = filters;

  const sizes = await db.size.findMany({
    where: {
      productVariant: {
        product: {
          AND: [
            category ? { category: { url: { in: category } } } : {},
            subCategory ? { subCategory: { url: { in: subCategory } } } : {},
            offer ? { category: { url: { in: offer } } } : {},
          ],
        },
      },
    },
    select: {
      size: true,
    },
    take,
  });

  const uniqueSizesArray = Array.from(new Set(sizes.map((size) => size.size)));

  const sizeOrderMap = new Map(
    ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"].map(
      (size, index) => [size, index]
    )
  );

  uniqueSizesArray.sort((a, b) => {
    return (
      (sizeOrderMap.get(a) ?? Infinity) - (sizeOrderMap.get(b) ?? Infinity) ||
      a.localeCompare(b)
    );
  });

  return uniqueSizesArray.map((size) => ({ label: size, value: size }));
};
