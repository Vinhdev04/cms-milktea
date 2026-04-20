import { Heart, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import { userPreviewProducts } from '../data/userPreviewData';
import { ProductQuickCard } from '../../components/ProductQuickCard';

export function UserFavorites() {
  const { favorites } = useUserAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const favoriteProducts = useMemo(() => {
    let products = userPreviewProducts.filter((p) => favorites.has(p.id));

    if (searchQuery.trim()) {
      const normalizedQuery = searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    }

    return products;
  }, [searchQuery, favorites]);

  if (favorites.size === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6">
        <div className="surface-card rounded-[36px] p-10 text-center anim-scale-in">
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFF0E2,#FFE2BE)] text-[#E56A00] anim-float-badge">
            <Heart className="h-8 w-8" />
          </div>
          <h1 className="mt-5 font-heading text-3xl font-extrabold text-[#2D1606]">Danh sách yêu thích trống</h1>
          <p className="mt-3 text-sm leading-7 text-[#8A552A]">
            Bạn chưa thêm sản phẩm nào vào danh sách yêu thích. Hãy khám phá thực đơn và thêm những món ưa thích!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-6">
      {/* Header */}
      <section className="surface-card section-enter overflow-hidden rounded-[34px] p-5 backdrop-blur-xl sm:p-6 mb-6 anim-fade-up">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.24em] text-[#C46A18]">Yêu thích</div>
            <h1 className="mt-2 font-heading text-4xl font-extrabold text-[#2D1606]">Món ăn yêu thích của bạn</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8A552A]">
              {favoriteProducts.length} món đang được yêu thích
            </p>
          </div>

          {/* Search */}
          <div className="w-full min-w-[280px] lg:w-auto">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B47749]" />
              <input
                type="text"
                placeholder="Tìm món yêu thích..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-2xl border border-[#F2D5BA] bg-white pl-12 pr-4 text-sm font-medium text-[#4A2508] outline-none transition-all duration-300 focus:border-[#FF8A1F] focus:ring-4 focus:ring-[#FFE2C2] focus:shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      {favoriteProducts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
          {favoriteProducts.map((product) => (
            <ProductQuickCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              badge={product.badge}
              description={product.description}
            />
          ))}
        </div>
      ) : (
        <div className="surface-card rounded-[32px] p-10 text-center anim-scale-in">
          <p className="text-[#8A552A]">Không tìm thấy sản phẩm phù hợp</p>
        </div>
      )}
    </div>
  );
}
