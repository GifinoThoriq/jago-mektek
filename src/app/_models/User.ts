import mongoose from "mongoose";
import { UserTypes } from "../_types/Types";

const UserSchema = new mongoose.Schema<UserTypes>({
  username: {
    type: String,
    required: [true, "username diperlukan"],
    maxlength: [12, "tidak boleh lebih dari 12 karakter"],
  },
  password: {
    type: String,
    required: [true, "password diperlukan"],
  },
  role: {
    type: String,
    required: [true, "role diperlukan"],
  },
});

export default mongoose.models.Users ||
  mongoose.model<UserTypes>("Users", UserSchema);
