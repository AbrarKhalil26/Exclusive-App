"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useWishlist } from "@/context/WishlistContext";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/services/wishlist.service";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function AddToWishlistBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const { wishlistDetails, getWishlistDetails } = useWishlist();
  const [isWishlist, setIsWishlist] = useState(false);
  console.log(productId);

  async function handleToggleWishlist(productId: string) {
    const { success, message } = isWishlist
      ? await removeItemFromWishlist(productId)
      : await addItemToWishlist(productId);

    if (success) {
      toast.success(
        message || `Product ${isWishlist ? "removed" : "added"} successfully`,
        {
          position: "top-right",
        }
      );
      getWishlistDetails();
    } else {
      toast.error(message, {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    const isItemInWishlist = wishlistDetails?.data.find(
      (item) => item._id === productId
    );
    if (isItemInWishlist) {
      setIsWishlist(true);
    } else {
      setIsWishlist(false);
    }
  }, [wishlistDetails, productId]);

  return (
    <div {...props} onClick={() => handleToggleWishlist(productId)}>
      {isWishlist ? (
        <FaHeart color="red" size={20} />
      ) : (
        <FaRegHeart size={20} />
      )}
    </div>
  );
}
