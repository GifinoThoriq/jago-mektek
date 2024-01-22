"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/app/_ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Modal from "@/app/_components/Modal";
import { useState } from "react";

export default function register() {
  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState({
    msg: "",
    success: false
  })
  const [loading, setLoading] = useState(false);

  const closeModalHandler  = () => {

    if(modal.success === true){
      router.push("/login");
    } else{
      router.push("/register");
    }
    setModalIsOpen(false);
    
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const username = e.target["username"].value;
    const password = e.target["password"].value;

    const regex = /^[a-zA-Z0-9]{1,25}$/;

    if (!regex.test(username)) {
      setModal({
        msg: "username hanya boleh huruf dan angka, dan tidak boleh lebih dari 25 character",
        success: false
      })
      setModalIsOpen(true);
      return;
    }

    if (password === "" || username === "") {
      setModal({
        msg: "username atau password tidak boleh kosong",
        success: false
      });
      setModalIsOpen(true);
      return;
    }

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
      setLoading(true);
      if (res.status === 200) {
        setModal({
          msg: "akun kamu berhasil diregistrasi!",
          success: true
        })
        setModalIsOpen(true);
        setLoading(false);
      } else if (res.status === 400) {
        setModal({
          msg: "Akun sudah terdaftar",
          success: false
        })
        setModalIsOpen(true);
        setLoading(false);
      } else {
        setModal({
          msg: "Ada sesuatu yang error, mohon daftar ulang kembali",
          success: false
        })
        setModalIsOpen(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setModal({
        msg: "Ada sesuatu yang error, mohon daftar ulang kembali",
        success: false
      })
      setModalIsOpen(true);
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModalHandler}
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

          <h1 className="text-3xl text-blue-dark font-bold">Register</h1>
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
                Sudah punya akun? Click <a href="/login" className="underline">disini</a>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <Button
                  style="solid"
                  type="submit"
                  className="w-full lg:w-auto"
                  loading={loading}
                >
                  Register
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
