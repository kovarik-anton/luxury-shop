import {
  getProductPageData,
  getProductDetailsWithVariants,
} from "@/actions/product";
import {
  Cart,
  CartItem,
  Coupon,
  Prisma,
  ShippingAddress,
  User,
} from "@prisma/client";

export interface SearchResult {
  name: string;
  link: string;
  image: string;
}

export type VariantCard = {
  variantId: string;
  variantSlug: string;
  variantName: string;
  images: { url: string }[];
  sizes: SizeInfo[];
};

export type VariantImageType = {
  url: string;
  image: string;
};

export type ProductType = {
  id: string;
  slug: string;
  name: string;
  rating: number;
  numReviews: number;
  variants: VariantCard[];
  variantImages: VariantImageType[];
};

export type StoreCardType = {
  name: string;
  url: string;
  image: string;
  internalUrl: string;
};

export type CartProductType = {
  cartItemId?: string;
  productId: string;
  variantId: string;
  productSlug: string;
  variantSlug: string;
  name: string;
  variantName: string;
  variantImage: string;
  sizeId: string;
  size: string;
  quantity: number;
  price: number;
  stock: number;
  totalPrice: number;
};

export type CartWithCartItemBySize = {
  coupon: {
    startDate: string;
    endDate: string;
    discount: number;
  } | null;
  id: string;
  cartItems: {
    id: string;
    quantity: number;
  }[];
};

export type CartItemBase = {
  sizeId: string;
  quantity: number;
};

export type FeaturedCategoryType = {
  id: string;
  name: string;
  url: string;
  productCount: number;
  subCategories: {
    id: string;
    name: string;
    url: string;
    image: string;
    productCount: number;
  }[];
};

export type FiltersQueryType = {
  search: string;
  category: string;
  subCategory: string;
  offer: string;
  size: string;
  sort: string;
  page: string;
};

export type VariantInfoType = {
  variantName: string;
  variantSlug: string;
  variantImage: string;
  variantUrl: string;
  images: VariantImage[];
  sizes: string[];
};

export type SizeInfo = {
  id: string;
  price: number;
  discount: number;
  size: string;
  stock: number;
};

export type SizeInfoWithCartItemQuantity = SizeInfo & {
  cartItems: {
    quantity: number;
  }[];
};

export type VariantImage = { url: string; alt: string };

export type ProductPageDataType = Prisma.PromiseReturnType<
  typeof getProductPageData
>;

export type ProductPageType = Prisma.PromiseReturnType<
  typeof getProductDetailsWithVariants
>;

export type RatingStatisticsType = {
  ratingStatistics: {
    rating: number;
    numReviews: any;
    percentage: number;
  }[];
  totalReviews: number;
};

export type StatisticsCardType = {
  rating: number;
  numReviews: any;
  percentage: number;
}[];

export type ReviewsOrderType = "latest" | "oldest" | "highest" | "lowest";

export type ReviewWithUserType = ReviewDetailsType & {
  user: { name: string; picture: string };
};

export type ReviewDetailsType = {
  id: string;
  review: string;
  rating: number;
  size: string;
  variant: string;
};

export type CartWithCartItemsType = Cart & {
  cartItems: CartItem[];
  coupon: Coupon | null;
};

export type UserShippingAddressType = ShippingAddress & {
  user: User;
};

export type BrowseFilter = {
  title: string;
  filter: string;
  links: BrowseFilterLink[];
  getFunction: (take: number) => Promise<{ label: string; value: string }[]>;
};

export type BrowseFilterLink = {
  value: string;
  label: string;
};

export type Spec = {
  name: string;
  value: string;
};

export type Category = {
  name: string;
  url: string;
};

export type Pagination = {
  page: number;
  pageSize: number;
};
