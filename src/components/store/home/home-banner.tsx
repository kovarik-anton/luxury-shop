import { getMainPageOffers } from "@/actions/offer-tag";
import HomeMainSwiper from "./home-swiper";

export default async function HomeBanner() {
  const offers = await getMainPageOffers();

  return <HomeMainSwiper images={offers} />;
}
