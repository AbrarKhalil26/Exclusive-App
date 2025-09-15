import React from "react";
import ProductSlider from "@/components/products/ProductSlider";
import { Separator } from "@/components/ui/separator";
import { getProductDetails } from "@/services/Products.service";
import { IProduct } from "@/types/product.type";
import { TiStarFullOutline } from "react-icons/ti";
import { Button } from "@/components/ui/button";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );
  console.log(product);

  return (
    <div className="py-15 mx-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3">
            <ProductSlider images={product.images} />
          </div>
          <div className="lg:col-span-2">
            <div className="px-3 py-5">
              <h2 className="font-semibold text-2xl mb-4">{product.title}</h2>
              <div className="flex items-center gap-1 mb-2">
                <TiStarFullOutline className="text-yellow-500" />
                

                <span className="font-semibold text-sm text-gray-500">
                  {product.ratingsAverage}
                </span>
              </div>
              <p className="mb-2 text-red-500 font-semibold">
                {product.price} EGP
              </p>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
            <Separator />

            <div className="text-sm text-gray-600 px-3 py-5">
              <p>
                <span className="font-semibold me-2">Brand: </span>
                {product.brand.name}
              </p>
              <p></p>
              <Button className="px-8 mt-4 cursor-pointer" variant={"destructive"}>Add To Cart</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
