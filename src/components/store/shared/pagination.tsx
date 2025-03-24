"use client";

import { cn } from "@/lib/utils/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface Props {
  page: number;
  totalPages: number;
  setPage?: Dispatch<SetStateAction<number>>;
}

export default function Pagination({ page, setPage, totalPages }: Props) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handlePrevious = () => {
    if (page > 1) {
      handleSet(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      handleSet(page + 1);
    }
  };

  const handleSet = (newPage: number) => {
    if (setPage) {
      setPage(newPage);
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <nav className="w-full py-0 lg:px-0 sm:px-6 px-4 flex items-center justify-end gap-x-4 border-t border-gray-200">
      <ol className="flex flex-wrap">
        <li
          onClick={() => handlePrevious()}
          className="flex items-center mr-4 pt-2 text-gray-600 hover:text-orange-background cursor-pointer"
        >
          <ChevronLeft className="w-3" />
          <p className="text-sm ml-3 font-medium leading-none">Previous</p>
        </li>
        {Array.from({ length: totalPages }).map((_, i) => (
          <li
            key={i}
            className={cn(
              "text-sm font-medium leading-none cursor-pointer text-gray-600  hover:text-orange-background  border-t border-transparent pt-3 mr-4 px-2",
              {
                "text-orange-background border-orange-background":
                  i + 1 === page,
              }
            )}
            onClick={() => handleSet(i + 1)}
          >
            {i + 1}
          </li>
        ))}
        <li
          onClick={() => handleNext()}
          className="flex items-center pt-2 text-gray-600 hover:text-orange-background cursor-pointer"
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <ChevronRight className="w-3" />
        </li>
      </ol>
    </nav>
  );
}
