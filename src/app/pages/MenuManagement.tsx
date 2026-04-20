import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Filter, X, Star, Package, Loader2 } from "lucide-react";
import { products } from "../data/mockData";
import { Skeleton } from "../components/ui/skeleton";
import { useInfiniteScroll } from "../hooks/useDataFetching";

const categories = ['Tất cả', 'Trà Sữa', 'Trà Trái Cây', 'Cà Phê', 'Đá Xay'];

const badgeStyle: Record<string, { bg: string; color: string }> = {
  'Mới': { bg: '#DCFCE7', color: '#166534' },
  'Bán chạy': { bg: '#FEF3C7', color: '#854D0E' },
  'Sale': { bg: '#FCBABD', color: '#8B3A4A' },
  'Hết hàng': { bg: '#F3F4F6', color: '#6B7280' },
};

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';

interface ProductFormProps {
  product?: typeof products[0] | null;
  onClose: () => void;
}

function ProductForm({ product, onClose }: ProductFormProps) {
  const isEdit = !!product;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="h-full w-full max-w-md flex flex-col"
        style={{ background: 'white', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} style={{ color: '#6B9080' }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {[
            { label: 'Tên sản phẩm', placeholder: 'VD: Trà Sữa Trân Châu Hoàng Kim', defaultValue: product?.name || '' },
            { label: 'Danh mục', placeholder: 'Chọn danh mục', defaultValue: product?.category || '' },
            { label: 'Giá bán', placeholder: 'VD: 55000', defaultValue: product?.price?.toString() || '' },
            { label: 'Giá khuyến mãi', placeholder: 'Để trống nếu không có', defaultValue: product?.salePrice?.toString() || '' },
          ].map((field) => (
            <div key={field.label}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {field.label}
              </label>
              <input defaultValue={field.defaultValue} placeholder={field.placeholder}
                className="w-full px-4 rounded-xl border outline-none transition-all"
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
                onFocus={(e) => { e.target.style.borderColor = '#A8D5BA'; e.target.style.boxShadow = '0 0 0 3px rgba(168,213,186,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E0EDE6'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          ))}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Badge / Nhãn
            </label>
            <div className="flex gap-2 flex-wrap">
              {['Mới', 'Bán chạy', 'Sale', 'Hết hàng'].map((b) => (
                <button key={b} className="px-3 py-1.5 rounded-full border transition-all text-xs"
                  style={{ borderColor: '#E0EDE6', color: '#6B9080', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Trạng thái
            </label>
            <div className="flex gap-3">
              {['Đang bán', 'Tạm ẩn'].map((s) => (
                <button key={s} className="flex-1 py-2 rounded-xl border transition-all text-sm"
                  style={{
                    borderColor: s === 'Đang bán' ? '#2D6A4F' : '#E0EDE6',
                    background: s === 'Đang bán' ? '#2D6A4F' : 'white',
                    color: s === 'Đang bán' ? 'white' : '#6B9080',
                    fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Mô tả sản phẩm
            </label>
            <textarea rows={3} placeholder="Mô tả nguyên liệu, hương vị..."
              defaultValue={(product as any)?.description || ''}
              className="w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none"
              style={{ borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
              onFocus={(e) => { e.target.style.borderColor = '#A8D5BA'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E0EDE6'; }}
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#E0EDE6' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border transition-all text-sm"
            style={{ borderColor: '#E0EDE6', color: '#6B9080', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Hủy
          </button>
          <button className="flex-1 py-2.5 rounded-xl transition-all text-sm"
            style={{ background: '#2D6A4F', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600 }}>
            {isEdit ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MenuManagement() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<typeof products[0] | null>(null);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    (activeCategory === 'Tất cả' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()))
  );

  const { visibleData, isLoading, isLoadingMore, loadMore, hasMore } = useInfiniteScroll(filtered, 8);

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {showForm && <ProductForm product={editProduct} onClose={() => { setShowForm(false); setEditProduct(null); }} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
            Quản lý Menu
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B9080' }}>{products.length} sản phẩm trong thực đơn</p>
        </div>
        <button onClick={() => { setEditProduct(null); setShowForm(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all w-full sm:w-auto"
          style={{ background: '#2D6A4F', color: 'white', fontWeight: 600, fontSize: '13.5px' }}>
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full pl-9 pr-4 rounded-xl border outline-none"
            style={{ height: '40px', borderColor: '#E0EDE6', fontSize: '13.5px', background: '#FFFFFF' }}
          />
        </div>
        <div className="flex gap-1.5">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-2 rounded-xl text-sm transition-all"
              style={{
                background: activeCategory === cat ? '#2D6A4F' : 'white',
                color: activeCategory === cat ? 'white' : '#6B9080',
                border: `1px solid ${activeCategory === cat ? '#2D6A4F' : '#E0EDE6'}`,
                fontWeight: activeCategory === cat ? 600 : 400,
                fontSize: '13px'
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden p-3.5 space-y-3" style={{ background: 'white', border: '0.5px solid #E0EDE6' }}>
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 w-full rounded-xl" />
                <Skeleton className="h-9 w-12 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleData.map((p) => (
              <div key={p.id} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5"
                style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {/* Product image placeholder */}
                <div className="aspect-square flex items-center justify-center relative"
                  style={{ 
                    background: p.image ? `url(${p.image})` : '#E8F5EC',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                  {!p.image && <Package size={48} style={{ color: '#A8D5BA' }} />}
                  {p.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: badgeStyle[p.badge]?.bg || '#F3F4F6', color: badgeStyle[p.badge]?.color || '#6B7280' }}>
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: p.status === 'active' ? '#DCFCE7' : '#F3F4F6', color: p.status === 'active' ? '#166534' : '#6B7280' }}>
                    {p.status === 'active' ? 'Đang bán' : 'Tạm ẩn'}
                  </span>
                </div>
                <div className="p-3.5">
                  <div style={{ fontSize: '13px', color: '#6B9080', marginBottom: '2px' }}>{p.category}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#2D6A4F', lineHeight: 1.3, marginBottom: '8px' }}>{p.name}</div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                    <span style={{ fontSize: '12px', color: '#6B9080' }}>{p.rating} · {p.sold} đã bán</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#2D6A4F' }}>{formatVND(p.salePrice ?? p.price)}</span>
                    {p.salePrice && (
                      <span style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'line-through' }}>{formatVND(p.price)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditProduct(p); setShowForm(true); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border transition-all text-xs"
                      style={{ borderColor: '#2D6A4F', color: '#2D6A4F', fontWeight: 600 }}>
                      <Edit2 size={12} /> Sửa
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 rounded-xl border transition-all"
                      style={{ borderColor: '#FCBABD', color: '#8B3A4A' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button onClick={loadMore} disabled={isLoadingMore}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl border transition-all hover:bg-gray-50"
                style={{ borderColor: '#E0EDE6', color: '#2D6A4F', fontWeight: 600, fontSize: '14px' }}>
                {isLoadingMore ? <Loader2 size={16} className="animate-spin" /> : null}
                {isLoadingMore ? 'Đang tải...' : 'Xem thêm'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
