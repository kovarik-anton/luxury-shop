import { BrowseFilter } from "@/types/ui";
import Filter from "./filter";
import { Browse_Filter_Default_Size } from "@/constants";
import { getSubcategoriesFilter } from "@/actions/subcategory";

export default async function SubcategoryFilter() {
  const subcategories = await getSubcategoriesFilter(
    Browse_Filter_Default_Size
  );
  const filter: BrowseFilter = {
    filter: "subCategory",
    links: subcategories,
    title: "Subcategory",
    getFunction: getSubcategoriesFilter,
  };

  return <Filter filter={filter}></Filter>;
}
