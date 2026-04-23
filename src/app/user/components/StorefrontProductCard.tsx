import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import type { StorefrontMenuItem } from '../data/userStorefrontData';

const formatVND = (amount: number) => `${amount.toLocaleString('vi-VN')}đ`;

export function StorefrontProductCard({
  item,
  onAdd,
}: {
  item: StorefrontMenuItem;
  onAdd: (item: StorefrontMenuItem) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#E2EAF5] bg-white shadow-[0_10px_28px_rgba(19,43,87,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(19,43,87,0.08)]">
      <Link to={`/app/menu/${item.id}`} className="block">
        <div className="relative aspect-[1.16/0.74] overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          {item.badge && (
            <div className="absolute left-3 top-3 rounded-full bg-[#132B57] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
              {item.badge}
            </div>
          )}
        </div>
      </Link>

      <div className="flex min-h-[180px] flex-col p-4">
        <div className="min-h-[86px]">
          <Link to={`/app/menu/${item.id}`} className="block">
            <h3 className="line-clamp-2 text-[22px] font-black leading-[1.2] text-[#132B57] transition-colors hover:text-[#1E4E9B]">
              {item.name}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-base leading-7 text-[#6D7D97]">{item.description}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="text-[20px] font-black text-[#132B57]">{formatVND(item.price)}</div>
          <button
            onClick={() => onAdd(item)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFC421] text-[#132B57] transition-transform hover:scale-105 active:scale-95"
            aria-label={`Thêm ${item.name}`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
