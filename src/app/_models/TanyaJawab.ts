import { TanyaJawabTypes } from "../_types/Types";
import mongoose from "mongoose";

const TanyaJawabSchema = new mongoose.Schema<TanyaJawabTypes>({
  id_user_post: String,
  post: String,
  reply: [{ id_user_repy: String, reply: String }],
});

export default mongoose.models.TanyaJawabs ||
  mongoose.model<TanyaJawabTypes>("tanyajawabs", TanyaJawabSchema);
