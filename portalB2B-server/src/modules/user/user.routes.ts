import { Router } from "express";
import { addUser, changePassword } from "./user.controller.js";
import { authorize } from "../../middleware/authorize.js";

const router = Router();

router.post("/add", authorize(["superadmin"]), addUser);
router.post("/password-update", changePassword);

export default router;
