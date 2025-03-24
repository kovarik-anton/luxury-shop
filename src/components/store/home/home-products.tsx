import React from "react";
import { getProducts } from "@/actions/product";
import ProductCard from "../cards/product-card/product-card";
import { Home_Page_Products_Size } from "@/constants";

export default async function HomeProducts() {
  const { products } = await getProducts({}, "", 1, Home_Page_Products_Size);
  return (
    <section>
      <div className="text-center h-[32px] leading-[32px] text-[24px] font-extrabold text-[#222] flex justify-center">
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
        <h2>More to love</h2>
        <div className="h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)] my-4 mx-[14px]" />
      </div>
      <ul className="mt-7 bg-white justify-center flex flex-wrap min-[1530px]:grid min-[1530px]:grid-cols-7 p-4 pb-16 rounded-md">
        {products.map((product, i) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
