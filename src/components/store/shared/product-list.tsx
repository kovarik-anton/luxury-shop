import ProductCard from "../cards/product-card/product-card";
import { ProductType } from "@/types/ui";
import { cn } from "@/lib/utils/utils";
import Title from "./product-list/list-title";
import List from "./product-list/list";

interface Props {
  products: ProductType[];
  title?: string;
  link?: string;
  arrow?: boolean;
}

export default function ProductList({ products, title, link, arrow }: Props) {
  return (
    <List
      data={products}
      title={title}
      link={link}
      arrow={arrow}
      render={(product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      )}
    ></List>
  );
}
