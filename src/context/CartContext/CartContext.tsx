"use client";

// import { createContext } from "node:vm";
import React, { useState,createContext } from "react";

type CartContextType = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CartCreatedContext = createContext<CartContextType>({
  cartCount: 0,
  setCartCount: () => {},
});

export default function CartContext({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState<number>(0);

  return (
    <CartCreatedContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCreatedContext.Provider>
  );
}