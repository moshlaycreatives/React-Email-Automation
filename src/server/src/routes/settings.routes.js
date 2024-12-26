import { Router } from "express";
import {
  getSettingsById,
  addSettings,
  updateSettings,
  deleteSettings,
} from "../controllers/settings.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
var settingsRouter = Router();

settingsRouter.get("/", authenticateToken, getSettingsById);
settingsRouter.post("/", authenticateToken, addSettings);
settingsRouter.put("/:id", authenticateToken, updateSettings);
settingsRouter.delete("/:id", authenticateToken, deleteSettings);

export { settingsRouter };
