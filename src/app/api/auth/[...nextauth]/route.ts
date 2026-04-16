// route handler

import { nextAuthConfig } from "@/nextAuth/nextAuth";
import NextAuth from "next-auth";

const myRouterHandlerObject = NextAuth(nextAuthConfig);

export {myRouterHandlerObject as GET, myRouterHandlerObject as POST};