import {
  insertPurchaseReport,
  getReportsByDistributor,
  getReportsByManager,
  getAllReports,
} from "./purchaseReports.repository.js";
import type { PurchaseReportInput } from "./purchaseReports.d.ts";

export async function addPurchaseReport(user: any, body: PurchaseReportInput) {
  const id = await insertPurchaseReport(user.id, body.distributor_id, body);
  return { id };
}

export async function getUserPurchaseReports(distributorId: number) {
  return await getReportsByDistributor(distributorId);
}

export async function getManagerPurchaseReports(managerId: number) {
  return await getReportsByManager(managerId);
}

export async function getAllPurchaseReports() {
  return await getAllReports();
}
