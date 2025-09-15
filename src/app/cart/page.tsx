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
import Image from "next/image";
import Link from "next/link";

export default async function CartPage() {

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

        <section>
          <Table className="mb-10">
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
                <TableHead className="text-lg font-semibold py-4 text-right">
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-5">
                    <Image
                      src="https://ecommerce.routemisr.com/Route-Academy-brands/1678286824747.png"
                      alt="product"
                      className="w-auto object-contain bg-gray-100 rounded-md"
                      priority={true}
                      width={54}
                      height={54}
                    />
                    <h2>INVOO1</h2>
                  </div>
                </TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-between items-center">
            <Button variant={"outline"} className="px-10 py-6">
              <Link href={"/products"}>Return To Shop</Link>
            </Button>
            <Button variant="destructive" className="px-6 py-5">
              Remove All
            </Button>
          </div>
        </section>

        <section className="flex justify-between items-start gap-10">
          <div className="flex items-center gap-4 w-5/12">
            <Input placeholder="Coupon Code" />
            <Button variant="destructive">Apply Coupon</Button>
          </div>
          <div className="w-5/12 border shadow rounded-lg p-8">
            <h3 className="text-xl font-semibold text-center">Cart Total</h3>
            <ul className="divide-y divide-gray-200 text-sm">
              <li className="flex justify-between py-4">
                <span>Subtotal:</span>
                <span>100 EGP</span>
              </li>
              <li className="flex justify-between py-4">
                <span>Shipping:</span>
                <span>50 EGP</span>
              </li>
              <li className="flex justify-between py-4">
                <span>Total:</span>
                <span>150 EGP</span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Button variant="destructive" className="">
                Proceed to checkout
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
