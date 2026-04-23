import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Bell, ChevronDown, Clock3, Gift, LogOut, MapPin,
  Menu, Package, Search, Settings, ShoppingBag, User, X,
} from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewNotifications } from '../data/userPreviewData';
import { showToast } from '../../utils/toast';

export function UserHeader() {
  const { user, cart, logout } = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdown, setIsUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(userPreviewNotifications);

  useEffect(() => {
    const handleNotification = (e?: any) => {
      if (e && e.key && e.key !== 'milktea_last_notification') return;
      
      const lastNtfStr = (e && e.newValue) ? e.newValue : localStorage.getItem('milktea_last_notification');
      if (!lastNtfStr) return;
      
      try {
        const ntf = JSON.parse(lastNtfStr);
        // Only show if it belongs to current user or is guest demo
        if (user && ntf.customerId !== user.id) return;

        const statusMap: Record<string, string> = {
          confirmed: 'Đã xác nhận',
          preparing: 'Đang pha chế',
          ready: 'Đang giao hàng',
          completed: 'Đã giao thành công',
          cancelled: 'Đã bị hủy',
        };

        const statusLabel = statusMap[ntf.status] || 'Cập nhật trạng thái';
        
        showToast.success(`Cập nhật đơn hàng #${ntf.orderId}`, {
          description: `Đơn hàng của bạn hiện tại: ${statusLabel}`,
        });

        const newNtf = {
          id: ntf.id,
          title: `Đơn #${ntf.orderId}: ${statusLabel}`,
          time: 'Vừa xong',
          unread: true,
          type: 'order' as const
        };
        setNotifications(prev => [newNtf, ...prev]);
        // Note: We don't clear last_notification to avoid race conditions with Admin tab
      } catch (e) { console.error(e); }
    };

    window.addEventListener('storage', handleNotification);
    return () => window.removeEventListener('storage', handleNotification);
  }, [user]);

  const cartItemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
  const unreadCount = notifications.filter((item) => item.unread).length;

  const navigation = [
    { name: 'Trang chủ', href: '/app' },
    { name: 'Đặt món', href: '/app/menu' },
    { name: 'Đơn hàng', href: '/app/orders' },
    { name: 'Voucher', href: '/app/offers' },
    { name: 'Chi nhánh', href: '/app/branches' },
  ].map((item) => ({ ...item, current: location.pathname === item.href }));

  const handleLogout = () => {
    logout();
    setIsUserDropdown(false);
    navigate('/app/auth');
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#F0CBA8] bg-[rgba(255,250,244,0.94)] backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/app" className="flex items-center gap-3 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-white shadow-[0_4px_16px_rgba(245,130,32,0.22)]">
              <img src="/chips-logo.png" alt="Chips Logo" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <div className="font-heading text-base font-extrabold tracking-tight text-[#2D1606] leading-none">Chips</div>
              <div className="text-[11px] font-medium text-[#A05A22] leading-none mt-0.5">Orange app preview</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-[#F0CBA8] bg-white/90 p-1 shadow-[0_4px_16px_rgba(229,106,0,0.08)] lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  item.current
                    ? 'bg-gradient-to-r from-[#FF8A1F] to-[#E56A00] text-white shadow-[0_6px_16px_rgba(245,130,32,0.3)]'
                    : 'text-[#6B3C16] hover:bg-[#FFF0E2] hover:text-[#2D1606]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <button className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#F0CBA8] bg-white text-[#7A451A] transition-all hover:bg-[#FFF0E2] hover:text-[#E56A00] sm:inline-flex">
              <Search className="h-4 w-4" />
            </button>

            {/* Location + ETA */}
            <div className="hidden items-center gap-2 rounded-xl border border-[#F0CBA8] bg-white px-3 py-2 text-xs font-medium text-[#7A451A] xl:flex">
              <MapPin className="h-3.5 w-3.5 text-[#FF8A1F]" />
              <span>Quận 1</span>
              <span className="h-3 w-px bg-[#E8C9A8]" />
              <Clock3 className="h-3.5 w-3.5 text-[#FF8A1F]" />
              <span>25 phút</span>
            </div>

            {/* Bell */}
            <button className="relative hidden h-10 w-10 items-center justify-center rounded-xl border border-[#F0CBA8] bg-white text-[#7A451A] transition-all hover:bg-[#FFF0E2] hover:text-[#E56A00] sm:inline-flex">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF8A1F] px-0.5 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <Link
              to="/app/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#F0CBA8] bg-white text-[#7A451A] transition-all hover:bg-[#FFF0E2] hover:text-[#E56A00]"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8A1F] to-[#E56A00] px-1 text-[9px] font-bold text-white shadow-md">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User dropdown */}
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                onClick={() => setIsUserDropdown((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-[#F0CBA8] bg-white pl-2 pr-3 py-1.5 text-left shadow-sm transition-all hover:bg-[#FFF0E2]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF8A1F] to-[#E56A00] text-xs font-bold text-white">
                  {user?.name?.charAt(0) ?? 'T'}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xs font-bold text-[#2D1606] leading-none">{user?.name || 'Tài khoản'}</div>
                  <div className="text-[10px] text-[#9C5B2A] leading-none mt-0.5">{user ? `${user.loyaltyPoints} điểm` : 'Đăng nhập'}</div>
                </div>
                <ChevronDown className={`h-3.5 w-3.5 text-[#A05A22] transition-transform ${isUserDropdown ? 'rotate-180' : ''}`} />
              </button>

              {isUserDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserDropdown(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-[22px] border border-[#F0CBA8] bg-white shadow-[0_16px_50px_rgba(122,69,26,0.18)] overflow-hidden">
                    {/* User info strip */}
                    <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFF0E2] px-4 py-3.5 border-b border-[#F0CBA8]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A1F] to-[#E56A00] text-sm font-bold text-white flex-shrink-0">
                          {user?.name?.charAt(0) ?? 'T'}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-[#2D1606] truncate">{user?.name || 'Khách'}</div>
                          <div className="text-[11px] text-[#A05A22]">Hạng {user?.tier || 'Bronze'} · {user?.loyaltyPoints || 0} điểm</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                      <Link to="/app/profile" onClick={() => setIsUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#4A2508] hover:bg-[#FFF5EB] transition-all">
                        <User className="h-4 w-4 text-[#FF8A1F]" />Hồ sơ thành viên
                      </Link>
                      <Link to="/app/orders" onClick={() => setIsUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#4A2508] hover:bg-[#FFF5EB] transition-all">
                        <Package className="h-4 w-4 text-[#FF8A1F]" />Theo dõi đơn hàng
                      </Link>
                      <Link to="/app/offers" onClick={() => setIsUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#4A2508] hover:bg-[#FFF5EB] transition-all">
                        <Gift className="h-4 w-4 text-[#FF8A1F]" />Voucher của tôi
                      </Link>
                      <Link to="/app/profile" onClick={() => setIsUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#4A2508] hover:bg-[#FFF5EB] transition-all">
                        <Settings className="h-4 w-4 text-[#FF8A1F]" />Cài đặt tài khoản
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-[#F0CBA8] py-1.5">
                      <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#C0392B] hover:bg-[#FFF5F5] transition-all">
                        <LogOut className="h-4 w-4" />Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#F0CBA8] bg-white text-[#7A451A] lg:hidden"
              aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#2D1606]/20 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile menu */}
      <aside className={`fixed right-3 top-[76px] z-40 w-[calc(100%-1.5rem)] max-w-sm rounded-[24px] border border-[#F0CBA8] bg-[rgba(255,250,244,0.98)] p-4 shadow-[0_20px_60px_rgba(122,69,26,0.18)] backdrop-blur-xl transition-all duration-300 lg:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}>
        {/* User strip */}
        <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#FFF8F0] to-[#FFF0E2] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A1F] to-[#E56A00] text-sm font-bold text-white flex-shrink-0">
            {user?.name?.charAt(0) ?? 'T'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-bold text-sm text-[#2D1606]">{user?.name || 'Khách vãng lai'}</div>
            <div className="text-xs text-[#9C5B2A]">{user ? `${user.loyaltyPoints} điểm thành viên` : 'Đăng nhập để nhận ưu đãi'}</div>
          </div>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${item.current ? 'bg-gradient-to-r from-[#FF8A1F] to-[#E56A00] text-white' : 'text-[#6B3C16] hover:bg-[#FFF0E2]'}`}>
              <span>{item.name}</span>
              {item.current && <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Đang xem</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-3 border-t border-[#F0CBA8] pt-3 space-y-1">
          <Link to="/app/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6B3C16] hover:bg-[#FFF0E2] transition-all">
            <User className="h-4 w-4 text-[#FF8A1F]" />Hồ sơ thành viên
          </Link>
          <Link to="/app/orders" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6B3C16] hover:bg-[#FFF0E2] transition-all">
            <Package className="h-4 w-4 text-[#FF8A1F]" />Theo dõi đơn hàng
          </Link>
          <button onClick={() => { setIsMenuOpen(false); handleLogout(); }}
            className="flex w-full items-center gap-3 rounded-xl bg-[#FFF5F5] px-4 py-2.5 text-sm font-semibold text-[#C0392B] hover:bg-[#FEE2E2] transition-all">
            <LogOut className="h-4 w-4" />Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
}
