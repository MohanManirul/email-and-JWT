import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    // database operation
    // header theke email identity check korce
    const head = headers();
    const email = head.get('email');

    return NextResponse.json({email:email});
    // return NextResponse.json({msg:"I am from profile"});

}