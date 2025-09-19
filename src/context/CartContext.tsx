import { getUserCart } from "@/services/cart.service";
import { ICartResponse } from "@/types/cart.type";
import { createContext, useContext, useEffect, useState } from "react";

interface ICartContext {
  cartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  getCartDetails: () => Promise<void>;
}

const cartContext = createContext<ICartContext | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);

  async function getCartDetails() {
    const { data }: { data: ICartResponse } = await getUserCart();
    setCartDetails(data);
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <cartContext.Provider
      value={{ cartDetails, setCartDetails, getCartDetails }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider.");
  }
  return context;
}
