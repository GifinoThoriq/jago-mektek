"use client";

import { useRouter } from "next/navigation";

export default function makan() {
  const router = useRouter();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application-json",
        },
        body: JSON.stringify({
          username,
          password,
          role: "siswa",
        }),
      });
      console.log(res);
      if (res.status === 200) {
        router.push("/login");
      }
    } catch (e) {}
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="email" required />
        <input type="password" placeholder="email" required />
        <button type="submit">register</button>
      </form>
    </div>
  );
}
