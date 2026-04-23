import { Link } from 'react-router';
import { Plus, Star, Clock3, Heart } from 'lucide-react';
import type { UserPreviewProduct } from '../data/userPreviewData';
import { useUserAuth } from '../../context/UserAuthContext';

export function ProductQuickCard(product: UserPreviewProduct & { asButton?: boolean }) {
  const { addToCart } = useUserAuth();

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

  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-lg bg-white/90 px-1.5 py-0.5 shadow-sm backdrop-blur-sm">
          <Star className="h-2.5 w-2.5 fill-orange-400 text-orange-400" />
          <span className="text-[10px] font-bold text-gray-900">{product.rating}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col p-3">
        <h4 className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-orange-500 transition-colors">
          {product.name}
        </h4>
        <p className="mt-1 text-[10px] text-gray-400 line-clamp-1">
          {product.description}
        </p>
        <div className="mt-2 text-sm font-bold text-gray-900">
          {product.price.toLocaleString('vi-VN')}đ
        </div>
      </div>
    </>
  );

  const containerClass = "group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all hover:shadow-md";

  if (product.asButton) {
    return <div className={containerClass}>{content}</div>;
  }

  return (
    <Link to={`/app/menu/${product.id}`} className={containerClass}>
      {content}
    </Link>
  );
}
