import { SizeInfo } from "@/types/ui";
import ProductRangePrice from "./product-range-price";
import ProductStaticPrice from "./product-static-price";

interface Props {
  sizeId?: string | undefined;
  sizes: SizeInfo[];
  isCard?: boolean;
}

export default function ProductPrice({ sizeId, sizes, isCard }: Props) {
  if (!sizes || sizes.length === 0) {
    return;
  }

  if (!sizeId) {
    return (
      <ProductRangePrice sizes={sizes} isCard={isCard}></ProductRangePrice>
    );
  }

  const selectedSize = sizes.find((size) => size.id === sizeId);
  return <ProductStaticPrice selectedSize={selectedSize}></ProductStaticPrice>;
}
