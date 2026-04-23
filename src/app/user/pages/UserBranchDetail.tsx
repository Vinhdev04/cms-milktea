import { Heart, Minus, Pencil, Plus, Search, Star, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { useUserAuth } from '../../context/UserAuthContext';
import { storefrontStores, type StorefrontCategory, type StorefrontMenuItem } from '../data/userStorefrontData';
import { StorefrontProductCard } from '../components/StorefrontProductCard';

const formatVND = (amount: number) => `${amount.toLocaleString('vi-VN')}đ`;

export function UserBranchDetail() {
  const { branchId } = useParams<{ branchId: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, updateCartItem } = useUserAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const store = useMemo(() => storefrontStores.find((item) => item.id === branchId), [branchId]);

  const [activeCategory, setActiveCategory] = useState<string>(() => store?.categories[0]?.id ?? 'all');

  const categories = store?.categories ?? [];
  const filteredCategories = useMemo(() => {
    if (!store) return [];
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const query = searchQuery.trim().toLowerCase();
          if (!query) return true;
          return `${item.name} ${item.description}`.toLowerCase().includes(query);
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, searchQuery, store]);

  const visibleCategories = useMemo(() => {
    if (activeCategory === 'all') return filteredCategories;
    return filteredCategories.filter((category) => category.id === activeCategory);
  }, [activeCategory, filteredCategories]);

  const cartItems = cart.filter((item) =>
    categories.some((category) => category.items.some((product) => product.id === item.productId))
  );
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!store) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-[32px] border border-[#E2EAF5] bg-white p-10 text-center shadow-[0_18px_40px_rgba(19,43,87,0.08)]">
          <h1 className="text-2xl font-black text-[#132B57]">Không tìm thấy quán</h1>
          <p className="mt-2 text-[#6D7D97]">Quán này có thể đã tạm ngưng hoặc đường dẫn chưa đúng.</p>
          <Link
            to="/app/branches"
            className="mt-6 inline-flex rounded-2xl bg-[#132B57] px-5 py-3 text-sm font-black text-white"
          >
            Quay về danh sách quán
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F6FB] pb-28">
      <div className="relative h-[220px] overflow-hidden border-b border-[#DDE7F4] bg-white sm:h-[280px]">
        <img src={store.coverImage} alt={store.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.30)_34%,rgba(255,255,255,0.96)_100%)]" />
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
        <section className="-mt-2 rounded-t-[28px] bg-white px-0 pb-6 pt-0 shadow-[0_8px_28px_rgba(19,43,87,0.06)] sm:px-0">
          <div className="px-4 pt-6 sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <h1 className="text-3xl font-black tracking-tight text-[#132B57] sm:text-[42px]">{store.name}</h1>
                <p className="mt-2 max-w-3xl text-lg leading-8 text-[#304A75]">{store.address}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="rounded-full border border-[#D7E2F1] bg-white px-4 py-3 text-base font-semibold text-[#304A75]">
                    Nhà hàng tương tự
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-[#D7E2F1] bg-white px-4 py-3 text-base font-semibold text-[#304A75]">
                    <Users className="h-5 w-5" />
                    Đặt theo nhóm
                  </button>
                </div>
              </div>

              <button className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-white px-5 text-lg font-bold text-[#132B57] shadow-[0_10px_24px_rgba(19,43,87,0.08)]">
                <Heart className="h-5 w-5" />
                Yêu thích
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-[#EDF2F9] px-4 pt-6 sm:px-6">
            <div className="rounded-[24px] bg-[#F1F5FA] px-4 py-4">
              <div className="flex items-center gap-3">
                <Search className="h-6 w-6 text-[#7183A0]" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Tìm kiếm trong nhà hàng"
                  className="w-full border-none bg-transparent text-lg font-semibold text-[#132B57] outline-none placeholder:text-[#96A6BE]"
                />
              </div>
            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setActiveCategory('all')}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-lg font-black transition-all ${
                  activeCategory === 'all' ? 'bg-[#132B57] text-white' : 'bg-[#EEF3FA] text-[#5E708D]'
                }`}
              >
                Tất cả
                <span className="rounded-full bg-[#CFE2FF] px-2.5 py-0.5 text-sm text-[#2267D8]">
                  {filteredCategories.reduce((sum, category) => sum + category.items.length, 0)}
                </span>
              </button>
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-lg font-black transition-all ${
                    activeCategory === category.id ? 'bg-[#132B57] text-white' : 'bg-[#EEF3FA] text-[#5E708D]'
                  }`}
                >
                  {category.name.toUpperCase()}
                  <span className="rounded-full bg-[#CFE2FF] px-2.5 py-0.5 text-sm text-[#2267D8]">
                    {category.items.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-4 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-10">
            {visibleCategories.map((category) => (
              <StoreCategorySection
                key={category.id}
                category={category}
                onAdd={(item) =>
                  addToCart({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                    size: 'M',
                    sugar: '50%',
                    ice: '50%',
                    toppings: [],
                  })
                }
              />
            ))}
          </div>

          <aside className="xl:block">
            <div className="sticky top-28 rounded-[30px] border border-[#E2EAF5] bg-white p-5 shadow-[0_18px_40px_rgba(19,43,87,0.06)]">
              <h3 className="text-[28px] font-black tracking-tight text-[#132B57]">Giỏ hàng của tôi</h3>
              {cartItems.length === 0 ? (
                <div className="mt-5 rounded-[24px] bg-[#F6F9FD] p-5 text-[#6D7D97]">
                  Chọn món từ menu bên trái, giỏ hàng sẽ hiện ngay tại đây để bạn chốt đơn nhanh hơn.
                </div>
              ) : (
                <>
                  <div className="mt-5 space-y-4">
                    {cartItems.map((item) => (
                      <div key={`${item.productId}-${item.size}-${item.sugar}`} className="rounded-[24px] bg-[#F8FBFF] p-4">
                        <div className="flex items-start gap-3">
                          <img src={item.image} alt={item.name} className="h-14 w-14 rounded-2xl object-cover" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="line-clamp-2 text-xl font-black leading-tight text-[#132B57]">{item.name}</h4>
                              <button className="text-[#7485A0]">
                                <Pencil className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between gap-2">
                              <div className="text-2xl font-black text-[#132B57]">{formatVND(item.price)}</div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateCartItem(item.productId, item.quantity - 1)}
                                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#132B57]"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-6 text-center text-xl font-black text-[#132B57]">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFC421] text-[#132B57]"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-[#EDF2F9] pt-4">
                    <div className="flex items-center justify-between text-[20px] font-medium text-[#304A75]">
                      <span>Tổng số tiền</span>
                      <span className="text-[22px] font-black text-[#132B57]">{formatVND(cartTotal)}</span>
                    </div>
                    <button
                      onClick={() => navigate('/app/checkout')}
                      className="mt-5 flex w-full items-center justify-center rounded-[20px] bg-[#FFC421] px-5 py-4 text-[22px] font-black text-[#132B57] transition-transform hover:scale-[1.01]"
                    >
                      Tiếp tục đặt đơn
                    </button>
                    <p className="mt-4 text-base leading-7 text-[#4D648A]">
                      Xem phí áp dụng và dùng mã khuyến mại ở bước tiếp theo.
                    </p>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StoreCategorySection({
  category,
  onAdd,
}: {
  category: StorefrontCategory;
  onAdd: (item: StorefrontMenuItem) => void;
}) {
  return (
    <section className="rounded-[30px] border border-[#E2EAF5] bg-white p-6 shadow-[0_14px_30px_rgba(19,43,87,0.04)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[40px] font-black tracking-tight text-[#132B57]">{category.name.toUpperCase()}</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {category.items.map((item) => (
          <StorefrontProductCard
            key={item.id}
            item={item}
            onAdd={onAdd}
          />
        ))}
      </div>
    </section>
  );
}
