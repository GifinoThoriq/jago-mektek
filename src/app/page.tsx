"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  console.log(status);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-dark">
        A Great Place to Receive Care
      </h1>
    </div>
  );
}
