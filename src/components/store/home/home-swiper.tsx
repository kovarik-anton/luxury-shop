"use client";
import "react-awesome-slider/dist/styles.css";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

export default function HomeMainSwiper() {
  return (
    <ol className="p-4 rounded-md cursor-pointer">
      <Swiper modules={[Navigation]} navigation loop autoplay slidesPerView={1}>
        {images.map((img) => (
          <li key={img.id}>
            <SwiperSlide>
              <Link href={`/browse?offer=${img.offer}`}>
                <Image src={img.url} alt="" />
              </Link>
            </SwiperSlide>
          </li>
        ))}
      </Swiper>
    </ol>
  );
}

const images: { id: string; url: string; offer: string }[] = [];
