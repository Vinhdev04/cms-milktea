import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight, Clock3, Gift, MapPin, Plus, RotateCcw,
  ShoppingBag, Star, TicketPercent, Truck, Zap, ChevronRight,
  Sparkles, Flame, Coffee, IceCream, UtensilsCrossed
} from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import {
  userPreviewBranches,
  userPreviewCategories,
  userPreviewOffers,
  userPreviewOrders,
  userPreviewProducts,
} from '../data/userPreviewData';
import { ProductQuickCard } from '../components/ProductQuickCard';

export function UserHome() {
  const { user, cart } = useUserAuth();
  const [selectedBranch, setSelectedBranch] = useState(userPreviewBranches[0].id);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('delivery');

  const activeBranch = userPreviewBranches.find((branch) => branch.id === selectedBranch) ?? userPreviewBranches[0];
  const bestSellerProducts = userPreviewProducts.filter((item) => item.badge === 'Bán chạy' || item.sold > 700).slice(0, 4);
  const newProducts = userPreviewProducts.slice(0, 6);
  const trendingProducts = userPreviewProducts.filter(p => !p.isFeatured).slice(0, 6);

  return (
    <div className="pb-24">
      {/* ─── PREMIUM HERO BANNER ─── */}
      <section className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 anim-fade-up">
        <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] shadow-2xl sm:h-[480px] sm:rounded-[40px] lg:h-[540px]">
          <img
            src="https://images.unsplash.com/photo-1576092762791-dd9e2220abd1?auto=format&fit=crop&w=1600&q=80"
            alt="Hero Banner"
            className="h-full w-full object-cover brightness-[0.8] transition-transform duration-[2s] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Hero Content */}
          <div className="absolute bottom-6 left-5 right-5 sm:bottom-10 sm:left-6 sm:right-6 lg:bottom-16 lg:left-12 lg:right-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-400 backdrop-blur-md ring-1 ring-orange-500/30 anim-fade-up anim-fade-up-delay-1">
                  <Sparkles className="h-4 w-4" /> Collection 2026
                </div>
                <h1 className="mt-4 font-heading text-2xl font-black leading-[1.1] text-white sm:mt-6 sm:text-4xl md:text-6xl lg:text-7xl anim-fade-up anim-fade-up-delay-2">
                  Hương vị trà <br /> 
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Độc bản từ 2026</span>
                </h1>
                <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/70 line-clamp-2 sm:mt-6 sm:text-base sm:line-clamp-none anim-fade-up anim-fade-up-delay-3">
                  Kết tinh từ trà Shan Tuyết cổ thụ. Chips mang đến trải nghiệm thưởng trà đẳng cấp App-First.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-4 anim-fade-up anim-fade-up-delay-4">
                  <Link to="/app/menu" className="flex h-11 items-center justify-center rounded-2xl bg-white px-6 text-xs font-black text-[#2D1606] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-50 hover:shadow-2xl active:scale-95 sm:h-14 sm:px-10 sm:text-sm anim-pulse-glow">
                    Đặt món ngay <ChevronRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </div>

              {/* Branch Selector Mini - Desktop Only Floating */}
              <div className="hidden shrink-0 lg:block anim-slide-right">
                <div className="w-80 rounded-[32px] bg-white/10 p-5 backdrop-blur-2xl ring-1 ring-white/20 transition-all duration-500 hover:bg-white/15">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg anim-pulse-glow">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Giao đến</div>
                      <div className="text-sm font-bold text-white">{activeBranch.name}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-white">
                    <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                      <div className="text-[10px] font-bold text-white/40">Thời gian</div>
                      <div className="text-xs font-bold font-mono uppercase">25-30ph</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 transition-colors hover:bg-white/10">
                      <div className="text-[10px] font-bold text-white/40">Khoảng cách</div>
                      <div className="text-xs font-bold font-mono tracking-tighter uppercase">1.2 km</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORY QUICK GRID ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-4 lg:gap-8 stagger-children">
          {[
            { id: 'milk-tea', name: 'Trà Sữa', icon: '🧋', bg: 'bg-gradient-to-br from-[#FFF3E7] to-[#FFE8D0]', ring: 'ring-orange-100' },
            { id: 'fruit-tea', name: 'Trái Cây', icon: '🍊', bg: 'bg-gradient-to-br from-[#E8F7ED] to-[#D1F0DC]', ring: 'ring-emerald-100' },
            { id: 'coffee', name: 'Cà Phê', icon: '☕', bg: 'bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0]', ring: 'ring-slate-200' },
            { id: 'ice-blended', name: 'Đá Xay', icon: '🥤', bg: 'bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE]', ring: 'ring-violet-100' },
          ].map((cat) => (
            <Link 
              key={cat.id} 
              to={`/app/menu?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 transition-all active:scale-95"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-[24px] text-3xl shadow-sm ring-1 transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-xl group-hover:scale-110 sm:h-24 sm:w-24 sm:rounded-[32px] sm:text-5xl ${cat.bg} ${cat.ring}`}>
                {cat.icon}
              </div>
              <span className="text-center text-xs font-black uppercase tracking-widest text-[#2D1606] sm:text-sm transition-colors group-hover:text-orange-600">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── PROMO MARQUEE BANNER ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-[#2D1606] py-3">
          <div className="flex items-center gap-8 whitespace-nowrap marquee-scroll">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="flex items-center gap-2 text-sm font-black text-white"><Zap className="h-4 w-4" /> Flash Sale hôm nay</span>
                <span className="text-white/30">•</span>
                <span className="flex items-center gap-2 text-sm font-black text-white"><Truck className="h-4 w-4" /> Freeship đơn 120K</span>
                <span className="text-white/30">•</span>
                <span className="flex items-center gap-2 text-sm font-black text-white"><Sparkles className="h-4 w-4" /> Đồ uống Organic</span>
                <span className="text-white/30">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BESTSELLER SECTION ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between anim-fade-up">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-orange-600">
               <Flame className="h-4 w-4" /> Popular demand
            </div>
            <h2 className="mt-2 font-heading text-4xl font-black text-[#2D1606]">Món bán chạy nhất</h2>
          </div>
          <Link to="/app/menu" className="hidden text-sm font-black text-orange-600 hover:scale-105 transition-transform md:inline-flex items-center gap-2">
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 stagger-children">
          {bestSellerProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {index === 0 && (
                <div className="absolute -left-2 -top-2 z-20 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2D1606] text-xl shadow-xl ring-4 ring-white anim-bounce-in">
                  🥇
                </div>
              )}
              <ProductQuickCard {...product} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROMOTION CARDS ─── */}


      {/* ─── NEW ARRIVALS & TRENDING LISTS ─── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* New Arrivals List */}
          <div className="anim-fade-up">
            <div className="mb-8 flex items-center justify-between border-b border-orange-100 pb-4">
              <h3 className="font-heading text-2xl font-black text-[#2D1606] flex items-center gap-2">
                 <Sparkles className="h-6 w-6 text-orange-500" /> Món mới nên thử
              </h3>
              <Link to="/app/menu" className="text-xs font-bold uppercase tracking-widest text-orange-500 hover:translate-x-1 transition-transform">Xem thêm</Link>
            </div>
            <div className="flex flex-col gap-4 stagger-children">
              {newProducts.map(product => (
                <Link key={product.id} to={`/app/menu/${product.id}`} className="group flex items-center gap-4 rounded-[28px] border border-transparent p-3 transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-[1.02] hover:border-orange-50">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl">
                    <img src={product.image} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate font-bold text-[#2D1606] leading-tight group-hover:text-orange-600 transition-colors uppercase text-xs tracking-wide">{product.categoryLabel}</h4>
                    <h5 className="mt-1 font-black text-lg text-[#2D1606] leading-tight truncate">{product.name}</h5>
                    <div className="mt-2 flex items-center gap-3">
                       <span className="text-base font-black text-orange-600">{product.price.toLocaleString('vi-VN')}đ</span>
                       <div className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-black text-orange-600">
                          <Clock3 className="h-3 w-3" /> {product.prepTime}
                       </div>
                    </div>
                  </div>
                  <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 active:scale-90">
                    <Plus className="h-5 w-5" />
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Grid */}
          <div className="anim-fade-up" style={{ animationDelay: '0.15s' }}>
             <div className="mb-8 flex items-center justify-between border-b border-orange-100 pb-4">
              <h3 className="font-heading text-2xl font-black text-[#2D1606] flex items-center gap-2">
                 <Flame className="h-6 w-6 text-red-500" /> Xu hướng hôm nay
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#8A552A]">Cập nhật liên tục</span>
            </div>
            <div className="grid grid-cols-2 gap-4 stagger-children">
              {trendingProducts.slice(0, 4).map(product => (
                <Link key={product.id} to={`/app/menu/${product.id}`} className="group overflow-hidden rounded-[32px] bg-white border border-orange-50 card-interactive">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={product.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute right-3 top-3 rounded-xl bg-black/60 px-2 py-1 text-[10px] font-black text-white backdrop-blur-md">
                       🔥 {product.sold}+ sold
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-sm text-[#2D1606] leading-tight line-clamp-1 group-hover:text-orange-600 transition-colors">{product.name}</h5>
                    <div className="mt-2 flex items-center justify-between">
                       <span className="text-sm font-black text-orange-600">{product.price.toLocaleString('vi-VN')}đ</span>
                       <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90">
                          <Plus className="h-4 w-4" />
                       </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER HIGHLIGHT ─── */}
      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 anim-fade-up">
         <h2 className="font-heading text-4xl font-black text-[#2D1606]">Khát là phải Chips.</h2>
         <p className="mx-auto mt-4 max-w-md text-[#8A552A]">Giao trà sữa trong chớp mắt, chất lượng chuẩn vị truyền thống. Đặt ngay để nhận ưu đãi đặc biệt cho thành viên mới.</p>
         <Link to="/app/menu" className="mt-8 inline-flex h-16 items-center justify-center rounded-[24px] bg-[#2D1606] px-12 text-sm font-black text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-600 active:scale-95 anim-pulse-glow">
            Khám phá Thực đơn <ArrowRight className="ml-2 h-5 w-5" />
         </Link>
      </section>
    </div>
  );
}
