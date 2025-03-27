import ProductCard from "../../cards/product-card/product-card";
import { ProductType } from "@/types/ui";
import { cn } from "@/lib/utils/utils";
import Title from "./product-list-title";

interface Props {
  products: ProductType[];
  title?: string;
  link?: string;
  arrow?: boolean;
}

export default function ProductList({ products, title, link, arrow }: Props) {
  return (
    <section className="relative w-full bg-white">
      {title && <Title arrow={arrow} title={title} link={link} />}
      {products.length > 0 ? (
        <ul
          className={cn(
            "grid grid-cols-2 smmd:grid-cols-3 mdlglg:grid-cols-4 lgxlxl:grid-cols-5 xl2xl:grid-cols-6 max:grid-cols-7 flex-wrap w-full sm:mx-2",
            {
              "mt-2": title,
            }
          )}
        >
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        "No Products."
      )}
    </section>
  );
}
