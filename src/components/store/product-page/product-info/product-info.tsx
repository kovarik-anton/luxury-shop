"use client";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
import ProductPrice from "./product-price/product-price";
import ProductVariantSelector from "./variant-selector";
import SizeSelector from "./size-selector";
import ProductAssurancePolicy from "./assurance-policy";
import { ProductPageDataType, VariantImage } from "@/types/ui";
import Countdown from "../../shared/countdown";
import { RatingOverview } from "./rating-overview";
import { ProductTitle } from "./product-title";

interface Props {
  productData: ProductPageDataType;
  sizeId: string | undefined;
  setVariantImages: Dispatch<SetStateAction<VariantImage[]>>;
  setActiveImage: Dispatch<SetStateAction<VariantImage | null>>;
}

export default function ProductInfo({
  productData,
  sizeId,
  setVariantImages,
  setActiveImage,
}: Props) {
  const {
    name,
    sku,
    variantsInfo,
    sizes,
    isSale,
    saleEndDate,
    variantName,
    rating,
    weight,
    brand,
    reviewsStatistics: { totalReviews },
  } = productData!;

  return (
    <div className="relative w-full xl:w-[540px]">
      <ProductTitle name={name} variantName={variantName}></ProductTitle>
      <RatingOverview
        sku={sku}
        rating={rating}
        totalReviews={totalReviews}
      ></RatingOverview>
      <section className="my-2 relative flex flex-col sm:flex-row justify-between">
        <ProductPrice sizeId={sizeId} sizes={sizes} />
        {isSale && saleEndDate && (
          <div className="mt-4 pb-2">
            <Countdown targetDate={saleEndDate} />
          </div>
        )}
      </section>
      <section className="flex flex-col mt-2 justify-between">
        {weight && (
          <div className="flex flex-row mb-2">
            <label className="text-main-primary font-bold">Weight: </label>
            <span className="ml-4">{weight} kg</span>
          </div>
        )}
        {brand && (
          <div className="flex flex-row">
            <label className="text-main-primary font-bold">Brand:</label>
            <span className="ml-4">{brand}</span>
          </div>
        )}
      </section>
      <div className="mt-2 space-y-2">
        {variantsInfo.length > 0 && (
          <ProductVariantSelector
            variants={variantsInfo}
            slug={productData!.variantSlug}
            setVariantImages={setVariantImages}
            setActiveImage={setActiveImage}
          />
        )}
      </div>
      <SizeSelector sizes={sizes} sizeId={sizeId} />
      <Separator className="mt-2" />
      <ProductAssurancePolicy />
    </div>
  );
}
