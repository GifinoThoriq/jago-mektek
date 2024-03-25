import { RepliesTypes } from "../_types/Types";
import mongoose from "mongoose";

const RepliesSchema = new mongoose.Schema<RepliesTypes>({
  id_tanyajawab: String,
  id_user_reply: String,
  reply: String,
  image: { type: [String] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Replies ||
  mongoose.model<RepliesTypes>("Replies", RepliesSchema);
