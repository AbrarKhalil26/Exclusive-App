"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const swiperOneOptions = {
    thumbs: { swiper: thumbsSwiper },
    modules: [FreeMode, Navigation, Thumbs],
  };

  const swiperTwoOptions = {
    direction: "vertical" as const,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    navigation: {
      prevEl: ".custom-prev",
      nextEl: ".custom-next",
    },
    watchSlidesProgress: true,
    modules: [FreeMode, Navigation, Thumbs],
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Thumbnails */}
      <div className="col-span-1 relative flex flex-col items-center">
        <button className="custom-prev mb-2 bg-black/70 text-white p-2 rounded-full hover:bg-black z-10">
          <IoIosArrowBack size={15} className="rotate-90" />
        </button>

        <Swiper
          onSwiper={setThumbsSwiper}
          {...swiperTwoOptions}
          className="mySwiper h-[400px]"
        >
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={image}
                alt={`thumb-${idx}`}
                width={80}
                height={80}
                className="w-23 h-23 object-contain border rounded-md shadow"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrow Down */}
        <button className="custom-next mt-2 bg-black/70 text-white p-2 rounded-full hover:bg-black z-10">
          <IoIosArrowForward size={15} className="rotate-90" />
        </button>
      </div>

      {/* Main Image */}
      <div className="col-span-2">
        <Swiper {...swiperOneOptions}>
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-96 h-auto mx-auto">
                <Image
                  src={image}
                  alt={`product-${idx}`}
                  width={350}
                  height={350}
                  className="object-contain border rounded-lg shadow-xl"
                  priority={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
