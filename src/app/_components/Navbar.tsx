import Link from "next/link";
import { Button } from "../_ui/Button";

export default function Navbar() {
  return (
    <nav className="bg-lightgray">
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
          <Button type="outline">Login</Button>
          <Button type="solid">Daftar</Button>
        </div>
      </div>
    </nav>
  );
}
