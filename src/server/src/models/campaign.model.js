import mongoose, { Schema } from "mongoose";

const campaignSchema = new Schema(
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

    Subject: {
      type: String,
      trim: true,
      required: true,
    },

    Spintax: {
      type: String,
      trim: true,
    },

    Body: {
      type: String,
      trim: true,
      required: true,
    },

    State: {
      type: String,
      trim: true,
      enum: ["Start", "Pause", "Stop"],
      default: "Pause",
    },

    CampaignEmailIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EmailLists",
        required: true,
      },
    ],

    CampaignAccounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Accounts",
        required: true,
      },
    ],
  },
  { timestamps: true, collection: "Campaigns" }
);

export const Campaigns = mongoose.model("Campaigns", campaignSchema);
