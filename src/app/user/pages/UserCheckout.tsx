import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  ArrowLeft, CheckCircle2, MapPin, 
} from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { showToast } from '../../utils/toast';
import { OrderService } from '../../services/OrderService';

export function UserCheckout() {
  const { user, cart, clearCart } = useUserAuth();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = orderType === 'delivery' ? 15000 : 0;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = async () => {
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

    await new Promise(r => setTimeout(r, 1500));
    OrderService.saveOrder(newOrder);
    setLastOrderId(newOrder.id);
    showToast.success('Đặt hàng thành công');
    clearCart();
    setOrderSuccess(true);
    setIsProcessing(false);
  };

  if (orderSuccess) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-6" />
        <h1 className="text-2xl font-bold text-gray-900">Đặt hàng thành công!</h1>
        <p className="mt-2 text-sm text-gray-500">Mã đơn hàng: <span className="font-bold">#{lastOrderId}</span></p>
        <div className="mt-10 space-y-3 w-full max-w-xs">
           <Link to="/app/orders" className="block w-full bg-gray-900 text-white py-4 rounded-xl text-sm font-bold">Theo dõi đơn hàng</Link>
           <Link to="/app/menu" className="block w-full bg-gray-50 text-gray-900 py-4 rounded-xl text-sm font-bold">Quay lại menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans">
      <header className="bg-white p-4 border-b border-gray-100 flex items-center gap-4">
         <button onClick={() => navigate(-1)} className="text-gray-900"><ArrowLeft className="h-5 w-5" /></button>
         <h1 className="text-sm font-bold">Thanh toán</h1>
      </header>

      <div className="p-4">
        <div className="mx-auto max-w-2xl space-y-4">
           {/* Address */}
           <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Địa chỉ nhận hàng</h2>
              <div className="flex gap-2 mb-6">
                 <button onClick={() => setOrderType('delivery')} className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${orderType === 'delivery' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500'}`}>Giao hàng</button>
                 <button onClick={() => setOrderType('pickup')} className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all ${orderType === 'pickup' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500'}`}>Lấy tại quán</button>
              </div>
              <div className="flex items-center gap-3">
                 <MapPin className="h-5 w-5 text-gray-400" />
                 <div>
                    <div className="text-sm font-bold text-gray-900">Nhà của tôi</div>
                    <p className="text-xs text-gray-500">Chips Building, 123 Nguyễn Huệ, Quận 1</p>
                 </div>
              </div>
           </section>

           {/* Payment */}
           <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Thanh toán</h2>
              <div className="space-y-2">
                 {[
                   { id: 'cash', label: 'Tiền mặt' },
                   { id: 'wallet', label: 'Ví điện tử' },
                   { id: 'card', label: 'Thẻ ngân hàng' }
                 ].map(m => (
                   <button key={m.id} onClick={() => setPaymentMethod(m.id as any)} className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${paymentMethod === m.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}>
                      <span className="text-xs font-bold">{m.label}</span>
                      {paymentMethod === m.id && <CheckCircle2 className="h-4 w-4 text-orange-500" />}
                   </button>
                 ))}
              </div>
           </section>

           {/* Summary */}
           <section className="bg-white rounded-2xl p-6 shadow-sm mb-24">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Đơn hàng</h2>
              <div className="space-y-3 mb-4">
                 {cart.map(item => (
                   <div key={item.productId} className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">{item.name} x{item.quantity}</span>
                      <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                   </div>
                 ))}
              </div>
              <div className="border-t border-gray-50 pt-4 space-y-2">
                 <div className="flex justify-between text-xs text-gray-400">
                    <span>Phí giao hàng</span>
                    <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
                 </div>
                 <div className="flex justify-between text-base font-bold text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-orange-500">{total.toLocaleString('vi-VN')}đ</span>
                 </div>
              </div>
           </section>
        </div>
      </div>

      <footer className="flex-none p-4 bg-white border-t border-gray-100">
         <button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full max-w-2xl mx-auto block bg-gray-900 text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-black/10 active:scale-95 disabled:opacity-50">
            {isProcessing ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
         </button>
      </footer>
    </div>
  );
}
