import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/context/useAuth";

export function ChangePasswordProtection() {
  const { user } = useAuth();

  if (user?.mustChangePassword == true) {
    return <Navigate to="/user/change-password" replace />;
  }

  return <Outlet />;
}
