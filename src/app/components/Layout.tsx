import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate, useNavigation } from "react-router";
import {
  LayoutDashboard, ShoppingBag, ClipboardList, Users,
  Tag, BarChart3, MapPin, UserCheck, Settings, Menu, X, Bell,
  ChevronDown, LogOut, Search, ShieldAlert, Image, MessageSquare, User, Eye
} from "lucide-react";
import { Toaster } from "sonner";
import { Logo } from "./Logo";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/menu", label: "Quản lý Menu", icon: ShoppingBag },
  { path: "/orders", label: "Quản lý Đơn hàng", icon: ClipboardList },
  { path: "/customers", label: "Khách hàng", icon: Users },
  { path: "/vouchers", label: "Voucher & Ưu đãi", icon: Tag },
  { path: "/reports", label: "Báo cáo", icon: BarChart3 },
  { path: "/media", label: "Thư viện Media", icon: Image },
  { path: "/branches", label: "Chi nhánh", icon: MapPin },
  { path: "/staff", label: "Nhân viên", icon: UserCheck },
  { path: "/reviews", label: "Đánh giá & Phản hồi", icon: MessageSquare },
  { path: "/audit-log", label: "Audit Log", icon: ShieldAlert },
  { path: "/settings", label: "Cấu hình hệ thống", icon: Settings },
];

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationPreviewOpen, setNotificationPreviewOpen] = useState(false);
  const [bootLoading, setBootLoading] = useState(true);
  const [pageTransitioning, setPageTransitioning] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    const timer = window.setTimeout(() => setBootLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPageTransitioning(true);
    const timer = window.setTimeout(() => setPageTransitioning(false), 320);
    setSidebarOpen(false);
    setProfileOpen(false);
    setNotificationOpen(false);
    setNotificationPreviewOpen(false);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/auth", { replace: true });
  };

  const initials = user?.name
    ? user.name.split(" ").slice(-2).map((w) => w[0]).join("").toUpperCase()
    : "A";

  const isNavigating = navigation.state !== "idle" || pageTransitioning;
  const headerTitle = useMemo(() => {
    if (location.pathname === "/profile") return "Hồ sơ cá nhân";
    return navItems.find((item) => item.path === location.pathname)?.label ?? "Dashboard";
  }, [location.pathname]);

  const notifications = [
    { id: "NTF-01", title: "5 đánh giá mới đang chờ duyệt", meta: "Review Center", time: "2 phút trước", tone: "#FFF3E6", color: "#F58220" },
    { id: "NTF-02", title: "Chi nhánh Quận 3 vừa cập nhật giờ mở cửa", meta: "Chi nhánh", time: "15 phút trước", tone: "#EFF6FF", color: "#2563EB" },
    { id: "NTF-03", title: "Phát hiện 1 cảnh báo đăng nhập thất bại", meta: "Audit Log", time: "34 phút trước", tone: "#FEE2E2", color: "#991B1B" },
  ];
  const notificationItems = notifications.map((item, index) => ({
    ...item,
    route: index === 0 ? "/reviews" : index === 1 ? "/branches" : "/audit-log",
    preview:
      index === 0
        ? "Pháº£n há»“i má»›i tá»« khÃ¡ch hÃ ng Ä‘ang cáº§n duyá»‡t trong báº£ng preview."
        : index === 1
          ? "Kiá»ƒm tra thay Ä‘á»•i giá» hoáº¡t Ä‘á»™ng vÃ  nhÃ¢n sá»± ca lÃ m táº¡i dashboard chi nhÃ¡nh."
          : "Má»™t IP lạ Ä‘Ã£ thá»­ Ä‘Äƒng nháº­p nhiá»u láº§n. Cáº§n xem chi tiáº¿t trong Audit Log.",
  }));

  if (bootLoading) {
    return <LoadingSpinner fullScreen text="Đang tải giao diện quản trị..." />;
  }

  return (
    <div className="flex min-h-screen overflow-hidden md:overflow-visible" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <Toaster position="top-right" richColors />

      <div
        className={`fixed inset-0 z-40 bg-[#2B1406]/45 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[272px] flex-col overflow-hidden border-r border-white/10 transition-transform duration-300 md:relative md:inset-auto md:z-30 md:min-h-full md:w-[272px] md:min-w-[272px] md:flex-shrink-0 md:self-stretch md:overflow-hidden md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "linear-gradient(180deg, #5D2E0F 0%, #6E3815 100%)",
          boxShadow: "16px 0 40px rgba(43, 20, 6, 0.18)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,192,136,0.18),transparent_30%)] pointer-events-none" />

        <div className="relative flex items-center gap-3 border-b px-4 py-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="float-gentle flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
            <Logo size={30} />
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#FFFFFF", fontWeight: 800, fontSize: "16px", lineHeight: 1.15 }}>
              SMYOU
            </div>
            <div style={{ color: "#F5C088", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              MilkTea CMS
            </div>
          </div>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `mb-1.5 flex items-center gap-3 rounded-2xl px-3.5 py-3 transition-all duration-200 ${isActive ? "shadow-[0_12px_24px_rgba(245,192,136,0.15)]" : ""}`
              }
              style={({ isActive }) => ({
                background: isActive ? "linear-gradient(135deg, #F5C088 0%, #FFDDB3 100%)" : "transparent",
                color: isActive ? "#5D2E0F" : "#F8DAB7",
              })}
            >
              {({ isActive }) => (
                <>
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: isActive ? "rgba(93,46,15,0.10)" : "rgba(255,255,255,0.06)" }}
                  >
                    <item.icon size={17} />
                  </div>
                  <span style={{ fontSize: "13.5px", fontWeight: isActive ? 700 : 500 }}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {user && (
          <div className="relative border-t p-3" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="glass-panel flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: "#F5C088", color: "#5D2E0F" }}
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-[#2B1406]">{user.name}</div>
                <div className="truncate text-[11px] text-[#8C6136]">{user.role}</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden md:overflow-visible">
        <header
          className="glass-panel relative flex shrink-0 flex-wrap items-center justify-between gap-3 border-b px-4 py-3 md:px-6"
          style={{ borderColor: "#F0DCC8", boxShadow: "0 8px 24px rgba(93,46,15,0.04)" }}
        >
          {isNavigating && <div className="route-progress" />}

          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/80 transition-colors hover:bg-white md:hidden"
              style={{ borderColor: "#F0DCC8", color: "#F58220" }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="hidden md:flex md:flex-col">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#C1874E]">SMYOU Control</span>
              <span className="font-heading text-[18px] font-bold text-[#1A1A1A]">
                {headerTitle}
              </span>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
            <div className="relative hidden min-w-[220px] max-w-[320px] flex-1 md:flex">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                placeholder="Tìm kiếm nhanh..."
                className="h-11 w-full rounded-2xl border bg-white/75 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#F5C088] focus:shadow-[0_0_0_4px_rgba(245,192,136,0.16)]"
                style={{ borderColor: "#F0DCC8", color: "#1A1A1A", fontSize: "13.5px" }}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setNotificationOpen((prev) => !prev);
                  setProfileOpen(false);
                }}
                className="relative flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/80 transition-colors hover:bg-white"
                style={{ borderColor: "#F0DCC8" }}
              >
                <Bell size={18} style={{ color: "#F58220" }} />
                <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-[#FC8A6A]" />
              </button>

              {notificationOpen && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setNotificationOpen(false)} />
                  <div
                    className="glass-panel fixed left-3 right-3 top-[88px] z-[100] overflow-hidden rounded-3xl border md:absolute md:left-auto md:right-0 md:top-auto md:mt-2 md:w-[320px]"
                    style={{ borderColor: "#F0DCC8", boxShadow: "0 20px 48px rgba(43, 20, 6, 0.12)" }}
                  >
                    <div className="border-b px-4 py-4" style={{ borderColor: "#F0DCC8", background: "linear-gradient(135deg, #FFF3E6 0%, #FFF9F3 100%)" }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-heading text-[16px] font-bold text-[#1A1A1A]">Thông báo</div>
                          <div className="text-[12px] text-[#A0845C]">Preview nhanh các mục cần xử lý.</div>
                        </div>
                        <div className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#F58220]">
                          {notifications.length} mới
                        </div>
                      </div>
                    </div>
                    <div className="max-h-[calc(100vh-220px)] overflow-y-auto p-3 md:max-h-[360px]">
                      <div className="space-y-2">
                        {notificationItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              setNotificationOpen(false);
                              navigate(item.route);
                            }}
                            className="flex w-full items-start gap-3 rounded-2xl border border-[#F6E8D8] bg-[#FFFDF9] p-3 text-left transition-colors hover:bg-[#FFF8F1]"
                          >
                            <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: item.color }} />
                            <div className="min-w-0 flex-1">
                              <div className="text-[13px] font-semibold leading-5 text-[#1A1A1A]">{item.title}</div>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: item.tone, color: item.color }}>
                                  {item.meta}
                                </span>
                                <span className="text-[11px] text-[#A0845C]">{item.time}</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="border-t px-4 py-3" style={{ borderColor: "#F0DCC8" }}>
                      <button
                        onClick={() => {
                          setNotificationOpen(false);
                          setNotificationPreviewOpen(true);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#F0DCC8] py-2.5 text-sm font-semibold text-[#F58220] transition-colors hover:bg-[#FFF8F1]"
                      >
                        <Eye size={15} />
                        Xem preview đầy đủ
                      </button>
                    </div>
                  </div>
                </>
              )}

              {notificationPreviewOpen && (
                <>
                  <div className="fixed inset-0 z-[110] bg-[#2B1406]/45 backdrop-blur-[2px]" onClick={() => setNotificationPreviewOpen(false)} />
                  <div className="fixed inset-x-3 top-20 bottom-3 z-[120] overflow-hidden rounded-[28px] border border-[#F0DCC8] bg-white shadow-[0_20px_48px_rgba(43,20,6,0.12)] md:inset-x-auto md:right-6 md:top-24 md:bottom-auto md:w-[420px]">
                    <div className="flex items-center justify-between border-b px-4 py-4" style={{ borderColor: "#F0DCC8", background: "linear-gradient(135deg, #FFF3E6 0%, #FFF9F3 100%)" }}>
                      <div>
                        <div className="font-heading text-[16px] font-bold text-[#1A1A1A]">Preview thÃ´ng bÃ¡o</div>
                        <div className="text-[12px] text-[#A0845C]">Xem nhanh vÃ  chuyá»ƒn tá»›i mÃ n hÃ¬nh liÃªn quan.</div>
                      </div>
                      <button
                        onClick={() => setNotificationPreviewOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#F0DCC8] text-[#A0845C] transition-colors hover:bg-white"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="h-[calc(100%-76px)] overflow-y-auto p-4">
                      <div className="space-y-3">
                        {notificationItems.map((item) => (
                          <article key={item.id} className="rounded-[24px] border border-[#F6E8D8] bg-[#FFFDF9] p-4">
                            <div className="mb-3 flex items-start gap-3">
                              <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ background: item.color }} />
                              <div className="min-w-0 flex-1">
                                <div className="text-[14px] font-bold leading-5 text-[#1A1A1A]">{item.title}</div>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                  <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: item.tone, color: item.color }}>
                                    {item.meta}
                                  </span>
                                  <span className="text-[11px] text-[#A0845C]">{item.time}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-[12.5px] leading-6 text-[#6B5A45]">{item.preview}</p>
                            <button
                              onClick={() => {
                                setNotificationPreviewOpen(false);
                                navigate(item.route);
                              }}
                              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#F0DCC8] py-2.5 text-sm font-semibold text-[#F58220] transition-colors hover:bg-[#FFF8F1]"
                            >
                              <Eye size={15} />
                              Mở màn hình liên quan
                            </button>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl border bg-white/85 px-2.5 py-2 transition-all hover:bg-white sm:px-3"
                style={{ borderColor: "#F0DCC8" }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: "#F5C088", color: "#5D2E0F" }}
                >
                  {initials}
                </div>
                <div className="hidden text-left sm:block">
                  <div className="max-w-[110px] truncate text-[13px] font-semibold text-[#1A1A1A]">
                    {user?.name?.split(" ").slice(-1)[0] ?? "Admin"}
                  </div>
                  <div className="text-[11px] text-[#A0845C]">{user?.role ?? "Quản trị viên"}</div>
                </div>
                <ChevronDown size={14} style={{ color: "#A0845C" }} />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div
                    className="glass-panel absolute right-0 z-50 mt-2 w-[280px] overflow-hidden rounded-3xl border"
                    style={{ borderColor: "#F0DCC8", boxShadow: "0 20px 48px rgba(43, 20, 6, 0.12)" }}
                  >
                    <div className="border-b px-4 py-4" style={{ borderColor: "#F0DCC8", background: "linear-gradient(135deg, #FFF3E6 0%, #FFF9F3 100%)" }}>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full font-bold"
                          style={{ background: "#F5C088", color: "#5D2E0F", fontSize: "14px" }}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-[13.5px] font-bold text-[#1A1A1A]">{user?.name}</div>
                          <div className="truncate text-[11px] text-[#A0845C]">{user?.role}</div>
                          <div className="truncate text-[11px] text-[#F58220]">{user?.email}</div>
                        </div>
                      </div>
                      {user?.branch && (
                        <div className="mt-3 rounded-xl bg-[rgba(245,130,32,0.08)] px-3 py-2 text-xs font-semibold text-[#F58220]">
                          Chi nhánh: {user.branch}
                        </div>
                      )}
                    </div>
                    <div className="py-2">
                      <button
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[13px] text-[#1A1A1A] transition-colors hover:bg-[#FFF8F1]"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/profile");
                        }}
                      >
                        <User size={15} style={{ color: "#A0845C" }} />
                        Hồ sơ cá nhân
                      </button>
                      <button
                        className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[13px] text-[#991B1B] transition-colors hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut size={15} />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 md:overflow-visible md:px-6 md:py-6">
          <div className="page-shell mx-auto w-full max-w-[1480px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
