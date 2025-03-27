"use client";

import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { FilterIcon } from "lucide-react";
import { ReactNode, useState } from "react";

export default function ProductFiltersToggler({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  return (
    <div>
      <div className="text-right">
        <Button onClick={() => setIsOpen((prev) => !prev)}>
          <FilterIcon />
        </Button>
      </div>
      {isOpen && (
        <div className="relative h-full">
          <div className="overlay fixed inset-0 bg-black bg-opacity-50 z-50"></div>
          <div
            className="fixed z-50 top-0 left-0 bg-white p-4 h-full"
            ref={ref}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
