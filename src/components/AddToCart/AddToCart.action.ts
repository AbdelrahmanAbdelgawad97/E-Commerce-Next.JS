"use server"

import { getUserToken } from "@/app/myUtil";
import { productCartId, productQuantity } from "./AddToCart.interface";
import { revalidatePath } from "next/cache";

export async function handleAddProductToCart(data:productCartId) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`,{
        method: "POST",
        headers: {
            token: (await getUserToken() as string),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
    })

    console.log("id is ======>" , data)

    const responseData = await response.json();
    revalidatePath('/cart'); // when changes are happen in page /cart make a fetch for api in /cart page

    // const {statusMsg , message, numOfCartItems, cartId, data:{totalCartPrice, products}} = await response.json();
    // return {statusMsg , message, numOfCartItems, cartId, data:{totalCartPrice, products}}; 
    return responseData;
}   
export async function getUserCart() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart`,{
        method: "GET",
        headers: {
            token: (await getUserToken() as string)
        },
        cache: "force-cache",
    })

    const data = await response.json();
    return data;
}   

export async function handleProductQuantity(data:productQuantity, productId: string) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${productId}`,{
        method: "PUT",
        headers: {
            token: (await getUserToken() as string),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
    })

    const responseData = await response.json();
    revalidatePath('/cart'); // when changes are happen in page /cart make a fetch for api in /cart page

    // const {statusMsg , message, numOfCartItems, cartId, data:{totalCartPrice, products}} = await response.json();
    // return {statusMsg , message, numOfCartItems, cartId, data:{totalCartPrice, products}}; 
    // return responseData;
} 

export async function handleRemoveProduct( productId: string) {
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/cart/${productId}`,{
        method: "DELETE",
        headers: {
            token: (await getUserToken() as string),
            "Content-Type": "application/json",
        }
         
    })

    const responseData = await response.json();
    revalidatePath('/cart'); // when changes are happen in page /cart make a fetch for api in /cart page

    // const {statusMsg , message, numOfCartItems, cartId, data:{totalCartPrice, products}} = await response.json();
    // return {statusMsg , message, numOfCartItems, cartId, data:{totalCartPrice, products}}; 
    // return responseData;
} 