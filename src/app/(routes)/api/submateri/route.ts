import connectDb from "@/lib/connect-db";
import SubMateri from "@/models/SubMateri";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDb();

    const submateris = await SubMateri.find();
    return NextResponse.json({ submateris });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
