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

export default async function AllOrdersPage() {
  const { data: orders }: { data: IAllOrdersResponse } = await fetchAllOrders();
  console.log(orders);

  return (
    <div className="py-5 mx-5">
      <div className="container mx-auto grid gap-15">
        <h2 className="text-3xl font-semibold">All Orders</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="w-3/12">Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.data.map((order, idx) => {
              const { isPaid, isDelivered } = order;
              const { name, email, phone } = order.user;
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <h2 className="font-semibold capitalize">{name}</h2>
                    <p>{email}</p>
                  </TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>{isPaid ? "Paid" : "No Paid"}</TableCell>
                  <TableCell>
                    {isDelivered ? "Delivered" : "No Delivered"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="destructive">
                      <Link href={`/allorders/${order._id}`}>Order details</Link>
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild className="bg-amber-500">
                      <Link href={`/allorders/user/${order.user._id}`}>User details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
