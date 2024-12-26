import { Router } from "express";
import {
  // connectAccount,
  deleteCampaignById,
  getAllCampaigns,
  getCampaignById,
  saveCampaign,
  startCampaign,
  updateCampaignById,
} from "../controllers/campaign.controllers.js";

const campaignRouter = Router();

campaignRouter.route("/").post(saveCampaign);
campaignRouter.route("/").get(getAllCampaigns);
campaignRouter.route("/:id").get(getCampaignById);
campaignRouter.route("/:id").post(updateCampaignById);
campaignRouter.route("/:id").delete(deleteCampaignById);
campaignRouter.route("/start/:id").get(startCampaign);
// campaignRouter.route("/connectAccount").post(connectAccount);

export { campaignRouter };
