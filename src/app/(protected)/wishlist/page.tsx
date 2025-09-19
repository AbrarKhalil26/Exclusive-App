"use client";
import AddToCartBtn from "@/components/products/AddToCartBtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { TiStarFullOutline } from "react-icons/ti";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { removeItemFromWishlist } from "@/services/wishlist.service";
import { FaHeart } from "react-icons/fa";

export default function WishlistPage() {
  const { wishlistDetails, getWishlistDetails } = useWishlist();

  async function removeProductFromWishlist(productId: string) {
    const { success, message } = await removeItemFromWishlist(productId);
    if (success) {
      toast.success("Product removed successfully", {
        position: "top-right",
      });
      getWishlistDetails();
    } else {
      toast.error(message, {
        position: "top-right",
      });
    }
  }

  return (
    <div className="py-15 mx-3">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-15">My wishlist</h2>
        {wishlistDetails?.count === 0 ? (
          <div className="flex flex-col items-center gap-5">
            <h2 className="text-xl font-semibold">Your wishlist is Empty.</h2>
            <Button variant={"outline"} className="w-fit px-10 py-6">
              <Link href={"/products"}>Return To Shop</Link>
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {wishlistDetails?.data.map((product) => (
              <div key={product.id}>
                <picture className="relative group overflow-hidden">
                  <Link href={`/products/${product._id}`}>
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={1920}
                      height={200}
                      className="w-full object-contain bg-gray-100 shadow-lg shadow-gray-300 rounded-md"
                      priority={true}
                    />
                  </Link>
                  <AddToCartBtn
                    productId={product._id}
                    className="cursor-pointer absolute bottom-0 translate-y-full group-hover:translate-y-0 invisible group-hover:visible rounded-t-none w-full px-12 py-6"
                  />
                  <div
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => removeProductFromWishlist(product._id)}
                  >
                    <FaHeart color="red" size={25} />
                  </div>
                </picture>
                <div className="px-3 py-5">
                  <h3 className="font-semibold">
                    <Link href={`/product/${product._id}`}>
                      {product.title}
                    </Link>
                  </h3>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
