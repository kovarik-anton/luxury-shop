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
    <section className="relative">
      {title && <Title arrow={arrow} title={title} link={link} />}
      {products.length > 0 ? (
        <ul
          className={cn(
            "flex flex-wrap -translate-x-5 w-[cacl(100%+3rem)] sm:w-[calc(100%+1.5rem)]",
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
