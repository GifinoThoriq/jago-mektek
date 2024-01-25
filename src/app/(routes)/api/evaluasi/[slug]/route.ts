import Evaluasi from "@/app/_models/Evaluasi";
import connectDb from "@/app/_lib/connect-db";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const slug = params.slug;

    await connectDb();

    const evaluasis = await Evaluasi.find({
      id_submateri: slug,
    });
    return NextResponse.json({ evaluasis });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
