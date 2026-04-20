import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { 
  Clock3, Filter, Heart, Plus, Search, SlidersHorizontal, 
  Star, TicketPercent, ShoppingCart, ChevronRight, MapPin, Coffee
} from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewCategories, userPreviewOffers, userPreviewProducts } from '../data/userPreviewData';
import { ProductQuickCard } from '../components/ProductQuickCard';

export function UserMenu() {
  const { cart, addToCart, toggleFavorite, isFavorite } = useUserAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
      return;
    }
    setSearchParams({ category: categoryId });
  };

  const filteredProducts = useMemo(() => {
    let currentProducts = userPreviewProducts;

    if (selectedCategory !== 'all') {
      currentProducts = currentProducts.filter((product) => product.categoryId === selectedCategory);
    }

    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      currentProducts = currentProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    }

    return currentProducts;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-32">
      {/* ─── HEADER & SEARCH ─── */}
      <header className="sticky top-0 z-40 border-b border-orange-50 bg-white/80 pb-4 pt-6 backdrop-blur-xl" style={{ WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between anim-fade-up">
               <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-600">
                    <MapPin className="h-3 w-3" /> Giao đến • SMYOU Nguyễn Huệ
                  </div>
                  <h1 className="mt-1 font-heading text-xl font-black text-[#2D1606] sm:text-3xl">Thực đơn hôm nay</h1>
               </div>
               <Link to="/app/cart" className="relative">
                  <div className="rounded-2xl bg-orange-50 p-2.5 text-orange-600 transition-all duration-300 hover:bg-orange-100 hover:scale-110 active:scale-90">
                     <ShoppingCart className="h-6 w-6" />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 px-1 text-[9px] font-black text-white shadow-lg anim-bounce-in">
                      {cartCount}
                    </span>
                  )}
               </Link>
            </div>

            <div className="flex items-center gap-2 anim-fade-up anim-fade-up-delay-1">
              <div className={`relative flex-1 transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
                <Search className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-300 ${isSearchFocused ? 'text-orange-500' : 'text-[#B47749]'}`} />
                <input
                  type="text"
                  placeholder="Tìm món ngon, hương vị, topping..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="h-14 w-full rounded-[20px] bg-[#F3F4F6]/50 border-none pl-12 pr-4 text-sm font-bold text-[#4A2508] outline-none transition-all duration-300 placeholder:text-[#B47749]/60 focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:shadow-lg"
                />
              </div>
              <button className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:bg-orange-50 hover:border-orange-200 hover:shadow-md active:scale-95">
                <SlidersHorizontal className="h-5 w-5 text-orange-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── CATEGORY NAVIGATION ─── */}
      <nav className="sticky top-[148px] z-30 border-b border-orange-50 bg-white/60 py-4 backdrop-blur-md" style={{ WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex flex-col items-center gap-2 min-w-[72px] transition-all duration-300 ${
                selectedCategory === 'all' ? 'scale-105' : 'opacity-60 grayscale-[0.5] hover:opacity-80'
              }`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-[18px] text-2xl shadow-sm transition-all duration-300 ${
                selectedCategory === 'all' ? 'bg-[#2D1606] text-white shadow-xl scale-110' : 'bg-white border border-gray-100 hover:shadow-md'
              }`}>
                🌟
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                selectedCategory === 'all' ? 'text-[#2D1606]' : 'text-gray-500'
              }`}>Tất cả</span>
            </button>
            {userPreviewCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex flex-col items-center gap-2 min-w-[72px] transition-all duration-300 ${
                  selectedCategory === category.id ? 'scale-105' : 'opacity-60 grayscale-[0.5] hover:opacity-80'
                }`}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-[18px] text-2xl shadow-sm transition-all duration-300 ${
                  selectedCategory === category.id ? 'bg-[#2D1606] text-white shadow-xl scale-110' : 'bg-white border border-gray-100 hover:shadow-md'
                }`}>
                  {category.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                  selectedCategory === category.id ? 'text-[#2D1606]' : 'text-gray-500'
                }`}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ─── PRODUCT LIST ─── */}
      <main className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-6 flex items-center justify-between anim-fade-up">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#8A552A]">
                  Hiện có {filteredProducts.length} món ngon
               </h3>
               <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 cursor-pointer hover:underline transition-all">
                  Phổ biến nhất <ChevronRight className="h-4 w-4" />
               </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 stagger-children">
              {filteredProducts.map((product) => (
                <ProductQuickCard key={product.id} {...product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center anim-scale-in">
                 <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-4xl mb-6 anim-float-badge">🤌</div>
                 <h4 className="text-xl font-black text-[#2D1606]">Không tìm thấy món này</h4>
                 <p className="mt-2 text-sm text-[#8A552A]">Hãy thử từ khóa khác hoặc quay lại danh mục "Tất cả"</p>
                 <button onClick={() => handleCategoryChange('all')} className="mt-6 text-sm font-black text-orange-600 underline underline-offset-4 transition-colors hover:text-orange-700">Xóa bộ lọc</button>
              </div>
            )}
          </div>

          {/* ─── SIDEBAR VOUCHERS ─── */}
          <aside className="hidden lg:block anim-slide-right">
            <div className="sticky top-[280px] space-y-6">
              <div className="surface-card rounded-[32px] p-6 shadow-xl border-orange-50">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-sm font-black uppercase tracking-[0.15em] text-[#2D1606]">Voucher của bạn</h3>
                   <Link to="/app/offers" className="text-[10px] font-black text-orange-600 hover:underline transition-all">XEM HẾT</Link>
                </div>
                <div className="space-y-4 stagger-children">
                  {userPreviewOffers.map((offer) => (
                    <div key={offer.id} className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-orange-50 to-white p-4 border border-orange-100/50 group hover:border-orange-200 transition-all duration-300 hover:shadow-md cursor-pointer">
                      <div className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-tighter">
                        <TicketPercent className="h-3 w-3" /> {offer.code}
                      </div>
                      <div className="mt-2 text-sm font-black text-[#2D1606] leading-tight">{offer.title}</div>
                      <div className="mt-1 text-[11px] text-[#8A552A] leading-relaxed line-clamp-2">{offer.description}</div>
                      <Link to="/app/menu" className="mt-4 inline-flex items-center text-[10px] font-black text-orange-700 transition-all group-hover:translate-x-1">DÙNG NGAY <ChevronRight className="h-3 w-3" /></Link>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="rounded-[32px] bg-[#2D1606] p-6 text-white shadow-2xl overflow-hidden relative group card-interactive">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                    <Coffee className="h-24 w-24" />
                 </div>
                 <h4 className="relative z-10 font-heading text-xl font-bold">Thèm trà sữa?</h4>
                 <p className="mt-2 relative z-10 text-sm text-white/60">Đừng quên tích điểm SMYOU để đổi quà Gold Member.</p>
                 <button className="mt-6 relative z-10 w-full rounded-2xl bg-orange-500 py-3 text-xs font-black transition-all duration-300 hover:bg-orange-400 hover:shadow-lg active:scale-95">KIỂM TRA HẠNG</button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ─── FLOATING CART BUBBLE (Mobile/Global) ─── */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-50 sm:hidden anim-fade-up">
           <Link to="/app/checkout" className="flex items-center justify-between rounded-[24px] bg-[#2D1606] p-4 text-white shadow-[0_20px_50px_rgba(45,22,6,0.5)] active:scale-95 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(45,22,6,0.6)]">
              <div className="flex items-center gap-3">
                 <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 anim-pulse-glow">
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-black text-orange-600 border-2 border-orange-500">
                       {cartCount}
                    </span>
                 </div>
                 <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Xác nhận giỏ hàng</div>
                    <div className="text-lg font-black">{cartTotal.toLocaleString('vi-VN')}đ</div>
                 </div>
              </div>
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
                 Thanh toán <ChevronRight className="h-5 w-5" />
              </div>
           </Link>
        </div>
      )}
    </div>
  );
}
