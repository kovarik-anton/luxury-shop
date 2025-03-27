import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";
import Title from "./list-title";

interface Props<T> {
  data: T[];
  title?: string;
  link?: string;
  arrow?: boolean;
  render: (item: T) => ReactNode;
}

export default function List<T>({
  data,
  title,
  link,
  arrow,
  render,
}: Props<T>) {
  return (
    <section className="relative w-full bg-white">
      {title && <Title arrow={arrow} title={title} link={link} />}
      {data.length > 0 ? (
        <ul
          className={cn(
            "grid grid-cols-2 smmd:grid-cols-3 mdlglg:grid-cols-4 lgxlxl:grid-cols-5 xl2xl:grid-cols-6 max:grid-cols-7 flex-wrap w-full sm:mx-2",
            {
              "mt-2": title,
            }
          )}
        >
          {data.map(render)}
        </ul>
      ) : (
        "No Items."
      )}
    </section>
  );
}
