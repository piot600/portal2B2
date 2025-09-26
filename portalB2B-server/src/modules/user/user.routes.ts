import { Router } from "express";
import { addUser } from "./user.controller.js";

const router = Router();

router.post("/add", addUser);

export default router;
