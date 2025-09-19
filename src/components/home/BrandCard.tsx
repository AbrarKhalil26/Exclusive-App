"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { IBrand } from "@/types/brand.type";

export default function BrandsSlider({ brands }: { brands: IBrand[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 mb-35 mt-15">
      {brands.map((brand) => (
        <div className="relative w-35 h-30 mb-3" key={brand._id}>
          <Image
            src={brand.image}
            alt={brand.name}
            className="object-contain border p-3 rounded-md"
            priority={true}
            fill
            sizes="(max-width: 768px) 100px"
          />
        </div>
      ))}
    </div>
  );
}
