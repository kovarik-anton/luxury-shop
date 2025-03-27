import React from "react";
import { getStores } from "@/actions/store";
import StoreCard from "../cards/store-card";
import StoreList from "../shared/store-list";
import { Stores_StorePage_Size } from "@/constants";

export default async function StoreContainer() {
  const stores = await getStores({ pageSize: Stores_StorePage_Size, page: 1 });

  return (
    <section>
      <div className="text-center h-[32px] leading-[32px] text-[24px] font-extrabold text-[#222] flex justify-center my-2">
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
        <h1>Stores</h1>
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
      </div>
      <div className="text-center h-[32px] leading-[32px] text-[18px] font-bold text-[#222] flex justify-center mb-4">
        <h2></h2>
      </div>
      <StoreList stores={stores}></StoreList>
    </section>
  );
}
