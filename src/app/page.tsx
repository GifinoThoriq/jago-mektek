"use client";

import { useSession } from "next-auth/react";
import { Button } from "./_ui/Button";
import { Card } from "./_ui/Card";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Materis {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const { status } = useSession();

  console.log(status);

  const [materis, setMateris] = useState<Materis[]>([]);

  console.log(materis);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/materi");

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setMateris(data.materis);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section id="hero" className="bg-lightgray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 pt-16">
            <div className="text-center md:text-start ">
              <h1 className="text-3xl md:text-4xl text-blue-dark font-bold mb-2 md:mb-8 leading-tight">
                Siap Belajar Mekanika Teknik?
              </h1>
              <h3 className="text-base md:text-xl text-gray mb-2 md:mb-8">
                Mari kita jelajahi dunia mekanika teknik bersama. Ayo, mari kita
                berpetualang dalam dunia mekanika teknik yang menyenangkan!
              </h3>
              <Button style="solid">Mulai dari sini</Button>
            </div>
            <div>
              <Image
                src={"/images/hero.png"}
                width={"1252"}
                height={"1020"}
                alt="hero"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="max-w-7xl mx-auto  my-32">
          <div className="grid grid-cols-2 pt-16 px-8">
            <div>
              <hr
                className="mb-8 border-t-8 border-blue-light"
                style={{ maxWidth: "30%" }}
              />
              <h2 className="text-3xl text-blue-dark font-bold mb-8 ">
                Tentang Jago MekTek
              </h2>
              <h3 className="text-xl text-gray mb-8">
                Selamat datang di website yang menjadi sumber belajar bagi siswa
                Sekolah Menengah Kejuruan untuk mata pelajaran Mekanika Teknik.
                Website kami menyajikan materi pembelajaran yang komprehensif,
                mulai dari dasar-dasar mekanika hingga konsep-konsep yang lebih
                tinggi.
              </h3>
              <h3 className="text-xl text-gray mb-8">
                Materi pembelajaran disusun secara sistematis untuk memastikan
                pemahaman yang baik, dengan penjelasan yang jelas dan contoh
                kasus nyata yang relevan dengan dunia industri.
              </h3>
            </div>
            <div>
              <Image
                src={"/images/about.png"}
                width={504}
                height={424}
                alt="about"
                className="ml-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="materi-belajar" className="bg-blue-light">
        <div className="max-w-7xl mx-auto py-16 px-8">
          <div className="mb-8 text-center md:text-start">
            <h2 className="text-3xl text-white font-bold">
              Materi Belajar yang #BikinCerdas beneran!
            </h2>
            <span className="text-base text-white" style={{ maxWidth: 320 }}>
              Pilihlah menu belajar sesuai dengan keinginan kalian!{" "}
            </span>
          </div>
          {materis.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {materis.map((mat) => (
                <Card
                  key={mat._id}
                  title={mat.title}
                  description={mat.description}
                  image={mat.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
