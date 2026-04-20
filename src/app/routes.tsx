import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./components/RequireAuth";
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

function ProtectedLayout() {
  return (
    <RequireAuth>
      <Layout />
    </RequireAuth>
  );
}

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/",
    Component: ProtectedLayout,
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
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
