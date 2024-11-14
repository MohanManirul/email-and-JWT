import { SignJWT, jwtDecrypt, jwtVerify } from "jose";
import { NextResponse } from "next/server";

// SignJWT , setIssuedAt = property
 
 
// token encode using jwt
export async function GET() {
  const secretKey = new TextEncoder().encode(process.env.jWT_SECRET);
  const payload = {email:"test@gmail.com",user_id:"1"}
  let token = await new SignJWT(payload) // details to  encode in the token
    .setProtectedHeader({ alg: "HS256" }) // algorithm
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER) // issuer
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
    .sign(secretKey); // secretKey generated from previous step

  return NextResponse.json({token:token});
}

// token decode using jwt

export async function POST(req) {
  const jsonBody = await req.json();
  const Token = jsonBody['token'];

  const secretKey = new TextEncoder().encode(process.env.jWT_SECRET);

  try {
    const  key  = await  jwtVerify(Token, secretKey);
    return NextResponse.json({ msg: "Token verified", key });
  } catch (err) {
    return NextResponse.json({ msg: "Token invalid" });
  }
}