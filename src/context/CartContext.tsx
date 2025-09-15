import React, { createContext, useContext, useState } from "react";

const cartContext = createContext({});

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState(null);

  return (
    <cartContext.Provider value={{ cartDetails, setCartDetails }}>
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