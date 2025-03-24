import { StatisticsCardType } from "@/types/ui";
import StarRatings from "react-star-ratings";

interface Props {
  statistics: StatisticsCardType;
}

export default function RatingStatisticsCard({ statistics }: Props) {
  return (
    <section className="h-44 flex-1 w-full">
      <div className="py-5 px-7 bg-[#f5f5f5] flex flex-col gap-y-2 h-full justify-center overflow-hidden rounded-lg">
        {statistics
          .slice()
          .reverse()
          .map((rating) => (
            <div key={rating.rating} className="flex items-center h-4">
              <StarRatings
                rating={rating.rating}
                starDimension="15px"
                starEmptyColor="#e2dfdf"
                starRatedColor="#FFD804"
                starHoverColor="#FFD804"
              />
              <div className="relative w-full flex-1 h-1.5 mx-2.5 bg-[#e2dfdf] rounded-full">
                <div
                  className="absolute left-0 h-full rounded-full bg-[#ffc50A]"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <div className="text-xs w-12 leading-4">{rating.numReviews}</div>
            </div>
          ))}
      </div>
    </section>
  );
}
