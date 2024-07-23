import connectDb from "@/lib/connect-db";
import { NextResponse } from "next/server";
import UserResult from "@/models/UserResult";
import Evaluasi from "@/models/Evaluasi";
import SubMateri from "@/models/SubMateri";

export const GET = async (
  request: Request,
  { params }: { params: { uid: string } }
) => {
  try {
    const slug = params.uid;

    await connectDb();

    const userresults = await UserResult.find({
      id_user: slug,
    });

    const submateris = await SubMateri.find();

    const updatedSubMateris = submateris.map(({ _id, title }) => ({
      _id: _id.toString(),
      title,
    }));

    const updatedUserResults = await Promise.all(
      userresults.map(async (res) => {
        const evaluasis = await Evaluasi.find({
          _id: res.id_evaluasi,
        });

        const subMateriArray = await SubMateri.find({
          _id: evaluasis[0].id_submateri,
        });
        const text_answer = evaluasis[0].choice_answer[res.user_answer];
        const text_real_answer =
          evaluasis[0].choice_answer[evaluasis[0].answer];
        const id_submateri = subMateriArray[0]._id.toString();
        return { ...res._doc, id_submateri, text_answer, text_real_answer };
      })
    );

    const updatedResult = updatedSubMateris.map((sub) => {
      const existUserResult = updatedUserResults.find(
        (ur) => ur.id_submateri === sub._id
      );
      return {
        ...sub,
        user_answer: existUserResult ? existUserResult.user_answer : null,
        correct: existUserResult ? existUserResult.correct : null,
        text_answer: existUserResult ? existUserResult.text_answer : null,
        text_real_answer: existUserResult
          ? existUserResult.text_real_answer
          : null,
      };
    });

    return NextResponse.json({ updatedResult });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return new NextResponse(error, {
      status: 500,
    });
  }
};
