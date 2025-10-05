import { Request, Response } from "express";
import {
  addSalesReport,
  getUserReports,
  getAllReportsForAdmin,
  getReportsForManager,
} from "./salesChannels.service.js";
import { stringify } from "csv-stringify/sync";

export async function createReport(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    const report = await addSalesReport(user, req.body);
    res.json({ message: "Report added successfully", data: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
}

export async function getMyReports(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    const reports = await getUserReports(user.id);
    res.json({ data: reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
}

export async function exportCsv(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    if (!["manager", "admin", "superadmin"].includes(user.role))
      return res.status(403).json({ error: "Access denied" });

    const reports =
      user.role === "manager"
        ? await getReportsForManager(user.id)
        : await getAllReportsForAdmin();

    const csv = stringify(reports, {
      header: true,
      columns: [
        "distributor_name",
        "currency",
        "professional_sales",
        "pharmacy_sales",
        "ecommerce_b2c_sales",
        "ecommerce_b2b_sales",
        "third_party",
        "other",
        "total_sales",
        "new_clients",
        "total_sales_eur",
      ],
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=sales_channels.csv"
    );
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to export CSV" });
  }
}

export async function getAllReports(req: Request, res: Response) {
  try {
    const user = req.session.data;
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    if (user.role === "manager") {
      const reports = await getReportsForManager(user.id);
      return res.json({ data: reports });
    }

    if (["admin", "superadmin"].includes(user.role)) {
      const reports = await getAllReportsForAdmin();
      return res.json({ data: reports });
    }

    return res.status(403).json({ error: "Access denied" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
}
