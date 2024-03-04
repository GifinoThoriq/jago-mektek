"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import GetSubMateri from "@/app/_lib/GetSubMateri";
import { CardHorizontal } from "@/app/_ui/CardHorizontal";
import {
  SubMateriClientTypes,
  EvaluasiClientTypes,
  UserClientTypes,
  UserResultTypes,
} from "@/app/_types/ClientTypes";
import Loading from "@/app/_components/Loading";
import GetEvaluasi from "@/app/_lib/GetEvaluasi";
import Question from "@/app/_components/Question";
import GetUserByName from "@/app/_lib/GetUserByName";
import UserContext from "@/app/_context/UserContext";
import QuestionAnswered from "@/app/_components/QuestionAnswered";

export default function Page({ params }: { params: { slug: string } }) {
  const { status } = useSession();

  const router = useRouter();

  const ctx = useContext(UserContext);

  const username = ctx?.username === undefined ? "" : ctx.username;

  const submateris: SubMateriClientTypes[] = GetSubMateri();
  const evaluasis: EvaluasiClientTypes[] = GetEvaluasi(params.slug);
  const user: UserClientTypes[] = GetUserByName(username);

  const [submateriDetail, setSubmateriDetail] =
    useState<SubMateriClientTypes>();

  const [userResult, setUserResult] = useState([]);

  const [submateriRecom, setSubmateriRecom] = useState<SubMateriClientTypes[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  }, [status]);

  useEffect(() => {
    const submaterisFilter = submateris.filter(
      (sub) => sub._id === params.slug
    );

    const submaterisFilterRecom = submateris
      .filter((sub) => sub._id !== params.slug)
      .slice(0, 2);

    setSubmateriDetail(submaterisFilter[0]);
    setSubmateriRecom(submaterisFilterRecom);
  }, [submateris]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const evaluasiArr: string[] = [];

    if (evaluasis.length > 0) {
      evaluasis.map((ev) => {
        evaluasiArr.push(ev._id);
      });
    }

    const fetchData = async (userId: string) => {
      try {
        const response = await fetch(`/api/user_result/${userId}`, {
          method: "POST",
          body: JSON.stringify(evaluasiArr),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setUserResult(data.userresults);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    if (user.length > 0) {
      fetchData(user[0]._id);
    }
  }, [user, evaluasis]);

  const onSubmitAnswerHandler = async (userAnswer: UserResultTypes[]) => {
    userAnswer.map((ans) => {
      ans.id_user = user[0]._id;
    });

    try {
      const res = await fetch("/api/user_result", {
        method: "POST",
        headers: {
          "Content-type": "application-json",
        },
        body: JSON.stringify(userAnswer),
      });

      if (res.status === 200) {
        window.location.reload();
      }
    } catch (e) {}
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {submateriDetail !== undefined && (
            <>
              <div className="bg-[url('/images/subbab.png')] bg-cover bg-center flex items-center justify-center h-[30vh]">
                <h1 className="text-3xl text-center font-bold text-white align-middle">
                  {submateriDetail.title}
                </h1>
              </div>
              <div className="max-w-7xl px-4 mt-16 mx-auto">
                <div className="md:h-[100vh] flex md:flex-row flex-col">
                  <div className="md:basis-2/3 px-4">
                    <iframe
                      src={submateriDetail.materi_detail}
                      allow="autoplay"
                      className="w-[100%] h-[100vh] md:h-[100%]"
                    ></iframe>
                  </div>

                  <div className="md:basis-1/3 px-4 max-w-[640px] overflow-auto">
                    <h3 className="text-2xl font-bold mt-4 md:mt-0">
                      Video Pendukung
                    </h3>
                    <div className="my-4 flex md:block gap-4 md:gap-0 ">
                      {submateriDetail.video.map((item, index) => (
                        <iframe
                          width="100%"
                          className="md:mb-4"
                          height="200px"
                          key={index}
                          src={item}
                          title="YouTube video player"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      ))}
                    </div>
                  </div>
                </div>

                {evaluasis.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-center text-blue-dark mt-4">
                      Evaluasi Pembelajaran
                    </h2>
                    {userResult.length > 0 ? (
                      <QuestionAnswered
                        evaluasis={evaluasis}
                        userResult={userResult}
                      />
                    ) : (
                      <Question
                        evaluasis={evaluasis}
                        onSubmitAnswer={onSubmitAnswerHandler}
                      />
                    )}
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-bold text-blue-dark mt-8">
                    Rekomendasi Materi Lainnya
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
                    {submateriRecom.map((sub) => (
                      <CardHorizontal
                        key={sub._id}
                        title={sub.title}
                        materiTitle={sub.materi_title}
                        image={sub.image}
                        description={sub.description}
                        id={sub._id}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
