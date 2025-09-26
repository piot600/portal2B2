import { api } from "../../../services/apiService";
import type { ApiResponse, UserDto } from "../../auth/types/userTypes";
import axios from "axios";

class AdminService {
  static async addUser(
    email: string,
    role: string
  ): Promise<ApiResponse<UserDto>> {
    try {
      const response = await api.post<ApiResponse<UserDto>>("/user/add", {
        email,
        role,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error);
      }
      throw err;
    }
  }
}

export default AdminService;
