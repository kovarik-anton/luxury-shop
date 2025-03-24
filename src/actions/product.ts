"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "./user";
import { StoreProductType } from "@/types/dtos";
import { SortOrder } from "@/types/enums";
import {
  ProductPageType,
  RatingStatisticsType,
  VariantImageType,
} from "@/types/ui";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Browse_Results_Size, Search_Results_Size } from "@/constants";
import { reviewSelect, sizeSelect, sizeSelectWithId } from "@/constants/select";
import { currentUser } from "@clerk/nextjs/server";

export async function getAllProducts(): Promise<StoreProductType[]> {
  return await db.product.findMany({
    include: {
      category: true,
      subCategory: true,
      offerTag: true,
      variants: {
        include: {
          images: true,
          sizes: true,
        },
      },
    },
  });
}

export async function getVariantSlugByProductSlug(productSlug: string) {
  const { slug } =
    (await db.productVariant.findFirst({
      where: {
        product: {
          slug: productSlug,
        },
      },
      select: {
        slug: true,
      },
    })) ?? {};

  return slug;
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  if (!productId) throw new Error("Please provide product id.");

  const result = await db.product.delete({ where: { id: productId } });
  return result;
}

export async function getProductMainInfo(productId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      specs: true,
    },
  });

  if (!product) return null;

  return {
    name: product.name,
    description: product.description,
    brand: product.brand || undefined,
    categoryId: product.categoryId,
    subCategoryId: product.subCategoryId,
    offerTagId: product.offerTagId || undefined,
    isFreeShipping: product.isFreeShipping,
    product_specs: product.specs.map((spec) => ({
      name: spec.name,
      value: spec.value,
    })),
  };
}

export async function getProductVariant(productId: string, variantId: string) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
      subCategory: true,
      specs: true,
      variants: {
        where: {
          id: variantId,
        },
        include: {
          images: true,
          specs: true,
          sizes: {
            select: sizeSelect,
          },
        },
      },
    },
  });
  if (!product) return;

  return {
    name: product.name,
    description: product.description,
    variantName: product.variants[0].variantName,
    variantDescription: product.variants[0].variantDescription || "",
    images: product.variants[0].images,
    categoryId: product.categoryId,
    subCategoryId: product.subCategoryId,
    isSale: product.variants[0].isSale,
    brand: product.brand || undefined,
    sku: product.variants[0].sku,
    color: product.variants[0].color,
    sizes: product.variants[0].sizes,
    isFreeShipping: product.isFreeShipping,
    product_specs: product.specs.map((spec) => ({
      name: spec.name,
      value: spec.value,
    })),
    variant_specs: product.variants[0].specs.map((spec) => ({
      name: spec.name,
      value: spec.value,
    })),
    variantImage: product.variants[0].variantImage,
  };
}

export async function getProducts(
  filters: any = {},
  sortBy = "",
  page: number = 1,
  pageSize: number = Browse_Results_Size
) {
  const whereClause = await getBrowsePageFilter(filters);
  let orderBy = getBrowsePageOrdering(sortBy);

  const products = await db.product.findMany({
    where: whereClause,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
    select: {
      id: true,
      slug: true,
      name: true,
      rating: true,
      numReviews: true,
      variants: {
        select: {
          id: true,
          slug: true,
          variantName: true,
          variantImage: true,
          sizes: {
            select: sizeSelectWithId,
          },
          images: {
            select: {
              url: true,
            },
          },
        },
      },
    },
  });

  const productsWithVariants = products.map((product) => {
    const variants = product.variants.map((variant) => ({
      variantId: variant.id,
      variantSlug: variant.slug,
      variantName: variant.variantName,
      images: variant.images,
      sizes: variant.sizes,
    }));

    const variantImages: VariantImageType[] = product.variants.map(
      (variant) => ({
        url: `/product/${product.slug}/${variant.slug}`,
        image: variant.variantImage,
      })
    );

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      rating: product.rating,
      numReviews: product.numReviews,
      variants,
      variantImages,
    };
  });

  const totalCount = await db.product.count({ where: whereClause });
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    products: productsWithVariants,
    totalPages,
    currentPage: page,
    pageSize,
    totalCount,
  };
}

async function getBrowsePageFilter(filters: any = {}) {
  const whereClause: any = {
    AND: [],
  };

  if (filters.category && Array.isArray(filters.category)) {
    whereClause.AND.push({
      category: {
        url: { in: filters.category },
      },
    });
  }

  if (filters.subCategory) {
    whereClause.AND.push({
      subCategory: {
        url: { in: filters.subCategory },
      },
    });
  }

  if (filters.size && Array.isArray(filters.size)) {
    whereClause.AND.push({
      variants: {
        some: {
          sizes: {
            some: {
              size: {
                in: filters.size,
              },
            },
          },
        },
      },
    });
  }

  if (filters.offer && Array.isArray(filters.offer)) {
    whereClause.AND.push({
      offerTag: {
        url: { in: filters.offer },
      },
    });
  }

  if (filters.search) {
    whereClause.AND.push(getSearchFilter(filters.search));
  }

  return whereClause;
}

function getSearchFilter(search: string) {
  return {
    OR: [
      {
        name: { contains: search },
      },
      {
        description: { contains: search },
      },
      {
        variants: {
          some: {
            variantName: { contains: search },
            variantDescription: { contains: search },
          },
        },
      },
    ],
  };
}

