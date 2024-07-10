import SumberMateri from "@/app/_models/SumberMateri";
import connectDb from "@/app/_lib/connect-db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();

    const sumbermateris = await SumberMateri.find();
    return NextResponse.json({ sumbermateris });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
