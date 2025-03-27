"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

interface Props {
  images: { id: string; link: string; image: string; name: string }[];
}

export default function HomeMainSwiper({ images }: Props) {
  const [img] = images;
  return (
    // <Link href={img.link}>
    //   <div className="relative w-auto h-52 md:h-60 lg:h-72 xl:h-80 2xl:h-96">
    //     <Image
    //       layout="fill"
    //       className="object-cover"
    //       src={img.image}
    //       alt={img.name}
    //     />
    //   </div>
    // </Link>

    <Swiper
      modules={[Navigation, Autoplay]}
      centeredSlides={true}
      navigation
      loop
      autoplay
      slidesPerView={1}
      className="relative h-32 sm:h-48 md:h-60 lg:h-80 xl:h-96 2xl:h-[448px]"
    >
      {images.map((img) => (
        <SwiperSlide key={img.id}>
          <Link href={img.link}>
            <Image
              layout="fill"
              className="object-cover"
              src={img.image}
              alt={img.name}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
