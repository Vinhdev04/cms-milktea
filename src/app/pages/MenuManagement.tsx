import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Filter, X, Star, Package, Loader2, PackageX, List, Settings2, Upload } from "lucide-react";
import { toast } from "sonner";
import { products } from "../data/mockData";
import { Skeleton } from "../components/ui/skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { useInfiniteScroll } from "../hooks/useDataFetching";

const categories = ['Tất cả', 'Trà Sữa', 'Trà Trái Cây', 'Cà Phê', 'Đá Xay'];

const badgeStyle: Record<string, { bg: string; color: string }> = {
  'Mới': { bg: '#FFEDD5', color: '#9A3412' },
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
    <div className="fixed inset-0 z-50 flex items-center justify-end" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose}>
      <div className="h-full w-full max-w-md flex flex-col"
        style={{ background: 'white', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#F0DCC8' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} style={{ color: '#A0845C' }} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {[
            { label: 'Tên sản phẩm', placeholder: 'VD: Trà Sữa Trân Châu Hoàng Kim', defaultValue: product?.name || '' },
            { label: 'Danh mục', placeholder: 'Chọn danh mục', defaultValue: product?.category || '' },
          ].map((field) => (
            <div key={field.label}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                {field.label}
              </label>
              <input defaultValue={field.defaultValue} placeholder={field.placeholder}
                className="w-full px-4 rounded-xl border outline-none transition-all"
                style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
                onFocus={(e) => { e.target.style.borderColor = '#F5C088'; e.target.style.boxShadow = '0 0 0 3px rgba(168,213,186,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F0DCC8'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          ))}

          {/* Size Pricing */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Mức giá theo Size (đ)
            </label>
            <div className="space-y-2">
              {['S', 'M', 'L'].map((size, idx) => (
                <div key={size} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0" 
                    style={{ background: '#FFFAF5', border: '1px solid #F0DCC8', color: '#F58220', fontSize: '14px' }}>
                    {size}
                  </div>
                  <input placeholder={`Giá bán`} 
                    defaultValue={idx === 1 ? product?.price?.toString() : ''}
                    className="flex-1 px-3 rounded-xl border outline-none transition-all"
                    style={{ height: '40px', borderColor: '#F0DCC8', fontSize: '13px' }}
                    onFocus={(e) => e.target.style.borderColor = '#F5C088'}
                    onBlur={(e) => e.target.style.borderColor = '#F0DCC8'}
                  />
                  <input placeholder={`Khuyến mãi`} 
                    defaultValue={idx === 1 ? product?.salePrice?.toString() : ''}
                    className="flex-1 px-3 rounded-xl border outline-none transition-all"
                    style={{ height: '40px', borderColor: '#F0DCC8', fontSize: '13px' }}
                    onFocus={(e) => e.target.style.borderColor = '#F5C088'}
                    onBlur={(e) => e.target.style.borderColor = '#F0DCC8'}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Badge / Nhãn
            </label>
            <div className="flex gap-2 flex-wrap">
              {['Mới', 'Bán chạy', 'Sale', 'Hết hàng'].map((b) => (
                <button key={b} className="px-3 py-1.5 rounded-full border transition-all text-xs"
                  style={{ borderColor: '#F0DCC8', color: '#A0845C', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
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
                    borderColor: s === 'Đang bán' ? '#F58220' : '#F0DCC8',
                    background: s === 'Đang bán' ? '#F58220' : 'white',
                    color: s === 'Đang bán' ? 'white' : '#A0845C',
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
              style={{ borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
              onFocus={(e) => { e.target.style.borderColor = '#F5C088'; }}
              onBlur={(e) => { e.target.style.borderColor = '#F0DCC8'; }}
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#F0DCC8' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border transition-all text-sm"
            style={{ borderColor: '#F0DCC8', color: '#A0845C', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Hủy
          </button>
          <button 
            onClick={() => {
              toast.success(isEdit ? 'Cập nhật sản phẩm thành công!' : 'Đã thêm sản phẩm mới!');
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl transition-all text-sm"
            style={{ background: '#F58220', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600 }}>
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
            Quản lý Menu
          </h1>
          <p style={{ fontSize: '13.5px', color: '#A0845C' }}>Thiết lập sản phẩm, danh mục và thuộc tính</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all cursor-pointer hover:bg-gray-50 flex-1 sm:flex-none"
            style={{ borderColor: '#F0DCC8', color: '#A0845C', fontWeight: 600, fontSize: '13.5px' }}>
            <Upload size={16} /> <span>Nhập File</span>
            <input type="file" className="hidden" accept=".csv, .xlsx, .xls" onChange={(e) => {
              if (e.target.files?.length) {
                toast.loading('Đang xử lý dữ liệu...');
                setTimeout(() => {
                  toast.dismiss();
                  toast.success(`Đã nhập thành công dữ liệu từ file ${e.target.files![0].name}`);
                }, 1500);
              }
            }} />
          </label>
          <button onClick={() => { setEditProduct(null); setShowForm(true); }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all flex-1 sm:flex-none"
            style={{ background: '#F58220', color: 'white', fontWeight: 600, fontSize: '13.5px' }}>
            <Plus size={16} /> Thêm mới
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-6 mb-6 border-b" style={{ borderColor: '#F0DCC8' }}>
        {[
          { id: 'Tất cả', label: 'Sản phẩm', icon: <Package size={16} /> },
          { id: 'categories', label: 'Danh mục', icon: <List size={16} /> },
          { id: 'attributes', label: 'Thuộc tính', icon: <Settings2 size={16} /> },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveCategory(t.id)}
            className="flex items-center gap-2 pb-3 transition-all relative"
            style={{ 
              color: (activeCategory === t.id || (activeCategory !== 'categories' && activeCategory !== 'attributes' && t.id === 'Tất cả')) ? '#F58220' : '#A0845C',
              fontWeight: (activeCategory === t.id || (activeCategory !== 'categories' && activeCategory !== 'attributes' && t.id === 'Tất cả')) ? 600 : 500,
              fontSize: '14px' 
            }}>
            {t.icon} {t.label}
            {(activeCategory === t.id || (activeCategory !== 'categories' && activeCategory !== 'attributes' && t.id === 'Tất cả')) && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-[#F58220]" />
            )}
          </button>
        ))}
      </div>

      {/* Categories View */}
      {activeCategory === 'categories' && (
        <div className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: '#F0DCC8' }}>
          {/* Mobile Card View */}
          <div className="md:hidden divide-y" style={{ borderColor: '#FAF0E6' }}>
            {categories.filter(c => c !== 'Tất cả').map((c, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{c}</div>
                  <div style={{ fontSize: '12px', color: '#A0845C', marginTop: '2px' }}>{products.filter(p => p.category === c).length} sản phẩm</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FFEDD5] text-[#9A3412]">Hiển thị</span>
                <div className="flex gap-1.5">
                  <button className="p-1.5 rounded-lg border" style={{ borderColor: '#F0DCC8' }}><Edit2 size={13} style={{ color: '#F58220' }} /></button>
                  <button className="p-1.5 rounded-lg border" style={{ borderColor: '#FCBABD' }}><Trash2 size={13} style={{ color: '#8B3A4A' }} /></button>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-left">
            <thead>
              <tr style={{ background: '#FFF3E6' }}>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Tên Danh mục</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Số lượng SP</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Trạng thái</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.filter(c => c !== 'Tất cả').map((c, i) => (
                <tr key={i} className="border-b" style={{ borderColor: '#FAF0E6' }}>
                  <td className="px-5 py-3.5" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{c}</td>
                  <td className="px-5 py-3.5" style={{ fontSize: '13px', color: '#A0845C' }}>{products.filter(p => p.category === c).length} sản phẩm</td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFEDD5] text-[#9A3412]">Hiển thị</span></td>
                  <td className="px-5 py-3.5">
                    <button className="p-1.5 rounded-lg border hover:bg-gray-50 mr-2" style={{ borderColor: '#F0DCC8' }}><Edit2 size={14} style={{ color: '#F58220' }} /></button>
                    <button className="p-1.5 rounded-lg border hover:bg-pink-50" style={{ borderColor: '#FCBABD' }}><Trash2 size={14} style={{ color: '#8B3A4A' }} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Attributes View */}
      {activeCategory === 'attributes' && (
        <div className="rounded-xl overflow-hidden border bg-white" style={{ borderColor: '#F0DCC8' }}>
          {/* Mobile Card View */}
          <div className="md:hidden divide-y" style={{ borderColor: '#FAF0E6' }}>
            {[
              { name: 'Mức đường', options: ['0%', '30%', '50%', '70%', '100%'], required: true },
              { name: 'Mức đá', options: ['Không đá', 'Đá riêng', 'Ít đá', 'Đá bình thường'], required: true },
              { name: 'Kích cỡ', options: ['Size S', 'Size M', 'Size L'], required: true },
            ].map((a, i) => (
              <div key={i} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{a.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FFEDD5] text-[#9A3412]">Bắt buộc</span>
                    <button className="p-1.5 rounded-lg border" style={{ borderColor: '#F0DCC8' }}><Edit2 size={13} style={{ color: '#F58220' }} /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {a.options.map(o => <span key={o} className="px-2 py-0.5 rounded border text-xs" style={{ borderColor: '#F0DCC8', color: '#A0845C' }}>{o}</span>)}
                </div>
              </div>
            ))}
          </div>
          {/* Desktop Table View */}
          <table className="hidden md:table w-full text-left">
            <thead>
              <tr style={{ background: '#FFF3E6' }}>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Tên Thuộc tính</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Các lựa chọn</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Bắt buộc</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Mức đường', options: ['0%', '30%', '50%', '70%', '100%'], required: true },
                { name: 'Mức đá', options: ['Không đá', 'Đá riêng', 'Ít đá', 'Đá bình thường'], required: true },
                { name: 'Kích cỡ', options: ['Size S', 'Size M', 'Size L'], required: true },
              ].map((a, i) => (
                <tr key={i} className="border-b" style={{ borderColor: '#FAF0E6' }}>
                  <td className="px-5 py-3.5" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{a.name}</td>
                  <td className="px-5 py-3.5 flex flex-wrap gap-1.5">
                    {a.options.map(o => <span key={o} className="px-2 py-0.5 rounded border text-xs" style={{ borderColor: '#F0DCC8', color: '#A0845C' }}>{o}</span>)}
                  </td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFEDD5] text-[#9A3412]">Có</span></td>
                  <td className="px-5 py-3.5">
                    <button className="p-1.5 rounded-lg border hover:bg-gray-50 mr-2" style={{ borderColor: '#F0DCC8' }}><Edit2 size={14} style={{ color: '#F58220' }} /></button>
                    <button className="p-1.5 rounded-lg border hover:bg-pink-50" style={{ borderColor: '#FCBABD' }}><Trash2 size={14} style={{ color: '#8B3A4A' }} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Products View */}
      {activeCategory !== 'categories' && activeCategory !== 'attributes' && (
        <>
          {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full pl-9 pr-4 rounded-xl border outline-none"
            style={{ height: '40px', borderColor: '#F0DCC8', fontSize: '13.5px', background: '#FFFFFF' }}
          />
        </div>
        <div className="flex gap-1.5">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-2 rounded-xl text-sm transition-all"
              style={{
                background: activeCategory === cat ? '#F58220' : 'white',
                color: activeCategory === cat ? 'white' : '#A0845C',
                border: `1px solid ${activeCategory === cat ? '#F58220' : '#F0DCC8'}`,
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
            <div key={i} className="rounded-xl overflow-hidden p-3.5 space-y-3" style={{ background: 'white', border: '0.5px solid #F0DCC8' }}>
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
                style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {/* Product image placeholder */}
                <div className="aspect-square flex items-center justify-center relative"
                  style={{ 
                    background: p.image ? `url(${p.image})` : '#FFF3E6',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                  {!p.image && <Package size={48} style={{ color: '#F5C088' }} />}
                  {p.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: badgeStyle[p.badge]?.bg || '#F3F4F6', color: badgeStyle[p.badge]?.color || '#6B7280' }}>
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: p.status === 'active' ? '#FFEDD5' : '#F3F4F6', color: p.status === 'active' ? '#9A3412' : '#6B7280' }}>
                    {p.status === 'active' ? 'Đang bán' : 'Tạm ẩn'}
                  </span>
                </div>
                <div className="p-3.5">
                  <div style={{ fontSize: '13px', color: '#A0845C', marginBottom: '2px' }}>{p.category}</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#F58220', lineHeight: 1.3, marginBottom: '8px' }}>{p.name}</div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                    <span style={{ fontSize: '12px', color: '#A0845C' }}>{p.rating} · {p.sold} đã bán</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#F58220' }}>{formatVND(p.salePrice ?? p.price)}</span>
                    {p.salePrice && (
                      <span style={{ fontSize: '12px', color: '#9CA3AF', textDecoration: 'line-through' }}>{formatVND(p.price)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditProduct(p); setShowForm(true); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border transition-all text-xs"
                      style={{ borderColor: '#F58220', color: '#F58220', fontWeight: 600 }}>
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

          {/* Empty State */}
          {!isLoading && visibleData.length === 0 && (
            <div className="mt-8">
              <EmptyState 
                icon={<PackageX size={28} />}
                title="Không có sản phẩm nào"
                description="Không tìm thấy sản phẩm nào trong danh mục này hoặc khớp với từ khóa tìm kiếm."
              />
            </div>
          )}

          {/* Load More Button */}
          {hasMore && visibleData.length > 0 && (
            <div className="flex justify-center mt-10 mb-4">
              <button onClick={loadMore} disabled={isLoadingMore}
                className="flex items-center gap-2 px-8 py-3 rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ background: 'white', borderColor: '#F0DCC8', color: '#F58220', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(45, 106, 79, 0.08)' }}>
                {isLoadingMore ? <Loader2 size={18} className="animate-spin" /> : null}
                {isLoadingMore ? 'Đang tải thêm...' : 'Xem thêm sản phẩm'}
              </button>
            </div>
          )}
        </>
      )}
      </>
      )}
    </div>
  );
}
