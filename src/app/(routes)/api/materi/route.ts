import Materi from "@/app/_models/Materi";
import connectDb from "@/app/_lib/connect-db";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDb();

  const materis = await Materi.find();
  return NextResponse.json({ materis });
}
