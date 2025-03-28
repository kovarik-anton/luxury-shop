import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { useEffect, useRef } from "react";

interface Props {
  images: { url: string }[];
  name: string;
}

export default function ProductCardImageSwiper({ images, name }: Props) {
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, [swiperRef]);
  return (
    <div
      className="relative mb-2 w-full h-[200px] bg-white contrast-[90%] rounded-2xl overflow-hidden"
      onMouseEnter={() => swiperRef.current.swiper.autoplay.start()}
      onMouseLeave={() => {
        swiperRef.current.swiper.autoplay.stop();
        swiperRef.current.swiper.slideTo(0);
      }}
    >
      <Swiper ref={swiperRef} modules={[Autoplay]} autoplay={{ delay: 500 }}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={img.url}
              alt={name}
              width={400}
              height={400}
              className="block object-cover h-[200px] w-56"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
