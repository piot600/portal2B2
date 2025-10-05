import { dbPool } from "../../config/dbPool.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import type { PurchaseReportInput } from "./purchaseReports.d.ts";

export async function insertPurchaseReport(
  managerId: number,
  distributorId: number,
  data: PurchaseReportInput
) {
  const [result] = await dbPool.query<ResultSetHeader>(
    `INSERT INTO purchase_reports (
      manager_id, distributor_id, quarter, year,
      last_year_sales, purchases, budget, actual_sales,
      total_pos, new_openings, new_openings_target
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      managerId,
      distributorId,
      data.quarter,
      data.year,
      data.last_year_sales,
      data.purchases,
      data.budget,
      data.actual_sales,
      data.total_pos,
      data.new_openings,
      data.new_openings_target,
    ]
  );
  return result.insertId;
}

export async function getReportsByDistributor(distributorId: number) {
  const [rows] = await dbPool.query<RowDataPacket[]>(
    `SELECT pr.*, m.email AS manager_email
     FROM purchase_reports pr
     JOIN users m ON pr.manager_id = m.id
     WHERE pr.distributor_id = ?
     ORDER BY pr.year DESC, pr.quarter DESC`,
    [distributorId]
  );
  return rows;
}

export async function getReportsByManager(managerId: number) {
  const [rows] = await dbPool.query<RowDataPacket[]>(
    `SELECT pr.*, u.email AS distributor_email
     FROM purchase_reports pr
     JOIN users u ON pr.distributor_id = u.id
     WHERE pr.manager_id = ?
     ORDER BY pr.year DESC, pr.quarter DESC`,
    [managerId]
  );
  return rows;
}

export async function getAllReports() {
  const [rows] = await dbPool.query<RowDataPacket[]>(
    `SELECT pr.*, 
            u.email AS distributor_email, 
            m.email AS manager_email
     FROM purchase_reports pr
     JOIN users u ON pr.distributor_id = u.id
     JOIN users m ON pr.manager_id = m.id
     ORDER BY pr.year DESC, pr.quarter DESC`
  );
  return rows;
}
