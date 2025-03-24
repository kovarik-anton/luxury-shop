import { cn } from "@/lib/utils/utils";
import { SizeInfo } from "@/types/ui";

interface Props {
  sizes: SizeInfo[];
  isCard?: boolean;
}

export default function ProductRangePrice({ sizes, isCard }: Props) {
  const discountedPrices = sizes.map(
    (size) => size.price * (1 - size.discount / 100)
  );

  const totalQuantity = sizes.reduce((total, size) => total + size.stock, 0);

  const minPrice = Math.min(...discountedPrices).toFixed(2);
  const maxPrice = Math.max(...discountedPrices).toFixed(2);

  const priceDisplay =
    minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

  return (
    <div>
      <div className="text-orange-primary inline-block font-bold leading-none mr-2.5">
        <span
          className={cn("inline-block text-4xl text-nowrap", {
            "text-lg": isCard,
          })}
        >
          {priceDisplay}
        </span>
      </div>
      {!isCard && (
        <div className="text-orange-background text-xs leading-4 mt-1">
          <span>Note : Select a size to see the exact price</span>
        </div>
      )}
      {!isCard && <p className="mt-2 text-xs">{totalQuantity} pieces</p>}
    </div>
  );
}
