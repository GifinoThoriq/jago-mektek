import mongoose from "mongoose";

export interface MateriClientTypes {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export interface SubMateriClientTypes {
  _id: string;
  id_materi: string;
  materi_title?: string;
  title: string;
  description: string;
  image: string;
  materi_detail: string;
}
