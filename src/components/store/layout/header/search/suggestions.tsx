import { SearchResult } from "@/types/ui";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  suggestions: SearchResult[];
  query: string;
}

export default function SearchSuggestions({ suggestions, query }: Props) {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="absolute top-11 w-full rounded-3xl bg-white text-main-primary shadow-2xl !z-[99] overflow-hidden">
      <div className="py-2">
        <ul>
          {suggestions.map((sugg) => (
            <li key={sugg.name}>
              <Link
                href={sugg.link}
                className="w-full h-20 px-6 cursor-pointer hover:bg-[#f5f5f5] flex items-center gap-x-2"
              >
                <Image
                  src={sugg.image}
                  alt=""
                  width={100}
                  height={100}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <span className="text-sm leading-6 my-1.5">
                    {highlightText(sugg.name, query)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
