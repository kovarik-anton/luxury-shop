"use client";

import { FiltersQueryType } from "@/types/ui";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  queries: FiltersQueryType;
}

export default function FiltersHeader({ queries }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const queriesArray = Object.entries(queries);
  const queriesLength = queriesArray.reduce((count, [queryKey, queryValue]) => {
    if (queryKey === "sort") return count;
    return count + (Array.isArray(queryValue) ? queryValue.length : 1);
  }, 0);

  const handleClearQueries = () => {
    const params = new URLSearchParams(searchParams);

    params.forEach((_, key) => {
      params.delete(key);
    });

    replace(pathname);
  };

  const handleRemoveQuery = (
    query: string,
    array?: string[],
    specificValue?: string
  ) => {
    const params = new URLSearchParams(searchParams);

    if (specificValue && array) {
      const updatedArray = array.filter((value) => value !== specificValue);
      params.delete(query);
      updatedArray.forEach((value) => params.append(query, value));
    } else {
      params.delete(query);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="pt-2.5 pb-5">
      <div className="flex items-center justify-between h-4 leading-5">
        <h3 className="text-sm font-bold">Filter ({queriesLength})</h3>
        {queriesLength > 0 && (
          <p
            className="text-xs text-orange-background cursor-pointer hover:underline"
            onClick={() => handleClearQueries()}
          >
            Clear All
          </p>
        )}
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {queriesArray.map(([queryKey, queryValue]) => {
          if (queryKey === "sort") return null;
          const isArrayQuery = Array.isArray(queryValue);
          const queryValues = isArrayQuery ? queryValue : [queryValue];

          return (
            <li key={queryKey} className="flex flex-wrap gap-2">
              {queryValues.map((value, index) => (
                <div
                  key={index}
                  className="border cursor-pointer py-0.5 px-1.5 rounded-sm text-sm w-fit text-center"
                >
                  <p className="text-main-secondary overflow-hidden text-ellipsis whitespace-nowrap mr-2">
                    {value}
                  </p>
                  <X
                    className="w-3 text-main-secondary hover:text-black cursor-pointer inline-block"
                    onClick={() => {
                      isArrayQuery
                        ? handleRemoveQuery(queryKey, queryValues, value)
                        : handleRemoveQuery(queryKey);
                    }}
                  />
                </div>
              ))}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