function getBrowsePageOrdering(sortBy: string) {
  switch (sortBy) {
    case "most-popular":
      return { views: SortOrder.desc };
    case "new-arrivals":
      return { createdAt: SortOrder.desc };
    case "top-rated":
      return { rating: SortOrder.desc };
    default:
      return { views: SortOrder.desc };
  }
}

export async function getProductPageData(
  productSlug: string,
  variantSlug: string
) {
  const product = await getProductDetailsWithVariants(productSlug, variantSlug);
  if (!product) return;

  const ratingStatistics = await getRatingStatistics(product.id);
  // await incrementProductViews(product.id);

  return formatProductResponse(product, ratingStatistics);
}

export async function getProductDetailsWithVariants(
  productSlug: string,
  variantSlug: string
) {
  const product = await getProductDetailsBySlug(productSlug, variantSlug);

  if (!product) return null;

  const variantsInfo = await getProductVariants(product.id);

  return {
    ...product,
    variantsInfo: variantsInfo.map((variant) => ({
      variantName: variant.variantName,
      variantSlug: variant.slug,
      variantImage: variant.variantImage,
      variantUrl: `/product/${productSlug}/${variant.slug}`,
      images: variant.images,
      sizes: variant.sizes.map((size) => size.size),
    })),
  };
}

async function getProductDetailsBySlug(
  productSlug: string,
  variantSlug: string
) {
  const user = await currentUser();
  const product = await db.product.findUnique({
    where: { slug: productSlug },
    select: {
      id: true,
      brand: true,
      name: true,
      description: true,
      slug: true,
      rating: true,
      category: {
        select: {
          name: true,
          url: true,
        },
      },
      subCategory: {
        select: {
          name: true,
          url: true,
        },
      },
      specs: {
        select: {
          name: true,
          value: true,
        },
      },
      reviews: {
        select: reviewSelect,
        take: 4,
      },
      variants: {
        where: {
          slug: variantSlug,
        },
        include: {
          images: {
            select: {
              url: true,
              alt: true,
            },
          },
          sizes: {
            select: {
              ...sizeSelectWithId,
              cartItems: {
                select: {
                  quantity: true,
                },
                where: {
                  cart: {
                    userId: user?.id,
                  },
                },
              },
            },
          },
          specs: {
            select: {
              name: true,
              value: true,
            },
          },
        },
      },
    },
  });

  return product;
}

async function getProductVariants(productId: string) {
  const productVariants = await db.productVariant.findMany({
    where: {
      productId: productId,
    },
    select: {
      variantName: true,
      slug: true,
      variantImage: true,
      product: {
        select: { slug: true },
      },
      images: {
        select: {
          url: true,
          alt: true,
        },
      },
      sizes: {
        select: { size: true },
      },
    },
  });

  return productVariants;
}
function formatProductResponse(
  product: ProductPageType,
  ratingStatistics: RatingStatisticsType
) {
  if (!product) return;
  const [variant] = product.variants;
  const { category, subCategory } = product;
  const { images, sizes } = variant;

  return {
    productId: product.id,
    variantId: variant.id,
    productSlug: product.slug,
    variantSlug: variant.slug,
    name: product.name,
    description: product.description,
    variantName: variant.variantName,
    variantDescription: variant.variantDescription,
    images,
    category,
    subCategory,
    isSale: variant.isSale,
    saleEndDate: variant.saleEndDate,
    brand: product.brand,
    sku: variant.sku,
    weight: variant.weight,
    variantImage: variant.variantImage,
    sizes,
    specs: {
      product: product.specs,
      variant: variant.specs,
    },
    rating: product.rating,
    reviews: product.reviews,
    reviewsStatistics: ratingStatistics,
    variantsInfo: product.variantsInfo,
  };
}

export async function getRatingStatistics(productId: string) {
  const ratingStats = await db.review.groupBy({
    by: ["rating"],
    where: { productId },
    _count: {
      rating: true,
    },
  });
  const totalReviews = ratingStats.reduce(
    (sum, stat) => sum + stat._count.rating,
    0
  );

  const ratingCounts = Array(5).fill(0);

  ratingStats.forEach((stat) => {
    let rating = Math.floor(stat.rating);
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1] = stat._count.rating;
    }
  });

  return {
    ratingStatistics: ratingCounts.map((count, index) => ({
      rating: index + 1,
      numReviews: count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    })),
    totalReviews,
  };
}

async function incrementProductViews(productId: string) {
  const isProductAlreadyViewed = getCookie(`viewedProduct_${productId}`, {
    cookies,
  });

  if (!isProductAlreadyViewed) {
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
}

export async function searchProducts(search: string) {
  const results = await db.productVariant.findMany({
    where: {
      OR: [
        {
          variantName: { contains: search },
        },
        {
          variantDescription: { contains: search },
        },
        {
          product: {
            name: { contains: search },
          },
        },
        {
          product: {
            description: { contains: search },
          },
        },
      ],
    },
    select: {
      slug: true,
      variantName: true,
      variantImage: true,
      product: { select: { slug: true, name: true } },
    },
    take: Search_Results_Size,
  });

  return results.map((item) => ({
    image: item.variantImage,
    link: `/product/${item.product.slug}/${item.slug}`,
    name: `${item.product.name} · ${item.variantName}`,
  }));
}
