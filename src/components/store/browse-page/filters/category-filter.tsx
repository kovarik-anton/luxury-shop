import { BrowseFilter } from "@/types/ui";
import Filter from "./filter";
import { getCategoriesFilter } from "@/actions/category";
import { Browse_Filter_Default_Size } from "@/constants";

export default async function CategoryFilter() {
  const categories = await getCategoriesFilter(Browse_Filter_Default_Size);
  const filter: BrowseFilter = {
    filter: "category",
    links: categories,
    title: "Category",
    getFunction: getCategoriesFilter,
  };

  return <Filter filter={filter}></Filter>;
}
