import { FC } from "react";
import { Button } from "./Button";

interface CardComponent {
  title?: string;
  subTitle?: string;
  url?: string;
}

export const CardHorizontal: FC<CardComponent> = ({ title, subTitle, url }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row mt-12 h-[360px] sm:h-[242px]">
      <div className="basis-1/2 sm:basis-1/3 bg-[url('/images/subbab.png')] bg-cover bg-center"></div>
      <div className="basis-1/2 sm:basis-2/3 flex flex-col sm:justify-between py-4 sm:py-0 sm:px-4">
        <div className=" ">
          <h3 className="text-blue-light text-sm md:text-base font-bold mb-1">
            Pengenalan Konstruksi
          </h3>
          <h2 className="text-blue-dark text-base md:text-xl font-bold mb-1">
            Judul Sub Bab{" "}
          </h2>
          <span className="block text-base max-w-[600px] truncate sm:whitespace-normal">
            We focus on ergonomics and meeting you where you work. It's only a
            keystroke away. We focus on ergonomics and meeting you where you
            work. It's only a keystroke away.
          </span>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button style="outline">Pelajari Lanjut</Button>
        </div>
      </div>
    </div>
  );
};
