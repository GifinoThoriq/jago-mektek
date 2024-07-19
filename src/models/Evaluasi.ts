import { EvaluasiTypes } from "../_types/Types";
import mongoose from "mongoose";

const EvaluasiSchema = new mongoose.Schema<EvaluasiTypes>({
  id_submateri: String,
  answer: Number,
  choice_answer: Array,
  question: String,
  image_question: String,
  image_reason: String,
  link_kahoot: String,
});

export default mongoose.models.Evaluasis ||
  mongoose.model<EvaluasiTypes>("Evaluasis", EvaluasiSchema);
