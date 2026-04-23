import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { 
  Search, ShoppingCart
} from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewCategories, userPreviewProducts, type UserPreviewProduct } from '../data/userPreviewData';
import { ProductQuickCard } from '../components/ProductQuickCard';
import { ProductModal } from '../components/ProductModal';

export function UserMenu() {
  const { cart } = useUserAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<UserPreviewProduct | null>(null);

  useEffect(() => {
    const pId = searchParams.get('p');
    if (pId) {
      const p = userPreviewProducts.find(x => x.id === pId);
      if (p) setSelectedProduct(p);
    }
  }, [searchParams]);

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setSearchParams(prev => {
      if (id === 'all') prev.delete('category');
      else prev.set('category', id);
      return prev;
    });
  };

  const handleOpenProduct = (p: UserPreviewProduct) => {
    setSelectedProduct(p);
    setSearchParams(prev => {
      prev.set('p', p.id);
      return prev;
    });
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    setSearchParams(prev => {
      prev.delete('p');
      return prev;
    });
  };

  const filteredProducts = useMemo(() => {
    return userPreviewProducts.filter(p => {
      const mCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
      const mSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return mCat && mSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', name: 'Tất cả' },
    ...userPreviewCategories
  ];

  return (
    <div className="bg-white font-sans">
      {/* ─── MINIMAL HEADER ─── */}
      <header className="px-4 pt-6 pb-4 border-b border-gray-50">
        <div className="mx-auto max-w-5xl flex items-center justify-between mb-4">
           <div>
              <h1 className="text-xl font-bold text-gray-900">Thực đơn</h1>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Chips Nguyễn Huệ</p>
           </div>
           <Link to="/app/cart" className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-900">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                   {cart.length}
                </span>
              )}
           </Link>
        </div>

        <div className="mx-auto max-w-5xl relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
           <input 
             type="text" 
             placeholder="Tìm món ngon..." 
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             className="w-full bg-gray-50 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-gray-200 transition-all"
           />
        </div>

        <div className="mx-auto max-w-5xl mt-4 flex gap-2 overflow-x-auto no-scrollbar">
           {categories.map(cat => (
             <button
               key={cat.id}
               onClick={() => handleCategoryChange(cat.id)}
               className={`shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                 selectedCategory === cat.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/10' : 'text-gray-500 hover:bg-gray-50'
               }`}
             >
               {cat.name}
             </button>
           ))}
        </div>
      </header>

      {/* ─── GRID ─── */}
      <div className="px-4 py-6">
        <div className="mx-auto max-w-5xl">
           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map(p => (
                <div key={p.id} onClick={() => handleOpenProduct(p)} className="cursor-pointer">
                   <ProductQuickCard {...p} asButton />
                </div>
              ))}
           </div>

           {filteredProducts.length === 0 && (
             <div className="py-20 text-center text-gray-400 text-sm">Không tìm thấy món</div>
           )}
        </div>
      </div>

      {/* ─── MODAL ─── */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={selectedProduct !== null} 
        onClose={handleCloseProduct} 
      />
    </div>
  );
}
