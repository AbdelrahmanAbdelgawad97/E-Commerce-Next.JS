import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET() { // fn must return back end response 
    return NextResponse.json({
        message: "succesful",
        users: [
            {name: "Ali", age: "35"},
            {name: "Ahmed", age: "25"},
            {name: "Mohamed", age: "45"},
        ]
    })
}

export async function POST(req: NextRequest) { // must send back end request 
    const cookie =  await cookies();
    const token = cookie.get("user-token")?.value;
    if(token) {
        return NextResponse.json({});
    } 
    return NextResponse.json({
        message: "unAuth user",
    })
}