"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { Button } from "@/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import UserContext from "@/context/UserContext";
import Modal from "@/components/Modal";

export default function login() {
  const router = useRouter();

  const ctx = useContext(UserContext);

  const { status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState({
    msg: "",
    success: false,
  });
  const [loading, setLoading] = useState(false);
  console.log(status);

  useEffect(() => {
    if (status === "authenticated" || ctx?.profile) {
      window.location.href = "/";
    }
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const user_id = e.target["user_id"].value;
    const password = e.target["password"].value;

    const res = await signIn("credentials", {
      redirect: false,
      user_id,
      password,
    });

    setLoading(true);

    if (res?.status === 200) {
      try {
        const response = await fetch(`/api/userbyname/${user_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        ctx?.setUser(data.users[0]);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
      window.location.href = "/";
      return;
    } else if (res?.status === 401) {
      setModal({
        msg: "username atau password salah",
        success: false,
      });
      setModalIsOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        message={modal.msg}
        success={modal.success}
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

          <h1 className="text-3xl text-blue-dark font-bold">Masuk</h1>
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <label
                  htmlFor="user_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User ID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="user_id"
                    id="user_id"
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
                Belum punya akun? Click{" "}
                <a href="/register" className="underline">
                  disini
                </a>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <Button
                  style="solid"
                  type="submit"
                  className="w-full lg:w-auto"
                  loading={loading}
                >
                  Masuk
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
