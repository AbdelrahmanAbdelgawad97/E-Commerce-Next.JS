"use server"

import { cookies } from "next/headers";

export async function sendUserDataLogin(data:{}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,{
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify(data),
    })

    const responseData = await response.json();
    if(responseData.message === "success") {
        const cookie = await cookies();
        cookie.set("user-token",responseData.token,{
            httpOnly: true,
        })
        return true;
    }

    return new Error(responseData);
}