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
  video: string[];
}

export interface RepliesTypes extends mongoose.Document {
  id_tanyajawab: string;
  id_user_reply: string;
  reply: string;
  createdAt: Date;
}

export interface TanyaJawabTypes extends mongoose.Document {
  id_user_post: string;
  post: string;
  createdAt: Date;
  image: string[];
}

export interface EvaluasiTypes extends mongoose.Document {
  id_submateri: string;
  answer: number;
  choice_answer: string[];
  question: string;
  reason: string;
}

export interface UserResultTypes extends mongoose.Document {
  id_evaluasi: string;
  id_user: string;
  user_answer: number;
  correct: boolean;
  image: string;
}
