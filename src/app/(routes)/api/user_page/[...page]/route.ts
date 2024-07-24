import connectDb from "@/lib/connect-db";
import User from "@/models/User";
import { UserTypes } from "@/types/Types";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { page: string[] } }
) => {
  try {
    await connectDb();
    const page = params.page[0];
    const searchQuery =
      params.page[1] === undefined ? "" : params.page[1].toString();

    const pageNum = parseInt(page);
    const limitNum = 5;

    const query = {
      role: { $ne: "guru" },
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { school: { $regex: searchQuery, $options: "i" } },
        { user_class: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const users: UserTypes[] = await User.find(query)
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum)
      .exec();

    const count = await User.countDocuments(query);

    return NextResponse.json({
      users,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
    });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
