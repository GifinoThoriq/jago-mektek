"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, FC, useContext } from "react";
import { Button } from "../_ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";
import UserContext from "../_context/UserContext";
import Image from "next/image";
import DropdownProfile from "../_ui/DropdownProfile";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";

interface NavbarComponent {
  pathname: string;
  username: string | undefined;
  status: string;
  onClick: () => void;
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

const MobileNavbar: FC<NavbarComponent> = ({
  pathname,
  username,
  status,
  onClick,
}) => {
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
        <div
          className={`flex gap-3 flex-col px-8 ${
            status !== "authenticated" ? "mt-8" : "mt-auto"
          }`}
        >
          {status !== "authenticated" ? (
            <>
              <Button
                style="outline"
                onClick={() => {
                  window.location.href = "/login";
                }}
                loading={false}
              >
                Login
              </Button>
              <Button
                style="solid"
                onClick={() => {
                  window.location.href = "/register";
                }}
                loading={false}
              >
                Daftar
              </Button>
            </>
          ) : (
            <div className=" mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Image
                  src={"/icons/avatar.svg"}
                  width={36}
                  height={36}
                  alt="avatar"
                />
                <span className="text-sm cursor-pointer text-gray font-bold">
                  Hello, {username} !
                </span>
              </div>
              <div>
                <button className="inline-flex gap-2 items-center">
                  <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red" />
                  <span
                    className="text-red font-bold text-sm"
                    onClick={onClick}
                  >
                    Logout
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DesktopNavbar: FC<NavbarComponent> = ({
  pathname,
  username,
  status,
  onClick,
}) => {
  return (
    <div className="w-full flex flex-row ml-8">
      <ul className="flex items-center gap-3.5">
        {nav.map((n) => (
          <li
            key={n.id}
            className={`text-sm cursor-pointer ${
              pathname === n.pathname ? "text-blue-dark" : "text-gray "
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
        {status !== "authenticated" ? (
          <>
            <Button
              style="outline"
              onClick={() => {
                window.location.href = "/login";
              }}
              loading={false}
            >
              Login
            </Button>
            <Button
              style="solid"
              onClick={() => {
                window.location.href = "/register";
              }}
              loading={false}
            >
              Daftar
            </Button>
          </>
        ) : (
          <>
            <DropdownProfile options={[username!]} onClick={onClick} />
          </>
        )}
      </div>
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();

  const { status } = useSession();

  const ctx = useContext(UserContext);

  const [pathname, setPathname] = useState<string>(usePathname());

  const [windowWidth, setWindowWidth] = useState<number>();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      typeof window !== "undefined"
        ? window.sessionStorage.removeItem("username")
        : "";
    }
  }, [status]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <nav
          className={`bg-lightgray ${
            pathname === "/login" || pathname === "/register"
              ? "hidden"
              : "block"
          }`}
        >
          <div className="max-w-7xl mx-auto py-4 flex items-center px-4">
            <div className="">
              <span
                className="text-blue-dark text-xl font-bold cursor-pointer"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                JagoMektek
              </span>
            </div>

            {windowWidth !== undefined &&
              (windowWidth > 800 ? (
                <DesktopNavbar
                  pathname={pathname}
                  username={ctx?.username}
                  status={status}
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                />
              ) : (
                <MobileNavbar
                  pathname={pathname}
                  username={ctx?.username}
                  status={status}
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                />
              ))}
          </div>
        </nav>
      )}
    </>
  );
}
