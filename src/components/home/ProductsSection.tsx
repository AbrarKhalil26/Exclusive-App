import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@radix-ui/react-separator";
import { getProducts } from "@/services/Products.service";
import { IProduct } from "@/types/product.type";
import Image from "next/image";
import { TiStarFullOutline } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductItem from "../products/ProductItem";

export default async function ProductsSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);

  console.log(products);
  

  return (
    <div className="py-18 mx-3">
      <div className="flex items-center justify-between mb-15">
        <SectionTitle title="Our Products" subtitle="Best Selling Products" />
        <Button
          variant={"destructive"}
          asChild
          className="bg-red-500 px-12 py-5"
        >
          <Link href="/products">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product}/>
        ))}
      </div>

      <Separator />
    </div>
  );
}
