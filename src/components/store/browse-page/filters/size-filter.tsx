import { BrowseFilter, FiltersQueryType } from "@/types/ui";
import { getFilteredSizes } from "@/actions/size";
import { Browse_Filter_Default_Size } from "@/constants";
import Filter from "./filter";

interface Props {
  queries: FiltersQueryType;
}

export default async function SizeFilter({ queries }: Props) {
  const { category, subCategory, offer } = queries;

  const getFilterMethod = getFilteredSizes.bind(undefined, {
    category: Array.isArray(category)
      ? category
      : category
      ? [category]
      : undefined,
    subCategory: Array.isArray(subCategory)
      ? subCategory
      : subCategory
      ? [subCategory]
      : undefined,
    offer: Array.isArray(offer) ? offer : offer ? [offer] : undefined,
  });

  const sizes = await getFilterMethod(Browse_Filter_Default_Size);
  const filter: BrowseFilter = {
    filter: "size",
    links: sizes,
    title: "Size",
    getFunction: getFilterMethod,
  };

  return <Filter filter={filter}></Filter>;
}
