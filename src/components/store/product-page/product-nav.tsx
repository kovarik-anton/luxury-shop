import { Category } from "@/types/ui";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
  category: Category;
  subCategory: Category;
  productName: string;
  variantName: string;
}

export default function ProductNav({
  category: { name: categoryName, url: categoryUrl },
  subCategory: { name: subcategoryName, url: subcategoryUrl },
  productName,
  variantName,
}: Props) {
  return (
    <nav className="mb-4">
      <ul className="flex flex-row">
        <li className="mx-2 capitalize whitespace-nowrap font-semibold text-slate-500 hover:underline">
          <Link href={`/browse?category=${categoryUrl}`}>{categoryName}</Link>
        </li>
        <ChevronRight />
        <li className="mx-2 capitalize whitespace-nowrap font-semibold text-slate-600 hover:underline">
          <Link href={`/browse?subCategory=${subcategoryUrl}`}>
            {subcategoryName}
          </Link>
        </li>
        <ChevronRight />
        <li className="capitalize mx-2 whitespace-nowrap font-semibold text-slate-600">
          {productName} · {variantName}
        </li>
      </ul>
    </nav>
  );
}
