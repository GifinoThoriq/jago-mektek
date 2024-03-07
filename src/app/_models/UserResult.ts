import mongoose from "mongoose";
import { UserResultTypes } from "../_types/Types";

const UserResultSchema = new mongoose.Schema<UserResultTypes>({
  id_evaluasi: String,
  id_user: String,
  user_answer: Number,
  correct: Boolean,
  image: String,
});

export default mongoose.models.UserResult ||
  mongoose.model<UserResultTypes>("UserResult", UserResultSchema);
