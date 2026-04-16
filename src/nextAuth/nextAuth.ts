import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type MyJwtPayload = {
  id: string;
  iat?: number;
  exp?: number;
};

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "login to fresh cart",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        const responseData = await response.json();

        if (responseData.message === "success") {
          const { role, ...userData } = responseData.user;

          const decoded = jwtDecode<MyJwtPayload>(responseData.token);

          return {
            ...userData,
            id: decoded.id,
            userTkn: responseData.token,
          };
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: profile?.name,
              email: profile?.email,
              password: "Ahmed@123",
              rePassword: "Ahmed@123",
              phone: "01120396633",
            }),
          }
        );

        const data = await response.json();

        if (data.message === "Account Already Exists") {
          const responseDataLogin = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: profile?.email,
                password: "Ahmed@123",
              }),
            }
          );

          const loginData = await responseDataLogin.json();

          return true;
        }
      }

      return true;
    },

    jwt: ({ token, user }) => {
      if (user) {
        token.credentialToken = (user as any).userTkn;
        token.userId = (user as any).id;
      }

      return token;
    },

    session: ({ session, token }) => {
      if (session.user) {
        (session.user as any).id = token.userId;
      }

      return session;
    },
  },
};