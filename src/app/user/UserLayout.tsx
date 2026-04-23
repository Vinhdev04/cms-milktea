import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { ChevronUp } from 'lucide-react';
import { UserFooter } from './components/UserFooter';
import { UserHeader } from './components/UserHeader';
import { MobileBottomNav } from '../components/MobileBottomNav';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-[calc(160px+env(safe-area-inset-bottom,12px))] right-4 z-[60] flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2D1606] text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 lg:bottom-12 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}

export function UserLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/app/auth';

  // Hide bottom nav on pages that have their own sticky bottom action bars
  const hideBottomNav = [
    '/app/cart',
    '/app/checkout',
  ].includes(location.pathname) || location.pathname.match(/^\/app\/menu\/[^/]+$/);

  if (isAuthPage) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#FFFAF5]">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#FFF9F3_0%,#FFF4E8_52%,#FFFCF8_100%)] text-[#2D1606]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[30rem] z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,31,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(229,106,0,0.12),transparent_32%),radial-gradient(circle_at_center,rgba(245,192,136,0.16),transparent_42%)]" />
      <UserHeader />
      <div className="overflow-x-hidden">
        <main className={`relative z-10 flex-1 page-shell lg:pb-0 ${hideBottomNav ? 'pb-8' : 'pb-24'}`}>
          <Outlet />
        </main>
        <div className="hidden lg:block">
          <UserFooter />
        </div>
      </div>
      {!hideBottomNav && <MobileBottomNav />}
      <BackToTop />
    </div>
  );
}
