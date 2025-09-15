"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { ICategory } from "@/types/category.type";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const swiperOptions = {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    900: { slidesPerView: 4 },
    1010: { slidesPerView: 5 },
    1200: { slidesPerView: 6 },
  },
  navigation: {
    prevEl: ".custom-prev",
    nextEl: ".custom-next",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  modules: [Navigation, Autoplay],
};

export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <div className="relative mb-35 mt-15">
      <button className="custom-prev mx-4 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black">
        <IoIosArrowBack size={30} />
      </button>
      <button className="custom-next mx-4 absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white p-2 rounded-full hover:bg-black">
        <IoIosArrowForward size={30} />
      </button>

      <Swiper
        {...swiperOptions}
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-navigation-size": "40px",
          } as React.CSSProperties
        }
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="relative h-60 mb-3">
              <Image
                src={category.image}
                alt={category.name}
                className="object-contain bg-gray-100 rounded-md"
                priority={true}
                fill
                sizes="(max-width: 768px) 300px"
              />
            </div>
            <h3 className="font-medium ms-2">{category.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
