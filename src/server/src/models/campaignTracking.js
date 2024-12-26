import mongoose, { Schema } from "mongoose";

const campaignTrackingSchema = new Schema(
  {
    CampaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    AccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Accounts",
      required: true,
    },

    EmailId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emails",
        required: true,
      },
    ],
  },
  { timestamps: true, collection: "CampaignTracking" }
);

export const CampaignTracking = mongoose.model(
  "CampaignTracking",
  campaignTrackingSchema
);
