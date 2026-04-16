import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req:NextRequest) { 
    // function recieve a param from next as a backend request 
    // backend request
    // return backend response 
    // first you need to check if the user is authenticated or not
    // second you need to redirect(url) user to specific page

    const pathName = req.nextUrl.pathname;
    const isAuth : boolean = pathName === '/login' || pathName === '/register';
    const token = await getToken({req}) // this funciton is used only in middleware/proxy


    if(isAuth) {
        if(token) {
            
            return NextResponse.redirect(new URL('/',req.url))
        }
        return NextResponse.next();
    }

    
    if(token) {
        return NextResponse.next() ;
    }

    return NextResponse.redirect(new URL('/login',req.url))
}

export const config = {
    matcher : ['/cart','/shop'],
}