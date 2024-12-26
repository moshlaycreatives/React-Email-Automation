import { Router } from "express";
import {
  changeAccountVisibility,
  changeActiveState,
  deleteEmailAcoutnDetails,
  getAllEmailAccountDetails,
  getAllEnabledEmailAccounts,
  getEmailAccountDetialsById,
  increaseLimit,
  storeEmailAccounts,
  updateEmailAcoutnDetails,
} from "../controllers/accounts.controllers.js";

const accountsRouter = Router();

accountsRouter.route("/").post(storeEmailAccounts);
accountsRouter.route("/").get(getAllEmailAccountDetails);
accountsRouter.route("/enabled").post(getAllEnabledEmailAccounts);
accountsRouter.route("/:id").get(getEmailAccountDetialsById);
accountsRouter.route("/:id").patch(updateEmailAcoutnDetails);
accountsRouter.route("/:id").delete(deleteEmailAcoutnDetails);
accountsRouter.route("/:id").put(changeActiveState);
accountsRouter.route("/:id").post(changeAccountVisibility);
accountsRouter.route("/increaseLimit/:id").post(increaseLimit);

export { accountsRouter };
