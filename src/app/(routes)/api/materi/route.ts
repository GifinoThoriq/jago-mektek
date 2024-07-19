import Materi from "@/models/Materi";
import connectDb from "@/lib/connect-db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();

    const materis = await Materi.find();
    return NextResponse.json({ materis });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
