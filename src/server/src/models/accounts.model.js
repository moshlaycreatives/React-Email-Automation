import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const emailAccountSchema = new Schema(
  {
    AccountName: {
      type: String,
      trim: true,
    },

    Email: {
      type: String,
      trim: true,
      lowercase: true,
      match:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },

    Password: {
      type: String,
    },

    Proxy: {
      type: String,
      trim: true,
    },

    MaxEmailPerDay: {
      type: Number,
    },

    DelayInMinutes: {
      type: Number,
    },

    Enable: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    Visible: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    UserAgent: {
      type: String,
      trim: true,
    },

    Limit: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: "Accounts" }
);

// emailAccountSchema.pre("save", async function (next) {
//   if (!this.isModified("Password")) return next();
//   this.Password = await bcrypt.hash(this.Password, 10);
//   next();
// });

export const Accounts = mongoose.model("Accounts", emailAccountSchema);
