import mongoose, { Schema } from "mongoose";

const nameListSchema = new Schema(
  {
    Name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true, collection: "EmailLists" }
);

export const EmailLists = mongoose.model("EmailLists", nameListSchema);
