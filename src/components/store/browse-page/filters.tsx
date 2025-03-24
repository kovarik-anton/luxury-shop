import CategoryFilter from "./filters/category-filter";
import OfferFilter from "./filters/offer-filter";
import FiltersHeader from "./filters/header";
import { FiltersQueryType } from "@/types/ui";
import SubcategoryFilter from "./filters/subcategory-filter";
import SizeFilter from "./filters/size-filter";

interface Props {
  queries: FiltersQueryType;
}

export default async function ProductFilters({ queries }: Props) {
  const key = new URLSearchParams(queries).toString();
  return (
    <section className="h-[840px] transition-transform overflow-auto pr-6 pb-2.5 flex-none basis-[196px] sticky top-0 overflow-x-hidden scrollbar">
      <FiltersHeader queries={queries} />
      <section className="border-t w-44">
        <CategoryFilter />
        <SubcategoryFilter></SubcategoryFilter>
        <OfferFilter></OfferFilter>
        <SizeFilter key={key} queries={queries} />
      </section>
    </section>
  );
}
