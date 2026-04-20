import { Heart, Plus, Star, Clock3 } from 'lucide-react';
import { Link } from 'react-router';
import { useUserAuth } from '../context/UserAuthContext';

interface ProductQuickCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  badge?: string;
  description: string;
}

export function ProductQuickCard({ id, name, price, image, rating, badge, description }: ProductQuickCardProps) {
  const { toggleFavorite, isFavorite, addToCart } = useUserAuth();
  const favorited = isFavorite(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: id,
      name,
      price,
      image,
      quantity: 1,
      size: 'M',
      sugar: '50%',
      ice: '50%',
      toppings: [],
    });
  };

  return (
    <Link to={`/app/menu/${id}`}>
      <article className="surface-card group h-full overflow-hidden rounded-[30px] card-interactive">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden sm:h-56">
          <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badge */}
          {badge && (
            <div className="absolute left-4 top-4 anim-float-badge">
              <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(249,115,22,0.4)]">
                {badge}
              </div>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(id);
            }}
            className={`absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl backdrop-blur-md transition-all duration-300 active:scale-90 ${
              favorited
                ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30'
                : 'bg-black/30 text-white/80 hover:bg-black/50 hover:text-white'
            }`}
          >
            <Heart className={`h-5 w-5 transition-transform ${favorited ? 'fill-white scale-110' : ''}`} />
          </button>

          {/* Rating pill */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-xl bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-black text-[#2D1606]">{rating}</span>
          </div>

          {/* Quick Add Overlay */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/30 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 active:scale-90"
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="line-clamp-2 font-heading text-base font-bold text-[#2D1606] sm:text-lg group-hover:text-orange-600 transition-colors">{name}</h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#8A552A]/70 sm:text-sm sm:leading-6">{description}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-lg font-extrabold sm:text-xl" style={{ background: 'linear-gradient(135deg, #FF8A1F, #E56A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {price.toLocaleString('vi-VN')}đ
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
