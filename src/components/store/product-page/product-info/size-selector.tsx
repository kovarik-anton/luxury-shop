"use client";

import { SizeInfo } from "@/types/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  sizes: SizeInfo[];
  sizeId: string | undefined;
}

export default function SizeSelector({ sizeId, sizes }: Props) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSelectSize = (size: SizeInfo) => {
    const params = new URLSearchParams(searchParams);
    params.set("size", size.id);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-2 pb-2 mt-4">
      <label className="text-main-primary font-bold">Size </label>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <span
            key={size.size}
            className="border rounded-full px-5 py-1 cursor-pointer hover:border-black"
            style={{ borderColor: size.id === sizeId ? "#000" : "" }}
            onClick={() => handleSelectSize(size)}
          >
            {size.size}
          </span>
        ))}
      </div>
    </div>
  );
}
