import { useState } from 'react';
import { 
  Clock3, MapPin, PackageCheck, ReceiptText, 
  RotateCcw, Truck, CheckCircle2, XCircle, 
  ChefHat, Navigation, Bike, ChevronRight, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router';
import { userPreviewOrders } from '../data/userPreviewData';

const orderStatusConfig = {
  pending: {
    label: 'Đang xử lý',
    color: 'bg-amber-50 text-amber-600',
    iconBg: 'bg-amber-100',
    icon: Clock3,
    progress: 25,
  },
  preparing: {
    label: 'Đang pha chế',
    color: 'bg-orange-50 text-orange-600',
    iconBg: 'bg-orange-100',
    icon: ChefHat,
    progress: 50,
  },
  delivering: {
    label: 'Đang giao',
    color: 'bg-blue-50 text-blue-600',
    iconBg: 'bg-blue-100',
    icon: Bike,
    progress: 75,
  },
  completed: {
    label: 'Hoàn tất',
    color: 'bg-emerald-50 text-emerald-600',
    iconBg: 'bg-emerald-100',
    icon: CheckCircle2,
    progress: 100,
  },
  cancelled: {
    label: 'Đã hủy',
    color: 'bg-rose-50 text-rose-600',
    iconBg: 'bg-rose-100',
    icon: XCircle,
    progress: 0,
  },
};

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả', icon: '📋' },
  { key: 'pending', label: 'Chờ', icon: '⏳' },
  { key: 'delivering', label: 'Đang giao', icon: '🛵' },
  { key: 'completed', label: 'Hoàn tất', icon: '✅' },
];

