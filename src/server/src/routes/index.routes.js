import { Router } from "express";
const router = Router();

import { spintaxRouter } from "./spintax.routes.js";
import { accountsRouter } from "./accounts.routes.js";
import { emailsListRouter } from "./emailsList.routes.js";
import { emailsRouter } from "./emails.routes.js";
import { campaignRouter } from "./campaign.routes.js";
import { userRouter } from "./user.routes.js";
import { settingsRouter } from "./settings.routes.js";

/** ___ User ___ */
router.use("/user", userRouter);

/** ___ Spintax ___ */
router.use("/spintax", spintaxRouter);

/** ___ Accounts ___ */
router.use("/accounts", accountsRouter);

/** __ Email List ___ */
router.use("/emailList", emailsListRouter);

/** __ Emails ___ */
router.use("/emails", emailsRouter);

/** __ Campaign ___ */
router.use("/campaign", campaignRouter);

/** __ Settings ___ */
router.use("/settings", settingsRouter);

export { router };
