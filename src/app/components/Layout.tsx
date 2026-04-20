import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard, ShoppingBag, Layers, ClipboardList, Users,
  Tag, BarChart3, MapPin, UserCheck, Settings, Menu, X, Bell,
  ChevronDown, LogOut, Search, ShieldAlert, Image, MessageSquare, User
} from "lucide-react";
import { Toaster } from "sonner";
import { Logo } from "./Logo";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/menu", label: "Quản lý Menu", icon: ShoppingBag },
  { path: "/toppings", label: "Quản lý Topping", icon: Layers },
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/auth", { replace: true });
  };

  const initials = user?.name
    ? user.name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase()
    : 'A';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F5F5F5', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <Toaster position="top-right" richColors />

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 h-full flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden ${
          sidebarOpen ? 'translate-x-0 w-[240px]' : '-translate-x-full md:translate-x-0 w-[240px] md:w-[68px]'
        }`}
        style={{ background: '#5D2E0F', boxShadow: '2px 0 12px rgba(0,0,0,0.12)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex-shrink-0 w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-white">
            <Logo size={28} />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FFFFFF', fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>
                SMYOU
              </div>
              <div style={{ color: '#F5C088', fontSize: '11px' }}>MilkTea CMS</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group ${isActive ? 'active-nav' : ''}`
              }
              style={({ isActive }) => ({
                background: isActive ? '#F5C088' : 'transparent',
                color: isActive ? '#5D2E0F' : '#F5C088',
              })}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                if (!t.classList.contains('active-nav') && !t.style.background.includes('F5C088')) {
                  t.style.background = 'rgba(245,192,136,0.12)';
                  t.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                if (!t.classList.contains('active-nav')) {
                  t.style.background = 'transparent';
                  t.style.color = '#F5C088';
                }
              }}
              title={!sidebarOpen ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className="flex-shrink-0" style={{ color: isActive ? '#5D2E0F' : 'inherit' }} />
                  {sidebarOpen && (
                    <span style={{ fontSize: '13.5px', fontWeight: isActive ? 600 : 400 }}>
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User info at bottom */}
        {sidebarOpen && user && (
          <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2 px-2 py-2 rounded-xl" style={{ background: 'rgba(245,192,136,0.1)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ background: '#F5C088', color: '#5D2E0F' }}>
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'white' }} className="truncate">{user.name}</div>
                <div style={{ fontSize: '11px', color: '#F5C088' }} className="truncate">{user.role}</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 border-b"
          style={{ background: '#FFFFFF', borderColor: '#F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: '#F58220' }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <Search size={16} className="absolute left-3" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-9 pr-4 rounded-xl border text-sm outline-none transition-all"
                style={{
                  height: '38px', width: '260px', borderColor: '#F0DCC8',
                  background: '#FFFAF5', color: '#1A1A1A', fontSize: '13.5px',
                  fontFamily: "'Be Vietnam Pro', sans-serif"
                }}
                onFocus={(e) => { e.target.style.borderColor = '#F5C088'; e.target.style.boxShadow = '0 0 0 3px rgba(245,192,136,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F0DCC8'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification */}
            <button className="relative p-2 rounded-xl transition-colors hover:bg-gray-50" style={{ border: '1px solid #F0DCC8' }}>
              <Bell size={18} style={{ color: '#F58220' }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#FCBABD' }} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
                style={{ border: '1px solid #F0DCC8', background: profileOpen ? '#FFF3E6' : 'white' }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: '#F5C088', color: '#5D2E0F' }}>
                  {initials}
                </div>
                <span style={{ fontSize: '13.5px', color: '#1A1A1A', fontWeight: 600 }} className="hidden sm:block">
                  {user?.name?.split(' ').slice(-1)[0] ?? 'Admin'}
                </span>
                <ChevronDown size={14} style={{ color: '#A0845C' }} />
              </button>

              {profileOpen && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden z-50"
                    style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #F0DCC8' }}>
                    <div className="px-4 py-4 border-b" style={{ borderColor: '#F0DCC8', background: '#FFF3E6' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                          style={{ background: '#F5C088', color: '#5D2E0F', fontSize: '14px' }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1A1A1A' }}>{user?.name}</div>
                          <div style={{ fontSize: '11px', color: '#A0845C' }}>{user?.role}</div>
                          <div style={{ fontSize: '11px', color: '#F58220', marginTop: '2px' }}>{user?.email}</div>
                        </div>
                      </div>
                      {user?.branch && (
                        <div className="mt-3 px-2 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(245,130,32,0.1)', color: '#F58220', fontWeight: 600 }}>
                          📍 {user.branch}
                        </div>
                      )}
                    </div>
                    <div className="py-1">
                      <button
                        className="flex items-center gap-2.5 w-full px-4 py-3 transition-colors hover:bg-gray-50 text-left"
                        style={{ fontSize: '13px', color: '#1A1A1A' }}
                        onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                      >
                        <User size={15} style={{ color: '#A0845C' }} />
                        Hồ sơ cá nhân
                      </button>
                      <div className="border-t mx-3 my-1" style={{ borderColor: '#F0DCC8' }} />
                      <button
                        className="flex items-center gap-2.5 w-full px-4 py-3 transition-colors hover:bg-red-50 text-left"
                        style={{ fontSize: '13px', color: '#991B1B' }}
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

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
