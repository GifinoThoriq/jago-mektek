"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function admin() {
  const { status } = useSession();

  console.log(status);

  const logoutHandler = () => {
    sessionStorage.removeItem("username");
    signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-orange-600">admin</h1>
      <button onClick={logoutHandler}>log out</button>
    </div>
  );
}
