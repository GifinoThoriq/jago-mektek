"use client";

import Loading from "@/components/Loading";
import GetMateri from "@/lib/GetMateri";
import GetSubMateri from "@/lib/GetSubMateri";
import { MateriClientTypes, SubMateriClientTypes } from "@/types/ClientTypes";
import { CardHorizontal } from "@/ui/CardHorizontal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MateriBelajarList({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params.slug);

  const router = useRouter();

  const materis: MateriClientTypes[] = GetMateri();
  const subMaterisFetch: SubMateriClientTypes[] = GetSubMateri();

  const [loading, setLoading] = useState<boolean>(true);
  const [subMateris, setSubMateris] = useState<SubMateriClientTypes[]>([]);
  const [selectedMateri, setSelectedMateri] = useState<string>("");
  const [materiLinkEval, setMateriLinkEval] = useState<string[]>([""]);

  function getMateriTitle(id: string) {
    return materis.filter((m) => m._id === id).map((m) => m.title);
  }

  function getMateriLinkEvaluasi(id: string){
    setMateriLinkEval(materis.filter((m) => m._id === id).map((m) => m.link_evaluasi));
  }

  function selectHandler(e: any) {
    router.push(`/materi-belajar/materi/${e.target.value}`);
  }

  useEffect(() => {
    const newSub = subMaterisFetch.map((sub) => ({
      ...sub,
      materi_title: getMateriTitle(sub.id_materi)[0],
    }));

    const subMaterisFilter = newSub.filter(
      (sub) => sub.id_materi === params.slug
    );
    
    getMateriLinkEvaluasi(params.slug);
    setSubMateris(subMaterisFilter);

  }, [subMaterisFetch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full mx-auto text-center">
            <h1 className="text-3xl font-bold text-blue-dark">
              Materi Belajar
            </h1>
            <h3 className="text-xl">Kelas 10</h3>
            <div className="mt-2">
              <select
                id="bab"
                name="bab"
                onChange={selectHandler}
                className="block max-w-[420px] w-full rounded-md border-2 p-1.5 text-gray-900 border-blue-dark mx-auto"
                defaultValue={params.slug}
              >
                {materis.length > 0 &&
                  materis.map((mat) => (
                    <option key={mat._id} value={mat._id}>
                      {mat.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {subMateris.length === 0 ? (
            <div className="min-h-[60vh] bg-gray-900 flex flex-col items-center justify-center">
              <h1 className="text-2xl sm:text-4xl text-blue-dark font-bold mb-8 animate-pulse">
                Segera Hadir
              </h1>
              <p className="text-blue-dark text-center text-base sm:text-xl mb-8">
                Kami bekerja keras untuk menghadirkan sesuatu yang luar biasa.
                Nantikan!”
              </p>
            </div>
          ) : (
            <div>
              {subMateris.map((sub) => (
                <CardHorizontal
                  key={sub._id}
                  title={sub.title}
                  materiTitle={sub.materi_title}
                  image={sub.image}
                  description={sub.description}
                  id={sub._id}
                />
              ))}
              <div className="mt-10 border rounded p-8 border-blue-light">
                <span><strong>Klik link di bawah ini untuk masuk ke soal selanjutnya: </strong></span>
                <br />
                <Link href={materiLinkEval[0]} target="_blank">
                  <span className="mt-2 underline text-blue-light"> Link Soal </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
