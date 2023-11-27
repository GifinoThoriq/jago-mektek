"use client";

import { useSession } from "next-auth/react";
import { Button } from "./_ui/Button";
import { Card } from "./_ui/Card";
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
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
    </>
  );
}
