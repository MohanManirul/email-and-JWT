import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
export async function GET( req ,res ){

    // searchParams is a query string
    const {searchParams} = new URL(req.url);
    let ToEmail = searchParams.get('email');
  
    // smtp configurations credentials with transporter
    const Transporter = nodemailer.createTransport({
        
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
            user: 'info@teamrabbil.com',
            pass: '~sR4[bhaC[Qs',
        },
        tls: { rejectUnauthorized: false },
      });

      //prepare mail 
      const myEmail = {
       
        form: "abc@teamrabbil.com",
        to: ToEmail,
        subject: "OTP Verification",
        html: '<p>Your OTP Code is : <b></b> <br /> Click <a href="http://localhost:3000/otp-login/">here</a> to verify it.</p>'
    
      };

      //sending email
      try {
      let result =  await Transporter.sendMail(myEmail);
        return NextResponse.json({ msg: result });
      } catch (e) {
        console.log(myEmail);
        return NextResponse.json({ msg: "Fail" });
      }

      
}


