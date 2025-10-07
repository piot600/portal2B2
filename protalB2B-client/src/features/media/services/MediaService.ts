import { api } from "../../../services/apiService";
import type { ApiResponse } from "../../auth/types/userTypes";
import type { MediaFile } from "../types/mediaTypes";

export default class MediaService {
  static async getAllFiles(): Promise<MediaFile[]> {
    const res = await api.get<ApiResponse<MediaFile[]>>("/media");
    return res.data.data;
  }

  static async uploadFile(formData: FormData): Promise<ApiResponse<MediaFile>> {
    const res = await api.post<ApiResponse<MediaFile>>(
      "/media/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  }

  static async deleteFile(id: number): Promise<void> {
    await api.delete(`/media/${id}`);
  }
}
