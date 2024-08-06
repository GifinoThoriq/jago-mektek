"use client";

import { useSession } from "next-auth/react";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import Image from "next/image";
import { useEffect, useState } from "react";
import GetMateri from "../../lib/GetMateri";
import { MateriClientTypes } from "../../types/ClientTypes";
import Loading from "../../components/Loading";

export default function Home() {
  const { status } = useSession();

  console.log(status);

  const materis: MateriClientTypes[] = GetMateri();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const mulaiHandler = () => {
    if (status === "authenticated") {
      window.location.href = "/materi-belajar";
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <section id="hero" className="bg-lightgray">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 pt-16">
                <div className="text-center md:text-start ">
                  <h1 className="text-3xl md:text-4xl text-blue-dark font-bold mb-2 md:mb-8 leading-tight">
                    Siap Belajar Mekanika Teknik?
                  </h1>
                  <h3 className="text-base md:text-xl text-gray mb-2 md:mb-8">
                    Mari kita jelajahi dunia mekanika teknik bersama. Ayo, mari
                    kita berpetualang dalam dunia mekanika teknik yang
                    menyenangkan!
                  </h3>
                  <Button style="solid" onClick={mulaiHandler} loading={false}>
                    Mulai dari sini
                  </Button>
                </div>
                <div>
                  <Image
                    src={"/images/hero.png"}
                    width={"1252"}
                    height={"1020"}
                    alt="hero"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>
          <section id="about">
            <div className="max-w-7xl mx-auto  my-32">
              <div className="grid grid-cols-1 md:grid-cols-2 pt-16 px-8">
                <div>
                  <hr
                    className="mb-8 border-t-8 border-blue-light"
                    style={{ maxWidth: "30%" }}
                  />
                  <h2 className="text-3xl text-blue-dark font-bold mb-8 ">
                    Tentang Jago MekTek
                  </h2>
                  <h3 className="text-xl text-gray mb-8">
                    Selamat datang di website yang menjadi sumber belajar bagi
                    siswa Sekolah Menengah Kejuruan untuk mata pelajaran
                    Mekanika Teknik. Website kami menyajikan materi pembelajaran
                    yang komprehensif, mulai dari dasar-dasar mekanika hingga
                    konsep-konsep yang lebih tinggi.
                  </h3>
                  <h3 className="text-xl text-gray mb-8">
                    Materi pembelajaran disusun secara sistematis untuk
                    memastikan pemahaman yang baik, dengan penjelasan yang jelas
                    dan contoh kasus nyata yang relevan dengan dunia industri.
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
                <span
                  className="text-base text-white"
                  style={{ maxWidth: 320 }}
                >
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
                      url={mat._id}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
          
          <section id="profile">
            <div className="max-w-7xl mx-auto py-16 px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 pt-16 px-8">
                <div>
                  <Image
                    src={"/images/profile.jpg"}
                    width={504}
                    height={424}
                    alt="about"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <hr
                    className="mb-8 border-t-8 border-blue-light mt-8 md:mt-0"
                    style={{ maxWidth: "30%" }}
                  />
                  <h2 className="text-2xl  md:text-3xl text-blue-dark font-bold mb-8 ">
                    Salam Kenal!
                  </h2>
                  <h3 className="text-xl text-gray mb-8">
                  Saya adalah mahasiswa Teknik Sipil Universitas Negeri Malang yang sedang menempuh tugas akhir skripsi untuk mendapatkan gelar Sarjana. Saya harap website yang saya kembangkan dapat bermanfaat bagi proses belajar mengajar banyak orang.
                  </h3>
                  <h3 className="text-xl text-gray">
                   Ayestha Wilga Claryan
                  </h3>
                  <h3 className="text-xl text-bluw mb-8">
                   <strong>Mahasiswa</strong>
                  </h3>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
