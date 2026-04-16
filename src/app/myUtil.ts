import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const cookie = await cookies();
    const sessionToken = cookie.get("next-auth.session-token")?.value;  // ==> it is encrypted token

    const jwt = await decode({token: sessionToken, secret: process.env.NEXTAUTH_SECRET !}) // ! means that the the secrete is string

    return jwt?.credentialToken
}