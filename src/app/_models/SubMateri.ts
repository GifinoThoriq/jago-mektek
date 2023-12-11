import { SubMateriTypes } from "../_types/Types";
import mongoose from "mongoose";

const SubMateriSchema = new mongoose.Schema<SubMateriTypes>({
  id_materi: String,
  title: String,
  description: String,
  image: String,
  materi_detail: String,
});

export default mongoose.models.SubMateris ||
  mongoose.model<SubMateriTypes>("SubMateris", SubMateriSchema);
