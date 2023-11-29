"use client";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [pathname, setPathname] = useState<string>(usePathname());
  return (
    <footer
      className={`${
        pathname === "/login" || pathname === "/register" ? "hidden" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-row  py-14">
        <div className="basis-1/3">
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
            <li className="text-base text-gray font-bold mb-2">Tanya Jawab</li>
          </ul>
        </div>
        <div className="basis-1/3">
          <span className="text-base text-blue-dark font-bold">
            Get in Touch
          </span>
          <ul className="mt-4">
            <li className="flex gap-2 text-base text-gray font-bold mb-2">
              <Image
                src={"/icons/phone.svg"}
                width={20}
                height={20}
                alt={"phone icon"}
              />
              +480 555-0103
            </li>
            <li className="flex gap-2 text-base text-gray font-bold mb-2">
              <Image
                src={"/icons/location.svg"}
                width={20}
                height={20}
                alt={"phone icon"}
              />
              4517 Washington Ave. Manchester, Kentucky 39495
            </li>
            <li className="flex gap-2 text-base text-gray font-bold mb-2">
              <Image
                src={"/icons/email.svg"}
                width={20}
                height={20}
                alt={"phone icon"}
              />
              wilga@example.com
            </li>
          </ul>
        </div>
        <div className="basis-1/3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63453.2161579522!2d106.6901330582031!3d-6.286587699999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f18360960497%3A0x368faab0d4ca9f19!2sAyam%20Gepuk%20Pak%20Gembus!5e0!3m2!1sen!2sid!4v1700736040664!5m2!1sen!2sid"
            loading="lazy"
            className="border-4 rounded border-blue-light ml-auto"
          ></iframe>
        </div>
      </div>
      <div className="bg-lightgray">
        <div className="max-w-7xl mx-auto flex flex-row justify-between py-8">
          <span className="text-base text-gray font-bold">Ayestha Wilga</span>
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
                alt="facebook"
              />
            </li>
            <li>
              <Image
                src={"/icons/twitter.svg"}
                width={24}
                height={24}
                alt="facebook"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
