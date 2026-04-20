import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

/** Wrapper: redirect to /auth if not logged in */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Đang tải hệ thống..." />;
  }

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
