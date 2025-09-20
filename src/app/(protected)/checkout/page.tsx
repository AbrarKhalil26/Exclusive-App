"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { AddressFormPayload, addressFormSchema } from "@/schema/address.schema";
import { addressFormState } from "@/types/address.type";
import { handlePayment } from "@/services/order.service";
import { useCart } from "@/context/CartContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();
  const [action, formAction] = useActionState(handlePayment, addressFormState);
  const router = useRouter();
  const form = useForm<AddressFormPayload>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      city: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails, form]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {
        if (action.paymentMethod === "cash") {
          toast.success(action.message, {
            position: "top-right",
          });
          setCartDetails(null);

          timeout = setTimeout(() => {
            router.push(action.callbackUrl);
          }, 2000);
        }else{
          window.location.href = action.callbackUrl;
        }
      } else if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-right",
        });
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [action, router, setCartDetails]);

  return (
    <div className="py-15 lg:py-10 mx-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl text-center font-semibold mb-3">
              Checkout
            </h2>
            <p className="text-sm text-center text-gray-600 mb-10">
              Enter your details below
            </p>
            <Form {...form}>
              <form action={formAction} className="space-y-6">
                <FormField
                  control={form.control}
                  name="cartId"
                  render={({ field }) => (
                    <FormItem hidden>
                      <FormLabel>Card Id</FormLabel>
                      <FormControl>
                        <Input {...field} value={cartDetails?.cartId} hidden />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="01234567891" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.phone?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Ismailia" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.city?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Details</FormLabel>
                      <FormControl>
                        <Input placeholder="Address Details" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.details?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          name={field.name}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash">Cash</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card">Card</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>
                        {action.error?.paymentMethod?.[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <Button className="px-12 py-5">Submit</Button>
              </form>
            </Form>
          </div>

          <Image
            src="/images/Self checkout-pana.svg"
            alt="Login"
            width={600}
            height={600}
            priority
            className="rounded-lg hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
}
