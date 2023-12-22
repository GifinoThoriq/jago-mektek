import mongoose from "mongoose";

export interface UserTypes extends mongoose.Document {
  username: string;
  password: string;
  role: "siswa" | "guru";
}

export interface MateriTypes extends mongoose.Document {
  title: string;
  description: string;
  image: string;
}

export interface SubMateriTypes extends mongoose.Document {
  id_materi: string;
  title: string;
  description: string;
  image: string;
  materi_detail: string;
}

export interface RepliesTypes extends mongoose.Document {
  id_tanyajawab: string;
  id_user_reply: string;
  reply: string;
}

export interface TanyaJawabTypes extends mongoose.Document {
  id_user_post: string;
  post: string;
}
