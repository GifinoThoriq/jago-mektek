import Materi from "@/app/_models/Materi";
import connectDb from "@/app/_lib/connect-db";
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
