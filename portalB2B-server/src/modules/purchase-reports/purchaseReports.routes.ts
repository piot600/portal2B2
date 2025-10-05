import { Router } from "express";
import { authorize } from "../../middleware/authorize.js";
import {
  createPurchaseReport,
  getMyPurchaseReports,
  getManagerReports,
  getAllReports,
  exportCsv,
} from "./purchaseReports.controller.js";

const router = Router();

router.post("/add", authorize(["manager"]), createPurchaseReport);
router.get("/my-reports", authorize(["distributor"]), getMyPurchaseReports);
router.get("/manager", authorize(["manager"]), getManagerReports);
router.get("/all", authorize(["admin", "superadmin"]), getAllReports);
router.get("/export", authorize(["manager", "admin", "superadmin"]), exportCsv);

export default router;
