import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { getUserFromDb } from "./actions/loginAction"
import { NextResponse } from "next/server"

export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [
        Credentials({
            credentials: {
                username: { label: "username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            authorize: async (credentials) => {
                let user = null
                const parsedCredentials = signInSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    console.error("Invalid credentials:", parsedCredentials.error.errors);
                    return null;
                }

                user = await getUserFromDb(credentials.username, credentials.password);
                console.log(user.data, '🚩🚩🚩🟢🟢🟢')
                // user = {
                //  success: true,
                //  message: 'Login Exitoso',
                //  data: {
                //     id: 1,
                //     username: 'admin',
                //     establecimientos: [[Object], [Object], [Object], [Object]]
                //  }
                // }

                if (!user.success) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    // throw new Error("User not found.")
                    console.log(user, '🚩💀💀🚩')
                    return null;
                }

                // return user object with their profile data
                return user.data
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {

            return true;
        },
        jwt({ token, user }) {
            // console.log({token, user})
            // añadimos la los datos del usuarioa a data en token
            if (user) {
                token.data = user;
            }
            return token;
        },
        session({ session, token, user }) {
            // console.log({ session, token, user });
            session.user = token.data;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        // newUser: "/auth/new-account",
        // error: "/error",
    },
    secret: process.env.AUTH_SECRET,
})