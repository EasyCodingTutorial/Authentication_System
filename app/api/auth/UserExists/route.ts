// For Connection
import ConnectToDb from "@/utils/connectToDb";

// For Schema 
import userSchema from "@/Schema/userSchema";


import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {

        await ConnectToDb()
        const { email } = await req.json()
        const UserCheck = await userSchema.findOne({ email: email })


        if (!UserCheck) {
            return NextResponse.json("User Not Fount", { status: 404 })
        }

        return NextResponse.json({ UserCheck })

    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

