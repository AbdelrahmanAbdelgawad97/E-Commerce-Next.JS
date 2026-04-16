"use server"
import { cookies } from "next/headers";
import { RegisterResponse, User, userDataTypes } from "./register";

export async function handleUserRegister(userData:userDataTypes): Promise<string | boolean> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(userData)
        });
        const data:RegisterResponse = await response.json();

        const cookie = await cookies();
        cookie.set("tkn",data.token,{
            httpOnly: true,
            maxAge: 60*60*24*2,
            sameSite: "strict",
        });

        console.log(cookie.get("tkn").value);

        if(data.message === "success")
            return true
        else
            return(data.message)  
}