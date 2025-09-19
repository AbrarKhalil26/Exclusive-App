"use server";
import { getUserToken } from "@/lib/server.utils";

export async function getUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in fetching Cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetched Cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}

export async function removeUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in Removing Cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removed Cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}

export async function addToCart(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Adding to cart failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Added Cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Removed from cart failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removed from Cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}

export async function updateItemCart(productId: string, count: number) {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ count }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Updated quantity cart failed",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Updated quantity Cart successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string)||"Something went wrong",
    };
  }
}