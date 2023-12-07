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
