import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  AlertCircle, ArrowLeft, Banknote, CheckCircle2, 
  CreditCard, MapPin, Phone, RotateCcw, TicketPercent, 
  Truck, Wallet, ChevronRight, ShoppingBag, Clock3, ShieldCheck
} from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewBranches, userPreviewOffers } from '../data/userPreviewData';
import { showToast } from '../../utils/toast';

const STEPS = ['Địa chỉ', 'Vận chuyển', 'Thanh toán'];

export function UserCheckout() {
  const { user, cart, clearCart } = useUserAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(userPreviewBranches[0].id);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = orderType === 'delivery' ? 15000 : 0;
  const discount = appliedVoucher ? 20000 : (subtotal >= 99000 ? 10000 : 0);
  const total = subtotal + shippingFee - discount;

  const selectedBranchData = userPreviewBranches.find((b) => b.id === selectedBranch) || userPreviewBranches[0];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    showToast.success('Đặt hàng thành công! Cảm ơn bạn đã ủng hộ.');
    clearCart();
    setOrderSuccess(true);
    setIsProcessing(false);
  };

  if (orderSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-center">
        <div className="relative mb-10 h-32 w-32">
           <div className="absolute inset-0 animate-ping rounded-full bg-emerald-50" />
           <div className="relative flex h-full w-full items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="h-16 w-16" strokeWidth={3} />
           </div>
        </div>
        
        <h1 className="font-heading text-4xl font-black text-[#2D1606]">Tuyệt vời!</h1>
        <p className="mt-4 text-base font-medium text-gray-500 max-w-sm">
           Đơn hàng <span className="font-black text-orange-600">#CHIPS-{Math.floor(Math.random()*90000 + 10000)}</span> đã được gửi tới chi nhánh. Chúng tôi đang bắt đầu pha chế.
        </p>

        <div className="mt-10 w-full max-w-sm space-y-3">
           <Link to="/app/orders" className="flex w-full items-center justify-center gap-3 rounded-[24px] bg-[#2D1606] py-5 text-sm font-black uppercase tracking-widest text-white shadow-2xl active:scale-95 transition-all">
              Theo dõi đơn hàng <ChevronRight className="h-5 w-5" />
           </Link>
           <Link to="/app/menu" className="flex w-full items-center justify-center gap-3 rounded-[24px] bg-gray-50 py-5 text-sm font-black text-[#2D1606] active:scale-95 transition-all">
              Tiếp tục mua sắm
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-40">
      {/* ─── MINI HEADER ─── */}
      <header className="sticky top-0 z-40 bg-white/80 p-4 backdrop-blur-xl border-b border-gray-100">
         <div className="mx-auto flex max-w-6xl items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50 text-[#2D1606]">
               <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-black uppercase tracking-widest text-[#2D1606]">Thanh toán đơn hàng</h1>
            <div className="w-10" />
         </div>
      </header>

      <main className="mx-auto mt-8 max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* ─── LEFT: FLOW ─── */}
          <div className="space-y-6">
            {/* Delivery Address & Type */}
            <section className="rounded-[40px] bg-white p-8 shadow-sm border border-gray-50">
               <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                     <MapPin className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-black text-[#2D1606]">Địa chỉ nhận hàng</h2>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-6">
                  <button 
                    onClick={() => setOrderType('delivery')}
                    className={`flex flex-col items-center gap-3 rounded-3xl p-6 transition-all border-2 ${
                       orderType === 'delivery' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-50 bg-gray-50/30'
                    }`}
                  >
                     <Truck className={`h-8 w-8 ${orderType === 'delivery' ? 'text-orange-600' : 'text-gray-300'}`} />
                     <span className={`text-[10px] font-black uppercase tracking-widest ${orderType === 'delivery' ? 'text-orange-600' : 'text-gray-400'}`}>Giao hàng</span>
                  </button>
                  <button 
                    onClick={() => setOrderType('pickup')}
                    className={`flex flex-col items-center gap-3 rounded-3xl p-6 transition-all border-2 ${
                       orderType === 'pickup' ? 'border-orange-500 bg-orange-50/50' : 'border-gray-50 bg-gray-50/30'
                    }`}
                  >
                     <ShoppingBag className={`h-8 w-8 ${orderType === 'pickup' ? 'text-orange-600' : 'text-gray-300'}`} />
                     <span className={`text-[10px] font-black uppercase tracking-widest ${orderType === 'pickup' ? 'text-orange-600' : 'text-gray-400'}`}>Tự đến lấy</span>
                  </button>
               </div>

               <div className="rounded-[32px] bg-[#FAFAFA] p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ĐỊA CHỈ SMART</span>
                     <button className="text-[10px] font-black text-orange-600 uppercase">THAY ĐỔI</button>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100 uppercase font-black text-[10px]">
                        HM
                     </div>
                     <div>
                        <div className="text-sm font-black text-[#2D1606]">Nhà của tôi</div>
                        <p className="mt-1 text-xs font-medium text-gray-500 leading-relaxed">
                           Chips Building, 123 Nguyễn Huệ, Quận 1, Hồ Chí Minh
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-[11px] font-bold text-gray-400">
                           <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> 0901 234 567</span>
                           <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> 15-25 phút</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-[40px] bg-white p-8 shadow-sm border border-gray-100">
               <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                     <CreditCard className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-black text-[#2D1606]">Thanh toán</h2>
               </div>

                <div className="space-y-3">
                  {[
                    { id: 'cash', label: 'Tiền mặt', icon: Banknote, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { id: 'wallet', label: 'Ví MoMo / ZaloPay', icon: Wallet, color: 'text-pink-500', bg: 'bg-pink-50' },
                    { id: 'card', label: 'Thẻ ATM / Visa', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-50' }
                  ].map(m => (
                    <div key={m.id}>
                      <button 
                        onClick={() => {
                          setPaymentMethod(m.id as any);
                          showToast.success('Đã chọn ' + m.label);
                        }}
                        className={`flex w-full items-center justify-between rounded-[28px] p-5 transition-all border-2 ${
                          paymentMethod === m.id ? 'border-[#2D1606] bg-[#2D1606] text-white' : 'border-gray-50 bg-[#FAFAFA] hover:border-gray-100'
                        }`}
                      >
                         <div className="flex items-center gap-4">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${paymentMethod === m.id ? 'bg-white/10' : m.bg + ' ' + m.color}`}>
                               <m.icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-black">{m.label}</span>
                         </div>
                         <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === m.id ? 'border-orange-500 bg-orange-500' : 'border-gray-200'
                         }`}>
                            {paymentMethod === m.id && <CheckCircle2 className="h-4 w-4 text-white" />}
                         </div>
                      </button>

                      {/* Payment Details Sub-forms */}
                      {paymentMethod === m.id && m.id === 'wallet' && (
                        <div className="mt-4 p-6 rounded-[32px] bg-white border-2 border-pink-100 flex flex-col items-center animate-in zoom-in-95 duration-300">
                          <div className="bg-white p-3 rounded-2xl shadow-xl mb-4 border border-gray-100">
                             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CHIPS-PAYMENT" className="w-32 h-32" alt="QR Payment" />
                          </div>
                          <div className="text-center">
                             <div className="text-xs font-black text-[#2D1606] uppercase tracking-widest mb-1">Quét để thanh toán</div>
                             <p className="text-[10px] font-medium text-gray-400">Vui lòng quét mã MoMo/ZaloPay để hoàn tất đơn hàng</p>
                          </div>
                        </div>
                      )}

                      {paymentMethod === m.id && m.id === 'card' && (
                        <div className="mt-4 p-6 rounded-[32px] bg-white border-2 border-blue-100 space-y-4 animate-in slide-in-from-top-4 duration-300">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Thông tin thẻ</span>
                              <div className="flex gap-2">
                                 <div className="h-6 w-10 bg-gray-100 rounded-md"></div>
                                 <div className="h-6 w-10 bg-gray-100 rounded-md"></div>
                              </div>
                           </div>
                           <input placeholder="Số thẻ (xxxx xxxx xxxx xxxx)" className="w-full bg-gray-50 rounded-2xl px-5 py-4 text-xs font-bold outline-none border border-transparent focus:border-blue-400 transition-all" />
                           <div className="grid grid-cols-2 gap-3">
                              <input placeholder="MM/YY" className="bg-gray-50 rounded-2xl px-5 py-4 text-xs font-bold outline-none border border-transparent focus:border-blue-400 transition-all" />
                              <input placeholder="CVC" className="bg-gray-50 rounded-2xl px-5 py-4 text-xs font-bold outline-none border border-transparent focus:border-blue-400 transition-all" />
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* ─── RIGHT: SUMMARY ─── */}
          <aside className="lg:sticky lg:top-28">
             <div className="rounded-[40px] bg-white p-8 shadow-2xl border border-orange-50 relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-6 opacity-5">
                   <ShoppingBag className="h-32 w-32" />
                </div>

                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Tóm tắt đơn hàng</h3>
                
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto no-scrollbar">
                   {cart.map(item => (
                      <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                         <img src={item.image} className="h-14 w-14 rounded-2xl object-cover" alt="" />
                         <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-[#2D1606] truncate">{item.name}</h4>
                            <div className="mt-1 text-[10px] font-bold text-gray-400">
                               x{item.quantity} • Size {item.size} • {item.sugar} Sugar
                            </div>
                         </div>
                         <div className="text-xs font-black text-orange-600">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                         </div>
                      </div>
                   ))}
                </div>

                {/* Voucher box */}
                <div className="relative mb-8 overflow-hidden rounded-[24px] bg-orange-50 p-4">
                   <div className="flex items-center gap-3 text-[11px] font-black text-orange-600 uppercase tracking-widest">
                      <TicketPercent className="h-4 w-4" /> Có mã giảm giá?
                   </div>
                   <div className="mt-3 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Nhập mã..." 
                        className="flex-1 rounded-xl bg-white border-none px-4 py-2 text-xs font-black text-[#2D1606] outline-none"
                      />
                      <button className="rounded-xl bg-[#2D1606] px-4 py-2 text-[10px] font-black text-white">DÙNG</button>
                   </div>
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-6">
                   <div className="flex justify-between text-xs font-bold text-gray-500">
                      <span>Tạm tính</span>
                      <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold text-gray-500">
                      <span>Phí giao hàng</span>
                      <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
                   </div>
                   {discount > 0 && (
                      <div className="flex justify-between text-xs font-bold text-emerald-500">
                         <span>Giảm giá Chips</span>
                         <span>-{discount.toLocaleString('vi-VN')}đ</span>
                      </div>
                   )}
                   <div className="flex justify-between items-baseline pt-4">
                      <span className="text-sm font-black text-[#2D1606]">Tổng cộng</span>
                      <span className="text-3xl font-black text-orange-600 tracking-tighter">{total.toLocaleString('vi-VN')}đ</span>
                   </div>
                </div>

                <div className="mt-10 space-y-4">
                   <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="group relative w-full overflow-hidden rounded-[24px] bg-[#2D1606] py-5 text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95 disabled:opacity-70"
                   >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                         {isProcessing ? 'Đang xác nhận...' : 'Xác nhận đặt hàng'} <ChevronRight className="h-5 w-5" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-all" />
                   </button>
                   <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400">
                      <ShieldCheck className="h-3 w-3" /> Thanh toán an toàn theo chuẩn Chips
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
