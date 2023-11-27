import { FC } from "react";
import { Button } from "./Button";

interface CardComponent {
  title?: string;
  subTitle?: string;
  url?: string;
}

export const Card: FC<CardComponent> = ({ title, subTitle, url }) => {
  return (
    <div className="bg-white" style={{ height: 620 }}>
      <div
        className="bg-[url('/images/materi-bab1.png')] bg-cover"
        style={{ height: 320 }}
      ></div>
      <div
        className="bg-white p-[24px] flex flex-col justify-between"
        style={{ height: 300 }}
      >
        <div className="flex flex-col">
          <span className="text-sm text-blue-light font-bold">kelas 10</span>
          <span className="text-base text-blue-dark font-bold">Judul Bab</span>
          <span className="text-base text-gray">
            We focus on ergonomics and meeting you where you work. It's only a
            keystroke away.
          </span>
        </div>
        <div>
          <Button style="outline">Pelajari Lanjut</Button>
        </div>
      </div>
    </div>
  );
};
