import { default as mongoose } from "mongoose";

// Settings Schema and Model
const settingsSchema = new mongoose.Schema({
  max_browser_automation: { type: Number, required: true },
  gologin_api_token: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const Settings = mongoose.model("settings", settingsSchema);
