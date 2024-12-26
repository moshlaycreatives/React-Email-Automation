import { Router } from "express";

import { trimObjects } from "../middlewares/trimObjects.middleware.js";
import {
  addEmailList,
  deleteEmailList,
  deleteSingleEmailFromList,
  getAllEmailLists,
  getAllNotSendedEmails,
  markEmailSended,
} from "../controllers/emails.controllers.js";

const emailsRouter = Router();

emailsRouter.route("/").post(trimObjects, addEmailList);
emailsRouter.route("/:id").get(getAllEmailLists);
emailsRouter.route("/notSended").post(getAllNotSendedEmails);
emailsRouter.route("/:id").delete(deleteEmailList);
emailsRouter.route("/delete/:id").delete(deleteSingleEmailFromList);
emailsRouter.route("/:id").patch(markEmailSended);

export { emailsRouter };
