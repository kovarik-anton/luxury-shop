import { PrismaClient } from "@prisma/client";
import { db } from "../db";
import slugify from "slugify";
import { CartProductType } from "@/types/ui";
import { Product_History_Size } from "@/constants";

export async function generateUniqueSlug({
  name,
  model,
}: {
  name: string;
  model: keyof PrismaClient;
}) {
  const field = "slug";
  const separator = "-";
  let slug = slugify(name, {
    replacement: "-",
    lower: true,
    trim: true,
  });

  let suffix = 1;

  while (true) {
    const exisitngRecord = await (db[model] as any).findFirst({
      where: {
        [field]: slug,
      },
    });
    if (!exisitngRecord) {
      break;
    }
    slug = `${slug}${separator}${suffix}`;
    suffix += 1;
  }
  return slug;
}

// export function getVariantData(product: ProductInsert, variantSlug: string) {
//   return {
//     variantName: product.variantName,
//     variantDescription: product.variantDescription,
//     slug: variantSlug,
//     variantImage: product.variantImage,
//     sku: product.sku,
//     weight: product.weight,
//     isSale: product.isSale,
//     saleEndDate: product.saleEndDate,
//     images: {
//       create: product.images.map((img) => ({
//         url: img.url,
//       })),
//     },
//     color: product.color,
//     sizes: {
//       create: product.sizes.map((size) => ({
//         size: size.size,
//         price: size.price,
//         stock: size.stock,
//         discount: size.discount,
//       })),
//     },
//     specs: {
//       create: product.variant_specs.map((spec) => ({
//         name: spec.name,
//         value: spec.value,
//       })),
//     },
//   };
// }

export function updateProductHistory(variantId: string) {
  let productHistory: string[] = [];
  const historyString = localStorage.getItem("productHistory");

  if (historyString) {
    try {
      productHistory = JSON.parse(historyString);
    } catch (error) {
      productHistory = [];
    }
  }

  productHistory = productHistory.filter((id) => id !== variantId);
  productHistory.unshift(variantId);

  if (productHistory.length > Product_History_Size) {
    productHistory.pop();
  }
  localStorage.setItem("productHistory", JSON.stringify(productHistory));
}

export function getShippingDatesRange(
  minDays: number,
  maxDays: number,
  date?: Date
): { minDate: string; maxDate: string } {
  const currentDate = date ? new Date(date) : new Date();

  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + minDays);

  const maxDate = new Date(currentDate);
  maxDate.setDate(currentDate.getDate() + maxDays);

  return {
    minDate: minDate.toDateString(),
    maxDate: maxDate.toDateString(),
  };
}

export function areEqual(first: CartProductType, second: CartProductType) {
  return (
    first.productId === second.productId &&
    first.variantId === second.variantId &&
    first.sizeId === second.sizeId
  );
}
