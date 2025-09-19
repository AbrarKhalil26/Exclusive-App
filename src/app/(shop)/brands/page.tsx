import SectionTitle from "@/components/shared/SectionTitle";
import { getBrands } from "@/services/brands.service";
import { IBrand } from "@/types/brand.type";
import BrandsCard from "@/components/home/BrandCard";

export default async function BrandsPage() {
  const { data: brands }: { data: IBrand[] } = await getBrands(50);
  
  return (
    <div className="my-12 mx-4">
      <div className="container mx-auto">
        <SectionTitle title="Brands" subtitle="Browse By Brands" />
        <BrandsCard brands={brands} />
      </div>
    </div>
  );
}
