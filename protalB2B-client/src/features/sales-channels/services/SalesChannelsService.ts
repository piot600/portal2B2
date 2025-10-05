// src/features/salesChannels/services/SalesChannelsService.ts
import { api } from "../../../services/apiService";
import type { SalesChannelDto } from "../types/salesChannels";

class SalesChannelsService {
  // DYSTRYBUTOR: Dodaje raport
  static async addReport(data: Partial<SalesChannelDto>) {
    const response = await api.post("/sales-channels/add", data);
    return response.data;
  }

  // DYSTRYBUTOR: Własne raporty
  static async getMyReports() {
    const response = await api.get("/sales-channels/my-reports");
    return response.data.data;
  }

  // MANAGER: Raporty przypisanych dystrybutorów
  static async getManagerReports() {
    const response = await api.get("/sales-channels/manager");
    return response.data.data;
  }

  // ADMIN / SUPERADMIN: Wszystkie raporty
  static async getAllReports() {
    const response = await api.get("/sales-channels");
    return response.data.data;
  }

  // MANAGER / ADMIN / SUPERADMIN: Eksport CSV
  static async exportAllReports() {
    const response = await api.get("/sales-channels/export", {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales_channels.csv";
    a.click();
  }
}

export default SalesChannelsService;
