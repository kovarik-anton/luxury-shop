"use server";

import { db } from "@/lib/db";
import { SortOrder } from "@/types/enums";
import { requireAdmin as requireAdmin } from "./user";
import { SubcategoryInsert } from "@/types";
import { subcategoryFormSchema } from "@/lib/schema-validators";
import { revalidatePath } from "next/cache";

export async function getAllSubCategories() {
  const subcategories = await db.subCategory.findMany({
    include: {
      category: true,
    },
    orderBy: {
      updatedAt: SortOrder.desc,
    },
  });

  return subcategories;
}

export async function getAllCategoriesForSubCategory(categoryId: string) {
  const subcategories = await db.subCategory.findMany({
    where: {
      categoryId: categoryId,
    },
    orderBy: {
      updatedAt: SortOrder.desc,
    },
  });

  return subcategories;
}

export async function upsertSubCategory(
  data: SubcategoryInsert,
  subcategoryId: string | undefined
) {
  await requireAdmin();
  const subCategory = subcategoryFormSchema.parse(data);

  const result = await db.subCategory.upsert({
    where: {
      id: subcategoryId,
    },
    update: subCategory,
    create: subCategory,
  });

  revalidatePath("/dashboard/subCategories");

  return result;
}

export async function getSubCategory(subCategoryId: string) {
  if (!subCategoryId) throw new Error("Please provide suCategory ID.");

  const subcategory = await db.subCategory.findUnique({
    where: {
      id: subCategoryId,
    },
  });

  return subcategory;
}

export async function deleteSubCategory(subCategoryId: string) {
  await requireAdmin();
  if (!subCategoryId) throw new Error("Please provide category ID.");

  const subcategory = await db.subCategory.delete({
    where: {
      id: subCategoryId,
    },
  });
  return subcategory;
}

export async function getSubcategoriesFilter(take: number) {
  const subcategories = await db.subCategory.findMany({
    select: {
      name: true,
      url: true,
    },
    take,
  });

  return subcategories.map((subcategory) => ({
    label: subcategory.name,
    value: subcategory.url,
  }));
}
