import { createContext, useContext, useEffect, useState } from "react";
import { IWishlist } from "@/types/wishlist.type";
import { getWishlist } from "@/services/wishlist.service";


interface IWishlistContext {
  wishlistDetails: IWishlist | null;
  setWishlistDetails: React.Dispatch<React.SetStateAction<IWishlist | null>>;
  getWishlistDetails: () => Promise<void>;
}

const wishlistContext = createContext<IWishlistContext | null>(null);

export function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistDetails, setWishlistDetails] = useState<IWishlist | null>(null);

  async function getWishlistDetails() {
    const { data }: { data: IWishlist } = await getWishlist();
    setWishlistDetails(data);
  }

  useEffect(() => {
    getWishlistDetails();
  }, []);

  return (
    <wishlistContext.Provider
      value={{ wishlistDetails, setWishlistDetails, getWishlistDetails }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(wishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistContextProvider.");
  }
  return context;
}
