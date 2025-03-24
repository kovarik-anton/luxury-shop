import { FeaturedCategoryType } from "@/types/ui";
import Image from "next/image";
import Link from "next/link";

interface Props {
  category: FeaturedCategoryType;
}

export default function CategoryCard({ category }: Props) {
  return (
    <section className="w-full h-full rounded-[10px] bg-white">
      <Link key={category.id} href={`/browse?category=${category.url}`}>
        <div className="px-5 pt-4 flex items-center justify-between">
          <h3 className="text-[20px] text-[#222] font-extrabold line-clamp-1 overflow-hidden flex-1">
            {category.name}
          </h3>
          <span className="block  text-[14px] text-[#222] mr-2.5 hover:underline">
            View more
          </span>
        </div>
      </Link>
      <ul className="flex gap-x-2 p-4">
        {category.subCategories.map((sub) => (
          <li key={sub.id}>
            <Link
              href={`/browse?subCategory=${sub.url}`}
              className="cursor-pointer rounded-[10px] overflow-hidden"
            >
              <Image
                src={sub.image}
                alt={sub.name}
                width={180}
                height={195}
                className="w-[180px] h-[150px] object-cover rounded-md hover:opacity-80"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
