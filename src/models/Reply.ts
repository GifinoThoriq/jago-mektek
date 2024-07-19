import { RepliesTypes } from "@/types/Types";
import mongoose from "mongoose";

const RepliesSchema = new mongoose.Schema<RepliesTypes>({
  id_tanyajawab: String,
  id_user_reply: String,
  reply: String,
  username: String,
  role: String,
  school: String,
  user_class: String,
  image: { type: [String] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Replies ||
  mongoose.model<RepliesTypes>("Replies", RepliesSchema);
