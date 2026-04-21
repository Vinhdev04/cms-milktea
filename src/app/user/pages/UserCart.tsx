import { Link, useNavigate } from 'react-router';
import { Minus, Plus, ShoppingBag, TicketPercent, Trash2 } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewOffers, userPreviewProducts } from '../data/userPreviewData';

export function UserCart() {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, clearCart } = useUserAuth();

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = cart.length > 0 ? 15000 : 0;
  const discount = subtotal >= 99000 ? 20000 : 0;
  const total = subtotal + shippingFee - discount;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="surface-card rounded-[36px] p-10 text-center">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFF0E2,#FFE2BE)] text-[#E56A00]">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="mt-5 font-heading text-3xl font-extrabold text-[#2D1606]">Giỏ hàng đang trống</h1>
          <p className="mt-3 text-sm leading-7 text-[#8A552A]">Luồng thanh toán chỉ thật sự rõ khi khách đã chọn món và thấy được ưu đãi áp dụng.</p>
          <Link to="/app/menu" className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8A1F] to-[#E56A00] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5">
            Khám phá thực đơn
          </Link>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {userPreviewProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="rounded-[24px] bg-[linear-gradient(180deg,#FFF8F0_0%,#FFEED9_100%)] p-4 text-left">
                <div className="text-sm font-bold text-[#2D1606]">{product.name}</div>
                <div className="mt-1 text-sm text-[#8A552A]">{product.price.toLocaleString('vi-VN')}đ</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px] sm:px-6">
      <section className="space-y-4">
        {cart.map((item) => (
          <article key={`${item.productId}-${item.size}-${item.sugar}`} className="surface-card rounded-[28px] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img src={item.image} alt={item.name} className="h-28 w-full rounded-2xl object-cover sm:w-28" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-[#2D1606]">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#8A552A]">Size {item.size} • Đường {item.sugar} • Đá {item.ice}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF3E7] text-[#8A552A] transition-all hover:text-[#D9480F]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xl font-extrabold text-[#E56A00]">{item.price.toLocaleString('vi-VN')}đ</div>
                  <div className="inline-flex items-center gap-3 rounded-full bg-[#FFF7EE] px-3 py-2">
                    <button onClick={() => updateCartItem(item.productId, item.quantity - 1)} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#7A451A] shadow-sm"><Minus className="h-4 w-4" /></button>
                    <span className="min-w-6 text-center text-sm font-bold text-[#2D1606]">{item.quantity}</span>
                    <button onClick={() => updateCartItem(item.productId, item.quantity + 1)} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#7A451A] shadow-sm"><Plus className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="space-y-6">
        <div className="surface-card rounded-[32px] p-6">
          <h2 className="font-heading text-2xl font-extrabold text-[#2D1606]">Tóm tắt đơn hàng</h2>
          <div className="mt-5 space-y-4 text-sm text-[#7A451A]">
            <div className="flex items-center justify-between"><span>Tạm tính</span><span className="font-semibold text-[#2D1606]">{subtotal.toLocaleString('vi-VN')}đ</span></div>
            <div className="flex items-center justify-between"><span>Phí giao hàng</span><span className="font-semibold text-[#2D1606]">{shippingFee.toLocaleString('vi-VN')}đ</span></div>
            <div className="flex items-center justify-between"><span>Voucher áp dụng</span><span className="font-semibold text-[#E56A00]">-{discount.toLocaleString('vi-VN')}đ</span></div>
            <div className="flex items-center justify-between border-t border-dashed border-[#ECD6C5] pt-4 text-base font-bold text-[#2D1606]"><span>Tổng cộng</span><span className="text-[#E56A00]">{total.toLocaleString('vi-VN')}đ</span></div>
          </div>
          <button onClick={() => navigate('/app/checkout')} className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF8A1F] to-[#E56A00] px-5 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5">Tiến hành thanh toán</button>
          <button onClick={clearCart} className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[#F2D5BA] bg-white px-5 py-3 text-sm font-semibold text-[#7A451A] transition-all hover:bg-[#FFF0E2]">Xóa toàn bộ giỏ hàng</button>
        </div>

        <div className="surface-card rounded-[32px] p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#C46A18]"><TicketPercent className="h-4 w-4" />Voucher khả dụng</div>
          <div className="space-y-3">
            {userPreviewOffers.map((offer) => (
              <div key={offer.id} className="rounded-[24px] bg-[linear-gradient(180deg,#FFF8F0_0%,#FFEFD9_100%)] p-4">
                <div className="text-sm font-bold text-[#2D1606]">{offer.title}</div>
                <div className="mt-1 text-sm text-[#8A552A]">{offer.discountLabel}</div>
                <div className="mt-2 text-xs font-semibold text-[#A05A22]">Mã {offer.code}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
