import connectDb from "@/app/_lib/connect-db";
import TanyaJawab from "@/app/_models/TanyaJawab";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();

    const tanyajawabs = await TanyaJawab.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ tanyajawabs });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};

export const POST = async (request: any) => {
  const { id_user_post, post } = await request.json();

  await connectDb();

  const newPost = new TanyaJawab({
    id_user_post,
    post,
  });

  try {
    await newPost.save();
    return new NextResponse("post berhasil", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
