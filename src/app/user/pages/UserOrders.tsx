import { useEffect, useState } from 'react';
import { 
  Clock3, MapPin, PackageCheck, ReceiptText, 
  RotateCcw, Truck, CheckCircle2, XCircle, 
  ChefHat, Navigation, Bike, ChevronRight, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router';
import { OrderService } from '../../services/OrderService';
import { useUserAuth } from '../../context/UserAuthContext';
import { showToast } from '../../utils/toast';

const orderStatusConfig = {
  pending: { label: 'Chờ xử lý', color: 'bg-amber-50 text-amber-600' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-50 text-blue-600' },
  preparing: { label: 'Đang pha chế', color: 'bg-orange-50 text-orange-600' },
  ready: { label: 'Đang giao', color: 'bg-blue-50 text-blue-600' },
  completed: { label: 'Hoàn tất', color: 'bg-emerald-50 text-emerald-600' },
  cancelled: { label: 'Đã hủy', color: 'bg-rose-50 text-rose-600' },
};

const FILTER_TABS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ' },
  { key: 'ready', label: 'Giao' },
  { key: 'completed', label: 'Xong' },
];

export function UserOrders() {
  const { user } = useUserAuth();
  const [orders, setOrders] = useState(OrderService.getAllOrders());
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const handleRefresh = () => setOrders(OrderService.getAllOrders());
    const interval = setInterval(handleRefresh, 5000);
    handleRefresh();
    return () => clearInterval(interval);
  }, []);

  const myOrders = user ? orders.filter(o => o.customerId === user.id) : orders;
  const filteredOrders = filter === 'all' ? myOrders : myOrders.filter(o => {
    if (filter === 'pending') return ['pending', 'confirmed', 'preparing'].includes(o.status);
    return o.status === filter;
  });

  return (
    <div className="bg-gray-50 font-sans">
      <header className="px-6 pt-8 pb-6 bg-white border-b border-gray-100">
         <h1 className="text-xl font-bold text-gray-900">Đơn hàng</h1>
         <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  filter === tab.key ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/10' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
         </div>
      </header>

      <div className="p-6 space-y-4">
         {filteredOrders.length === 0 ? (
           <div className="py-20 text-center text-gray-400 text-sm">Chưa có đơn hàng nào</div>
         ) : (
           filteredOrders.map(order => {
             const cfg = (orderStatusConfig as any)[order.status] || orderStatusConfig.pending;
             return (
               <div key={order.id} onClick={() => setSelectedOrder(order)} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">#{order.id}</div>
                        <h3 className="text-sm font-bold text-gray-900 mt-1">{order.branch || 'Chips Nguyễn Huệ'}</h3>
                     </div>
                     <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${cfg.color}`}>{cfg.label}</div>
                  </div>
                  <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                     <div className="text-xs text-gray-400">{order.date} • {order.items.length} món</div>
                     <div className="text-sm font-bold text-orange-500">{order.total.toLocaleString('vi-VN')}đ</div>
                  </div>
               </div>
             );
           })
         )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setSelectedOrder(null)} />
           <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold text-gray-900">Chi tiết đơn hàng</h2>
                 <button onClick={() => setSelectedOrder(null)} className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50"><XCircle className="h-4 w-4 text-gray-400" /></button>
              </div>
              <div className="space-y-4 mb-8">
                 <div className="max-h-[30vh] overflow-y-auto space-y-3 no-scrollbar">
                   {selectedOrder.items.map((item: any) => (
                     <div key={item.productName} className="flex justify-between text-xs">
                        <span className="text-gray-500">{item.productName} x{item.quantity}</span>
                        <span className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                     </div>
                   ))}
                 </div>
                 <div className="pt-4 border-t border-gray-50 flex justify-between font-bold text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-orange-500">{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
                 </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-sm">Đóng</button>
           </div>
        </div>
      )}
    </div>
  );
}
