import { X, Minus, Plus, ShoppingBag, Edit3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { UserPreviewProduct } from '../data/userPreviewData';
import { useUserAuth, type CartItem } from '../../context/UserAuthContext';

const SIZE_OPTIONS = [
  { value: 'S', label: 'Nhỏ', volume: '350ml', priceModifier: -5000, note: 'Nhẹ bụng' },
  { value: 'M', label: 'Vừa', volume: '500ml', priceModifier: 0, note: 'Phổ biến nhất' },
  { value: 'L', label: 'Lớn', volume: '700ml', priceModifier: 5000, note: 'Uống đã hơn' },
] as const;

const SUGAR_OPTIONS = ['30%', '50%', '70%', '100%'] as const;
const ICE_OPTIONS = ['Không đá', '50%', '70%', '100%'] as const;

interface ProductModalProps {
  product: UserPreviewProduct | null;
  isOpen: boolean;
  onClose: () => void;
  editItem?: CartItem | null;
}

export function ProductModal({ product, isOpen, onClose, editItem }: ProductModalProps) {
  const { addToCart, updateCartItemOptions } = useUserAuth();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [sugar, setSugar] = useState<(typeof SUGAR_OPTIONS)[number]>('50%');
  const [ice, setIce] = useState<(typeof ICE_OPTIONS)[number]>('50%');
  const [note, setNote] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      if (editItem) {
        setQuantity(editItem.quantity);
        setSize(editItem.size);
        setSugar(editItem.sugar as any);
        setIce(editItem.ice as any);
        setNote(''); // Note not stored in cart for now
      } else {
        setQuantity(1);
        setSize('M');
        setSugar('50%');
        setIce('50%');
        setNote('');
      }
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen, editItem]);

  if (!isOpen && !isAnimating) return null;
  if (!product) return null;

  const selectedSize = SIZE_OPTIONS.find((item) => item.value === size) ?? SIZE_OPTIONS[1];
  const unitPrice = product.price + selectedSize.priceModifier;
  const totalPrice = unitPrice * quantity;

  const handleAction = () => {
    if (editItem) {
      updateCartItemOptions(editItem.productId, {
        quantity,
        size,
        sugar,
        ice,
        price: unitPrice
      });
    } else {
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
    }
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-[1000] flex items-end justify-center sm:items-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div className={`relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
           <X className="h-4 w-4" />
        </button>

        <div className="flex-1 overflow-y-auto no-scrollbar">
           <div className="aspect-[16/10] w-full bg-gray-50">
              <img src={product.image} className="h-full w-full object-cover" alt="" />
           </div>

           <div className="px-6 pt-6 pb-24">
              <div className="mb-6">
                 <div className="flex items-center gap-2 mb-1">
                    {editItem && <Edit3 size={14} className="text-orange-500" />}
                    <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                 </div>
                 <p className="mt-1 text-xs text-gray-400 leading-relaxed">{product.description}</p>
                 <div className="mt-3 text-lg font-bold text-orange-500">{unitPrice.toLocaleString('vi-VN')}đ</div>
              </div>

              <div className="space-y-8">
                 <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Kích cỡ</h3>
                    <div className="flex gap-2">
                       {SIZE_OPTIONS.map(opt => (
                         <button
                           key={opt.value}
                           onClick={() => setSize(opt.value)}
                           className={`flex-1 py-3 px-2 rounded-xl text-center border transition-all ${
                             size === opt.value ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-500'
                           }`}
                         >
                           <div className="text-sm font-bold">{opt.label}</div>
                           <div className="text-[10px] opacity-60">{opt.volume}</div>
                         </button>
                       ))}
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Đường</h3>
                    <div className="flex flex-wrap gap-2">
                       {SUGAR_OPTIONS.map(level => (
                         <button
                           key={level}
                           onClick={() => setSugar(level)}
                           className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                             sugar === level ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-100 text-gray-500'
                           }`}
                         >
                           {level}
                         </button>
                       ))}
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Đá</h3>
                    <div className="flex flex-wrap gap-2">
                       {ICE_OPTIONS.map(level => (
                         <button
                           key={level}
                           onClick={() => setIce(level)}
                           className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                             ice === level ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-100 text-gray-500'
                           }`}
                         >
                           {level}
                         </button>
                       ))}
                    </div>
                 </section>

                 <section>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Ghi chú</h3>
                    <textarea 
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      placeholder="Ít đá, ít ngọt..."
                      className="w-full bg-gray-50 rounded-xl p-3 text-xs outline-none h-20"
                    />
                 </section>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 inset-x-0 p-4 pb-[calc(16px+env(safe-area-inset-bottom,16px))] bg-white border-t border-gray-50 z-30">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-8 w-8 flex items-center justify-center rounded-lg bg-white text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"><Minus className="h-3 w-3" /></button>
                 <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-white text-gray-900 shadow-sm hover:bg-gray-50 transition-colors"><Plus className="h-3 w-3" /></button>
              </div>
              <button onClick={handleAction} className="flex-1 bg-orange-500 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-all">
                 {editItem ? 'Cập nhật đơn hàng' : `Thêm ${totalPrice.toLocaleString('vi-VN')}đ`}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
