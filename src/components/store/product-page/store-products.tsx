import { getProducts } from "@/actions/product";
import ProductList from "../shared/product-list/product-list";

export default async function StoreProducts() {
  const storeUrl = "store"; // TODO
  const count = 6;
  const { products } = await getProducts({ store: storeUrl }, "", 1, count);
  return (
    <div className="relative mt-6 mb-6">
      <ProductList
        products={products}
        title={`More products from the store`}
        arrow
      />
    </div>
  );
}
