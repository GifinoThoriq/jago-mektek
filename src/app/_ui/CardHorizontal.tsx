import { FC } from "react";
import { Button } from "./Button";

interface CardComponent {
  title?: string;
  subTitle?: string;
  url?: string;
}

export const CardHorizontal: FC<CardComponent> = ({ title, subTitle, url }) => {
  return (
    <div className="w-full flex flex-row mt-12" style={{ height: 242 }}>
      <div className="basis-1/3 bg-[url('/images/subbab.png')] bg-cover bg-center"></div>
      <div className="basis-2/3 flex flex-col justify-between p-4">
        <div>
          <h3 className="text-blue-light text-base font-bold mb-1">
            Pengenalan Konstruksi
          </h3>
          <h2 className="text-blue-dark text-xl font-bold mb-1">
            Judul Sub Bab{" "}
          </h2>
          <span className="block max-w-[600px]">
            We focus on ergonomics and meeting you where you work. It's only a
            keystroke away. We focus on ergonomics and meeting you where you
            work. It's only a keystroke away.
          </span>
        </div>
        <div>
          <Button style="outline">Pelajari Lanjut</Button>
        </div>
      </div>
    </div>
  );
};
