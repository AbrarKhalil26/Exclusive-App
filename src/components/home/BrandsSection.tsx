import Link from "next/link";
import { getBrands } from "@/services/brands.service";
import { IBrand } from "@/types/brand.type";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import BrandsCard from "./BrandCard";

export default async function BrandsSection() {
  const { data: brands }: { data: IBrand[] } = await getBrands(8);

  return (
    <div className="py-10 mx-3">
      <div className="flex items-center justify-between mb-15">
        <SectionTitle title="Brands" subtitle="Browse By Brands" />
        <Button
          variant={"destructive"}
          asChild
          className="bg-red-500 px-12 py-5"
        >
          <Link href="/brands">View All</Link>
        </Button>
      </div>

      <BrandsCard brands={brands} />
      <Separator />
    </div>
  );
}
