"use client";

import { cn } from "@/lib/utils/utils";
import { BrowseFilterLink } from "@/types/ui";
import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterLink({
  value,
  filter,
  label,
}: BrowseFilterLink & { filter: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterValues = searchParams.getAll(filter);
  const existingValue = filterValues.find((f) => f === value);

  const handleValueChange = (newValue: string) => {
    if (existingValue) {
      const newValues = filterValues.filter((f) => f !== newValue);
      params.delete(filter);
      newValues.forEach((v) => params.append(filter, v));
    } else {
      params.append(filter, newValue);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <label
      className="flex items-center text-left cursor-pointer whitespace-nowrap select-none"
      onClick={() => handleValueChange(value)}
    >
      <span
        className={cn(
          "mr-2 border border-[#ccc] w-4 h-4 relative flex items-center justify-center rrounded-full",
          {
            "bg-black text-white border-black": value === existingValue,
          }
        )}
      >
        {value === existingValue && <Check className="w-2" />}
      </span>
      <div className="flex-1 text-sm inline-block overflow-visible text-clip whitespace-normal">
        {label}
      </div>
    </label>
  );
}
