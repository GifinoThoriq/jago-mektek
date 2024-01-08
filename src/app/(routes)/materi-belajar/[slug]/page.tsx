"use client";

import { useEffect, useState } from "react";
import GetSubMateri from "@/app/_lib/GetSubMateri";
import { CardHorizontal } from "@/app/_ui/CardHorizontal";
import Image from "next/image";
import { SubMateriClientTypes } from "@/app/_types/ClientTypes";
import Loading from "@/app/_components/Loading";

export default function Page({ params }: { params: { slug: string } }) {
  const submateris: SubMateriClientTypes[] = GetSubMateri();

  const [submateriDetail, setSubmateriDetail] =
    useState<SubMateriClientTypes>();

  const [submateriRecom, setSubmateriRecom] = useState<SubMateriClientTypes[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <>
      \
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
                      {
                        submateriDetail.video.map((item, index) => (
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
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-center text-blue-dark mt-4">
                    Evaluasi Pembelajaran
                  </h2>
                  <div className="max-w-[800px] border rounded-3xl border-gray p-6 mx-auto mt-4">
                    <div>
                      <span>1. contoh pertanyaan 1</span>
                      <ul className="pl-4">
                        <li>
                          <input
                            type="radio"
                            id="jawaban1"
                            name="jawaban1"
                            value="jawaban1"
                          />
                          <label className="ml-2">Jawaban 1</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="jawaban1"
                            name="jawaban1"
                            value="jawaban1"
                          />
                          <label className="ml-2">Jawaban 1</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="jawaban1"
                            name="jawaban1"
                            value="jawaban1"
                          />
                          <label className="ml-2">Jawaban 1</label>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-2">
                      <span>2. contoh pertanyaan 2</span>
                      <ul className="pl-4">
                        <li>
                          <input
                            type="radio"
                            id="jawaban1"
                            name="jawaban1"
                            value="jawaban1"
                            checked={true}
                            disabled
                          />
                          <label className="ml-2">Jawaban 1</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="jawaban1"
                            name="jawaban1"
                            value="jawaban1"
                            disabled
                          />
                          <label className="ml-2">Jawaban 1</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="jawaban1"
                            name="jawaban1"
                            value="jawaban1"
                            disabled
                          />
                          <label className="ml-2">Jawaban 1</label>
                        </li>
                      </ul>
                      <div className="bg-[#8FD49A] p-4 rounded text-white mt-2">
                        Alasan: Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </div>
                    </div>
                  </div>
                </div>

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
