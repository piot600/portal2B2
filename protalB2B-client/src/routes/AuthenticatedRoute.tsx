import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/context/useAuth";

export function AuthenticatedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
