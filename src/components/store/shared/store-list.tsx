import React from "react";
import { getStores } from "@/actions/store";
import StoreCard from "../cards/store-card";
import { StoreCardType } from "@/types/ui";

interface Props {
  stores: StoreCardType[];
}

export default async function StoreList({ stores }: Props) {
  return (
    <section className="w-full bg-white">
      <ul className="grid grid-cols-2 smmd:grid-cols-3 mdlglg:grid-cols-4 lgxlxl:grid-cols-5 xl2xl:grid-cols-6 max:grid-cols-7 flex-wrap w-full sm:mx-2 mb-12">
        {stores.map((store) => (
          <li key={store.url}>
            <StoreCard store={store} />
          </li>
        ))}
      </ul>
    </section>
  );
}
