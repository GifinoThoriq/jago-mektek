import User from "@/models/User";
import connectDb from "@/lib/connect-db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const slug = params.id;

    await connectDb();

    const users = await User.find({
      _id: slug,
    });
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
