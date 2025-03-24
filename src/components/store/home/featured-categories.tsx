import CategoryCard from "../cards/category-card";
import { getHomeFeaturedCategories } from "@/actions/category";

export default async function FeaturedCategories() {
  const categories = await getHomeFeaturedCategories();

  return (
    <section className="w-full mx-auto">
      <div className="text-center h-[32px] leading-[32px] text-[24px] font-extrabold text-[#222] flex justify-center">
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
        <h2>Featured Categories</h2>
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
      </div>
      <ul className="grid min-[770px]:grid-cols-2 min-[1120px]:grid-cols-3  gap-4 w-full mt-7">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
}
