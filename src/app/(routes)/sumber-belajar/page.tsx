"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from "@/app/_components/Loading";
import { SumberMateriClientTypes } from "@/app/_types/ClientTypes";
import GetSumberMateri from "@/app/_lib/GetSumberMateri";
import EmblaCarousel from "@/app/_components/SumberBelajarCarousel";
import { EmblaOptionsType } from "embla-carousel";

export default function SumberBelajar() {
  const OPTIONS: EmblaOptionsType = {
    align: "start",
    dragFree: true,
    direction: "rtl",
    loop: true,
  };

  const [loading, setLoading] = useState<boolean>(true);

  const sumberMateris: SumberMateriClientTypes[] = GetSumberMateri();

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
          <h1 className="text-3xl text-blue-dark text-center font-bold">
            Sumber Belajar
          </h1>
          <div className="mt-8">
            <h3 className="text-2xl text-blue-dark font-bold mb-5">
              Buku Pembelajaran
            </h3>

            {sumberMateris.length > 0 && (
              <EmblaCarousel
                slides={sumberMateris.filter(
                  (sumber) => sumber.type === "book"
                )}
                options={OPTIONS}
              />
            )}
          </div>
          <div className="mt-8">
            <h3 className="text-2xl text-blue-dark font-bold mb-5">
              Video Pembalajaran
            </h3>
            {sumberMateris.length > 0 && (
              <EmblaCarousel
                slides={sumberMateris.filter(
                  (sumber) => sumber.type === "video"
                )}
                options={OPTIONS}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
