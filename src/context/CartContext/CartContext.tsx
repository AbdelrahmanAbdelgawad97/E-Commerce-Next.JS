"use client";

// import { createContext } from "node:vm";
import React, { useState,createContext } from "react";

export const CartCreatedContext = createContext({cartCount:0, setCartCount : function(){}});

export default function CartContext({ children }: {children: React.ReactNode}) {
  const [cartCount, setCartCount] = useState < number > (0);

  return <CartCreatedContext value={{cartCount, setCartCount}}>{children}</CartCreatedContext>;
}
