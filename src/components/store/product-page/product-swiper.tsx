"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import ImageZoom from "react-image-zooom";
import { cn } from "@/lib/utils/utils";
import { VariantImage } from "@/types/ui";

interface Props {
  images: VariantImage[];
  activeImage: VariantImage;
  setActiveImage: Dispatch<SetStateAction<VariantImage | null>>;
}

export default function ProductSwiper({
  images,
  activeImage,
  setActiveImage,
}: Props) {
  if (images?.length < 1) return;

  return (
    <div className="relative">
      <div className="relative w-full flex flex-col-reverse md:flex-row xl:flex-col-reverse 2xl:flex-row gap-2">
        <ul className="flex flex-wrap md:flex-col xl:flex-row 2xl:flex-col gap-3">
          {images.map((img) => (
            <li
              key={img.url}
              className={cn(
                "w-16 h-16 rounded-md grid place-items-center overflow-hidden border border-gray-100 cursor-pointer transition-all duration-75 ease-in",
                {
                  "border-main-primary": activeImage
                    ? activeImage.url === img.url
                    : false,
                }
              )}
              onMouseEnter={() => setActiveImage(img)}
            >
              <Image
                src={img.url}
                alt={img.alt}
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
            </li>
          ))}
        </ul>
        <div className="relative rounded-lg overflow-hidden w-full 2xl:h-[600px] 2xl:w-[600px]">
          <ImageZoom
            src={activeImage.url}
            zoom={180}
            className="!w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
