import { Router } from "express";
import { authorize } from "../../middleware/authorize.js";
import {
  createReport,
  getMyReports,
  exportCsv,
  getAllReports,
} from "./salesChannels.controller.js";

const router = Router();

// ✅ DYSTRYBUTOR — dodaje i widzi swoje raporty
router.post("/add", authorize(["distributor"]), createReport);
router.get("/my-reports", authorize(["distributor"]), getMyReports);

// ✅ MANAGER — widzi swoich dystrybutorów
router.get("/manager", authorize(["manager"]), getAllReports);

// ✅ ADMIN / SUPERADMIN — widzą wszystkich
router.get("/", authorize(["admin", "superadmin"]), getAllReports);

// ✅ MANAGER / ADMIN / SUPERADMIN — eksport CSV
router.get("/export", authorize(["manager", "admin", "superadmin"]), exportCsv);

export default router;
