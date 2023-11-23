"use client";

import { useSession } from "next-auth/react";
import { Button } from "./_ui/Button";
import Image from "next/image";

export default function Home() {
  const { status } = useSession();

  console.log(status);

  return (
    <>
      <section id="hero" className="bg-lightgray">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 pt-16">
            <div>
              <h1 className="text-4xl text-blue-dark font-bold mb-8 leading-normal">
                A Great Place to Receive Care
              </h1>
              <h3 className="text-xl text-gray mb-8">
                Medical Recover is most focused in helping you discover your
                most beauiful smile
              </h3>
              <Button type="solid">Mulai dari sini</Button>
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
          <div className="grid grid-cols-2 pt-16">
            <div>
              <hr
                className="mb-8 border-t-8 border-blue-light"
                style={{ maxWidth: "30%" }}
              />
              <h2 className="text-3xl text-blue-dark font-bold mb-8 ">
                About Jago Mektek
              </h2>
              <h3 className="text-xl text-gray mb-8">
                Medical Recover is most focused in helping you discover your
                most beauiful smile
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
        <div className="max-w-7xl mx-auto py-16">
          <div className="mb-8">
            <span className="text-sm text-white font-bold">Kelas 10</span>
            <h2 className="text-3xl text-white font-bold">Materi Belajar</h2>
            <span className="text-base text-white" style={{ maxWidth: 320 }}>
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics{" "}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-12">
            <div className="bg-white" style={{ height: 620 }}>
              <div
                className="bg-[url('/images/materi-bab1.png')] bg-cover"
                style={{ height: 320 }}
              ></div>
              <div
                className="bg-white p-[24px] flex flex-col justify-between"
                style={{ height: 300 }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-blue-light font-bold">
                    kelas 10
                  </span>
                  <span className="text-base text-blue-dark font-bold">
                    Judul Bab
                  </span>
                  <span className="text-base text-gray">
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
                  </span>
                </div>
                <div>
                  <Button type="outline">Pelajari Lanjut</Button>
                </div>
              </div>
            </div>
            <div className="bg-white" style={{ height: 620 }}>
              <div
                className="bg-[url('/images/materi-bab1.png')] bg-cover"
                style={{ height: 320 }}
              ></div>
              <div
                className="bg-white p-[24px] flex flex-col justify-between"
                style={{ height: 300 }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-blue-light font-bold">
                    kelas 10
                  </span>
                  <span className="text-base text-blue-dark font-bold">
                    Judul Bab
                  </span>
                  <span className="text-base text-gray">
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
                  </span>
                </div>
                <div>
                  <Button type="outline">Pelajari Lanjut</Button>
                </div>
              </div>
            </div>
            <div className="bg-white" style={{ height: 620 }}>
              <div
                className="bg-[url('/images/materi-bab1.png')] bg-cover"
                style={{ height: 320 }}
              ></div>
              <div
                className="bg-white p-[24px] flex flex-col justify-between"
                style={{ height: 300 }}
              >
                <div className="flex flex-col">
                  <span className="text-sm text-blue-light font-bold">
                    kelas 10
                  </span>
                  <span className="text-base text-blue-dark font-bold">
                    Judul Bab
                  </span>
                  <span className="text-base text-gray">
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
                  </span>
                </div>
                <div>
                  <Button type="outline">Pelajari Lanjut</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="">
        <div className="max-w-7xl mx-auto flex flex-row  py-14">
          <div className="basis-1/3">
            <span className="text-base text-blue-dark font-bold">
              Jago Mektek
            </span>
            <ul className="mt-4">
              <li className="text-base text-gray font-bold mb-2">About</li>
              <li className="text-base text-gray font-bold mb-2">
                Materi Belajar
              </li>
              <li className="text-base text-gray font-bold mb-2">
                Sumber Belajar
              </li>
              <li className="text-base text-gray font-bold mb-2">
                Tanya Jawab
              </li>
            </ul>
          </div>
          <div className="basis-1/3">
            <span className="text-base text-blue-dark font-bold">
              Get in Touch
            </span>
            <ul className="mt-4">
              <li className="flex gap-2 text-base text-gray font-bold mb-2">
                <Image
                  src={"/icons/phone.svg"}
                  width={20}
                  height={20}
                  alt={"phone icon"}
                />
                +480 555-0103
              </li>
              <li className="flex gap-2 text-base text-gray font-bold mb-2">
                <Image
                  src={"/icons/location.svg"}
                  width={20}
                  height={20}
                  alt={"phone icon"}
                />
                4517 Washington Ave. Manchester, Kentucky 39495
              </li>
              <li className="flex gap-2 text-base text-gray font-bold mb-2">
                <Image
                  src={"/icons/email.svg"}
                  width={20}
                  height={20}
                  alt={"phone icon"}
                />
                wilga@example.com
              </li>
            </ul>
          </div>
          <div className="basis-1/3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63453.2161579522!2d106.6901330582031!3d-6.286587699999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f18360960497%3A0x368faab0d4ca9f19!2sAyam%20Gepuk%20Pak%20Gembus!5e0!3m2!1sen!2sid!4v1700736040664!5m2!1sen!2sid"
              loading="lazy"
              className="border-4 rounded border-blue-light ml-auto"
            ></iframe>
          </div>
        </div>
        <div className="bg-lightgray">
          <div className="max-w-7xl mx-auto flex flex-row justify-between py-8">
            <span className="text-base text-gray font-bold">Ayestha Wilga</span>
            <ul className="flex flex-row gap-4">
              <li>
                <Image
                  src={"/icons/facebook.svg"}
                  width={24}
                  height={24}
                  alt="facebook"
                />
              </li>
              <li>
                <Image
                  src={"/icons/instagram.svg"}
                  width={24}
                  height={24}
                  alt="facebook"
                />
              </li>
              <li>
                <Image
                  src={"/icons/twitter.svg"}
                  width={24}
                  height={24}
                  alt="facebook"
                />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
