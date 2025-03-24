"use client";
import Link from "next/link";
import { useState } from "react";
import VariantSwitcher from "./variant-switcher";
import { Button } from "@/components/store/ui/button";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import ProductCardImageSwiper from "./swiper";
import { ProductType, VariantCard } from "@/types/ui";
import ProductPrice from "../../product-page/product-info/product-price/product-price";

interface Props {
  product: ProductType;
}

export default function ProductCard({ product }: Props) {
  const { name, slug, variantImages, variants, id } = product;
  const [variant, setVariant] = useState<VariantCard>(variants[0]);
  const { variantSlug, variantName, sizes, images } = variant;

  return (
    <section>
      <div className="group w-48 sm:w-[225px] relative transition-all duration-75 bg-white ease-in-out p-4 rounded-t-3xl border border-transparent hover:shadow-xl hover:border-border">
        <div className="relative w-full h-full">
          <Link
            href={`/product/${slug}/${variantSlug}`}
            className="w-full relative inline-block overflow-hidden"
          >
            <ProductCardImageSwiper images={images} />
            <p className="text-sm text-main-primary h-[18px] overflow-hidden overflow-ellipsis line-clamp-1">
              {name} · {variantName}
            </p>
            <ProductPrice sizes={sizes} isCard />
          </Link>
        </div>
        <div className="hidden group-hover:block absolute -left-[1px] bg-white border border-t-0  w-[calc(100%+2px)] px-4 pb-4 rounded-b-3xl shadow-xl z-30 space-y-2">
          <VariantSwitcher
            images={variantImages}
            variants={variants}
            setVariant={setVariant}
            selectedVariant={variant}
          />
          <div className="flex flex-items gap-x-1">
            <Button>
              <Link href={`/product/${slug}/${variantSlug}`}>Add to cart</Link>
            </Button>
            <Button
              variant="black"
              size="icon"
              // onClick={() => handleAddToWishlist()}
            >
              <Heart className="w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
