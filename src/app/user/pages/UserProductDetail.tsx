import { useParams, useNavigate, Link } from 'react-router';
import { 
  ArrowLeft, CheckCircle2, Heart, Minus, Plus, 
  ShoppingBag, Star, TicketPercent, ChevronRight,
  Info, Clock3, Flame, Leaf, Coffee
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewProducts, userPreviewOffers } from '../data/userPreviewData';

// ─── Constants ────────────────────────────────────────────────────────────
const TOPPINGS = [
  { id: 'tranchau-den', label: 'Trân châu đen', price: 8000, emoji: '⚫' },
  { id: 'tranchau-trang', label: 'Trân châu trắng', price: 8000, emoji: '⚪' },
  { id: 'tranchau-nuong', label: 'Trân châu nướng', price: 10000, emoji: '🔥' },
  { id: 'kem-cheese', label: 'Kem cheese', price: 12000, emoji: '🧀' },
  { id: 'thach-dua', label: 'Thạch dừa', price: 7000, emoji: '🥥' },
  { id: 'pudding', label: 'Pudding trứng', price: 10000, emoji: '🍮' },
];

const SIZE_OPTIONS = [
  { value: 'S', label: 'Nhỏ', vol: '350ml', priceModifier: -5000 },
  { value: 'M', label: 'Vừa', vol: '500ml', priceModifier: 0 },
  { value: 'L', label: 'Lớn', vol: '700ml', priceModifier: 5000 },
];

const SUGAR_OPTIONS = ['0%', '30%', '50%', '70%', '100%'];
const ICE_OPTIONS = ['Không đá', '30%', '50%', '70%', '100%'];

