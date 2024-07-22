import User from "@/models/User";
import connectDb from "@/lib/connect-db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { username, password, role, school, user_class, user_id } =
    await request.json();

  await connectDb();

  const existingUser = await User.findOne({ user_id });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  const newUser = new User({
    user_id,
    username,
    password: hashedPassword,
    role,
    school,
    user_class,
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
