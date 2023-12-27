import { FC } from "react";
import { Button } from "./Button";

interface CardComponent {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export const Card: FC<CardComponent> = ({ title, description, url, image }) => {
  return (
    <div className="bg-white" style={{ height: 620 }}>
      <div
        className="bg-cover bg-center"
        style={{
          height: 320,
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div
        className="bg-white p-[24px] flex flex-col justify-between"
        style={{ height: 300 }}
      >
        <div className="flex flex-col">
          <span className="text-sm text-blue-light font-bold">kelas 10</span>
          <span className="text-base text-blue-dark font-bold">{title}</span>
          <span className="text-base text-gray">{description}</span>
        </div>
        <div>
          <Button loading={false} style="outline">
            Pelajari Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
};
