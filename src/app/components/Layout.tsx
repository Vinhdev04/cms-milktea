import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard, ShoppingBag, Layers, ClipboardList, Users,
  Tag, BarChart3, MapPin, UserCheck, Settings, Menu, X, Bell,
  ChevronDown, LogOut, Search, Coffee, ShieldAlert
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/menu", label: "Quản lý Menu", icon: ShoppingBag },
  { path: "/toppings", label: "Quản lý Topping", icon: Layers },
  { path: "/orders", label: "Quản lý Đơn hàng", icon: ClipboardList },
  { path: "/customers", label: "Khách hàng", icon: Users },
  { path: "/vouchers", label: "Voucher & Ưu đãi", icon: Tag },
  { path: "/reports", label: "Báo cáo", icon: BarChart3 },
  { path: "/branches", label: "Chi nhánh", icon: MapPin },
  { path: "/staff", label: "Nhân viên", icon: UserCheck },
  { path: "/audit-log", label: "Audit Log", icon: ShieldAlert },
  { path: "/settings", label: "Cấu hình hệ thống", icon: Settings },
];

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F5F5F5', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
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
        style={{
          background: '#1B4332',
          boxShadow: '2px 0 12px rgba(0,0,0,0.12)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#A8D5BA' }}>
            <Coffee size={20} style={{ color: '#1B4332' }} />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FFFFFF', fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>
                SMYOU
              </div>
              <div style={{ color: '#A8D5BA', fontSize: '11px' }}>MilkTea CMS</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group ${isActive ? 'active-nav' : ''}`
              }
              style={({ isActive }) => ({
                background: isActive ? '#A8D5BA' : 'transparent',
                color: isActive ? '#1B4332' : '#A8D5BA',
              })}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                if (!target.classList.contains('active-nav') && !target.style.background.includes('A8D5BA')) {
                  target.style.background = 'rgba(168,213,186,0.12)';
                  target.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                if (!target.classList.contains('active-nav')) {
                  target.style.background = 'transparent';
                  target.style.color = '#A8D5BA';
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className="flex-shrink-0" style={{ color: isActive ? '#1B4332' : 'inherit' }} />
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

        {/* User at bottom */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl cursor-pointer"
            style={{ background: 'rgba(168,213,186,0.1)' }}>
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#A8D5BA', color: '#1B4332', fontWeight: 700, fontSize: '13px' }}>
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }} className="truncate">Admin SMYOU</div>
                <div style={{ color: '#6B9080', fontSize: '11px' }}>Super Admin</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 border-b"
          style={{ background: '#FFFFFF', borderColor: '#E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: '#2D6A4F' }}
            >
              <Menu size={20} />
            </button>
            {/* Search */}
            <div className="relative hidden md:flex items-center">
              <Search size={16} className="absolute left-3" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-9 pr-4 rounded-xl border text-sm outline-none transition-all"
                style={{
                  height: '38px', width: '260px', borderColor: '#E0EDE6',
                  background: '#F8FAF9', color: '#1A1A1A', fontSize: '13.5px',
                  fontFamily: "'Be Vietnam Pro', sans-serif"
                }}
                onFocus={(e) => { e.target.style.borderColor = '#A8D5BA'; e.target.style.boxShadow = '0 0 0 3px rgba(168,213,186,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E0EDE6'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification */}
            <button className="relative p-2 rounded-xl transition-colors hover:bg-gray-50" style={{ border: '1px solid #E0EDE6' }}>
              <Bell size={18} style={{ color: '#2D6A4F' }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#FCBABD' }}></span>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
                style={{ border: '1px solid #E0EDE6', background: profileOpen ? '#E8F5EC' : 'white' }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: '#A8D5BA', color: '#1B4332' }}>A</div>
                <span style={{ fontSize: '13.5px', color: '#1A1A1A', fontWeight: 600 }}>Admin</span>
                <ChevronDown size={14} style={{ color: '#6B9080' }} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden z-50"
                  style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #E0EDE6' }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: '#E0EDE6' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>Admin SMYOU</div>
                    <div style={{ fontSize: '12px', color: '#6B9080' }}>admin@smyou.vn</div>
                  </div>
                  <button
                    className="flex items-center gap-2 w-full px-4 py-3 transition-colors hover:bg-gray-50"
                    style={{ fontSize: '13px', color: '#8B3A4A' }}
                    onClick={() => setProfileOpen(false)}
                  >
                    <LogOut size={14} />
                    Đăng xuất
                  </button>
                </div>
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
