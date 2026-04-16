"use server"

import { getUserToken } from "@/app/myUtil";
import { ShippingAddressType } from "./payment.interface";
import { revalidatePath } from "next/cache";

export async function handleCashOrder(shippingAddress:ShippingAddressType, cartId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/orders/${cartId}`,{
       method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: (await getUserToken() as string),
        },
        body: JSON.stringify(shippingAddress)
    })

    revalidatePath('/cart')
}

export async function handleOnlineOrder(shippingAddress:ShippingAddressType, cartId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
       method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: (await getUserToken() as string),
        },
        body: JSON.stringify(shippingAddress)
    })
    const resData = await res.json();
    console.log("Response Data ====>", resData);
    return resData.session.url
}