import { CopyIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

interface Props {
  sku: string;
  rating: number;
  totalReviews: number;
}

export function RatingOverview({ sku, rating, totalReviews }: Props) {
  const copySkuToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sku);
      toast.success("Copied successfully");
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="flex items-center text-xs mt-2">
      <div className="whitespace-nowrap">
        <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-gray-500">
          SKU: {sku}
        </span>
        <span
          className="inline-block align-middle text-[#2F68A8] mx-1 cursor-pointer"
          onClick={copySkuToClipboard}
        >
          <CopyIcon />
        </span>
      </div>
      <div className="ml-4 flex items-center gap-x-2 flex-1 whitespace-nowrap">
        <StarRatings
          rating={rating}
          starDimension="24px"
          starEmptyColor="#e2dfdf"
          starRatedColor="#FFD804"
          starHoverColor="#FFD804"
        />
        <Link href="#reviews" className="text-[#ffd804] hover:underline">
          (
          {totalReviews === 0
            ? "No review yet"
            : totalReviews === 1
            ? "1 review"
            : `${totalReviews} reviews`}
          )
        </Link>
      </div>
    </div>
  );
}
