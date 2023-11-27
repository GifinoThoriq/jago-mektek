"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { Button } from "@/app/_ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

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
    <div className="">
      <div className="flex flex-row" style={{ minHeight: "100vh" }}>
        <div className="basis-full lg:basis-1/2 px-20 self-center">
          <div
            onClick={() => (window.location.href = "/")}
            className="flex flex-row"
          >
            <ArrowLeftIcon className="h-6 w-6" />
            <span>back to home</span>
          </div>

          <h1 className="text-3xl text-blue-dark font-bold">Login</h1>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="username"
                    id="first-name"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-3 lg:col-span-1">
                <Button
                  style="solid"
                  type="submit"
                  className="w-full lg:w-auto"
                >
                  register
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden lg:block basis-1/2 bg-blue-light px-20"></div>
      </div>
    </div>
  );
}
