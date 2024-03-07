import connectDb from "@/app/_lib/connect-db";
import UserResult from "@/app/_models/UserResult";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const requestData = await request.json();

  await connectDb();

  try {
    await UserResult.insertMany(requestData);
    return new NextResponse("post berhasil", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
