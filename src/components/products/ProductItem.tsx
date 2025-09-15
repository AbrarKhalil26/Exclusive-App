import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { TiStarFullOutline } from "react-icons/ti";
import { IProduct } from "@/types/product.type";
import Link from "next/link";

export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <div>
      <picture className="relative group overflow-hidden">
        <Link href={`/products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={1920}
            height={300}
            className="w-full object-contain bg-gray-100 shadow-lg shadow-gray-300 rounded-md"
            priority={true}
          />
        </Link>
        <Button className="absolute bottom-0 translate-y-full group-hover:translate-y-0 invisible group-hover:visible rounded-t-none w-full px-12 py-6">
          Add to Cart
        </Button>
      </picture>
      <div className="px-3 py-5">
        <h3 className="font-semibold"><Link href={`/product/${product._id}`}>{product.title}</Link></h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-red-500">{product.price} EGP</p>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm text-gray-500">
              {product.ratingsAverage}
            </span>
            <TiStarFullOutline className="text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
