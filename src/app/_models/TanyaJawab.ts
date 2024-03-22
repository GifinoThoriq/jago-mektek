import { TanyaJawabTypes } from "../_types/Types";
import mongoose from "mongoose";

const TanyaJawabSchema = new mongoose.Schema<TanyaJawabTypes>({
  id_user_post: String,
  post: String,
  image: { type: [String] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.TanyaJawabs ||
  mongoose.model<TanyaJawabTypes>("TanyaJawabs", TanyaJawabSchema);
