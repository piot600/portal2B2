import { Router } from "express";
import { login, logout, isLogged } from "./auth.controller.js";

const router = Router();

router.get("/", isLogged);
router.post("/login", login);
router.post("/logout", logout);

export default router;
