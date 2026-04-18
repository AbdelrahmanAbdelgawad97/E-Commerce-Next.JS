import { jwtDecode } from "jwt-decode";
import { NextAuthOptions, Account, Profile } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

type MyJwtPayload = {
  id: string;
  iat?: number;
  exp?: number;
};

type CustomUser = {
  id: string;
  userTkn: string;
  [key: string]: any;
};

type CustomToken = JWT & {
  credentialToken?: string;
  userId?: string;
};

let loginProviderToken = "";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "login to fresh cart",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      authorize: async function (credentials): Promise<CustomUser | null> {
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
        const x = jwtDecode<MyJwtPayload>(responseData.token);

        if (responseData.message === "success") {
          const { role, ...userData } = responseData.user;

          return {
            ...userData,
            id: x.id,
            userTkn: responseData.token,
          };
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
    async signIn({
      account,
      profile,
    }: {
      account?: Account | null;
      profile?: Profile & { email?: string; name?: string };
    }) {
      if (account?.provider === "google") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: `${profile?.name}`,
              email: `${profile?.email}`,
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
                email: `${profile?.email}`,
                password: "Ahmed@123",
              }),
            }
          );

          const loginData = await responseDataLogin.json();

          console.log("response login is ====> ", loginData);

          loginProviderToken = loginData.token;

          console.log("login provider id ==>", loginProviderToken);
        } else {
          loginProviderToken = data.token;
          console.log(data);
        }
      }

      return true;
    },

    jwt({ token, user }): CustomToken {
      if (loginProviderToken === "") {
        if (user) {
          token.credentialToken = (user as CustomUser).userTkn;
          token.userId = (user as CustomUser).id;
        }
      } else {
        token.credentialToken = loginProviderToken;
      }
    
      return token;
    },

    session({ session, token }: { session: any; token: CustomToken }) {
      session.user.id = token.userId;
      return session;
    },
  },
};