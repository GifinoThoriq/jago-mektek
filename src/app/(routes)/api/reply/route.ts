import connectDb from "@/app/_lib/connect-db";
import Replies from "@/app/_models/Reply";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();

    const replies = await Replies.find().sort({ createdAt: -1 });
    return NextResponse.json({ replies });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};

export const POST = async (request: any) => {
  const { id_tanyajawab, id_user_reply, reply } = await request.json();

  const newReply = new Replies({
    id_tanyajawab,
    id_user_reply,
    reply,
  });

  try {
    await newReply.save();
    return new NextResponse("post berhasil", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
