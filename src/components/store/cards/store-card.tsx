"use client";
import Link from "next/link";
import { Button } from "@/components/store/ui/button";
import { StoreCardType } from "@/types/ui";
import Image from "next/image";

interface Props {
  store: StoreCardType;
}

export default function StoreCard({ store }: Props) {
  const { name, url, image, internalUrl } = store;

  return (
    <section>
      <div className="group w-56 relative transition-all duration-75 bg-white ease-in-out p-4 rounded-t-3xl border border-transparent hover:shadow-xl hover:border-border">
        <div className="relative w-full h-full">
          <Link
            href={url}
            className="w-full relative inline-block overflow-hidden"
          >
            <Image
              src={image}
              alt={name}
              width={400}
              height={400}
              className="block object-cover h-[200px] w-56 rounded-xl"
            />
          </Link>
          <Link href={internalUrl}>
            <p className="text-sm text-slate-500 h-[18px] overflow-hidden overflow-ellipsis line-clamp-1 text-center font-semibold">
              {name}
            </p>
          </Link>
        </div>
        <div className="hidden group-hover:block absolute mt-2 -left-[1px] bg-white border border-t-0  w-[calc(100%+2px)] px-4 pb-4 rounded-b-3xl shadow-xl z-30 space-y-2">
          <Button>
            <Link href={url}>Go to store</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
