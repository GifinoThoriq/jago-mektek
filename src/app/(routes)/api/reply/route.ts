import connectDb from "@/app/_lib/connect-db";
import Replies from "@/app/_models/Reply";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();

    const replies = await Replies.find();
    return NextResponse.json({ replies });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
