"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const swiperOptions = {
  spaceBetween: 50,
  slidesPerView: 1,
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet size-3",
    bulletActiveClass: "swiper-pagination-bullet-active !bg-red-900",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Pagination, Autoplay],
};

const images = [
  {
    path: "/images/slider-image-1.jpeg",
    label: "Slider 1",
  },
  {
    path: "/images/slider-image-2.jpeg",
    label: "Slider 2",
  },
  {
    path: "/images/slider-image-3.jpeg",
    label: "Slider 3",
  },
];

export default function MainSlider() {
  return (
    <div className="mb-20 mx-3">
      <Swiper {...swiperOptions}>
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[550px]">
              <Image
                src={item.path}
                alt={item.label}
                fill
                sizes="(max-width: 768px) 100vw"
                className="w-full object-cover"
                priority={true}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
