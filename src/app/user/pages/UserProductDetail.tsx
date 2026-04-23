import { useParams, useNavigate, Link } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Heart,
  Leaf,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewProducts } from '../data/userPreviewData';

const SIZE_OPTIONS = [
  { value: 'S', label: 'Nhỏ', volume: '350ml', priceModifier: -5000, note: 'Nhẹ bụng' },
  { value: 'M', label: 'Vừa', volume: '500ml', priceModifier: 0, note: 'Phổ biến nhất' },
  { value: 'L', label: 'Lớn', volume: '700ml', priceModifier: 5000, note: 'Uống đã hơn' },
] as const;

const SUGAR_OPTIONS = ['30%', '50%', '70%', '100%'] as const;
const ICE_OPTIONS = ['Không đá', '50%', '70%', '100%'] as const;

function SectionHeader({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-black text-[#2D1606]">{title}</h3>
        {subtitle && <p className="mt-1 text-xs font-medium text-[#9C6A43]">{subtitle}</p>}
      </div>
      {tag && (
        <span className="rounded-full bg-[#2D1606] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
          {tag}
        </span>
      )}
    </div>
  );
}

export function UserProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useUserAuth();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [sugar, setSugar] = useState<(typeof SUGAR_OPTIONS)[number]>('50%');
  const [ice, setIce] = useState<(typeof ICE_OPTIONS)[number]>('50%');
  const [scrolled, setScrolled] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 180);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const product = useMemo(() => userPreviewProducts.find((item) => item.id === productId), [productId]);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-4xl">🏜️</div>
        <h1 className="text-2xl font-black text-[#2D1606]">Sản phẩm không tồn tại</h1>
        <p className="mt-2 text-gray-500">Món này có thể đã hết hạn hoặc tạm dừng phục vụ.</p>
        <Link to="/app/menu" className="mt-8 rounded-2xl bg-[#2D1606] px-8 py-3 text-sm font-bold text-white shadow-xl">
          Về thực đơn
        </Link>
      </div>
    );
  }

  const selectedSize = SIZE_OPTIONS.find((item) => item.value === size) ?? SIZE_OPTIONS[1];
  const unitPrice = product.price + selectedSize.priceModifier;
  const totalPrice = unitPrice * quantity;
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: unitPrice,
      image: product.image,
      quantity,
      size,
      sugar,
      ice,
      toppings: [],
    });
    navigate('/app/cart');
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] pb-40">
      <div
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-all duration-300 ${
          scrolled ? 'border-b border-[#F3DCC7] bg-white/95 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
            scrolled ? 'bg-[#FFF3E6] text-orange-600' : 'bg-white/90 text-[#2D1606] shadow-lg'
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className={`max-w-[58vw] truncate text-sm font-black text-[#2D1606] transition-all ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          {product.name}
        </div>
        <button
          onClick={() => toggleFavorite(product.id)}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
            scrolled ? 'bg-[#FFF3E6] text-orange-600' : 'bg-white/90 text-[#2D1606] shadow-lg'
          }`}
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-orange-500 text-orange-500' : ''}`} />
        </button>
      </div>

      <div className="relative h-[34vh] w-full overflow-hidden sm:h-[44vh]">
        <img src={product.image} className="h-full w-full object-cover" alt={product.name} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,22,6,0.04)_0%,rgba(45,22,6,0.12)_26%,rgba(45,22,6,0.72)_100%)]" />
        <div className="absolute bottom-5 left-4 right-4 text-white">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] backdrop-blur-md">
              {product.badge || 'Hot item'}
            </span>
            <span className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
              Gợi ý nổi bật
            </span>
          </div>
          <h1 className="max-w-[85%] text-[36px] font-extrabold leading-[1.02] drop-shadow-[0_8px_18px_rgba(0,0,0,0.2)]">
            {product.name}
          </h1>
        </div>
      </div>

      <main className="mx-auto -mt-6 max-w-2xl px-4">
        <section className="overflow-hidden rounded-[34px] border border-[#F4DDC8] bg-white p-5 shadow-[0_18px_50px_rgba(93,46,15,0.08)] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-orange-600">{unitPrice.toLocaleString('vi-VN')}đ</span>
                {product.originalPrice && (
                  <span className="text-base font-bold text-[#C7AA8D] line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF3E6] px-3 py-1.5 text-[11px] font-black text-orange-600">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {product.rating} ({product.reviews})
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F6FFF8] px-3 py-1.5 text-[11px] font-black text-emerald-600">
                  <Leaf className="h-3.5 w-3.5" />
                  Dễ uống
                </span>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#FFF8F0] px-4 py-3 text-right">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B47749]">Giao dự kiến</div>
              <div className="mt-1 text-sm font-black text-[#2D1606]">10-15 phút</div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-[#8A552A]">{product.description}</p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-[22px] bg-[#FFF8F0] p-3 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                <Clock3 className="h-5 w-5" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#B47749]">Thời gian</div>
              <div className="mt-1 text-xs font-black text-[#2D1606]">Nhanh</div>
            </div>
            <div className="rounded-[22px] bg-[#FFF8F0] p-3 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                <Truck className="h-5 w-5" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#B47749]">Phù hợp</div>
              <div className="mt-1 text-xs font-black text-[#2D1606]">Mang đi</div>
            </div>
            <div className="rounded-[22px] bg-[#FFF8F0] p-3 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#B47749]">Hương vị</div>
              <div className="mt-1 text-xs font-black text-[#2D1606]">Cân bằng</div>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] border border-[#F4DDC8] bg-[linear-gradient(180deg,#FFF8F1_0%,#FFF3E7_100%)] p-5 shadow-[0_12px_36px_rgba(93,46,15,0.05)]">
          <SectionHeader
            title="Chọn nhanh để đặt"
            subtitle="3 bước là có thể thêm vào giỏ ngay"
            tag="Mobile first"
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => {
                setSize('M');
                setSugar('50%');
                setIce('50%');
              }}
              className="rounded-[22px] border border-[#F0D6BE] bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md active:scale-[0.99]"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B47749]">Combo chuẩn</div>
              <div className="mt-2 text-base font-black text-[#2D1606]">Vừa • 50% đường</div>
              <div className="mt-1 text-xs font-medium text-[#9C6A43]">Lựa chọn an toàn, dễ uống</div>
            </button>
            <button
              type="button"
              onClick={() => {
                setSize('L');
                setSugar('70%');
                setIce('70%');
              }}
              className="rounded-[22px] border border-[#F0D6BE] bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md active:scale-[0.99]"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B47749]">Uống đã</div>
              <div className="mt-2 text-base font-black text-[#2D1606]">Lớn • 70% đường</div>
              <div className="mt-1 text-xs font-medium text-[#9C6A43]">Hợp vị đậm và topping</div>
            </button>
            <button
              type="button"
              onClick={() => {
                setSize('S');
                setSugar('30%');
                setIce('Không đá');
              }}
              className="rounded-[22px] border border-[#F0D6BE] bg-white px-4 py-4 text-left shadow-sm transition-all hover:border-orange-200 hover:shadow-md active:scale-[0.99]"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#B47749]">Nhẹ bụng</div>
              <div className="mt-2 text-base font-black text-[#2D1606]">Nhỏ • 30% đường</div>
              <div className="mt-1 text-xs font-medium text-[#9C6A43]">Dành cho uống nhẹ nhàng</div>
            </button>
          </div>
        </section>

        <div className="mt-5 space-y-5">
          <section className="rounded-[30px] border border-[#F4DDC8] bg-white p-5 shadow-sm">
            <SectionHeader title="Chọn kích cỡ" subtitle="Ảnh hưởng trực tiếp đến giá món" tag="Bắt buộc" />
            <div className="grid grid-cols-3 gap-3">
              {SIZE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSize(option.value)}
                  className={`relative rounded-[24px] border-2 p-4 text-left transition-all ${
                    size === option.value
                      ? 'border-orange-500 bg-orange-50 shadow-[0_10px_24px_rgba(245,130,32,0.12)]'
                      : 'border-[#F0D6BE] bg-[#FFFCF9] hover:border-orange-200'
                  }`}
                >
                  <div className={`text-2xl font-black ${size === option.value ? 'text-orange-600' : 'text-[#2D1606]'}`}>
                    {option.value}
                  </div>
                  <div className="mt-1 text-sm font-black text-[#2D1606]">{option.label}</div>
                  <div className="mt-1 text-[11px] font-bold text-[#9C6A43]">{option.volume}</div>
                  <div className="mt-2 text-[11px] font-black text-orange-500">
                    {option.priceModifier > 0 ? `+${option.priceModifier.toLocaleString('vi-VN')}đ` : option.priceModifier < 0 ? `${option.priceModifier.toLocaleString('vi-VN')}đ` : 'Giá gốc'}
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B47749]">
                    {option.note}
                  </div>
                  {size === option.value && (
                    <div className="absolute right-3 top-3 rounded-full bg-orange-600 p-1 text-white">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-[#F4DDC8] bg-white p-5 shadow-sm">
            <SectionHeader title="Điều chỉnh vị" subtitle="Chỉ giữ lại những lựa chọn cần cho đặt hàng nhanh" />

            <div className="space-y-4">
              <div>
                <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#B47749]">Đường</div>
                <div className="flex flex-wrap gap-2">
                  {SUGAR_OPTIONS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSugar(level)}
                      className={`flex h-10 min-w-[72px] items-center justify-center rounded-xl px-3 text-xs font-black transition-all ${
                        sugar === level ? 'bg-[#2D1606] text-white shadow-md' : 'bg-[#F7F1EA] text-[#7A573B] hover:bg-[#F1E6DA]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#B47749]">Đá</div>
                <div className="flex flex-wrap gap-2">
                  {ICE_OPTIONS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setIce(level)}
                      className={`flex h-10 min-w-[84px] items-center justify-center rounded-xl px-3 text-xs font-black transition-all ${
                        ice === level ? 'bg-orange-500 text-white shadow-md' : 'bg-[#F7F1EA] text-[#7A573B] hover:bg-[#F1E6DA]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[30px] border border-[#F4DDC8] bg-white p-5 shadow-sm">
            <SectionHeader title="Ghi chú thêm" subtitle="Tuỳ chọn, chỉ dùng khi thật sự cần" />
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ví dụ: ít ngọt hơn bình thường, không cần ống hút..."
              className="h-24 w-full rounded-[22px] bg-[#F9F4EE] p-4 text-sm font-medium text-[#2D1606] outline-none transition-all placeholder:text-[#C1A286] focus:ring-4 focus:ring-orange-500/10"
            />
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[env(safe-area-inset-bottom,12px)] lg:p-8">
        <div className="mx-auto max-w-xl rounded-[26px] bg-[#2D1606] p-2 shadow-[0_18px_50px_rgba(45,22,6,0.34)]">
          <div className="mb-2 rounded-[20px] bg-white/8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
            {selectedSize.label} • {sugar} đường • {ice}
          </div>
          <div className="flex overflow-hidden rounded-[22px]">
            <div className="flex flex-1 items-center justify-between border-r border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#2D1606] active:scale-90"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[18px] text-center text-sm font-black text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white active:scale-90"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="text-right">
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-white/50">Tổng</div>
                <div className="mt-1 text-lg font-black text-white">{totalPrice.toLocaleString('vi-VN')}đ</div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex flex-1 flex-col items-center justify-center gap-1 bg-gradient-to-br from-[#FF8A1F] to-[#E56A00] px-3 py-3 text-white transition-colors hover:from-[#E56A00] hover:to-[#CC5E00]"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-[11px] font-black uppercase tracking-[0.16em]">Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
