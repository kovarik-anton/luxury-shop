import { cn } from "@/lib/utils/utils";
import { Spec } from "@/types/ui";

interface Props {
  data: Spec[];
  noTopBorder?: boolean;
}

export default function SpecTable({ data, noTopBorder }: Props) {
  return (
    <ul
      className={cn("border grid grid-cols-1", {
        "border-t-0": noTopBorder,
      })}
    >
      {data.map((spec, i) => (
        <li
          key={i}
          className={cn("flex border-t", {
            "border-t-0": i === 0,
          })}
        >
          <section className="float-left text-sm leading-7 max-w-[50%] relative w-1/2 flex">
            <div className="p-4 bg-[#f5f5f5] text-main-primary w-44">
              <p className="leading-5">{spec.name}</p>
            </div>
            <div className="p-4  text-[#151515] flex-1 break-words leading-5">
              <span className="leading-5">{spec.value}</span>
            </div>
          </section>
        </li>
      ))}
    </ul>
  );
}
