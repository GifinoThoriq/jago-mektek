import connectDb from "@/app/_lib/connect-db";
import UserResult from "@/app/_models/UserResult";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { userid: string } }
) => {
  try {
    const requestData = await request.json();

    await connectDb();

    const userresults = await UserResult.find({
      id_evaluasi: requestData,
      id_user: params.userid,
    });

    return NextResponse.json({ userresults });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
