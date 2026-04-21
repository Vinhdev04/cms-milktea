import { Link } from 'react-router';
import { Plus, Star, Clock3, Heart } from 'lucide-react';
import type { UserPreviewProduct } from '../data/userPreviewData';
import { useUserAuth } from '../../context/UserAuthContext';

export function ProductQuickCard(product: UserPreviewProduct) {
  const { addToCart, toggleFavorite, isFavorite } = useUserAuth();
  const liked = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: 'M',
      sugar: '50%',
      ice: '50%',
      toppings: [],
    });
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <Link
      to={`/app/menu/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[28px] bg-white card-interactive"
      style={{ border: '1px solid rgba(242, 213, 186, 0.5)' }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Badge - top left */}
        {product.badge && (
          <div className="absolute left-3 top-3 anim-float-badge">
            <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(249,115,22,0.4)]">
              {product.badge}
            </div>
          </div>
        )}

        {/* Favorite button - top right */}
        <button
          onClick={handleToggleFav}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md transition-all duration-300 active:scale-90 ${
            liked
              ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30'
              : 'bg-black/30 text-white/80 hover:bg-black/50 hover:text-white'
          }`}
        >
          <Heart className={`h-4 w-4 transition-transform ${liked ? 'fill-white scale-110' : ''}`} />
        </button>

        {/* Rating pill - bottom left on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-black text-[#2D1606]">{product.rating}</span>
          <span className="text-[9px] font-bold text-gray-400">({product.reviews})</span>
        </div>

        {/* Quick add button - bottom right, slides up on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/30 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 active:scale-90"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 pb-5">
        {/* Category tag */}
        <div className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-500/80">
          {product.categoryLabel}
        </div>

        {/* Name */}
        <h4 className="mt-1.5 text-[13px] font-bold leading-snug text-[#2D1606] line-clamp-2 group-hover:text-orange-700 transition-colors">
          {product.name}
        </h4>

        {/* Description */}
        <p className="mt-1.5 text-[11px] leading-relaxed text-[#8A552A]/60 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-orange-50 px-2 py-0.5 text-[9px] font-bold text-orange-600/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Price + Prep time */}
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <div className="text-lg font-black text-gradient-orange" style={{ background: 'linear-gradient(135deg, #FF8A1F, #E56A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {product.price.toLocaleString('vi-VN')}đ
            </div>
            {product.originalPrice && (
              <div className="text-[11px] font-bold text-gray-300 line-through">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#FFF8F0] px-2.5 py-1 text-[10px] font-bold text-[#B47749] ring-1 ring-orange-100">
            <Clock3 className="h-3 w-3" />
            {product.prepTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
