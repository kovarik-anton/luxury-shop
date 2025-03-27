import React from "react";
import { getStores } from "@/actions/store";
import StoreCard from "../cards/store-card";
import { StoreCardType } from "@/types/ui";
import List from "./product-list/list";

interface Props {
  stores: StoreCardType[];
}

export default async function StoreList({ stores }: Props) {
  return (
    <List
      data={stores}
      render={(store) => (
        <li key={store.url}>
          <StoreCard store={store} />
        </li>
      )}
    ></List>
  );
}
