import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewProducts } from '../data/userPreviewData';
import { ProductQuickCard } from '../components/ProductQuickCard';

export function UserHome() {
  const { addToCart } = useUserAuth();
  const [activeShelf, setActiveShelf] = useState<'bestseller' | 'new' | 'trending'>('new');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => [
    { id: 'all', name: 'Tất cả' },
    { id: 'milk-tea', name: 'Trà sữa' },
    { id: 'fruit-tea', name: 'Trà trái cây' },
    { id: 'coffee', name: 'Cà phê' },
    { id: 'ice-blended', name: 'Đá xay' },
  ], []);

  const shelfTabs = [
    { id: 'bestseller' as const, name: 'Bán chạy', label: 'Món được chọn nhiều' },
    { id: 'new' as const, name: 'Mới nên thử', label: 'Gợi ý để đổi vị' },
    { id: 'trending' as const, name: 'Xu hướng', label: 'Đồ uống đang nổi' },
  ];

  const products = useMemo(() => {
    let list = userPreviewProducts;
    if (activeShelf === 'bestseller') list = list.filter(p => p.badge === 'Bán chạy');
    if (activeCategory !== 'all') list = list.filter(p => p.categoryId === activeCategory);
    return list.slice(0, 6);
  }, [activeShelf, activeCategory]);

  return (
    <div className="bg-gray-50 font-sans pb-20">
      {/* ─── HEADER ─── */}
      <header className="px-6 pt-6 pb-2 bg-white">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-xl font-bold text-gray-900">Chào bạn!</h1>
               <p className="text-[10px] text-gray-400">Bạn muốn uống gì hôm nay?</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
               <Sparkles className="h-4 w-4" />
            </div>
         </div>
      </header>

      {/* ─── CONTENT ─── */}
      <div className="px-6 space-y-4 pt-2">
         {/* Dat dau - Order Button */}
         <Link to="/app/menu" className="w-full h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-lg shadow-black/5">
            Đặt món ngay <ArrowRight className="h-3 w-3" />
         </Link>

         {/* Categories - Sticky */}
         <section className="sticky top-0 z-20 bg-gray-50 py-2 -mx-6 px-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
               {categories.map(c => (
                 <button
                   key={c.id}
                   onClick={() => setActiveCategory(c.id)}
                   className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                     activeCategory === c.id ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-gray-400 bg-white border border-gray-100 shadow-sm'
                   }`}
                 >
                   {c.name}
                 </button>
               ))}
            </div>
         </section>

         {/* Shelf Selector */}
         <section className="space-y-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
               {shelfTabs.map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveShelf(tab.id)}
                   className={`shrink-0 min-w-[120px] p-3 rounded-xl border transition-all text-left ${
                     activeShelf === tab.id ? 'border-orange-500 bg-white shadow-sm' : 'border-gray-50 bg-white text-gray-400'
                   }`}
                 >
                    <div className={`text-xs font-bold ${activeShelf === tab.id ? 'text-orange-500' : 'text-gray-900'}`}>{tab.name}</div>
                    <div className="text-[9px] opacity-60 mt-0.5">{tab.label}</div>
                 </button>
               ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
               {products.map(p => (
                 <ProductQuickCard key={p.id} {...p} />
               ))}
            </div>
         </section>
      </div>
    </div>
  );
}
