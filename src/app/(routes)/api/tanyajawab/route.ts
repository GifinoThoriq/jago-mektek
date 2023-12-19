import connectDb from "@/app/_lib/connect-db";
import TanyaJawab from "@/app/_models/TanyaJawab";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();

    const tanyajawabs = await TanyaJawab.find();
    return NextResponse.json({ tanyajawabs });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
