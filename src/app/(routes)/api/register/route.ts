import User from "@/app/_models/User";
import connectDb from "@/app/_lib/connect-db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { username, password, role } = await request.json();

  await connectDb();

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  const newUser = new User({
    username,
    password: hashedPassword,
    role,
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
