import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth, AppRole } from "../context/AuthContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface RequireRoleProps {
  children: React.ReactNode;
  requiredRole: AppRole;
}

export function RequireRole({ children, requiredRole }: RequireRoleProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/auth", { replace: true });
      } else if (user?.appRole !== requiredRole) {
        navigate(user?.appRole === "member" ? "/app" : "/admin", { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, user?.appRole, requiredRole, navigate]);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Đang tải hệ thống..." />;
  }

  if (!isAuthenticated || user?.appRole !== requiredRole) return null;

  return <>{children}</>;
}
