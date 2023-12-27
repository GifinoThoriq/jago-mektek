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
                {/* <div>
              <h2 className="text-xl font-bold text-blue-dark">Sub Judul</h2>
              <span className="text-base text-blue-dark mt-4">
                Pengertian dan Contoh Konstruksi Rangka Batang adalahconsectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </span>
              <Image
                className="max-w-[20%] text-center mx-auto my-8"
                src={"/images/subbab.png"}
                width={776}
                height={484}
                alt="buku"
              />
              <span className="text-base text-blue-dark mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
            </div> */}

                {/* <div
              dangerouslySetInnerHTML={{
                __html: submateriDetail.materi_detail,
              }}
            /> */}

                <div>
                  <iframe
                    src="https://drive.google.com/file/d/1YNqqQKnKiReT4MBcquTLUzPD7YEdEKFF/preview"
                    width="640"
                    height="480"
                    allow="autoplay"
                  ></iframe>
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
