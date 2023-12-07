import Materi from "@/app/_models/Materi";
import connectDb from "@/app/_lib/connect-db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDb();

  const materis = await Materi.find();
  return NextResponse.json({ materis });
};
