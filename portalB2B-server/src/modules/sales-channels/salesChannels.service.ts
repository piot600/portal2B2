import {
  insertSalesReport,
  getReportsByDistributor,
  getAllReports,
  getReportsByManager,
} from "./salesChannels.repository.js";
import type { SalesChannelInput } from "./salesChannels.d.ts";

export async function addSalesReport(user: any, body: SalesChannelInput) {
  const id = await insertSalesReport(user.id, user.email, body);
  return { id };
}

export async function getUserReports(userId: number) {
  return await getReportsByDistributor(userId);
}

export async function getAllReportsForAdmin() {
  return await getAllReports();
}

export async function getReportsForManager(managerId: number) {
  return await getReportsByManager(managerId);
}
