"use server";
import { getUserToken } from "@/lib/server.utils";

export async function getWishlist() {
  try {
    const token = await getUserToken();
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/wishlist`, {
      headers: {
        token: token as string,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in fetching wishlist",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Fetched wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}

export async function removeItemFromWishlist(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in Removing from wishlist",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removing from wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}

export async function addItemToWishlist(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.API_BASE_URL}/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({ productId }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "Error in Removing from wishlist",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removing from wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "Something went wrong",
    };
  }
}
