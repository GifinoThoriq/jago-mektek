import mongoose from "mongoose";

export interface UserTypes extends mongoose.Document {
  username: string;
  password: string;
  role: "siswa" | "guru";
  school: string;
  user_class: string;
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
  image: string[];
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
  image_question: string;
  image_reason: string;
  link_kahoot: string;
}

export interface UserResultTypes extends mongoose.Document {
  id_evaluasi: string;
  id_user: string;
  user_answer: number;
  correct: boolean;
  image: string;
}

export interface SumberMateriTypes extends mongoose.Document {
  title: string;
  image: string;
  link: string;
  type: string;
}
