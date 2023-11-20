"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  console.log(status);

  return (
    <section id="hero" className="bg-lightgray">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-3xl text-blue-dark font-bold">
              A Great Place to Receive Care
            </h1>
          </div>
          <div>
            <span>bagian kanan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
