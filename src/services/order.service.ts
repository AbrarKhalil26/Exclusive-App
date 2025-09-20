"use server";
import { getUserToken } from "@/lib/server.utils";
import { addressFormSchema } from "@/schema/address.schema";
import { addressFormStateType } from "@/types/address.type";

export async function handlePayment(
  formState: addressFormStateType,
  formData: FormData
) : Promise<addressFormStateType>{
  const shippingAddress = {
    details: formData.get("details"),
    city: formData.get("city"),
    phone: formData.get("phone"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod") as string;

  const parsedData = addressFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod: paymentMethod as "cash" | "card"| undefined,
  });
  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
      callbackUrl: "/cart",
      paymentMethod: paymentMethod as "cash" | "card"| undefined,
    };
  }

  try {
    const token = await getUserToken();
    const endpoint = paymentMethod === 'cash' ? `${cartId}`: `checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/orders/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ shippingAddress }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data?.message || "Failed to place order",
        callbackUrl: "/cart",
        paymentMethod: paymentMethod as "cash" | "card"| undefined,
      };
    }
    return {
      success: true,
      error: {},
      message: data?.message || "Order placed successfully",
      callbackUrl: paymentMethod === 'cash'? '/allorders': data.session.url,
      paymentMethod: paymentMethod as "cash" | "card"| undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: {},
      message: (error as string) || "Something went wrong",
      callbackUrl: "/cart",
      paymentMethod: paymentMethod as "cash" | "card"| undefined,
    };
  }
}

export async function fetchAllOrders() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/orders`);
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in fetching orders",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetched orders successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}

export async function getUserOrders(userId: string) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/orders/user/${userId}`);
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in fetching user orders",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetched user orders successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}