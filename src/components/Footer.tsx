"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  UserIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
  const [pathname, setPathname] = useState<string>(usePathname());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <footer
          className={`px-4 lg:px-0 px-4 lg:px-0 mt-0 md:mt-20  ${
            pathname === "/login" || pathname === "/register" ? "hidden" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto py-8">
            <div className="flex gap-8 justify-center md:justify-end">
            <Image
                src={"/images/Lambang-UM-1.png"}
                width={100}
                height={100}
                alt="facebook"
              />
              <Image
                src={"/images/Lambang-UM.png"}
                width={100}
                height={100}
                alt="facebook"
              />
            </div>
          </div>
          <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3  mx-auto ">
            <div className="justify-self-center md:justify-self-start text-center md:text-start mb-4 md:mb-0">
              <span className="text-base text-blue-dark font-bold">
                Get in Touch
              </span>
              <ul className="mt-4">
              <li className="flex gap-2 text-base text-gray font-bold mb-2 justify-center md:justify-start">
                  <UserIcon className="h-6 w-6 text-blue-light" />
                  Ayestha Wilga Claryan
                </li>
                <li className="flex gap-2 text-base text-gray font-bold mb-2 justify-center md:justify-start">
                  <PhoneIcon className="h-6 w-6 text-blue-light" />
                  (+62) 8569-5740-104
                </li>
                <li className="flex gap-2 text-base text-gray font-bold mb-2 justify-center md:justify-start w-[200px] md:w-auto">
                  <MapPinIcon className="h-10 w-10 text-blue-light" />
                  Jl. Semarang 5 Malang 65145 Jawa Timur (Kampus Induk Universitas Negeri Malang)
                </li>
                <li className="flex gap-2 text-base text-gray font-bold mb-2 justify-center md:justify-start">
                  <EnvelopeIcon className="h-6 w-6 text-blue-light" />
                  wilgaclaryan@gmail.com
                </li>
              </ul>
            </div>
            <div className="justify-self-center md:justify-self-start text-center md:text-start mb-4 md:mb-0">
              <span className="text-base text-blue-dark font-bold">
                Jago Mektek
              </span>
              <ul className="mt-4">
                <li className="text-base text-gray font-bold mb-2">About</li>
                <li className="text-base text-gray font-bold mb-2">
                  Materi Belajar
                </li>
                <li className="text-base text-gray font-bold mb-2">
                  Sumber Belajar
                </li>
                <li className="text-base text-gray font-bold mb-2">
                  Tanya Jawab
                </li>
              </ul>
            </div>
            <div className="justify-self-center md:justify-self-end mb-4 md:mb-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3712557114663!2d112.61266287744077!3d-7.960530871602127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e788281bdd08839%3A0xc915f268bffa831f!2sUniversitas%20Negeri%20Malang!5e0!3m2!1sen!2sid!4v1701851746574!5m2!1sen!2sid"
                loading="lazy"
                className="border-4 rounded border-blue-light ml-auto"
              ></iframe>
            </div>
          </div>
          <div className="bg-lightgray">
            <div className="max-w-7xl mx-auto flex flex-row justify-between py-8">
              <span className="text-base text-gray font-bold">
                Ayestha Wilga
              </span>
              <ul className="flex flex-row gap-4">
                <li>
                  <Image
                    src={"/icons/facebook.svg"}
                    width={24}
                    height={24}
                    alt="facebook"
                  />
                </li>
                <li>
                  <Image
                    src={"/icons/instagram.svg"}
                    width={24}
                    height={24}
                    alt="instagram"
                  />
                </li>
                <li>
                  <Image
                    src={"/icons/twitter.svg"}
                    width={24}
                    height={20}
                    alt="facebook"
                  />
                </li>
              </ul>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
