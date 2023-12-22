import connectDb from "@/app/_lib/connect-db";
import User from "@/app/_models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
