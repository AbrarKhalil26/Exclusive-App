"use client";
import React from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function AddToCartBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const { getCartDetails } = useCart();

  async function addProductToCart(productId: string) {
    const { success, message } = await addToCart(productId);
    if (success) {
      toast.success(message, { position: "top-right" });
      getCartDetails();
    } else {
      toast.error(message, { position: "top-right" });
    }
  }
  return (
    <Button onClick={() => addProductToCart(productId)} {...props}>
      Add To Cart
    </Button>
  );
}
