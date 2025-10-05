import { dbPool } from "../../config/dbPool.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import type { SalesChannelInput } from "./salesChannels.d.ts";

export async function insertSalesReport(
  distributorId: number,
  distributorName: string,
  data: SalesChannelInput
) {
  const [result] = await dbPool.query<ResultSetHeader>(
    `INSERT INTO sales_channels (
      distributor_id, distributor_name, quarter, year, currency, currency_rate,
      professional_sales, pharmacy_sales, ecommerce_b2c_sales, ecommerce_b2b_sales,
      third_party, other, new_clients
    ) VALUES (?, ?, ?, ?, 'PLN', ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      distributorId,
      distributorName,
      data.quarter,
      data.year,
      data.currency_rate,
      data.professional_sales,
      data.pharmacy_sales,
      data.ecommerce_b2c_sales,
      data.ecommerce_b2b_sales,
      data.third_party,
      data.other,
      data.new_clients,
    ]
  );
  return result.insertId;
}

export async function getReportsByDistributor(distributorId: number) {
  const [rows] = await dbPool.query<RowDataPacket[]>(
    `SELECT * FROM sales_channels WHERE distributor_id = ? ORDER BY year DESC, quarter DESC`,
    [distributorId]
  );
  return rows;
}

export async function getAllReports() {
  const [rows] = await dbPool.query<RowDataPacket[]>(
    `SELECT * FROM sales_channels ORDER BY year DESC, quarter DESC`
  );
  return rows;
}

export async function getReportsByManager(managerId: number) {
  const [rows] = await dbPool.query<RowDataPacket[]>(
    `
    SELECT sc.*, u.email AS distributor_email
    FROM sales_channels sc
    JOIN users u ON sc.distributor_id = u.id
    WHERE u.manager_id = ?
    ORDER BY sc.year DESC, sc.quarter DESC
    `,
    [managerId]
  );
  return rows;
}
