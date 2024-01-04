import Users from "@/app/lib/models/users";
import dbConnect from "@/app/lib/database/connection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST =async (request)=>{
    const{ name, email,password}= await request.json();

await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new Users({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};