"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import FilterLink from "./filter-link";
import { BrowseFilter, BrowseFilterLink } from "@/types/ui";
import { Browse_Filter_Default_Size } from "@/constants";

interface Props {
  filter: BrowseFilter;
}

export default function Filter({ filter }: Props) {
  const [show, setShow] = useState<boolean>(true);
  const [links, setLinks] = useState<BrowseFilterLink[]>(filter.links);
  const [take, setTake] = useState<number>(Browse_Filter_Default_Size);
  const showMore = take === links.length;
  async function handleShowMore() {
    try {
      const newItems = await filter.getFunction(
        take + Browse_Filter_Default_Size
      );
      setTake(take + Browse_Filter_Default_Size);
      setLinks(newItems);
    } catch {}
  }

  if (links.length === 0) return null;
  return (
    <section className="pt-5 pb-4">
      <div
        className="relative cursor-pointer flex items-center justify-between select-none"
        onClick={() => setShow((prev) => !prev)}
      >
        <h3 className="text-sm font-bold overflow-ellipsis capitalize line-clamp-1 text-main-primary">
          {filter.title}
        </h3>
        <span className="absolute right-0">
          {show ? <Minus className="w-3" /> : <Plus className="w-3" />}
        </span>
      </div>
      <div
        className={cn("mt-2.5 flex flex-col flex-wrap gap-2", {
          hidden: !show,
        })}
      >
        {links.map((link) => (
          <FilterLink
            key={link.value}
            filter={filter.filter}
            label={link.label}
            value={link.value}
          />
        ))}
        {showMore ? (
          <button
            onClick={handleShowMore}
            className="text-sm text-blue-600 mt-2 text-center hover:cursor-pointer hover:underline"
          >
            Show more
          </button>
        ) : null}
      </div>
    </section>
  );
}
