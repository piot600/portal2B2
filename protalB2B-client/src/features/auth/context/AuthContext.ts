import { createContext } from "react";
import type { ApiResponse, UserDto } from "../types/userTypes";

type AuthContextType = {
  user: UserDto | null;
  login: (email: string, password: string) => Promise<ApiResponse<UserDto>>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
