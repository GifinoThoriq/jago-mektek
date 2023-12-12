"use client";

import Link from "next/link";
import { useState, useEffect, FC } from "react";
import { Button } from "../_ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface NavbarComponent {
  pathname: string;
}

const nav = [
  {
    id: 1,
    title: "Materi Belajar",
    pathname: "/materi-belajar",
  },
  {
    id: 2,
    title: "Sumber Belajar",
    pathname: "/sumber-belajar",
  },
  {
    id: 3,
    title: "Tanya Jawab",
    pathname: "/tanya-jawab",
  },
];

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="ml-auto">
      <div onClick={() => setIsOpen(!isOpen)}>
        <Bars3Icon className="h-6 w-6" />
      </div>
      <div
        className={` ${
          isOpen ? "bg-[rgba(0,0,0,0.6)] block " : "bg-[rgba(0,0,0,0)] hidden"
        } fixed top-0 right-0 w-full h-full transition-all`}
      ></div>
      <div
        className={` ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }  w-64 fixed right-0 top-0 h-full flex flex-col bg-white transition-transform delay-100`}
      >
        <XMarkIcon
          className="h-6 w-6 self-end mr-2 mt-2"
          onClick={() => setIsOpen(!isOpen)}
        />
        <ul className="flex flex-col pt-12 items-center gap-3.5">
          {nav.map((n) => (
            <li
              key={n.id}
              className="text-sm text-gray font-bold"
              onClick={() => {
                window.location.href = n.pathname;
              }}
            >
              {n.title}
            </li>
          ))}
        </ul>
        <div className="flex gap-3 flex-col px-8 mt-8">
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
    </div>
  );
}

const DesktopNavbar: FC<NavbarComponent> = ({ pathname }) => {
  return (
    <div className="w-full flex flex-row ml-8">
      <ul className="flex items-center gap-3.5">
        {nav.map((n) => (
          <li
            key={n.id}
            className={`text-sm cursor-pointer ${
              pathname === n.pathname || pathname === `${n.pathname}/detail`
                ? "text-blue-dark"
                : "text-gray "
            } font-bold`}
            onClick={() => {
              window.location.href = n.pathname;
            }}
          >
            {n.title}
          </li>
        ))}
      </ul>
      <div className="flex gap-3 ml-auto">
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
  );
};

export default function Navbar() {
  const router = useRouter();

  const [pathname, setPathname] = useState<string>(usePathname());

  const [windowWidth, setWindowWidth] = useState<number>();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`bg-lightgray ${
        pathname === "/login" || pathname === "/register" ? "hidden" : "block"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 flex items-center px-4">
        <div className="">
          <span className="text-blue-dark text-xl font-bold">JagoMektek</span>
        </div>

        {windowWidth !== undefined &&
          (windowWidth > 800 ? (
            <DesktopNavbar pathname={pathname} />
          ) : (
            <MobileNavbar />
          ))}
      </div>
    </nav>
  );
}
