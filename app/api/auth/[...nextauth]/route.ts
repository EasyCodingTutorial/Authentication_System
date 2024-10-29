// For Connection
import ConnectToDb from "@/utils/connectToDb";

// For Schema
import userSchema from "@/Schema/userSchema";

// For Bcryptjs
import bcrypt from 'bcryptjs'

import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'


type CustomSessionStrategy = SessionStrategy | "jwt"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string };
                // 
                try {

                    // 
                    await ConnectToDb()
                    const userEmailCheck = await userSchema.findOne({ email });

                    // Checking User Email
                    if (!userEmailCheck) {
                        return null
                    }

                    // if Email is Verified Then Checking For The Password
                    const isPasswordCorrect = await bcrypt.compare(password, userEmailCheck.password);

                    if (!isPasswordCorrect) {
                        return null
                    }


                    // if Credentials Are Match With The Database then
                    return {
                        id: userEmailCheck._id,
                        email: userEmailCheck.email,
                        name: userEmailCheck.name
                    }

                } catch (error) {
                    console.log("Auth Error", error)
                    return null
                }

            }
        }
        )
    ],
    session: {
        strategy: "jwt" as CustomSessionStrategy
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        signOut: "/"
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }



