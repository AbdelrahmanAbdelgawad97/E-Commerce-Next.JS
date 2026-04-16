"use client"

import { SessionProvider } from "next-auth/react"
import CartContext from './../../context/CartContext/CartContext';

export default function MySession({children}:{children:React.ReactNode}) {
  
  return (
  <CartContext>
    <SessionProvider>
          {children}
      </SessionProvider>
  </CartContext>
  )
}
