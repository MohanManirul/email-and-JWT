import { NextResponse } from "next/server";
import { SignJWT, jwtDecrypt, jwtVerify } from "jose";

export async function middleware( req , res ){

    // return NextResponse.next();
    //return NextResponse.json({msg:"I am middleware"});

    if(req.nextUrl.pathname.startsWith("/api/profile")){

        try{

            const reqHeader = new Headers(req.headers); // pick token from header
            const token = reqHeader.get("token");

            // token verify kortece
            const secretKey = new TextEncoder().encode(process.env.jWT_SECRET);           
            const decodedString = await jwtVerify(token, secretKey);

            // add with next request
            const email = decodedString['payload']['email'];
            reqHeader.set('email', email);

            // go next step with user email
            return NextResponse.next(
                {
                    headers: reqHeader,
                    status: 200
                }
            );
        }catch(e){
            return NextResponse.json( 

                { status: false, message: "Unauthorized" },
                { status: 401}
            );
        }

         
    }
}