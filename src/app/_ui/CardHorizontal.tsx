"use client";

import { FC } from "react";
import { Button } from "./Button";
import Link from "next/link";

interface CardComponent {
  materiTitle?: string;
  title?: string;
  description?: string;
  id?: string;
  image?: string;
}

export const CardHorizontal: FC<CardComponent> = ({
  materiTitle,
  title,
  description,
  id,
  image,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row mt-12 h-[360px] sm:h-[280px]">
      <div
        className="basis-1/2 sm:basis-1/3 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="basis-1/2 sm:basis-2/3 flex flex-col sm:justify-between py-4 sm:py-0 sm:px-4">
        <div className=" ">
          <h3 className="text-blue-light text-sm md:text-base font-bold mb-1">
            {materiTitle}
          </h3>
          <h2 className="text-blue-dark text-base md:text-xl font-bold mb-1">
            {title}{" "}
          </h2>
          <span className="block text-base max-w-[600px] truncate sm:whitespace-normal">
            {description}
          </span>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href={`/materi-belajar/${id}`}>
            <Button style="outline">Pelajari Lanjut</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
