import { api } from "../../../services/apiService";
import type { ApiResponse, UserDto } from "../types/userTypes";
import axios from "axios";

class AuthService {
  static async register(
    email: string,
    role: string
  ): Promise<ApiResponse<UserDto>> {
    try {
      const response = await api.post<ApiResponse<UserDto>>("/auth/register", {
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

  static async login(
    email: string,
    password: string
  ): Promise<ApiResponse<UserDto>> {
    try {
      const response = await api.post<ApiResponse<UserDto>>("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
        throw new Error(err.response?.data.error);
      }
      throw err;
    }
  }

  static async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
      console.log("logout");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.error);
      }
      throw err;
    }
  }

  static async getCurrentUser(): Promise<UserDto | null> {
    try {
      const response = await api.get<ApiResponse<UserDto>>("/auth");
      return response.data.data;
    } catch {
      return null;
    }
  }
}

export default AuthService;
