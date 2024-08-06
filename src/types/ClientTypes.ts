export interface MateriClientTypes {
  _id: string;
  title: string;
  description: string;
  image: string;
  link_evaluasi: string;
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
  role: string;
  username: string;
  school: string;
  user_class: string;
}

export interface UserClientTypes {
  _id: string;
  username: string;
  role: string;
  school: string;
  user_class: string;
  user_id: string;
}

export interface ReplyTypes {
  _id: string;
  id_tanyajawab: string;
  id_user_reply: string;
  reply: string;
  image: string[];
  createdAt: Date;
  role: string;
  username: string;
  school: string;
  user_class: string;
}

export interface EvaluasiClientTypes {
  _id: string;
  id_submateri: string;
  answer: number;
  choice_answer: string[];
  question: string;
  image_question: string;
  image_reason: string;
  link_kahoot: string;
}

export interface UserResultTypes {
  id_evaluasi: string;
  id_user: string;
  user_answer: number;
  correct: boolean;
  image: string;
}

export interface SumberMateriClientTypes {
  _id: string;
  title: string;
  image: string;
  link: string;
  type: string;
}
