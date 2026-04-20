import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { MenuManagement } from "./pages/MenuManagement";
import { ToppingManagement } from "./pages/ToppingManagement";
import { OrderManagement } from "./pages/OrderManagement";
import { CustomerManagement } from "./pages/CustomerManagement";
import { VoucherManagement } from "./pages/VoucherManagement";
import { Reports } from "./pages/Reports";
import { BranchManagement } from "./pages/BranchManagement";
import { StaffManagement } from "./pages/StaffManagement";
import { SystemSettings } from "./pages/SystemSettings";
import { AuditLog } from "./pages/AuditLog";
import { Auth } from "./pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "menu", Component: MenuManagement },
      { path: "toppings", Component: ToppingManagement },
      { path: "orders", Component: OrderManagement },
      { path: "customers", Component: CustomerManagement },
      { path: "vouchers", Component: VoucherManagement },
      { path: "reports", Component: Reports },
      { path: "branches", Component: BranchManagement },
      { path: "staff", Component: StaffManagement },
      { path: "settings", Component: SystemSettings },
      { path: "audit-log", Component: AuditLog },
    ],
  },
]);
