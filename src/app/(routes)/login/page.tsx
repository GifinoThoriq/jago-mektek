"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/app/_ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import UserContext from "@/app/_context/UserContext";
import Modal from "@/app/_components/Modal";

export default function login() {
  const router = useRouter();

  const ctx = useContext(UserContext);

  const { status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);
  console.log(status);

  useEffect(() => {
    if (status === "authenticated" || ctx?.username) {
      window.location.href = "/";
    }
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const username = e.target["username"].value;
    const password = e.target["password"].value;

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(true);

    if (res?.status === 200) {
      ctx?.setUser(username);
      window.location.href = "/";
    } else if (res?.status === 401) {
      setErrorMsg("username atau password salah");
      setModalIsOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        message={errorMsg}
      />
      <div className="flex flex-row" style={{ minHeight: "100vh" }}>
        <div className="basis-full md:basis-1/2 px-20 self-center">
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
                    id="username"
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
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-3">
                Belum punya akun? Click <a href="/register" className="underline">disini</a>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <Button
                  style="solid"
                  type="submit"
                  className="w-full lg:w-auto"
                  loading={loading}
                >
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden md:block basis-1/2 bg-blue-light px-20">
          <div className="flex h-full items-center">
            <Image
              src={"/images/logreg.png"}
              alt="static-log"
              width={1290}
              height={1290}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
