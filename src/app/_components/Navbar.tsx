"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../_ui/Button";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [pathname, setPathname] = useState<string>(usePathname());

  return (
    <nav
      className={`bg-lightgray ${
        pathname === "/login" || pathname === "/register" ? "hidden" : "block"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 flex items-center">
        <div className="flex-none">
          <span className="text-blue-dark text-xl font-bold">JagoMektek</span>
        </div>
        <div className="flex-1 ml-9">
          <ul className="flex gap-3.5">
            <li className="text-sm text-gray font-bold">
              <Link href={"/"}>Materi Belajar</Link>
            </li>
            <li className="text-sm text-gray font-bold">
              <Link href={"/makan"}>Sumber Belajar</Link>
            </li>
            <li className="text-sm text-gray font-bold">
              <Link href={"/makan"}>Tanya Jawab</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none flex gap-3">
          <Button
            style="outline"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </Button>
          <Button
            style="solid"
            onClick={() => {
              window.location.href = "/register";
            }}
          >
            Daftar
          </Button>
        </div>
      </div>
    </nav>
  );
}
