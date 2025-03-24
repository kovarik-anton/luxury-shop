"use server";

import { db } from "@/lib/db";
import { requireAdmin } from "./user";
import { SortOrder } from "@/types/enums";
import { CategoryInsert } from "@/types";
import { revalidatePath } from "next/cache";
import { categoryFormSchema } from "@/lib/schema-validators";

export async function getAllCategories() {
  const categories = await db.category.findMany({
    include: {
      subCategories: true,
    },
    orderBy: {
      updatedAt: SortOrder.desc,
    },
  });

  return categories;
}

export async function upsertCategory(
  data: CategoryInsert,
  categoryId?: string
) {
  await requireAdmin();
  const category = categoryFormSchema.parse(data);

  const result = await db.category.upsert({
    where: {
      id: categoryId,
    },
    update: category,
    create: category,
  });

  revalidatePath("/dashboard/categories");

  return result;
}

export async function getCategory(categoryId: string) {
  if (!categoryId) throw new Error("Please provide category ID.");

  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return category;
}

export async function deleteCategory(categoryId: string) {
  await requireAdmin();

  if (!categoryId) throw new Error("Please provide category ID.");

  return await db.category.delete({
    where: {
      id: categoryId,
    },
  });
}

export async function getHomeFeaturedCategories() {
  const featuredCategories = await db.category.findMany({
    where: {
      featured: true,
    },
    select: {
      id: true,
      name: true,
      url: true,
      image: true,
      subCategories: {
        where: {
          featured: true,
        },
        select: {
          id: true,
          name: true,
          url: true,
          image: true,
          _count: {
            select: {
              products: true,
            },
          },
        },
        orderBy: {
          products: {
            _count: "desc",
          },
        },
        take: 3,
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      products: {
        _count: "desc",
      },
    },
    take: 6,
  });

  return featuredCategories.map((category) => ({
    id: category.id,
    name: category.name,
    url: category.url,
    productCount: category._count.products,
    subCategories: category.subCategories.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
      url: subcategory.url,
      image: subcategory.image,
      productCount: subcategory._count.products,
    })),
  }));
}

export async function getCategoriesFilter(take: number) {
  const categories = await db.category.findMany({
    select: {
      name: true,
      url: true,
    },
    take,
  });

  return categories.map((category) => ({
    label: category.name,
    value: category.url,
  }));
}
