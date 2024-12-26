import mongoose, { Schema } from "mongoose";

const emailListSchema = new Schema(
  {
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      match:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    FirstName: {
      type: String,
      trim: true,
    },

    LastName: {
      type: String,
      trim: true,
    },

    FirstLine: {
      type: String,
      trim: true,
    },

    isEmailSended: {
      type: Boolean,
      default: false,
    },

    EmailListId: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "EmailLists",
      required: true,
    },
  },
  { timestamps: true, collection: "Emails" }
);

export const Emails = mongoose.model("Emails", emailListSchema);
