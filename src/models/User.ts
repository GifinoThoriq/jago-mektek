import mongoose from "mongoose";
import { UserTypes } from "@/types/Types";

const UserSchema = new mongoose.Schema<UserTypes>({
  username: {
    type: String,
    required: [true, "username perlu diisi"],
    maxlength: [12, "tidak boleh lebih dari 12 karakter"],
  },
  password: {
    type: String,
    required: [true, "password perlu diisi"],
  },
  role: {
    type: String,
    required: [true, "role perlu diisi"],
  },
  school: {
    type: String,
    required: [true, "sekolah perlu diisi"],
  },
  user_class: {
    type: String,
    required: [true, "kelas perlu diisi"],
  },
});

export default mongoose.models.Users ||
  mongoose.model<UserTypes>("Users", UserSchema);
