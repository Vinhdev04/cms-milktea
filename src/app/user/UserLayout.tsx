import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { ChevronUp, ShoppingBag } from 'lucide-react';
import { UserHeader } from './components/UserHeader';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { MiniCart } from './components/MiniCart';
import { useUserAuth } from '../context/UserAuthContext';

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
      className={`fixed bottom-[calc(160px+env(safe-area-inset-bottom,12px))] right-4 z-[60] hidden h-11 w-11 items-center justify-center rounded-2xl bg-[#2D1606] text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 sm:flex lg:bottom-12 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}

export function UserLayout() {
  const { cart } = useUserAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/app/auth';
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden font-sans text-[#2D1606]">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-64 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,31,0.08),transparent_70%),radial-gradient(circle_at_top_right,rgba(229,106,0,0.06),transparent_70%)]" />
      
      <UserHeader />
      
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto no-scrollbar">
             <Outlet />
          </div>
          
          {!hideBottomNav && (
            <div className="shrink-0 lg:hidden">
               <MobileBottomNav />
            </div>
          )}
        </main>

        {/* Desktop Fixed Side Cart */}
        <aside className="hidden lg:block w-80 border-l border-gray-100 bg-white">
           <MiniCart />
        </aside>

        {/* Mobile Sidebar MiniCart (Optional overlay) */}
        {isMiniCartOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMiniCartOpen(false)} />
             <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform">
                <MiniCart onClose={() => setIsMiniCartOpen(false)} />
             </div>
          </div>
        )}

        {/* Mobile Floating Cart Trigger */}
        {cartCount > 0 && !hideBottomNav && (
          <button 
            onClick={() => setIsMiniCartOpen(true)}
            className="lg:hidden fixed bottom-24 right-4 z-50 h-14 w-14 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center animate-bounce-in"
          >
             <ShoppingBag className="h-6 w-6" />
             <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                {cartCount}
             </span>
          </button>
        )}
      </div>

      <BackToTop />
    </div>
  );
}
