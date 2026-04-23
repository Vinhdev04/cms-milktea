import { Link, useNavigate } from 'react-router';
import { Minus, Plus, ShoppingBag, TicketPercent, Trash2 } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewOffers, userPreviewProducts } from '../data/userPreviewData';

export function UserCart() {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart } = useUserAuth();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = cart.length > 0 ? 15000 : 0;
  const total = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-6 text-center bg-gray-50">
        <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-300 mb-6">
           <ShoppingBag className="h-10 w-10" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Giỏ hàng trống</h1>
        <p className="text-xs text-gray-400 mt-2 max-w-xs">Có vẻ như bạn chưa chọn món nào. Hãy quay lại menu để bắt đầu!</p>
        <Link to="/app/menu" className="mt-8 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm">
           Khám phá ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-sans">
      {/* ─── HEADER ─── */}
      <header className="px-6 pt-8 pb-6 bg-white border-b border-gray-100">
         <h1 className="text-xl font-bold text-gray-900">Giỏ hàng</h1>
      </header>

      {/* ─── CONTENT ─── */}
      <div className="p-6 space-y-4 pb-10">
        {cart.map((item) => (
          <div key={`${item.productId}-${item.size}-${item.sugar}`} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4">
             <img src={item.image} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
             <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                   <div className="flex justify-between items-start">
                      <h2 className="text-sm font-bold text-gray-900 truncate pr-2">{item.name}</h2>
                      <button onClick={() => removeFromCart(item.productId)} className="text-gray-300 hover:text-red-500">
                         <Trash2 className="h-4 w-4" />
                      </button>
                   </div>
                   <p className="text-[10px] text-gray-400 mt-0.5">Size {item.size} • Đường {item.sugar} • Đá {item.ice}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                   <div className="text-sm font-bold text-orange-500">{item.price.toLocaleString('vi-VN')}đ</div>
                   <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button onClick={() => updateCartItem(item.productId, item.quantity - 1)} className="h-6 w-6 flex items-center justify-center rounded bg-white text-gray-900 shadow-sm"><Minus className="h-3 w-3" /></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartItem(item.productId, item.quantity + 1)} className="h-6 w-6 flex items-center justify-center rounded bg-white text-gray-900 shadow-sm"><Plus className="h-3 w-3" /></button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-100 p-6 space-y-4">
         <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
               <span>Tạm tính</span>
               <span>{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
               <span>Phí giao hàng</span>
               <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-2">
               <span>Tổng cộng</span>
               <span className="text-orange-500 text-lg">{total.toLocaleString('vi-VN')}đ</span>
            </div>
         </div>
         <button onClick={() => navigate('/app/checkout')} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-black/10">
            Tiến hành thanh toán
         </button>
      </footer>
    </div>
  );
}
