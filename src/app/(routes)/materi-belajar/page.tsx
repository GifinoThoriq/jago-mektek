"use client";

import { useState, useEffect } from "react";
import { CardHorizontal } from "@/app/_ui/CardHorizontal";
import GetMateri from "@/app/_lib/GetMateri";
import {
  MateriClientTypes,
  SubMateriClientTypes,
} from "@/app/_types/ClientTypes";
import GetSubMateri from "@/app/_lib/GetSubMateri";

export default function materiBelajar(props: any) {
  const materis: MateriClientTypes[] = GetMateri();

  const [subMateris, setSubMateris] = useState<SubMateriClientTypes[]>([]);

  const subMaterisFetch: SubMateriClientTypes[] = GetSubMateri();

  function getMateriTitle(id: string) {
    return materis.filter((m) => m._id === id).map((m) => m.title);
  }

  function selectHandler(e: any) {
    const newSub = subMaterisFetch.map((sub) => ({
      ...sub,
      materi_title: getMateriTitle(sub.id_materi)[0],
    }));

    const subMaterisFilter = newSub.filter(
      (sub) => sub.id_materi === e.target.value
    );

    setSubMateris(subMaterisFilter);
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="w-full mx-auto text-center">
        <h1 className="text-3xl font-bold text-blue-dark">Materi Belajar</h1>
        <h3 className="text-xl">Kelas 10</h3>
        <div className="mt-2">
          <select
            id="bab"
            name="bab"
            onChange={selectHandler}
            className="block max-w-[420px] w-full rounded-md border-2 p-1.5 text-gray-900 border-blue-dark mx-auto"
          >
            <option>---Pilih Bab---</option>
            {materis.length > 0 &&
              materis.map((mat) => (
                <option key={mat._id} value={mat._id}>
                  {mat.title}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div>
        {subMateris.length > 0 &&
          subMateris.map((sub) => (
            <CardHorizontal
              key={sub._id}
              title={sub.title}
              materiTitle={sub.materi_title}
              image={sub.image}
              description={sub.description}
              id={sub._id}
            />
          ))}
      </div>
    </div>
  );
}
