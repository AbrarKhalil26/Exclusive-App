import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserOrders } from "@/services/order.service";
import { IAllOrders } from "@/types/allorders.type";
import Image from "next/image";

export default async function UserOrdersPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const { data: orders }: { data: IAllOrders[] } = await getUserOrders(userId);

  return (
    <div className="py-5 mx-5">
      <div className="container mx-auto grid gap-15">
        <h2 className="text-3xl font-semibold">All Orders for {orders[0].user.name}</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="w-3/12">Cart Items</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Shipping Price</TableHead>
              <TableHead>Tax Price</TableHead>
              <TableHead>Total Order Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order, idx) => {
              const {
                paymentMethodType,
                shippingPrice,
                taxPrice,
                totalOrderPrice,
              } = order;
              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="grid gap-3">
                    {order.cartItems.map((item)=>(
                      <div className="flex items-center gap-5" key={item._id}>
                      <Image
                        src={item.product?.imageCover ?? "/placeholder.png"}
                        alt={item.product?.title ?? "Product image"}
                        className="w-auto object-contain bg-gray-100 rounded-md"
                        priority={true}
                        width={54}
                        height={54}
                      />
                      <h2>{item.product?.title}</h2>
                    </div>
                    ))}
                  </TableCell>
                  <TableCell>{paymentMethodType}</TableCell>
                  <TableCell>{shippingPrice}</TableCell>
                  <TableCell>{taxPrice}</TableCell>
                  <TableCell>{totalOrderPrice}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
