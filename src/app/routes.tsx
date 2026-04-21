import { createBrowserRouter, Navigate } from "react-router";
import { useAuth } from "./context/AuthContext";
import { useUserAuth } from "./context/UserAuthContext";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";
import { RequireRole } from "./components/RequireRole";
import { Dashboard } from "./pages/Dashboard";
import { MenuManagement } from "./pages/MenuManagement";
import { OrderManagement } from "./pages/OrderManagement";
import { CustomerManagement } from "./pages/CustomerManagement";
import { VoucherManagement } from "./pages/VoucherManagement";
import { Reports } from "./pages/Reports";
import { BranchManagement } from "./pages/BranchManagement";
import { StaffManagement } from "./pages/StaffManagement";
import { SystemSettings } from "./pages/SystemSettings";
import { AuditLog } from "./pages/AuditLog";
import { Auth } from "./pages/Auth";
import { MediaLibrary } from "./pages/MediaLibrary";
import { ReviewManagement } from "./pages/ReviewManagement";
import { Profile } from "./pages/Profile";
import { UserLayout } from "./user/UserLayout";
import { UserAuth } from "./user/pages/UserAuth";
import { UserBranches } from "./user/pages/UserBranches";
import { UserCart } from "./user/pages/UserCart";
import { UserHome } from "./user/pages/UserHome";
import { UserMenu } from "./user/pages/UserMenu";
import { UserOffers } from "./user/pages/UserOffers";
import { UserOrders } from "./user/pages/UserOrders";
import { UserProfile } from "./user/pages/UserProfile";
import { UserFavorites } from "./user/pages/UserFavorites";
import { UserCheckout } from "./user/pages/UserCheckout";
import { UserProductDetail } from "./user/pages/UserProductDetail";

function ProtectedAdminLayout() {
  return (
    <RequireRole requiredRole="admin">
      <RequireAuth>
        <Layout />
      </RequireAuth>
    </RequireRole>
  );
}

function ProtectedUserLayout() {
  return (
    <RequireRole requiredRole="member">
      <UserLayout />
    </RequireRole>
  );
}

function RootRedirect() {
  const { isAuthenticated: isSystemAuthenticated, user: systemUser } = useAuth();
  const { isAuthenticated: isMemberAuthenticated } = useUserAuth();

  if (isSystemAuthenticated && systemUser?.appRole === "admin") return <Navigate to="/admin" replace />;
  if (isMemberAuthenticated) return <Navigate to="/app" replace />;
  return <Navigate to="/app" replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  { path: "/auth", Component: Auth },
  {
    path: "/admin",
    Component: ProtectedAdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "menu", Component: MenuManagement },
      { path: "orders", Component: OrderManagement },
      { path: "customers", Component: CustomerManagement },
      { path: "vouchers", Component: VoucherManagement },
      { path: "reports", Component: Reports },
      { path: "media", Component: MediaLibrary },
      { path: "branches", Component: BranchManagement },
      { path: "staff", Component: StaffManagement },
      { path: "reviews", Component: ReviewManagement },
      { path: "profile", Component: Profile },
      { path: "settings", Component: SystemSettings },
      { path: "audit-log", Component: AuditLog },
    ],
  },
  { path: "/app/auth", Component: UserAuth },
  {
    path: "/app",
    Component: ProtectedUserLayout,
    children: [
      { index: true, Component: UserHome },
      { path: "menu", Component: UserMenu },
      { path: "menu/:productId", Component: UserProductDetail },
      { path: "cart", Component: UserCart },
      { path: "checkout", Component: UserCheckout },
      { path: "favorites", Component: UserFavorites },
      { path: "orders", Component: UserOrders },
      { path: "offers", Component: UserOffers },
      { path: "branches", Component: UserBranches },
      { path: "profile", Component: UserProfile },
    ],
  },
  { path: "/user", element: <Navigate to="/app" replace /> },
  { path: "*", element: <Navigate to="/auth" replace /> },
]);
