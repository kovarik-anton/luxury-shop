import StarRatings from "react-star-ratings";

interface Props {
  rating: number;
}

export default function RatingCard({ rating }: Props) {
  const fixedRating = Number(rating.toFixed(1));
  return (
    <section className="h-44 flex-1 w-full">
      <div className="p-6 bg-[#f5f5f5] flex flex-col h-full justify-center overflow-hidden rounded-lg">
        <p className="text-6xl font-bold">{fixedRating}</p>
        <div className="py-1.5">
          <StarRatings
            rating={fixedRating}
            starDimension="24px"
            starEmptyColor="#e2dfdf"
            starRatedColor="#FFD804"
            starHoverColor="#FFD804"
          />
        </div>
      </div>
    </section>
  );
}
