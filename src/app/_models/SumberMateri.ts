
import mongoose from "mongoose";
import { SumberMateriTypes } from "../_types/Types";

const SumberMateriSchema = new mongoose.Schema<SumberMateriTypes>({
    title: String,
    image: String,
    link: String,
    type: String
});

export default mongoose.models.SumberMateris ||
  mongoose.model<SumberMateriTypes>("SumberMateris", SumberMateriSchema);