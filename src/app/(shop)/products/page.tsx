import React from "react";
import { IProduct } from "@/types/product.type";
import { getProducts } from "@/services/Products.service";
import SectionTitle from "@/components/shared/SectionTitle";
import ProductItem from "@/components/products/ProductItem";

export default async function ProductsPage() {
  const { data: products }: { data: IProduct[] } = await getProducts();

  return (
    <div className="pt-20">
      <div className="container py-18 mx-auto">
        <SectionTitle title="Our Products" subtitle="Best Selling Products" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-15">
          {products.map((product) => (
            <ProductItem key={product.id} product={product}/>
          ))}
        </div>

        {/* Pagination */}
      </div>
    </div>
  );
}