export function UserOrders() {
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all'
    ? userPreviewOrders
    : userPreviewOrders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32">
      {/* ─── HERO HEADER ─── */}
      <section className="bg-[#2D1606] px-5 pb-16 pt-10 text-white sm:px-6 sm:pb-20 sm:pt-16 anim-fade-up">
        <div className="mx-auto max-w-6xl">
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-orange-400 anim-fade-up anim-fade-up-delay-1">
              <ShoppingBag className="h-4 w-4" /> Hoạt động của bạn
           </div>
           <h1 className="mt-3 font-heading text-2xl font-black sm:mt-4 sm:text-4xl anim-fade-up anim-fade-up-delay-2">Theo dõi đơn hàng</h1>
           <p className="mt-3 text-xs font-medium text-white/50 max-w-md leading-relaxed sm:mt-4 sm:text-sm anim-fade-up anim-fade-up-delay-3">
              Tất cả trà sữa bạn yêu thích đang trên đường tới. Cập nhật từng giây, giao nhanh từng phút.
           </p>
        </div>
      </section>

      <main className="mx-auto -mt-10 max-w-6xl px-4">
        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-[24px] bg-white p-1.5 shadow-xl ring-1 ring-black/5 sm:gap-2 sm:rounded-[32px] sm:p-2 anim-scale-in">
           {FILTER_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[10px] font-black uppercase tracking-wider transition-all duration-300 sm:gap-2 sm:rounded-2xl sm:px-6 sm:py-3 sm:text-xs sm:tracking-widest ${
                  filter === tab.key 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                 <span className="text-sm">{tab.icon}</span>
                 {tab.label}
              </button>
           ))}
        </div>

        {/* Orders Grid */}
        <div className="mt-8 space-y-6 stagger-children">
           {filteredOrders.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center anim-scale-in">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl shadow-xl ring-1 ring-gray-100 mb-6 anim-float-badge">📦</div>
                <h3 className="text-xl font-black text-[#2D1606]">Không có đơn hàng nào</h3>
                <p className="mt-2 text-sm text-gray-500">Bắt đầu trải nghiệm ngay hôm nay!</p>
                <Link to="/app/menu" className="mt-8 rounded-2xl bg-[#2D1606] px-8 py-3 text-sm font-black text-white shadow-2xl transition-all duration-300 hover:bg-orange-600 hover:scale-105 active:scale-95">
                   Tới thực đơn ngay
                </Link>
             </div>
           ) : (
             filteredOrders.map(order => {
                const cfg = orderStatusConfig[order.status as keyof typeof orderStatusConfig];
                const active = ['delivering', 'preparing', 'pending'].includes(order.status);

                return (
                  <article 
                    key={order.id} 
                    className="overflow-hidden rounded-[40px] bg-white shadow-sm ring-1 ring-gray-100 card-interactive group"
                  >
                     <div className="flex flex-col lg:flex-row">
                        {/* Status Sidebar */}
                        <div className={`flex flex-col items-center justify-center px-8 py-8 lg:w-48 ${cfg.color} transition-colors relative overflow-hidden`}>
                           {/* Animated background pattern */}
                           {active && (
                             <div className="absolute inset-0 opacity-10">
                               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)] bg-[length:20px_20px]" />
                             </div>
                           )}
                           <cfg.icon className={`h-10 w-10 relative z-10 ${active ? 'anim-float-badge' : ''}`} />
                           <span className="mt-3 text-[10px] font-black uppercase tracking-widest leading-none relative z-10">{cfg.label}</span>
                           <span className="mt-2 text-[8px] font-bold opacity-60 uppercase relative z-10">{order.createdAt.split(' ')[0]}</span>
                           
                           {/* Progress bar */}
                           {active && (
                             <div className="mt-4 w-full max-w-[100px] h-1 rounded-full bg-current/10 overflow-hidden relative z-10">
                               <div 
                                 className="h-full rounded-full bg-current progress-fill" 
                                 style={{ '--progress': `${cfg.progress}%` } as React.CSSProperties}
                               />
                             </div>
                           )}
                        </div>

                        {/* Order Content */}
                        <div className="flex-1 p-8">
                           <div className="flex items-start justify-between mb-6">
                              <div>
                                 <h2 className="text-lg font-black text-[#2D1606] group-hover:text-orange-600 transition-colors">Mã đơn #{order.id}</h2>
                                 <div className="mt-2 flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <MapPin className="h-3.5 w-3.5" /> 
                                    <span className="truncate max-w-[200px]">{order.branch}</span>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Thanh toán</div>
                                 <div className="text-xl font-black" style={{ background: 'linear-gradient(135deg, #FF8A1F, #E56A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    {order.total.toLocaleString('vi-VN')}đ
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-wrap gap-2">
                              {order.items.map(item => (
                                 <div key={item.name} className="flex items-center gap-3 rounded-2xl bg-[#FAFAFA] pl-1.5 pr-4 py-1.5 ring-1 ring-gray-50 transition-all duration-300 hover:ring-orange-100 hover:bg-orange-50/30">
                                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-sm">
                                       🧋
                                    </div>
                                    <div className="text-[10px] font-black text-[#2D1606]">
                                       x{item.quantity} {item.name}
                                    </div>
                                 </div>
                              ))}
                           </div>

                           <div className="mt-8 flex items-center gap-4">
                              {active ? (
                                 <div className="flex-1 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer active:scale-[0.98]">
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-3">
                                          <div className="rounded-full bg-white/20 p-2">
                                             <Navigation className="h-4 w-4" />
                                          </div>
                                          <div>
                                             <div className="text-[9px] font-black uppercase tracking-widest opacity-80">Ước tính giao</div>
                                             <div className="text-xs font-black">{order.eta}</div>
                                          </div>
                                       </div>
                                       <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                 </div>
                              ) : (
                                 <button className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-gray-50 py-4 text-xs font-black uppercase tracking-widest text-gray-400 transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 active:scale-95">
                                    <RotateCcw className="h-4 w-4" /> Đặt lại món này
                                 </button>
                              )}
                              <button className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-white ring-1 ring-gray-100 text-gray-400 transition-all duration-300 hover:text-orange-600 hover:ring-orange-200 hover:shadow-md active:scale-95">
                                 <ReceiptText className="h-5 w-5" />
                              </button>
                           </div>
                        </div>
                     </div>
                  </article>
                );
             })
           )}
        </div>
      </main>
    </div>
  );
}
