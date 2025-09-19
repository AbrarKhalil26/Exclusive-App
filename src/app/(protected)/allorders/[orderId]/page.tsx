import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchAllOrders } from "@/services/order.service";
import { IAllOrdersResponse } from "@/types/allorders.type";
import Image from "next/image";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const { data: orders }: { data: IAllOrdersResponse } = await fetchAllOrders();
  const orderDetails = orders.data.filter((item) => item._id === orderId)[0];
  console.log(orderDetails);
  const {
    paymentMethodType,
    isDelivered,
    isPaid,
    shippingPrice,
    taxPrice,
    totalOrderPrice,
    cartItems,
  } = orderDetails;
  const { name, email, phone } = orderDetails.user;
  return (
    <div className="py-8 pb-15 mx-5">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-10">Order details</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-15">
          <div>
            <h3 className="font-semibold text-lg mb-3">User: </h3>
            <ul className="text-gray-700 grid gap-2 text-sm">
              <li>
                <span className="font-medium">Name: </span>
                {name}
              </li>
              <li>
                <span className="font-medium">Email: </span>
                {email}
              </li>
              <li>
                <span className="font-medium">Phone: </span>
                {phone}
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-3">Order Summary: </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <ul className="text-gray-700 grid gap-2 text-sm">
                <li>
                  <span className="font-medium">Payment Method Type: </span>
                  {paymentMethodType}
                </li>
                <li>
                  <span className="font-medium">Paid: </span>
                  {isPaid ? "Paid" : "No Paid"}
                </li>
                <li>
                  <span className="font-medium">Delivered: </span>
                  {isDelivered ? "Delivered" : "No Delivered"}
                </li>
              </ul>
              <ul className="text-gray-700 grid gap-2 text-sm">
                <li>
                  <span className="font-medium">Shipping Price: </span>
                  {shippingPrice} EGP
                </li>
                <li>
                  <span className="font-medium">Tax Price: </span>
                  {taxPrice} EGP
                </li>
                <li>
                  <span className="font-medium">Total Order Price: </span>
                  {totalOrderPrice} EGP
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg font-semibold py-4 max-w-32">
                Product
              </TableHead>
              <TableHead className="text-lg font-semibold py-4 ">
                Brand
              </TableHead>
              <TableHead className="text-lg font-semibold py-4 ">
                Category
              </TableHead>
              <TableHead className="text-lg font-semibold py-4 ">
                Quantity
              </TableHead>
              <TableHead className="text-lg font-semibold py-4 ">
                Price
              </TableHead>
              <TableHead className="text-lg font-semibold py-4">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => {
              const { price, count } = item;
              const { imageCover, title } = item.product;
              return (
                <TableRow key={item._id}>
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
                      <h2 className="truncate">{title}</h2>
                    </div>
                  </TableCell>
                  <TableCell>{item.product?.brand.name}</TableCell>
                  <TableCell>{item.product?.category.name}</TableCell>
                  <TableCell className="text-center">{count}</TableCell>
                  <TableCell>{price} EGP</TableCell>
                  <TableCell>{price * count} EGP</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
