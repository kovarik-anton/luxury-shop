import {
  Category,
  OfferTag,
  Product,
  ProductVariant,
  ProductVariantImage,
  Size,
  SubCategory,
} from "@prisma/client";

export type CategoryWithSubcategoriesType = Category & {
  subCategories: SubCategory[];
};

export type SubCategoryWithCategoryType = SubCategory & { category: Category };

export type ProductWithVariantType = {
  name: string;
  description: string;
  variantName: string;
  variantDescription?: string;
  images: { id?: string; url: string }[];
  variantImage: string;
  categoryId: string;
  offerTagId?: string;
  subCategoryId: string;
  isSale: boolean;
  saleEndDate?: string;
  brand?: string;
  sku: string;
  weight?: number;
  colors: { id?: string; color: string }[];
  sizes: {
    id?: string;
    size: string;
    stock: number;
    price: number;
    discount: number;
  }[];
  product_specs: { id?: string; name: string; value: string }[];
  variant_specs: { id?: string; name: string; value: string }[];
  isFreeShipping: boolean;
};

export type StoreProductType = Product & {
  category: Category;
  subCategory: SubCategory;
  offerTag: OfferTag | null;
  variants: (ProductVariant & {
    images: ProductVariantImage[];
    color: string;
    sizes: Size[];
  })[];
};
