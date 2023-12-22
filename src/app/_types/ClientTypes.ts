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

export interface TanyaJawabClientTypes {
  _id: string;
  id_user_post: string;
  post: string;
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
}
