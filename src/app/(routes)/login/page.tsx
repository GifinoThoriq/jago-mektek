"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";

export default function login() {
  const router = useRouter();
  const session = useSession();

  const { status } = useSession();
  console.log(status);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/admin");
    }
  }, [session, router]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      console.log("error di signin");
      if (res?.url) {
        router.replace("/admin");
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="email" required />
        <input type="password" placeholder="email" required />
        <button type="submit">register</button>
      </form>
    </div>
  );
}
