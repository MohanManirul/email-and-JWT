import { SignJWT, jwtDecrypt, jwtVerify } from "jose";
import { NextResponse } from "next/server";



export async function POST(req, res) {

    const jsonBody = await req.json();
    let email = jsonBody["email"];
    let password = jsonBody["password"];



    if (email === "test@gmail.com" && password === "123") {
    
        const secretKey = new TextEncoder().encode(process.env.jWT_SECRET);
        const payload = {email:email}
    
        let token = await new SignJWT(payload) // details to  encode in the token
            .setProtectedHeader({ alg: "HS256" }) // algorithm
            .setIssuedAt()
            .setIssuer(process.env.JWT_ISSUER) // issuer
            .setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
            .sign(secretKey); // secretKey generated from previous step
    
      
      return NextResponse.json(
        { status: true, message: "Login Success" },
        { status: 200 }
      );

    } else {
      return NextResponse.json( 

        { status: true, message: "Invalid User" },
        { status: 200});
    }

  }