"use client";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchSuggestions from "./suggestions";
import { SearchResult } from "@/types/ui";
import { searchProducts } from "@/actions/product";
import useDebounce from "@/hooks/use-debounce";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function Search() {
  const pathname = usePathname();
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [searchQuery, setSearchQuery] = useState<string>(
    params.get("search") || ""
  );
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const { debouncedValue } = useDebounce(searchQuery, 500);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setSuggestions([]);
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (pathname !== "/browse") {
      push(`/browse?search=${searchQuery}`);
    } else {
      if (!searchQuery) {
        params.delete("search");
      } else {
        params.set("search", searchQuery);
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (pathname === "/browse") return;
      if (debouncedValue.length >= 2) {
        try {
          const data = await searchProducts(debouncedValue);
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching autocomplete suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    }

    fetchData();
  }, [debouncedValue, pathname]);

  return (
    <div ref={ref} className="relative lg:w-full flex-1">
      <form
        onSubmit={handleSubmit}
        className="h-10 rounded-3xl bg-white relative border-none flex"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-white text-black flex-1 border-none pl-2.5 m-2.5 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <SearchSuggestions suggestions={suggestions} query={searchQuery} />
        )}
        <button
          type="submit"
          className="border-[1px] rounded-[20px] w-[56px] h-8 mt-1 mr-1 mb-0 ml-0 bg-gradient-to-r from-slate-500 to bg-slate-600 grid place-items-center cursor-pointer"
        >
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
