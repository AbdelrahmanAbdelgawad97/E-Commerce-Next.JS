import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


let loginProviderToken = "";

export const nextAuthConfig: NextAuthOptions = {
    providers: [
        Credentials({
            name: "login to fresh cart", // this is the name of operation
            credentials: { // data that need to make the operations 
                email: { type: "email" },
                password: { type: "password" },
            },
            authorize: async function (credentials) { // this function will API must return OBJ or null
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(credentials),
                })

                const responseData = await response.json();
                const x = jwtDecode(responseData.token);
                if (responseData.message === "success") {
                    const { role, ...userData } = responseData.user
                    return { ...userData, id: x.id, userTkn: responseData.token };
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
//         FacebookProvider({
//         clientId: process.env.FACEBOOK_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_CLIENT_SECRET
//   })
    ],
    pages: {
        signIn: '/login'
    },
    // secret: '',
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
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
                )

                const data = await response.json();

                if (data.message === 'Account Already Exists') {
                    const responseDataLogin = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: `${profile?.email}`,
                            password: "Ahmed@123",
                        }),
                    }
                    )
                    const loginData = await responseDataLogin.json();
                    console.log("response login is ====> ", loginData);
                    loginProviderToken = loginData.token;
                    console.log("login provider id ==>" , loginProviderToken);
                } else {
                    loginProviderToken = data.token;
                    console.log(data)
                }
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        jwt: function (params) {

            // console.log("params is =======> ",params)
            // must return token
            // 1- when nextAuth call it? 
            // call it automatically after each successful login + any navigation after login
            // 2- it excuted in server

            // params.user => is the obj that return from call api
            // params.token is object created nextAuth is mutabke => that i can add new properties in it
            if(loginProviderToken === "") {
                if (params.user) {
                    params.token.credentialToken = params.user.userTkn;
                    params.token.userId = params.user.id
                }
                
            } else {
                params.token.credentialToken = loginProviderToken;
                // params.token.userId = params.user.id

            }
            return params.token;
        },
        session: function (param) {
            // it call after any operation requir authentication
            // call it using => 1-useSession   2-getServerToken()   3-requist /api/auth/session
            // it called in client => use session to update ui // session is period for user how long he should be logged in
            // return opbject => if it is returned that is mean the user is authenticated  
            // console.log("session param is: ",param);
            param.session.user.id = param.token.userId;
            return param.session;
        },
        // secret: { how long you should be logged in
        //     maxAge: 60
        // }

    }
}
// rout handler to make this page work api/auth/nextauth/[...auth]