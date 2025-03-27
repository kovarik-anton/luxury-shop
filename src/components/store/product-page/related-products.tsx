import React from "react";

import { getProducts } from "@/actions/product";
import { Separator } from "@/components/ui/separator";
import ProductList from "../shared/product-list";

interface Props {
  categoryUrl: string;
}

export default async function RelatedProducts({ categoryUrl }: Props) {
  const { products } = await getProducts({ category: categoryUrl }, "", 1, 12);
  return (
    <>
      <Separator />
      <div className="mt-4 space-y-1">
        <ProductList products={products} title="Related products" />
      </div>
    </>
  );
}
