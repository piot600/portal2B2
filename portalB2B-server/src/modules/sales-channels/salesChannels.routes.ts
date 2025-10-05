import { Router } from "express";
import { authorize } from "../../middleware/authorize.js";
import {
  createReport,
  getMyReports,
  exportCsv,
  getAllReports,
} from "./salesChannels.controller.js";

const router = Router();

router.post("/add", authorize(["distributor"]), createReport);
router.get("/my-reports", authorize(["distributor"]), getMyReports);
router.get("/manager", authorize(["manager"]), getAllReports);
router.get("/", authorize(["admin", "superadmin"]), getAllReports);
router.get("/export", authorize(["manager", "admin", "superadmin"]), exportCsv);

export default router;
