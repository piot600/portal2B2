import { useEffect, useState } from "react";
import type { ApiResponse, UserDto } from "../types/userTypes";
import AuthService from "../services/AuthService";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    AuthService.getCurrentUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<ApiResponse<UserDto>> {
    const response = await AuthService.login(email, password);
    setUser(response.data);
    return response;
  }

  async function logout() {
    await AuthService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
