import BrandsSection from "@/components/home/BrandsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import MainSlider from "@/components/home/MainSlider";
import ProductsSection from "@/components/home/ProductsSection";
import Loader from "@/components/shared/Loader";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto">
        <MainSlider />
        <Suspense fallback={<Loader />}>
          <CategoriesSection />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <BrandsSection/>
        </Suspense>
        <Suspense fallback={<Loader />}>
          <ProductsSection />
        </Suspense>
      </div>
    </div>
  );
}
