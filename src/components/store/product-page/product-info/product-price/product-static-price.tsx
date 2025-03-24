import { SizeInfo } from "@/types/ui";

interface Props {
  selectedSize: SizeInfo | undefined;
}

export default function ProductStaticPrice({ selectedSize }: Props) {
  if (!selectedSize) {
    return null;
  }

  const discountedPrice =
    selectedSize.price * (1 - selectedSize.discount / 100);

  return (
    <div>
      <div className="text-orange-primary inline-block font-bold leading-none mr-2.5">
        <span className="inline-block text-4xl">
          ${discountedPrice.toFixed(2)}
        </span>
      </div>
      {selectedSize.price !== discountedPrice && (
        <span className="text-[#999] inline-block text-xl font-normal leading-6 mr-2 line-through">
          ${selectedSize.price.toFixed(2)}
        </span>
      )}
      {selectedSize.discount > 0 && (
        <span className="inline-block text-orange-seconadry text-xl leading-6">
          {selectedSize.discount}% off
        </span>
      )}
      <p className="mt-2 text-xs">
        {selectedSize.stock > 0 ? (
          `${selectedSize.stock} items`
        ) : (
          <span className="text-red-500">Out of stock</span>
        )}
      </p>
    </div>
  );
}
