import { useEffect, useState } from 'react';
import { 
  Clock3, MapPin, PackageCheck, ReceiptText, 
  RotateCcw, Truck, CheckCircle2, XCircle, 
  ChefHat, Navigation, Bike, ChevronRight, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router';
import { OrderService } from '../../services/OrderService';
import { useUserAuth } from '../../context/UserAuthContext';

const orderStatusConfig = {
  pending: {
    label: 'Chờ xử lý',
    color: 'bg-amber-50 text-amber-600',
    iconBg: 'bg-amber-100',
    icon: Clock3,
    progress: 25,
    eta: 'Đang xác nhận...',
  },
  confirmed: {
    label: 'Đã xác nhận',
    color: 'bg-blue-50 text-blue-600',
    iconBg: 'bg-blue-100',
    icon: CheckCircle2,
    progress: 40,
    eta: 'Chờ pha chế',
  },
  preparing: {
    label: 'Đang pha chế',
    color: 'bg-orange-50 text-orange-600',
    iconBg: 'bg-orange-100',
    icon: ChefHat,
    progress: 60,
    eta: '10-15 phút',
  },
  ready: {
    label: 'Đang giao',
    color: 'bg-blue-50 text-blue-600',
    iconBg: 'bg-blue-100',
    icon: Bike,
    progress: 85,
    eta: '08 phút nữa',
  },
  completed: {
    label: 'Hoàn tất',
    color: 'bg-emerald-50 text-emerald-600',
    iconBg: 'bg-emerald-100',
    icon: CheckCircle2,
    progress: 100,
    eta: 'Đã giao',
  },
  cancelled: {
    label: 'Đã hủy',
    color: 'bg-rose-50 text-rose-600',
    iconBg: 'bg-rose-100',
    icon: XCircle,
    progress: 0,
    eta: '--',
  },
};

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả', icon: ShoppingBag },
  { key: 'pending', label: 'Chờ', icon: Clock3 },
  { key: 'ready', label: 'Đang giao', icon: Bike },
  { key: 'completed', label: 'Hoàn tất', icon: CheckCircle2 },
];

