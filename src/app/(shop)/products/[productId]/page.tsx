import ProductSlider from "@/components/products/ProductSlider";
import { Separator } from "@/components/ui/separator";
import AddToCartBtn from "@/components/products/AddToCartBtn";
import { getProductDetails } from "@/services/Products.service";
import { IProduct } from "@/types/product.type";
import { TiStarFullOutline } from "react-icons/ti";
import AddToWishlistBtn from "@/components/products/AddToWishlistBtn";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );
  return (
    <div className="py-15 mx-3">
      <div className="container mx-auto">
        <div className="grid grid-cols-1  lg:grid-cols-5 gap-5">
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

            <div className="flex justify-between items-center px-3 py-5">
              <div className="text-sm text-gray-600">
                <p className="mb-2">
                  <span className="font-semibold me-2">Brand: </span>
                  {product.brand.name}
                </p>
                <p>
                  <span className="font-semibold me-2">Category: </span>
                  {product.category.name}
                </p>
              </div>
              <AddToWishlistBtn
                productId={productId}
                className="cursor-pointer"
              />
            </div>
            <AddToCartBtn
              productId={productId}
              className="w-full px-8 mt-4 cursor-pointer"
              variant={"destructive"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
