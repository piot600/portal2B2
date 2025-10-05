import { api } from "../../../services/apiService";
import type { PurchaseReportDto } from "../types/purchaseReports";

class PurchaseReportsService {
  static async addReport(data: Partial<PurchaseReportDto>) {
    const response = await api.post("/purchase-reports/add", data);
    return response.data;
  }

  static async getMyReports() {
    const response = await api.get("/purchase-reports/my-reports");
    return response.data.data;
  }

  static async getManagerReports() {
    const response = await api.get("/purchase-reports/manager");
    return response.data.data;
  }

  static async getAllReports() {
    const response = await api.get("/purchase-reports/all");
    return response.data.data;
  }

  static async exportAllReports() {
    const response = await api.get("/purchase-reports/export", {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "purchase_reports.csv";
    a.click();
  }
}

export default PurchaseReportsService;
