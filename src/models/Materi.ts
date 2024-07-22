import { MateriTypes } from "@/types/Types";
import mongoose from "mongoose";

const MateriSchema = new mongoose.Schema<MateriTypes>({
  title: String,
  description: String,
  image: String,
});

export default mongoose.models.Materis ||
  mongoose.model<MateriTypes>("Materis", MateriSchema);
