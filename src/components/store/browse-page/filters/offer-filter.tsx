import { getOfferTagsFilter } from "@/actions/offer-tag";
import Filter from "./filter";
import { Browse_Filter_Default_Size } from "@/constants";
import { BrowseFilter } from "@/types/ui";

export default async function OfferFilter() {
  const offerTags = await getOfferTagsFilter(Browse_Filter_Default_Size);
  const filter: BrowseFilter = {
    filter: "offer",
    links: offerTags,
    title: "Offer",
    getFunction: getOfferTagsFilter,
  };

  return <Filter filter={filter}></Filter>;
}
