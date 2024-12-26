import { Router } from "express";
import {
  addListName,
  deleteListName,
  getAllNameLists,
  updateListName,
} from "../controllers/emailsList.controllers.js";
import { trimObjects } from "../middlewares/trimObjects.middleware.js";

const emailsListRouter = Router();

emailsListRouter.route("/").post(trimObjects, addListName);
emailsListRouter.route("/").get(getAllNameLists);
emailsListRouter.route("/:id").delete(deleteListName);
emailsListRouter.route("/:id").post(updateListName);

export { emailsListRouter };
