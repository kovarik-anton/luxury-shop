import { cn } from "@/lib/utils/utils";
import { RatingStatisticsType } from "@/types/ui";
import { Dispatch, SetStateAction } from "react";

interface Props {
  rating: number | undefined;
  setFilters: Dispatch<SetStateAction<number | undefined>>;
  stats: RatingStatisticsType;
}

export default function ReviewsFilters({ rating, setFilters, stats }: Props) {
  const { ratingStatistics, totalReviews } = stats;
  return (
    <div className="mt-8 relative overflow-hidden">
      <div className="flex flex-wrap gap-4">
        <div
          className={cn(
            "bg-[#f5f5f5] text-main-primary border border-transparent rounded-full cursor-pointer py-1.5 px-4",
            {
              "bg-[#ffebed] text-[#fd384f] border-[#fd384f]": !rating,
            }
          )}
          onClick={() => {
            setFilters(undefined);
          }}
        >
          All ({totalReviews})
        </div>
        {ratingStatistics.map((r) => (
          <div
            key={r.rating}
            className={cn(
              "bg-[#f5f5f5] text-main-primary border border-transparent rounded-full cursor-pointer py-1.5 px-4",
              {
                "bg-[#ffebed] text-[#fd384f] border-[#fd384f]":
                  r.rating === rating,
              }
            )}
            onClick={() => setFilters(r.rating)}
          >
            {r.rating} stars ({r.numReviews})
          </div>
        ))}
      </div>
    </div>
  );
}
