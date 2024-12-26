import { default as mongoose } from "mongoose";

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enums: ["user", "admin"],
    default: "user",
    required: true,
  },
});

export default mongoose.model("users", userSchema);
