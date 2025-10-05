import { api } from "../../../services/apiService";
import type { UserDto } from "../../auth/types/userTypes";

class UsersService {
  // 🔹 Manager – widzi swoich dystrybutorów
  static async getMyDistributors(): Promise<UserDto[]> {
    const res = await api.get("/user/my-distributors");
    return res.data.data;
  }

  // 🔹 Distributor – widzi swoich pracowników
  static async getMyEmployees(): Promise<UserDto[]> {
    const res = await api.get("/user/my-employees");
    return res.data.data;
  }

  // 🔹 Admin / Superadmin – widzą wszystkich użytkowników
  static async getAllUsers(): Promise<UserDto[]> {
    const res = await api.get("/user/all");
    return res.data.data;
  }
}

export default UsersService;
