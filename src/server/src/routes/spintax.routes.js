import { Router } from "express";
import {
  addSpintax,
  addSpintaxValue,
  deleteSpintax,
  deleteSpintaxValue,
  getAllSpintax,
  getSpintaxById,
  updateSpintax,
} from "../controllers/spintax.controllers.js";
import { trimObjects } from "../middlewares/trimObjects.middleware.js";
const spintaxRouter = Router();

spintaxRouter.route("/").post(trimObjects, addSpintax);
spintaxRouter.route("/:id").post(trimObjects, addSpintaxValue);
spintaxRouter.route("/deleteValue/:id").post(trimObjects, deleteSpintaxValue);
spintaxRouter.route("/").get(getAllSpintax);
spintaxRouter.route("/:id").get(getSpintaxById);
spintaxRouter.route("/:id").put(trimObjects, updateSpintax);
spintaxRouter.route("/:id").delete(deleteSpintax);

export { spintaxRouter };
