"use client"

import { toast } from "sonner";
import AppButtons from "../Shared/AppButtons/AppButtons"
import { handleAddProductToCart } from "./AddToCart.action";
import { useContext } from "react";
import { CartCreatedContext } from "@/context/CartContext/CartContext";

export default function AddToCart({id}:{id:string}) {
    const {setCartCount} = useContext(CartCreatedContext);
    function addProductToCart() {
        toast.promise(handleAddProductToCart({productId: id}),{
            loading: "Please Waitting...",
            success: function({status, message , numOfCartItems, cartId, totalCartPrice , products}) {
                setCartCount(numOfCartItems);
                return message;
            },
            error: "Sorry Can't Add it to wish cart!"
        })
    }

  return (
    <>
        <AppButtons onClick={addProductToCart} className="bg-main-color cursor-pointer text-white w-full hover:bg-main-color/80">Add To Cart</AppButtons>
    </>
  )
}
