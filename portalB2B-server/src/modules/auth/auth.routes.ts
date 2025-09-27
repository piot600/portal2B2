import { Router } from "express";
import { login, logout, isLogged } from "./auth.controller.js";
import { isGuest, isAuthenticated } from "../../middleware/authorize.js";

const router = Router();

router.get("/", isLogged);
router.post("/login", isGuest, login);
router.post("/logout", isAuthenticated, logout);

export default router;
