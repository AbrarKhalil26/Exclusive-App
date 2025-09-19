"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/CartContext";
import {
  removeItemFromCart,
  removeUserCart,
  updateItemCart,
} from "@/services/cart.service";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { MdDeleteOutline } from "react-icons/md";

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();

  async function removeCartItems() {
    const { message } = await removeUserCart();
    if (message === "success") {
      toast.success("Cart removed successfully", {
        position: "top-right",
      });
      setCartDetails(null);
    } else {
      toast.error(message);
    }
  }

  async function removeProductFromCart(productId: string) {
    const { data, success, message } = await removeItemFromCart(productId);
    if (success) {
      toast.success("Cart removed successfully", {
        position: "top-right",
      });
      setCartDetails(data);
    } else {
      toast.error(message, {
        position: "top-right",
      });
    }
  }

  async function updateProductFromCart(productId: string, count: number) {
    const { data, success, message } = await updateItemCart(productId, count);
    if (success) {
      toast.success(message, {
        position: "top-right",
      });
      setCartDetails(data);
    } else {
      toast.error(message, {
        position: "top-right",
      });
    }
  }

  return (
    <div className="py-5 mx-5">
      <div className="container mx-auto grid gap-15">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {cartDetails ? (
          <>
            <section>
              <Table className="mb-10 overflow-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-lg font-semibold py-4 ">
                      Product
                    </TableHead>
                    <TableHead className="text-lg font-semibold py-4 ">
                      Price
                    </TableHead>
                    <TableHead className="text-lg font-semibold py-4 ">
                      Quantity
                    </TableHead>
                    <TableHead className="text-lg font-semibold py-4">
                      Subtotal
                    </TableHead>
                    <TableHead className="text-lg font-semibold py-4 text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails?.data?.products.map((product) => {
                    const { price, count } = product;
                    const { imageCover, title } = product.product;
                    return (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-5">
                            <Image
                              src={imageCover}
                              alt={title}
                              className="w-auto object-contain bg-gray-100 rounded-md"
                              priority={true}
                              width={54}
                              height={54}
                            />
                            <h2>{title}</h2>
                          </div>
                        </TableCell>
                        <TableCell>{price} EGP</TableCell>
                        <TableCell>
                          <div className="flex gap-5 items-center">
                            <Button
                              variant="outline"
                              className="w-4 cursor-pointer"
                              onClick={() =>
                                updateProductFromCart(
                                  product.product._id,
                                  count - 1 === 0 ? count : count - 1
                                )
                              }
                            >
                              −
                            </Button>
                            {count}
                            <Button
                              variant="outline"
                              className="w-4 cursor-pointer"
                              onClick={() =>
                                updateProductFromCart(
                                  product.product._id,
                                  count + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{price * count} EGP</TableCell>
                        <TableCell className="text-right">
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              removeProductFromCart(product.product._id)
                            }
                          >
                            <MdDeleteOutline size={25} color="red" />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="flex justify-between items-center">
                <Button variant={"outline"} className="px-10 py-6">
                  <Link href={"/products"}>Return To Shop</Link>
                </Button>
                <Button
                  onClick={removeCartItems}
                  variant="destructive"
                  className="px-6 py-5"
                >
                  Remove All
                </Button>
              </div>
            </section>

            <section className="flex justify-between flex-col lg:flex-row items-start gap-10">
              <div className="flex items-center flex-col md:flex-row gap-4 w-full lg:w-5/12">
                <Input placeholder="Coupon Code" />
                <Button variant="destructive">Apply Coupon</Button>
              </div>
              <div className="w-full lg:w-5/12 border shadow rounded-lg p-8">
                <h3 className="text-xl font-semibold text-center">
                  Cart Total
                </h3>
                <ul className="divide-y divide-gray-200 text-sm">
                  <li className="flex justify-between py-4">
                    <span>Subtotal:</span>
                    <span>{cartDetails.data.totalCartPrice} EGP</span>
                  </li>
                  <li className="flex justify-between py-4">
                    <span>Shipping:</span>
                    <span>50 EGP</span>
                  </li>
                  <li className="flex justify-between py-4">
                    <span>Total:</span>
                    <span>{cartDetails.data.totalCartPrice} EGP</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button variant="destructive" className="">
                    <Link href={'/checkout'}>
                      Proceed to checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-5">
              <Image
                src="/images/shopping-bag.png"
                alt="shopping bag"
                priority
                width={40}
                height={40}
              />
              <h2 className="text-2xl font-semibold">Your Cart is Empty.</h2>
            </div>
            <Button variant={"outline"} className="w-fit px-10 py-6">
              <Link href={"/products"}>Return To Shop</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
