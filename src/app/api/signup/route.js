// import Users from "@/app/lib/models/users";
// import dbConnect from "@/app/lib/database/connection";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma/prisma";

export const POST =async (request)=>{
    const{ name, username, password}= await request.json();

// await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  // const newUser = new Users({
  //   name,
  //   email,
  //   password: hashedPassword,
  // });

  try {
 
    // await newUser.save();
    // return new NextResponse("User has been created", {
    //   status: 201,
    // });
    const newUser = await prisma.User.create({
      data: {
          name,
          username,
          password: hashedPassword ,
      },
  });
  console.log( newUser)
  return new NextResponse({ user: newUser, error: null }, { status: 201 });
  } catch (err) {
    console.error('Error creating user:', err);
    return new NextResponse({ newUser: null, error: err.message }, {
      status: 500,
    });
  }
};