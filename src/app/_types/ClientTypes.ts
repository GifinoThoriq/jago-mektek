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
  video: string[];
}

export interface TanyaJawabClientTypes {
  _id: string;
  id_user_post: string;
  post: string;
  createdAt: Date;
  image: string[];
}

export interface UserClientTypes {
  _id: string;
  username: string;
  role: string;
}

export interface ReplyTypes {
  _id: string;
  id_tanyajawab: string;
  id_user_reply: string;
  reply: string;
  image: string[];
  createdAt: Date;
}

export interface EvaluasiClientTypes {
  _id: string;
  id_submateri: string;
  answer: number;
  choice_answer: string[];
  question: string;
  reason: string;
}

export interface UserResultTypes {
  id_evaluasi: string;
  id_user: string;
  user_answer: number;
  correct: boolean;
  image: string;
}

export interface SumberMateriClientTypes{
  _id: string;
  title: string;
  image: string;
  link: string;
  type: string;
}