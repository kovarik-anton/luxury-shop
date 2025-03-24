"use client";
import Image from "next/image";
import StarRatings from "react-star-ratings";
import { ReviewWithUserType } from "@/types/ui";

interface Props {
  review: ReviewWithUserType;
}

export default function ReviewCard({ review }: Props) {
  const { user } = review;
  const { name } = user;
  return (
    <section className="border border-[#d8d8d8] rounded-xl flex h-fit relative py-4 px-2.5">
      <div className="w-16 px- space-y-1">
        <Image
          src={user.picture}
          alt="Profile image"
          width={100}
          height={100}
          className="w-11 h-11 rounded-full object-cover"
        />
        <p className="text-xs text-main-secondary">Verified user {name[0]}</p>
      </div>
      <div className="flex flex-1 flex-col justify-between leading-5 overflow-hidden px-1.5">
        <div className="space-y-2">
          <StarRatings
            rating={review.rating}
            starDimension="24px"
            starEmptyColor="#e2dfdf"
            starRatedColor="#FFD804"
            starHoverColor="#FFD804"
          />
          <section className="flex items-center gap-x-2">
            <div className="text-main-secondary text-sm">{review.variant}</div>
            <span>.</span>
            <div className="text-main-secondary text-sm">{review.size}</div>
          </section>
          <p className="text-sm">{review.review}</p>
        </div>
      </div>
    </section>
  );
}
