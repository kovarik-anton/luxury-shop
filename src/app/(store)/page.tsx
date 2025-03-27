import FeaturedCategories from "@/components/store/home/featured-categories";
import HomeBanner from "@/components/store/home/home-banner";
import HomeProducts from "@/components/store/home/home-products";
import HomeStores from "@/components/store/home/home-stores";
import HomeMainSwiper from "@/components/store/home/home-swiper";

export default async function HomePage() {
  return (
    <div className="min-h-screen p-4 relative w-full h-full ">
      <HomeBanner />
      <div className="mt-10 space-y-10">
        <FeaturedCategories />
        <HomeProducts />
        <HomeStores />
      </div>
    </div>
  );
}
