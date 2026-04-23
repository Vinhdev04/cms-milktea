import { useState, useMemo } from 'react';
import { Trash2, Minus, Plus, ShoppingBag, X, MapPin, CreditCard, Wallet, Banknote, CheckCircle2, ChevronRight, Clock, Edit2 } from 'lucide-react';
import { useUserAuth, type CartItem } from '../../context/UserAuthContext';
import { useNavigate } from 'react-router';
import { showToast } from '../../utils/toast';
import { OrderService } from '../../services/OrderService';
import { ProductModal } from './ProductModal';
import { userPreviewProducts } from '../data/userPreviewData';

export function MiniCart({ onClose }: { onClose?: () => void }) {
  const { user, cart, updateCartItem, removeFromCart, clearCart } = useUserAuth();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'wallet' | 'card'>('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Edit State
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = orderType === 'delivery' ? 15000 : 0;
  const total = subtotal + shippingFee;

  const handleQuickOrder = async () => {
    setIsProcessing(true);
    const newOrder = {
      id: `CHIPS-${Math.floor(Math.random() * 90000 + 10000)}`,
      customerId: user?.id || 'guest',
      customerName: user?.name || 'Khách',
      total: total,
      status: 'pending' as const,
      type: orderType,
      createdAt: new Date().toISOString(),
      items: cart.map(item => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      phone: user?.phone || '—',
      payment: paymentMethod,
      time: new Date().toLocaleTimeString('vi-VN'),
      date: new Date().toLocaleDateString('vi-VN'),
      customerType: user ? 'member' as const : 'guest' as const,
    };

    await new Promise(r => setTimeout(r, 2000));
    OrderService.saveOrder(newOrder);
    showToast.success('Đặt hàng thành công');
    setIsSuccess(true);
    setIsProcessing(false);
    setTimeout(() => {
      clearCart();
      if (onClose) onClose();
      navigate('/app/orders');
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white animate-fade-in">
        <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6 animate-bounce-in">
           <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Tuyệt vời!</h3>
        <p className="text-xs text-gray-400 mt-2">Đơn hàng của bạn đang được chuẩn bị. Bạn sẽ được chuyển đến trang theo dõi đơn hàng trong giây lát.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
        <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
           <ShoppingBag className="h-8 w-8" />
        </div>
        <h3 className="text-sm font-bold text-gray-900">Giỏ hàng trống</h3>
        <p className="text-[10px] text-gray-400 mt-1">Hãy chọn món ngon bạn yêu thích nhé!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* ─── HEADER ─── */}
      <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-20">
         <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm">
               <ShoppingBag size={16} strokeWidth={2.5} />
            </div>
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tighter">Đơn hàng của bạn</h2>
         </div>
         {onClose && (
           <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
              <X size={20} className="text-gray-400" />
           </button>
         )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-8 pb-32">
        {/* ─── ITEMS LIST ─── */}
        <section>
          <div className="flex justify-between items-end mb-4">
             <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sản phẩm ({cart.length})</h3>
             <button onClick={() => navigate('/app/menu')} className="text-[10px] font-bold text-orange-500 flex items-center gap-1">Thêm món khác <ChevronRight size={10} /></button>
          </div>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.sugar}`} className="flex gap-4 group animate-slide-in">
                 <div className="relative h-16 w-16 shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full rounded-2xl object-cover shadow-sm" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-gray-900 text-white text-[10px] font-black rounded-lg flex items-center justify-center border-2 border-white">{item.quantity}</span>
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                       <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                       <div className="flex items-center gap-1">
                          <button onClick={() => setEditingItem(item)} className="text-gray-300 hover:text-orange-500 transition-colors p-1">
                             <Edit2 size={12} />
                          </button>
                          <button onClick={() => removeFromCart(item.productId)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                             <Trash2 size={12} />
                          </button>
                       </div>
                    </div>
                    <p className="text-[9px] font-medium text-gray-400 mt-0.5 bg-gray-50 inline-block px-1.5 py-0.5 rounded">Size {item.size} • {item.sugar} đường • {item.ice} đá</p>
                    <div className="flex justify-between items-center mt-2">
                       <div className="text-[11px] font-black text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                       <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-1 shadow-inner border border-gray-100/50">
                          <button onClick={() => updateCartItem(item.productId, item.quantity - 1)} className="h-6 w-6 flex items-center justify-center rounded-lg bg-white text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"><Minus size={10} strokeWidth={3} /></button>
                          <span className="text-[10px] font-black w-3 text-center text-gray-900">{item.quantity}</span>
                          <button onClick={() => updateCartItem(item.productId, item.quantity + 1)} className="h-6 w-6 flex items-center justify-center rounded-lg bg-white text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"><Plus size={10} strokeWidth={3} /></button>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── QUICK OPTIONS ─── */}
        <section className="space-y-6">
           {/* Order Type Toggle */}
           <div className="bg-gray-50 p-1.5 rounded-2xl flex gap-1.5">
              <button 
                onClick={() => setOrderType('delivery')}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${
                  orderType === 'delivery' ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' : 'text-gray-400'
                }`}
              >
                 <MapPin size={12} /> GIAO TẬN NƠI
              </button>
              <button 
                onClick={() => setOrderType('pickup')}
                className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-2 ${
                  orderType === 'pickup' ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' : 'text-gray-400'
                }`}
              >
                 <Clock size={12} /> ĐẾY LẤY
              </button>
           </div>

           {/* Branch/Address Info */}
           <div className="px-1 space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Địa chỉ & Thời gian</h3>
              <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm">
                 <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <MapPin size={14} />
                 </div>
                 <div className="min-w-0">
                    <p className="text-[11px] font-bold text-gray-900 truncate">Chips Nguyễn Huệ, Quận 1</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Thời gian chờ dự kiến: 15-20 phút</p>
                 </div>
              </div>
           </div>

           {/* Payment Methods */}
           <div className="px-1 space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hình thức thanh toán</h3>
              <div className="grid grid-cols-3 gap-2">
                 {[
                   { id: 'cash', icon: Banknote, label: 'Tiền mặt' },
                   { id: 'wallet', icon: Wallet, label: 'Ví Chips' },
                   { id: 'card', icon: CreditCard, label: 'Thẻ/QR' },
                 ].map(m => (
                   <button 
                     key={m.id}
                     onClick={() => setPaymentMethod(m.id as any)}
                     className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${
                       paymentMethod === m.id ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500/20' : 'border-gray-50 bg-gray-50/30'
                     }`}
                   >
                      <m.icon size={16} className={paymentMethod === m.id ? 'text-orange-500' : 'text-gray-400'} />
                      <span className={`text-[9px] font-black ${paymentMethod === m.id ? 'text-orange-600' : 'text-gray-400'}`}>{m.label}</span>
                   </button>
                 ))}
              </div>
           </div>
        </section>
      </div>

      {/* ─── SUMMARY & ORDER ─── */}
      <div className="p-5 bg-white border-t border-gray-100 space-y-4 absolute bottom-0 inset-x-0 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-30">
         <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
               <span>Tạm tính ({cart.length} món)</span>
               <span>{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            {orderType === 'delivery' && (
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
                 <span>Phí giao hàng</span>
                 <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
               <span className="text-xs font-black text-gray-900 uppercase">Tổng thanh toán</span>
               <span className="text-lg font-black text-orange-500">{total.toLocaleString('vi-VN')}đ</span>
            </div>
         </div>
         
         <button 
           onClick={handleQuickOrder}
           disabled={isProcessing}
           className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs shadow-xl shadow-black/10 hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
         >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ĐANG XỬ LÝ...
              </>
            ) : (
              <>ĐẶT HÀNG NGAY <ChevronRight size={14} /></>
            )}
         </button>
      </div>

      {/* ─── EDIT MODAL ─── */}
      {editingItem && (
        <ProductModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          editItem={editingItem}
          product={userPreviewProducts.find(p => p.id === editingItem.productId) || null}
        />
      )}
    </div>
  );
}
