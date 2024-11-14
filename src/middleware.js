import { NextResponse } from "next/server";
import { SignJWT, jwtDecrypt, jwtVerify } from "jose";

export async function middleware( req , res ){

    // return NextResponse.next();
    //return NextResponse.json({msg:"I am middleware"});

    if(req.nextUrl.pathname.startsWith("/api/profile")){

        try{
            const reqHeader = new Headers(req.headers);
            const token = reqHeader.get("token");
            const secretKey = new TextEncoder().encode(process.env.jWT_SECRET);           
            const decodedString = await jwtVerify(token, secretKey);
            return NextResponse.next();
        }catch(e){
            return NextResponse.json( 

                { status: false, message: "Unauthorized" },
                { status: 401}
            );
        }

        
    }
}