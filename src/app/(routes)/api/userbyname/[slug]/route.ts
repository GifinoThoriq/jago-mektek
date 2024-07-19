import User from "@/app/_models/User";
import connectDb from "@/lib/connect-db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const slug = params.slug;

    await connectDb();

    const users = await User.find({
      username: slug,
    });
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
