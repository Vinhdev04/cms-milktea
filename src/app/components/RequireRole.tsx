import { Navigate } from "react-router";
import { useAuth, AppRole } from "../context/AuthContext";
import { useUserAuth } from "../context/UserAuthContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface RequireRoleProps {
  children: React.ReactNode;
  requiredRole: AppRole;
}

export function RequireRole({ children, requiredRole }: RequireRoleProps) {
  const { user: adminUser, isAuthenticated: isAdminAuthenticated, isLoading: isAdminLoading } = useAuth();
  const { user: memberUser, isAuthenticated: isMemberAuthenticated } = useUserAuth();

  if (isAdminLoading) {
    return <LoadingSpinner fullScreen text="Đang tải hệ thống..." />;
  }

  const isAuthenticated = requiredRole === "member" ? isMemberAuthenticated : isAdminAuthenticated;
  const user = requiredRole === "member" ? memberUser : adminUser;

  if (!isAuthenticated) {
    return <Navigate to={requiredRole === "member" ? "/app/auth" : "/auth"} replace />;
  }

  if (requiredRole === "admin" && (user as any)?.appRole !== "admin") {
    return <Navigate to="/app" replace />;
  }

  return <>{children}</>;
}
