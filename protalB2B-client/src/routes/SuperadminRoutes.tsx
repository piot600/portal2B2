import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/context/useAuth";

export function SuperadminRoutes() {
  const { user } = useAuth();

  if (user?.role !== "superadmin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
