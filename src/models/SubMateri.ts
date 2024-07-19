import { SubMateriTypes } from "@/types/Types";
import mongoose from "mongoose";

const SubMateriSchema = new mongoose.Schema<SubMateriTypes>({
  id_materi: String,
  title: String,
  description: String,
  image: String,
  materi_detail: String,
  video: Array
});

export default mongoose.models.SubMateris ||
  mongoose.model<SubMateriTypes>("SubMateris", SubMateriSchema);
