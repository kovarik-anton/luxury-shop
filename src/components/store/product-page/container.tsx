"use client";

import { ReactNode, useState } from "react";
import { setCookie } from "cookies-next";
import ProductSwiper from "./product-swiper";
import ProductInfo from "./product-info/product-info";
import { updateProductHistory } from "@/lib/utils/product";
import { ProductPageDataType, VariantImage } from "@/types/ui";
import AddToCart from "./add-to-cart";
import ProductNav from "./product-nav";

interface Props {
  productData: ProductPageDataType;
  sizeId: string | undefined;
  children: ReactNode;
}

export default function ProductPageContainer({
  productData,
  sizeId,
  children,
}: Props) {
  const {
    productId,
    variantId,
    images,
    sizes,
    category,
    subCategory,
    name,
    variantName,
  } = productData!;

  const [variantImages, setVariantImages] = useState<VariantImage[]>(images);
  const [activeImage, setActiveImage] = useState<VariantImage | null>(
    images[0]
  );

  const currentSize = sizes.find((size) => size.id === sizeId);

  updateProductHistory(variantId);
  setCookie(`viewedProduct_${productId}`, "true", {
    maxAge: 3600,
    path: "/",
  });

  return (
    <>
      <ProductNav
        category={category}
        subCategory={subCategory}
        productName={name}
        variantName={variantName}
      />
      <div className="relative">
        <section className="w-full xl:flex xl:gap-4">
          <ProductSwiper
            images={variantImages.length > 0 ? variantImages : images}
            activeImage={activeImage || images[0]}
            setActiveImage={setActiveImage}
          />
          <div className="w-full mt-4 md:mt-0 flex flex-col gap-4 md:flex-row">
            <ProductInfo
              productData={productData}
              sizeId={sizeId}
              setVariantImages={setVariantImages}
              setActiveImage={setActiveImage}
            />
            <AddToCart key={sizeId} currentSize={currentSize}></AddToCart>
          </div>
        </section>
        <section className="w-full mt-6 pb-16">{children}</section>
      </div>
    </>
  );
}
