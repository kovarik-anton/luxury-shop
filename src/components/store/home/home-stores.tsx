import React from "react";
import { getStores } from "@/actions/store";
import StoreList from "../shared/store-list";
import { Stores_HomePage_Size } from "@/constants";

export default async function HomeStores() {
  const stores = await getStores({ pageSize: Stores_HomePage_Size, page: 1 });

  return (
    <section>
      <div className="text-center h-[32px] leading-[32px] text-[24px] font-extrabold text-[#222] flex justify-center mb-7">
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
        <h2>Stores</h2>
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
      </div>
      <StoreList stores={stores}></StoreList>
    </section>
  );
}
