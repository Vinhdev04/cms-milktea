import { Heart, Home, Menu, Package, User, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useUserAuth } from '../context/UserAuthContext';
import { useMemo } from 'react';

export function MobileBottomNav() {
  const { cart, favorites } = useUserAuth();
  const location = useLocation();

  const cartItemCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  const isActive = (path: string) => {
    if (path === '') return location.pathname === '/app';
    return location.pathname.startsWith(`/app${path}`);
  };

  const navItems = [
    { label: 'Sảnh', icon: Home, path: '' },
    { label: 'Menu', icon: Menu, path: '/menu' },
    { label: 'Giỏ', icon: ShoppingBag, path: '/cart', badge: cartItemCount },
    { label: 'Đơn', icon: Package, path: '/orders' },
    { label: 'Tôi', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pointer-events-none">
      {/* Safe area padding for iOS */}
      <div className="pointer-events-auto mx-auto w-full max-w-lg px-4 pb-[max(12px,env(safe-area-inset-bottom))]">
        <nav
          className="flex items-center justify-around rounded-[24px] border border-white/[0.06] bg-[rgba(30,14,4,0.96)] px-2 py-2 shadow-[0_-2px_20px_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
          style={{ WebkitBackdropFilter: 'blur(24px)' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={`/app${item.path}`}
                className={`group relative flex items-center justify-center rounded-2xl transition-all duration-300 active:scale-90 ${
                  active
                    ? 'gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 shadow-[0_4px_16px_rgba(249,115,22,0.35)]'
                    : 'p-2'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Icon
                    className={`transition-all duration-300 ${
                      active
                        ? 'h-[17px] w-[17px] text-white'
                        : 'h-[20px] w-[20px] text-white/35 group-hover:text-white/60'
                    }`}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                  {/* Badge — only show when count > 0 and tab is NOT active */}
                  {item.badge !== undefined && item.badge > 0 && !active && (
                    <span className="absolute -right-2 -top-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 px-0.5 text-[8px] font-black text-white ring-2 ring-[#1e0e04] anim-bounce-in">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>

                {/* Active label */}
                {active && (
                  <span className="text-[10px] font-bold tracking-wide text-white whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
