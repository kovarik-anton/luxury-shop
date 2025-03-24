import FeaturedCategories from "@/components/store/home/featured-categories";
import HomeProducts from "@/components/store/home/home-products";
import HomeMainSwiper from "@/components/store/home/home-swiper";

export default async function HomePage() {
  return (
    <div className="relative w-full">
      <div className="z-30 w-10 h-full absolute top-0 right-0 bg-gradient-to-t from-slate-500 to-slate-800 text-[13px] duration-100"></div>
      <div className="relative w-[calc(100%-40px)] h-full bg-[#e3e3e3]">
        <HomeMainSwiper />
        <div className="max-w-[1600px] mx-auto min-h-screen p-4">
          <div className="mt-10 space-y-10">
            <FeaturedCategories />
            <HomeProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
