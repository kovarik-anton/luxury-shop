"use client";
import { cn } from "@/lib/utils/utils";
import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortOptions = [
  {
    name: "Most Popular",
    query: "most-popular",
  },
  {
    name: "New Arrivals",
    query: "new-arrivals",
  },
  {
    name: "Top Rated",
    query: "top-rated",
  },
];

export default function ProductSort() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const { replace } = useRouter();

  const sortQuery = params.get("sort") || "most-popular";

  const sort = sortQuery
    ? sortOptions.find((s) => s.query === sortQuery)?.name
    : "Most Popular";

  const handleSort = (sort: string) => {
    params.set("sort", sort);
    replace(`${pathname}?${params.toString()}`);
  };

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <section className="relative w-full transition-all duration-[30ms]">
      <div className="pr-[50px] inline-block relative">
        <div className="flex">
          <div className="h-9 w-[227px] !float-right">
            <div className="h-9 w-[227px] !float-left">
              <div
                className="h-9 w-[227px] z-20 relative inline-block outline-0 group"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="h-9 w-[227px]">
                  <div className="inline-flex relative w-full">
                    <div className="relative">
                      <span className="w-[70px] h-full flex items-center justify-center absolute top-0 transition-all duration-[20ms]">
                        <label htmlFor="">Sort by</label>
                      </span>
                    </div>
                    <input
                      type="text"
                      disabled
                      value={sort}
                      className="pl-[70px] text-sm font-bold h-9 pr-10 bg-none border cursor-pointer px-3 bg-transparent text-main-primary w-full outline-0 align-bottom"
                    />
                    <div className="relative">
                      <span
                        className="flex items-center justify-center box-border h-full w-10 absolute top-0 right-0 transition-transform duration-200 ease-in-out"
                        style={{
                          transform: isMenuOpen
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <ChevronDown className="w-3" />
                      </span>
                    </div>
                  </div>
                </div>
                <ul
                  className={cn(
                    "absolute bg-white max-h-72 py-2 shadow-2xl overflow-auto w-full transition-all duration-300 ease-in-out transform",
                    {
                      "opacity-100 translate-y-0": isMenuOpen,
                      "opacity-0 -translate-y-2 pointer-events-none":
                        !isMenuOpen,
                    }
                  )}
                >
                  {sortOptions.map((option) => (
                    <li
                      key={option.query}
                      className="w-full flex items-center justify-between bg-white hover:bg-gray-100 cursor-pointer h-8 px-4 text-xs"
                      onClick={() => handleSort(option.query)}
                    >
                      <p
                        className={cn({
                          "font-bold": option.query === sortQuery,
                        })}
                      >
                        {option.name}
                      </p>
                      {option.query === sortQuery && <Check className="w-3" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
