import { Router } from "express";
import {
  addUser,
  changePassword,
  getAllUsers,
  getMyDistributors,
  getMyEmployees,
} from "./user.controller.js";
import { authorize } from "../../middleware/authorize.js";

const router = Router();

router.post("/add", authorize(["superadmin"]), addUser);
router.post("/password-update", changePassword);
router.get("/my-employees", authorize(["distributor"]), getMyEmployees);
router.get("/my-distributors", authorize(["manager"]), getMyDistributors);
router.get("/all", authorize(["admin", "superadmin"]), getAllUsers);

export default router;