export function UserProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useUserAuth();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [sugar, setSugar] = useState('50%');
  const [ice, setIce] = useState('50%');
  const [toppings, setToppings] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const product = useMemo(() => userPreviewProducts.find((p) => p.id === productId), [productId]);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-4xl mb-6">🏜️</div>
        <h1 className="text-2xl font-black text-[#2D1606]">Sản phẩm không tồn tại</h1>
        <p className="mt-2 text-gray-500">Món này có thể đã hết hạn hoặc tạm dừng phục vụ.</p>
        <Link to="/app/menu" className="mt-8 rounded-2xl bg-[#2D1606] px-8 py-3 text-sm font-bold text-white shadow-xl">
           Về thực đơn
        </Link>
      </div>
    );
  }

  const sizeModifier = SIZE_OPTIONS.find((s) => s.value === size)?.priceModifier ?? 0;
  const toppingTotal = toppings.reduce((sum, id) => {
    const t = TOPPINGS.find((t) => t.id === id);
    return sum + (t?.price ?? 0);
  }, 0);

  const unitPrice = product.price + sizeModifier + toppingTotal;
  const subtotal = unitPrice * quantity;
  const totalPrice = Math.max(0, subtotal - discountAmount);
  const favorited = isFavorite(product.id);

  const toggleTopping = (id: string) => {
    setToppings((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

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
      toppings,
    });
    navigate('/app/cart');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-40">
      {/* ─── HEADER BAR ─── */}
      <div className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <button onClick={() => navigate(-1)} className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
          scrolled ? 'bg-orange-50 text-orange-600' : 'bg-white/90 text-[#2D1606] shadow-lg'
        }`}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className={`text-sm font-black text-[#2D1606] transition-all ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
           {product.name}
        </div>
        <button onClick={() => toggleFavorite(product.id)} className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
          scrolled ? 'bg-orange-50 text-orange-600' : 'bg-white/90 text-[#2D1606] shadow-lg'
        }`}>
          <Heart className={`h-5 w-5 ${favorited ? 'fill-orange-500 text-orange-500' : ''}`} />
        </button>
      </div>

      {/* ─── HERO IMAGE ─── */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <img src={product.image} className="h-full w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-6 right-6 text-white">
           <div className="flex flex-wrap gap-2 mb-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                 BESTSELLER
              </span>
              <span className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                 SALE 20%
              </span>
           </div>
           <h1 className="font-heading text-4xl font-extrabold leading-tight">{product.name}</h1>
        </div>
      </div>

      <main className="mx-auto -mt-6 max-w-2xl px-4">
        {/* ─── INFO CARD ─── */}
        <section className="relative overflow-hidden rounded-[40px] bg-white p-8 shadow-xl">
           <div className="flex items-center justify-between">
              <div>
                 <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-orange-600">
                       {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-sm font-bold text-gray-400 line-through">
                       {(product.price * 1.2).toLocaleString('vi-VN')}đ
                    </span>
                 </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl bg-orange-50 px-4 py-2">
                 <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                 <span className="text-sm font-black text-orange-600">{product.rating}</span>
                 <span className="text-[10px] font-bold text-orange-300">({product.reviews ?? '500+'})</span>
              </div>
           </div>

           <p className="mt-6 text-sm leading-relaxed text-[#8A552A]">
              {product.description}
           </p>

           <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8 text-center">
              <div>
                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 mx-auto mb-2">
                    <Clock3 className="h-5 w-5" />
                 </div>
                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thời gian</div>
                 <div className="text-xs font-black text-[#2D1606]">10-15 Phút</div>
              </div>
              <div>
                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-500 mx-auto mb-2">
                    <Flame className="h-5 w-5" />
                 </div>
                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Calo</div>
                 <div className="text-xs font-black text-[#2D1606]">~240 kcal</div>
              </div>
              <div>
                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 mx-auto mb-2">
                    <Leaf className="h-5 w-5" />
                 </div>
                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loại</div>
                 <div className="text-xs font-black text-[#2D1606]">Organic</div>
              </div>
           </div>
        </section>

        {/* ─── CUSTOMIZATIONS ─── */}
        <div className="mt-6 space-y-6">
           {/* Size Selector */}
           <section className="rounded-[40px] bg-white p-8 border border-gray-50 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                 <h3 className="font-heading text-xl font-bold text-[#2D1606]">Kích cỡ đề xuất</h3>
                 <span className="rounded-lg bg-[#2D1606] px-2 py-1 text-[10px] font-black text-white">BẮT BUỘC</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                 {SIZE_OPTIONS.map(opt => (
                    <button
                       key={opt.value}
                       onClick={() => setSize(opt.value as any)}
                       className={`relative flex h-24 flex-col items-center justify-center rounded-[32px] transition-all border-2 ${
                          size === opt.value 
                          ? 'border-orange-500 bg-orange-50/50 shadow-inner' 
                          : 'border-gray-100 hover:border-orange-200'
                       }`}
                    >
                       <span className={`text-xl font-black ${size === opt.value ? 'text-orange-600' : 'text-gray-300'}`}>
                          {opt.value}
                       </span>
                       <span className="text-[10px] font-bold text-gray-500 uppercase">{opt.label}</span>
                       <span className="text-[9px] font-black text-orange-400">{opt.priceModifier > 0 ? `+${opt.priceModifier/1000}k` : opt.priceModifier < 0 ? `${opt.priceModifier/1000}k` : 'Gốc'}</span>
                       {size === opt.value && (
                          <div className="absolute -right-1 -top-1 rounded-full bg-orange-600 p-1 text-white ring-4 ring-white">
                             <CheckCircle2 className="h-3 w-3" />
                          </div>
                       )}
                    </button>
                 ))}
              </div>
           </section>

           {/* Sweetness */}
           <section className="rounded-[40px] bg-white p-8 border border-gray-50 shadow-sm">
              <h3 className="mb-6 font-heading text-xl font-bold text-[#2D1606]">Bao nhiêu đường?</h3>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
                 {SUGAR_OPTIONS.map(lvl => (
                    <button
                       key={lvl}
                       onClick={() => setSugar(lvl)}
                       className={`flex h-12 min-w-[70px] flex-shrink-0 items-center justify-center rounded-2xl text-xs font-black transition-all ${
                          sugar === lvl ? 'bg-[#2D1606] text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                       }`}
                    >
                       {lvl}
                    </button>
                 ))}
              </div>
           </section>

           {/* Ice */}
           <section className="rounded-[40px] bg-white p-8 border border-gray-50 shadow-sm">
              <h3 className="mb-6 font-heading text-xl font-bold text-[#2D1606]">Lượng đá thì sao?</h3>
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
                 {ICE_OPTIONS.map(lvl => (
                    <button
                       key={lvl}
                       onClick={() => setIce(lvl)}
                       className={`flex h-12 min-w-[100px] flex-shrink-0 items-center justify-center rounded-2xl text-xs font-black transition-all ${
                          ice === lvl ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                       }`}
                    >
                       {lvl}
                    </button>
                 ))}
              </div>
           </section>

           {/* Toppings Grid */}
           <section className="rounded-[40px] bg-white p-8 border border-gray-50 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                 <h3 className="font-heading text-xl font-bold text-[#2D1606]">Thêm Topping không?</h3>
                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-gray-100 text-gray-400">
                    <Info className="h-5 w-5" />
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {TOPPINGS.map(tp => (
                    <button
                       key={tp.id}
                       onClick={() => toggleTopping(tp.id)}
                       className={`flex items-center justify-between rounded-3xl p-4 transition-all border-2 ${
                          toppings.includes(tp.id) ? 'border-orange-500 bg-orange-50' : 'border-gray-50 bg-[#FAFAFA]'
                       }`}
                    >
                       <div className="flex items-center gap-3">
                          <span className="text-xl">{tp.emoji}</span>
                          <div className="text-left">
                             <div className="text-xs font-black text-[#2D1606] leading-tight">{tp.label}</div>
                             <div className="text-[10px] font-bold text-orange-600">+{tp.price.toLocaleString('vi-VN')}đ</div>
                          </div>
                       </div>
                       <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          toppings.includes(tp.id) ? 'border-orange-500 bg-orange-500' : 'border-gray-200 bg-white'
                       }`}>
                          {toppings.includes(tp.id) && <CheckCircle2 className="h-4 w-4 text-white" />}
                       </div>
                    </button>
                 ))}
              </div>
           </section>

           {/* Note */}
           <section className="rounded-[40px] bg-white p-8 border border-gray-50 shadow-sm">
              <h3 className="mb-4 font-heading text-xl font-bold text-[#2D1606]">Dặn dò Chips</h3>
              <textarea
                 value={note}
                 onChange={(e) => setNote(e.target.value)}
                 placeholder="Ghi chú về dị ứng, hương vị..."
                 className="h-32 w-full rounded-[32px] bg-gray-50 p-6 text-sm font-bold text-[#2D1606] outline-none border-none focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-gray-300"
              />
           </section>
        </div>
      </main>

      {/* ─── BOTTOM FLOATING ACTION ─── */}
      <div className="fixed bottom-[calc(68px+env(safe-area-inset-bottom,12px))] inset-x-0 z-40 p-4 lg:bottom-0 lg:p-8">
         <div className="mx-auto max-w-xl overflow-hidden rounded-[32px] bg-[#2D1606] shadow-[0_20px_50px_rgba(45,22,6,0.4)] transition-transform active:scale-95">
            <div className="flex items-center justify-between bg-white/5 px-6 py-3 border-b border-white/5">
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-1.5">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2D1606] active:scale-90"
                      >
                         <Minus className="h-5 w-5" />
                      </button>
                      <span className="min-w-[20px] text-center font-black text-white">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white active:scale-90"
                      >
                         <Plus className="h-5 w-5" />
                      </button>
                   </div>
                </div>
                <div className="text-right">
                   <div className="text-[9px] font-black uppercase tracking-widest text-white/40 leading-none">Tổng cộng</div>
                   <div className="text-xl font-black text-white">{totalPrice.toLocaleString('vi-VN')}đ</div>
                </div>
            </div>
            <button 
               onClick={handleAddToCart}
               className="w-full flex items-center justify-center gap-3 py-6 text-sm font-black uppercase tracking-widest text-white hover:bg-orange-600 transition-colors"
            >
               <ShoppingBag className="h-5 w-5" /> Thêm vào giỏ hàng <ChevronRight className="h-5 w-5" />
            </button>
         </div>
      </div>
    </div>
  );
}
