import { Request, Response } from "express";
import { stringify } from "csv-stringify/sync";
import {
  addPurchaseReport,
  getUserPurchaseReports,
  getManagerPurchaseReports,
  getAllPurchaseReports,
} from "./purchaseReports.service.js";

export async function createPurchaseReport(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    const report = await addPurchaseReport(user, req.body);
    res.json({ message: "Report added successfully", data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
}

export async function getMyPurchaseReports(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    const reports = await getUserPurchaseReports(user.id);
    res.json({ data: reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
}

export async function getManagerReports(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    const reports = await getManagerPurchaseReports(user.id);
    res.json({ data: reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch manager reports" });
  }
}

export async function getAllReports(req: Request, res: Response) {
  try {
    const reports = await getAllPurchaseReports();
    res.json({ data: reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch all reports" });
  }
}

export async function exportCsv(req: Request, res: Response) {
  try {
    const reports = await getAllPurchaseReports();

    const csv = stringify(reports, {
      header: true,
      columns: [
        "distributor_email",
        "manager_email",
        "quarter",
        "year",
        "last_year_sales",
        "purchases",
        "budget",
        "actual_sales",
        "total_vs_last_year",
        "total_vs_budget",
        "total_pos",
        "new_openings",
        "new_openings_target",
      ],
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=purchase_reports.csv"
    );
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to export CSV" });
  }
}
