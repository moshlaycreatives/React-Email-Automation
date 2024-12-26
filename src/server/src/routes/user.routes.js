import { Router } from "express";
import {
  SignUp,
  Login,
  Logout,
  Get,
  GetByToken,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
var userRouter = Router();

userRouter.get("/", Get);
userRouter.get("/user", authenticateToken, GetByToken);
userRouter.post("/signup", SignUp);
userRouter.post("/login", Login);
userRouter.post("/logout", Logout);

export { userRouter };
