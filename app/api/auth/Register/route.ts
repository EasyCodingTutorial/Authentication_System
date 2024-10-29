// For Connection
import ConnectToDb from "@/utils/connectToDb";

// For Schema 
import userSchema from "@/Schema/userSchema";

// For BcryptJS
import bcrypt from 'bcryptjs'

import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {

        // For Connection
        await ConnectToDb()

        const { name, email, password } = await req.json()
        // Encrypt Password
        const hasedPassword = await bcrypt.hash(password, 14)

        const NewUser = await userSchema.create({
            name, email, password: hasedPassword
        })



        if (NewUser) {
            return NextResponse.json({
                success: true,
            })
        } else {
            return NextResponse.json({
                success: false,
            })
        }




    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}