export function UserOrders() {
  const { user } = useUserAuth();
  const [orders, setOrders] = useState(OrderService.getAllOrders());
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const handleRefresh = () => {
      setOrders(OrderService.getAllOrders());
    };
    window.addEventListener('storage', handleRefresh);
    const interval = setInterval(handleRefresh, 3000); // Polling for real-time updates
    return () => {
      window.removeEventListener('storage', handleRefresh);
      clearInterval(interval);
    };
  }, []);

  const myOrders = user 
    ? orders.filter(o => o.customerId === user.id)
    : orders; // If guest, show all orders for demo purposes

  const filteredOrders = filter === 'all'
    ? myOrders
    : myOrders.filter((o) => {
        if (filter === 'pending') return ['pending', 'confirmed', 'preparing'].includes(o.status);
        if (filter === 'ready') return o.status === 'ready';
        if (filter === 'completed') return o.status === 'completed';
        return o.status === filter;
      });

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
        <div className="flex items-center gap-1 rounded-[24px] bg-white/80 backdrop-blur-xl p-1 shadow-[0_15px_35px_rgba(93,46,15,0.08)] ring-1 ring-black/5 sm:gap-2 sm:rounded-[32px] sm:p-2 anim-scale-in">
           {FILTER_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 rounded-[18px] py-2 sm:py-3 transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#2D1606] text-white shadow-lg scale-[1.02]' 
                      : 'text-[#A0845C] hover:text-[#2D1606] hover:bg-orange-50/40'
                  }`}
                >
                   <Icon size={isActive ? 16 : 14} className={`${isActive ? 'text-orange-400' : 'opacity-60'} sm:w-[18px] sm:h-[18px]`} />
                   <span className={`text-[9px] font-bold uppercase tracking-tighter sm:text-[11px] sm:tracking-widest ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                      {tab.label}
                   </span>
                </button>
              );
           })}
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
                const isActiveState = ['preparing', 'pending', 'confirmed', 'ready'].includes(order.status);

                return (
                  <article 
                    key={order.id} 
                    className="overflow-hidden rounded-[40px] bg-white shadow-sm ring-1 ring-gray-100 card-interactive group"
                  >
                     <div className="flex flex-col lg:flex-row">
                         {/* Status Sidebar */}
                        <div className={`flex flex-col items-center justify-center px-8 py-8 lg:w-48 ${cfg.color} transition-all duration-700 relative overflow-hidden`}>
                           {/* Animated background pattern */}
                           {isActiveState && (
                             <div className="absolute inset-0 opacity-10">
                               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,currentColor_1.5px,transparent_1.5px)] bg-[length:16px_16px]" />
                             </div>
                           )}
                           <cfg.icon className={`h-12 w-12 relative z-10 ${isActiveState ? 'anim-float-badge' : ''}`} />
                           <span className="mt-4 text-[11px] font-black uppercase tracking-[0.2em] leading-none relative z-10">{cfg.label}</span>
                           <span className="mt-2 text-[9px] font-bold opacity-60 uppercase relative z-10">{order.date}</span>
                           
                           {/* Progress bar */}
                           {isActiveState && (
                             <div className="mt-5 w-full max-w-[120px] h-1.5 rounded-full bg-current/10 overflow-hidden relative z-10">
                               <div 
                                 className="h-full rounded-full bg-current transition-all duration-1000 ease-out" 
                                 style={{ width: `${cfg.progress}%` }}
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
                               {order.items.map((item: any) => (
                                  <div key={item.name || item.productName} className="flex items-center gap-3 rounded-2xl bg-[#F8F9FA] pl-2 pr-4 py-2 ring-1 ring-gray-100 transition-all duration-300 hover:ring-orange-200 hover:bg-white hover:shadow-sm">
                                     <div className="h-9 w-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-500">
                                        <ShoppingBag size={16} />
                                     </div>
                                     <div className="text-[11px] font-bold text-[#2D1606]">
                                        <span className="text-orange-600">x{item.quantity}</span> {item.name || item.productName}
                                     </div>
                                  </div>
                               ))}
                           </div>

                           <div className="mt-8 flex items-center gap-4">
                              {isActiveState ? (
                                  <div 
                                    onClick={() => setSelectedOrder(order)}
                                    className="flex-1 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer active:scale-[0.98]"
                                  >
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center gap-3">
                                          <div className="rounded-full bg-white/20 p-2">
                                             <Navigation className="h-4 w-4" />
                                          </div>
                                          <div>
                                             <div className="text-[9px] font-black uppercase tracking-widest opacity-80">Trạng thái hiện tại</div>
                                             <div className="text-xs font-black">{cfg.eta}</div>
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
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-white ring-1 ring-gray-100 text-gray-400 transition-all duration-300 hover:text-orange-600 hover:ring-orange-200 hover:shadow-md active:scale-95"
                              >
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

      {/* ─── ORDER DETAILS MODAL ─── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
           <div className="absolute inset-0 bg-[#2D1606]/40 backdrop-blur-md anim-fade-in" onClick={() => setSelectedOrder(null)} />
           <div className="relative w-full max-w-lg overflow-hidden rounded-[40px] bg-white shadow-2xl anim-scale-in">
              <div className="bg-[#2D1606] p-8 text-white">
                 <div className="flex items-center justify-between">
                    <div>
                       <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">Chi tiết đơn hàng</div>
                       <h3 className="mt-1 text-2xl font-black">#{selectedOrder.id}</h3>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 transition-colors">
                       <XCircle className="h-6 w-6" />
                    </button>
                 </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-8 no-scrollbar">
                 <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                       <div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Thời gian đặt</div>
                          <div className="text-sm font-bold text-[#2D1606]">{selectedOrder.date} - {selectedOrder.time}</div>
                       </div>
                       <div className="text-right">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Hình thức</div>
                          <div className="text-sm font-bold text-[#2D1606] uppercase">{selectedOrder.type === 'delivery' ? 'Giao hàng' : 'Tự lấy'}</div>
                       </div>
                    </div>

                    <div>
                       <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Món đã chọn</div>
                       <div className="space-y-4">
                          {selectedOrder.items.map((item: any) => (
                             <div key={item.name || item.productName} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[10px] font-black text-orange-600">x{item.quantity}</div>
                                   <span className="text-sm font-bold text-[#2D1606]">{item.name || item.productName}</span>
                                </div>
                                <span className="text-sm font-black text-gray-400">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="rounded-[32px] bg-gray-50 p-6">
                       <div className="space-y-3">
                          <div className="flex justify-between text-xs font-bold text-gray-500">
                             <span>Tạm tính</span>
                             <span>{(selectedOrder.total - (selectedOrder.type === 'delivery' ? 15000 : 0)).toLocaleString('vi-VN')}đ</span>
                          </div>
                          {selectedOrder.type === 'delivery' && (
                             <div className="flex justify-between text-xs font-bold text-gray-500">
                                <span>Phí giao hàng</span>
                                <span>15.000đ</span>
                             </div>
                          )}
                          <div className="flex justify-between pt-3 border-t border-gray-200">
                             <span className="text-sm font-black text-[#2D1606]">Tổng cộng</span>
                             <span className="text-xl font-black text-orange-600">{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                       <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shrink-0">
                          <PackageCheck className="h-6 w-6" />
                       </div>
                       <div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Phương thức thanh toán</div>
                          <div className="text-sm font-bold text-[#2D1606]">{selectedOrder.payment || 'Tiền mặt'}</div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 pt-0">
                 <button 
                  onClick={() => setSelectedOrder(null)}
                  className="w-full rounded-2xl bg-[#2D1606] py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-orange-600 active:scale-95"
                 >
                    Đóng cửa sổ
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
