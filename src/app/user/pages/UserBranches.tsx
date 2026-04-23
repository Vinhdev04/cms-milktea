import { Heart, MapPin, Search, Star } from 'lucide-react';
import { Link } from 'react-router';
import { storefrontCollections, storefrontStores } from '../data/userStorefrontData';

export function UserBranches() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6">
      <section className="anim-fade-up">
        <div className="mb-5">
          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#C56A1B]">Marketplace</div>
          <h1 className="mt-2 font-heading text-3xl font-black tracking-tight text-[#132B57] sm:text-5xl">
            Bộ sưu tập món ăn
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {storefrontCollections.map((collection) => (
            <Link
              key={collection.id}
              to="/app/branches"
              className="group relative overflow-hidden rounded-[28px] shadow-[0_18px_48px_rgba(19,43,87,0.08)]"
            >
              <div className="aspect-[1.45/0.8] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,43,87,0.04)_0%,rgba(19,43,87,0.12)_36%,rgba(19,43,87,0.78)_100%)]" />
              <div className="absolute inset-x-5 bottom-5">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-white/70">
                  {collection.countLabel}
                </div>
                <div className="mt-1 text-[22px] font-black leading-tight text-white">{collection.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 anim-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="mb-5">
          <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#C56A1B]">Giao gần bạn</div>
          <h2 className="mt-2 font-heading text-3xl font-black tracking-tight text-[#132B57] sm:text-5xl">
            Quán ngon quanh đây
          </h2>
        </div>

        <div className="rounded-[32px] border border-[#E2EAF5] bg-white p-4 shadow-[0_18px_44px_rgba(19,43,87,0.06)]">
          <div className="mb-5 flex items-center gap-3 rounded-[24px] bg-[#F3F6FB] px-4 py-4">
            <Search className="h-5 w-5 text-[#6D7D97]" />
            <span className="text-sm font-semibold text-[#7D8DA8]">Tìm quán, món hot, hoặc chương trình promo</span>
          </div>

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {storefrontStores.map((store) => (
              <Link
                key={store.id}
                to={`/app/branches/${store.id}`}
                className="group overflow-hidden rounded-[28px] border border-[#E6EDF8] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(19,43,87,0.10)]"
              >
                <div className="relative aspect-[1.1/0.76] overflow-hidden">
                  <img
                    src={store.thumbnail}
                    alt={store.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {store.promo && (
                    <div className="absolute left-3 top-3 rounded-full bg-[#2FBF65] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                      Promo
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-[#5D6E8B] shadow-sm"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="line-clamp-2 text-[24px] font-black leading-[1.1] text-[#132B57]">
                      {store.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#5C6F90]">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F6FB] px-2.5 py-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {store.district}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F6FB] px-2.5 py-1">
                        <Star className="h-3.5 w-3.5 fill-current text-[#FFB11A]" />
                        {store.rating}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm font-medium leading-6 text-[#6D7D97]">{store.address}</div>

                  <div className="flex flex-wrap gap-2">
                    {store.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#EEF4FF] px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#3C5A8A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-[#EEF3FA] pt-3">
                    <div className="text-sm font-bold text-[#132B57]">{store.eta}</div>
                    <div className="text-sm font-semibold text-[#F08B2D]">{store.statusLabel}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
