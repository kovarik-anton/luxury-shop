declare module "react-star-ratings" {
  import { ComponentType } from "react";

  interface ReactStarsProps {
    rating?: number;
    changeRating?: (rating: number) => void;
    starDimension?: string;
    starSpacing?: string;
    starHoverColor?: string;
    starRatedColor?: string;
    starEmptyColor?: string;
  }

  const StarRatings: ComponentType<ReactStarsProps>;
  export default StarRatings;
}
