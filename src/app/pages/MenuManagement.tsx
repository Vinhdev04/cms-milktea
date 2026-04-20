import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Filter, X, Star, Package, Loader2, PackageX, List, Settings2, Upload, Box, ChevronDown, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { products, toppings } from "../data/mockData";
import { Skeleton } from "../components/ui/skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { useInfiniteScroll, usePagination } from "../hooks/useDataFetching";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const productCategories = ['Tất cả', 'Trà Sữa', 'Trà Trái Cây', 'Cà Phê', 'Đá Xay'];
const toppingCategories = ['Tất cả', 'Trân Châu', 'Thạch', 'Kem', 'Pudding', 'Đậu'];

const badgeStyle: Record<string, { bg: string; color: string }> = {
  'Mới': { bg: '#FFEDD5', color: '#9A3412' },
  'Bán chạy': { bg: '#FEF3C7', color: '#854D0E' },
  'Sale': { bg: '#FCBABD', color: '#8B3A4A' },
  'Hết hàng': { bg: '#F3F4F6', color: '#6B7280' },
};

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';

type Topping = typeof toppings[0];
type Product = typeof products[0];

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

function ProductForm({ product, onClose }: ProductFormProps) {
  const isEdit = !!product;
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Trà Sữa',
    price: product?.price || 0,
    salePrice: product?.salePrice || null,
    status: product?.status || 'active',
    description: (product as any)?.description || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm không được để trống';
    if (formData.price <= 0) newErrors.price = 'Giá sản phẩm phải lớn hơn 0';
    if (formData.salePrice !== null && formData.salePrice >= formData.price) {
      newErrors.salePrice = 'Giá khuyến mãi phải nhỏ hơn giá gốc';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      toast.success(isEdit ? 'Cập nhật sản phẩm thành công!' : 'Đã thêm sản phẩm mới!');
      onClose();
    } else {
      toast.error('Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose}>
      <div className="h-full w-full max-w-md flex flex-col animate-in slide-in-from-right duration-300"
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
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>
              Tên sản phẩm *
            </label>
            <input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="VD: Trà Sữa Trân Châu Hoàng Kim"
              className={`w-full px-4 rounded-xl border outline-none transition-all ${errors.name ? 'border-red-500' : ''}`}
              style={{ height: '44px', borderColor: errors.name ? '#EF4444' : '#F0DCC8', fontSize: '13.5px', color: '#1A1A1A' }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>
              Danh mục
            </label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 rounded-xl border outline-none appearance-none"
              style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', background: 'white' }}>
              {productCategories.filter(c => c !== 'Tất cả').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>
              Giá bán & Khuyến mãi (đ)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input 
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  placeholder="Giá gốc"
                  className={`w-full px-4 rounded-xl border outline-none ${errors.price ? 'border-red-500' : ''}`}
                  style={{ height: '44px', borderColor: errors.price ? '#EF4444' : '#F0DCC8', fontSize: '13.5px' }}
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              <div>
                <input 
                  type="number"
                  value={formData.salePrice || ''}
                  onChange={(e) => setFormData({...formData, salePrice: e.target.value ? parseInt(e.target.value) : null})}
                  placeholder="Giá khuyến mãi"
                  className={`w-full px-4 rounded-xl border outline-none ${errors.salePrice ? 'border-red-500' : ''}`}
                  style={{ height: '44px', borderColor: errors.salePrice ? '#EF4444' : '#F0DCC8', fontSize: '13.5px' }}
                />
                {errors.salePrice && <p className="text-red-500 text-xs mt-1">{errors.salePrice}</p>}
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>
              Trạng thái
            </label>
            <div className="flex gap-3">
              {['active', 'inactive'].map((s) => (
                <button key={s} 
                  onClick={() => setFormData({...formData, status: s as any})}
                  className="flex-1 py-2.5 rounded-xl border transition-all text-sm font-semibold"
                  style={{
                    background: formData.status === s ? '#F58220' : 'white',
                    color: formData.status === s ? 'white' : '#A0845C',
                    borderColor: formData.status === s ? '#F58220' : '#F0DCC8',
                  }}>
                  {s === 'active' ? 'Đang bán' : 'Tạm ẩn'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>
              Mô tả sản phẩm
            </label>
            <textarea 
              rows={3} 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Mô tả nguyên liệu, hương vị..."
              className="w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none"
              style={{ borderColor: '#F0DCC8', fontSize: '13.5px', color: '#1A1A1A' }}
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t flex gap-3" style={{ borderColor: '#F0DCC8' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border transition-all text-sm font-semibold"
            style={{ borderColor: '#F0DCC8', color: '#A0845C' }}>
            Hủy
          </button>
          <button 
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl transition-all text-sm font-bold shadow-sm shadow-orange-100"
            style={{ background: '#F58220', color: 'white' }}>
            {isEdit ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ToppingFormProps {
  topping?: Topping | null;
  onClose: () => void;
}

function ToppingForm({ topping, onClose }: ToppingFormProps) {
  const isEdit = !!topping;
  const [formData, setFormData] = useState({
    name: topping?.name || '',
    category: topping?.category || 'Trân Châu',
    price: topping?.price || 0,
    status: topping?.status || 'active',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Tên topping không được để trống';
    if (formData.price < 0) newErrors.price = 'Giá topping không được âm';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      toast.success(isEdit ? 'Cập nhật topping thành công!' : 'Đã thêm topping mới!');
      onClose();
    } else {
      toast.error('Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#F0DCC8' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            {topping ? 'Chỉnh sửa Topping' : 'Thêm Topping mới'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={16} style={{ color: '#A0845C' }} /></button>
        </div>
        <div className="px-5 py-5 space-y-4 overflow-y-auto flex-1">
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>Tên topping *</label>
            <input 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="VD: Trân Châu Đen"
              className={`w-full px-4 rounded-xl border outline-none transition-all ${errors.name ? 'border-red-500' : ''}`}
              style={{ height: '44px', borderColor: errors.name ? '#EF4444' : '#F0DCC8', fontSize: '13.5px' }}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>Giá bán (đ) *</label>
            <input 
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
              placeholder="VD: 10000"
              className={`w-full px-4 rounded-xl border outline-none transition-all ${errors.price ? 'border-red-500' : ''}`}
              style={{ height: '44px', borderColor: errors.price ? '#EF4444' : '#F0DCC8', fontSize: '13.5px' }}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>Danh mục</label>
            <div className="relative">
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 rounded-xl border outline-none appearance-none"
                style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', background: 'white' }}>
                {toppingCategories.filter(c => c !== 'Tất cả').map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px' }}>Trạng thái</label>
            <div className="flex gap-3">
              {['active', 'inactive'].map((s) => (
                <button key={s} 
                  onClick={() => setFormData({...formData, status: s as any})}
                  className="flex-1 py-2.5 rounded-xl border transition-all text-sm font-semibold"
                  style={{
                    background: formData.status === s ? '#F58220' : 'white',
                    color: formData.status === s ? 'white' : '#A0845C',
                    borderColor: formData.status === s ? '#F58220' : '#F0DCC8',
                  }}>
                  {s === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t flex gap-3 flex-shrink-0" style={{ borderColor: '#F0DCC8' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border transition-all text-sm font-semibold"
            style={{ borderColor: '#F0DCC8', color: '#A0845C' }}>Hủy</button>
          <button 
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-orange-100"
            style={{ background: '#F58220', color: 'white' }}>
            {isEdit ? 'Lưu thay đổi' : 'Thêm topping'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function MenuManagement() {
  const [activeTab, setActiveTab] = useState('products');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activeToppingCategory, setActiveToppingCategory] = useState('Tất cả');
  const [showForm, setShowForm] = useState(false);
  const [showToppingForm, setShowToppingForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editTopping, setEditTopping] = useState<Topping | null>(null);
  const [search, setSearch] = useState('');
  const [toppingSearch, setToppingSearch] = useState('');
  
  // Deletion confirmation state
  const [deleteTarget, setDeleteTarget] = useState<{ id: string, type: 'product' | 'topping' | 'category' } | null>(null);

  // Products filtering
  const filteredProducts = products.filter(p =>
    (activeCategory === 'Tất cả' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()))
  );
  const { visibleData, isLoading: productsLoading, isLoadingMore, loadMore, hasMore } = useInfiniteScroll(filteredProducts, 8);

  // Toppings filtering
  const filteredToppings = toppings.filter(t =>
    (activeToppingCategory === 'Tất cả' || t.category === activeToppingCategory) &&
    t.name.toLowerCase().includes(toppingSearch.toLowerCase())
  );
  const { currentPage, setCurrentPage, totalPages, paginatedData: toppingPaginatedData, isLoading: toppingsLoading } = usePagination(filteredToppings, 10);

  const handleDelete = () => {
    if (!deleteTarget) return;
    toast.success(`Đã xóa ${deleteTarget.type === 'product' ? 'sản phẩm' : deleteTarget.type === 'topping' ? 'topping' : 'danh mục'} thành công!`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {showForm && <ProductForm product={editProduct} onClose={() => { setShowForm(false); setEditProduct(null); }} />}
      {showToppingForm && <ToppingForm topping={editTopping} onClose={() => { setShowToppingForm(false); setEditTopping(null); }} />}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-2xl border-[#F0DCC8]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-[#991B1B]">
              <AlertCircle size={20} /> Xác nhận xóa
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#A0845C]">
              Bạn có chắc chắn muốn xóa {deleteTarget?.type === 'product' ? 'sản phẩm' : deleteTarget?.type === 'topping' ? 'topping' : 'danh mục'} này? 
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl border-[#F0DCC8] text-[#A0845C]">Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-xl bg-red-600 hover:bg-red-700 text-white border-none">
              Xóa ngay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="section-enter flex flex-col gap-4 rounded-[28px] border border-[#F0DCC8] bg-[linear-gradient(135deg,#FFF8F2_0%,#FFFFFF_68%)] p-4 shadow-[0_16px_40px_rgba(93,46,15,0.05)] xl:flex-row xl:items-center xl:justify-between sm:p-5">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '24px', fontWeight: 700, color: '#1A1A1A' }}>
            Quản lý Menu & Topping
          </h1>
          <p style={{ fontSize: '14px', color: '#A0845C' }}>Thiết lập sản phẩm, topping, danh mục và thuộc tính</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all cursor-pointer hover:bg-gray-50 flex-1 sm:flex-none"
            style={{ borderColor: '#F0DCC8', color: '#A0845C', fontWeight: 600, fontSize: '13.5px' }}>
            <Upload size={16} /> <span className="hidden sm:inline">Nhập File</span>
            <input type="file" className="hidden" accept=".csv" />
          </label>
          <button onClick={() => { 
              if (activeTab === 'toppings') {
                setEditTopping(null); setShowToppingForm(true);
              } else {
                setEditProduct(null); setShowForm(true);
              }
            }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all flex-1 sm:flex-none shadow-sm shadow-orange-200"
            style={{ background: '#F58220', color: 'white', fontWeight: 600, fontSize: '13.5px' }}>
            <Plus size={16} /> Thêm mới
          </button>
        </div>
      </div>

      <div className="stats-grid-compact">
        {[
          { label: 'Äang bÃ¡n', value: products.filter(p => p.status === 'active').length, bg: '#FFEDD5', color: '#9A3412' },
          { label: 'BÃ¡n cháº¡y', value: products.filter(p => p.badge === 'BÃ¡n cháº¡y').length, bg: '#FEF3C7', color: '#854D0E' },
          { label: 'Äang giáº£m', value: products.filter(p => p.salePrice).length, bg: '#FFF3E6', color: '#F58220' },
        ].map((item) => (
          <div key={item.label} className="compact-stat-card p-3 sm:p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-bold" style={{ background: item.bg, color: item.color }}>
              {item.value}
            </div>
            <div className="font-heading text-[22px] font-bold text-[#1A1A1A]">{item.value}</div>
            <div className="text-[12px] text-[#A0845C]">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Main Tabs */}
      <div className="chip-scroller mb-2 border-b pb-3" style={{ borderColor: '#F0DCC8' }}>
        {[
          { id: 'products', label: 'Sản phẩm', icon: <Package size={18} /> },
          { id: 'toppings', label: 'Topping', icon: <Box size={18} /> },
          { id: 'categories', label: 'Danh mục', icon: <List size={18} /> },
          { id: 'attributes', label: 'Thuộc tính', icon: <Settings2 size={18} /> },
        ].map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSearch(''); setToppingSearch(''); }}
            className="flex items-center gap-2 rounded-2xl border px-4 py-2.5 transition-all whitespace-nowrap"
            style={{ 
              color: activeTab === t.id ? '#FFFFFF' : '#A0845C',
              fontWeight: activeTab === t.id ? 700 : 500,
              fontSize: '14px',
              background: activeTab === t.id ? '#F58220' : 'rgba(255,255,255,0.85)',
              borderColor: activeTab === t.id ? '#F58220' : '#F0DCC8',
              boxShadow: activeTab === t.id ? '0 10px 22px rgba(245,130,32,0.18)' : 'none',
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Products View */}
      {activeTab === 'products' && (
        <div className="section-enter space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm sản phẩm theo tên..."
                className="w-full pl-11 pr-4 rounded-2xl border outline-none transition-all focus:ring-4 focus:ring-orange-100/80"
                style={{ height: '48px', borderColor: '#F0DCC8', fontSize: '14px', background: 'rgba(255,255,255,0.92)' }}
              />
            </div>
            <div className="chip-scroller lg:max-w-[62%]">
              {productCategories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2.5 rounded-2xl text-sm transition-all whitespace-nowrap border"
                  style={{
                    background: activeCategory === cat ? '#F58220' : 'rgba(255,255,255,0.84)',
                    color: activeCategory === cat ? 'white' : '#A0845C',
                    borderColor: activeCategory === cat ? '#F58220' : '#F0DCC8',
                    fontWeight: activeCategory === cat ? 700 : 600,
                    boxShadow: activeCategory === cat ? '0 10px 22px rgba(245,130,32,0.18)' : 'none'
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-[24px] overflow-hidden p-2.5 space-y-3 bg-white border border-[#F0DCC8]">
                  <Skeleton className="w-full aspect-[0.96] rounded-[18px]" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-9 w-full rounded-2xl" />
                    <Skeleton className="h-9 w-9 rounded-2xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {visibleData.map((p) => (
                  <div key={p.id} className="hover-lift rounded-[24px] overflow-hidden group bg-white border border-[#F0DCC8] shadow-[0_10px_26px_rgba(93,46,15,0.05)]">
                    <div className="aspect-[0.96] flex items-center justify-center relative overflow-hidden"
                      style={{ 
                        background: p.image ? `url(${p.image})` : '#FFF3E6',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}>
                      {!p.image && <Package size={48} className="text-orange-200" />}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,26,0.03),rgba(26,26,26,0.24))]" />
                      <div className="absolute top-2.5 left-2.5 flex max-w-[70%] flex-wrap gap-1.5">
                        {p.badge && (
                          <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.14em] shadow-sm"
                            style={{ background: badgeStyle[p.badge]?.bg || '#F3F4F6', color: badgeStyle[p.badge]?.color || '#6B7280' }}>
                            {p.badge}
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.14em] shadow-sm"
                          style={{ background: p.status === 'active' ? '#E8F5E9' : '#F5F5F5', color: p.status === 'active' ? '#2E7D32' : '#757575' }}>
                          {p.status === 'active' ? 'Đang bán' : 'Tạm ẩn'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 p-3 sm:p-4">
                      <div style={{ fontSize: '11px', color: '#C1874E', fontWeight: 700, marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{p.category}</div>
                      <div className="line-clamp-2 min-h-[38px]" style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.35 }}>{p.name}</div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7EF] px-2 py-1" style={{ fontSize: '11px', color: '#7A4D24', fontWeight: 700 }}>
                          <Star size={13} fill="#F58220" style={{ color: '#F58220' }} />
                          {p.rating}
                        </span>
                        <span style={{ fontSize: '13px', color: '#A0845C' }}>· {p.sold} đã bán</span>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#F58220' }}>{formatVND(p.salePrice ?? p.price)}</span>
                        {p.salePrice && (
                          <span className="line-through" style={{ fontSize: '13px', color: '#9CA3AF' }}>{formatVND(p.price)}</span>
                        )}
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button onClick={() => { setEditProduct(p); setShowForm(true); }}
                          className="flex-1 flex items-center justify-center gap-2 h-10 rounded-2xl border transition-all text-[12px] hover:bg-orange-50 active:scale-95 sm:text-[13px]"
                          style={{ borderColor: '#F5C088', color: '#F58220', fontWeight: 700 }}>
                          <Edit2 size={14} /> Chỉnh sửa
                        </button>
                        <button onClick={() => setDeleteTarget({ id: p.id, type: 'product' })}
                          className="flex items-center justify-center w-10 h-10 rounded-2xl border transition-all hover:bg-red-50 hover:border-red-200 text-red-600 active:scale-95"
                          style={{ borderColor: '#FCBABD' }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!productsLoading && visibleData.length === 0 && (
                <div className="py-20 text-center">
                  <EmptyState 
                    icon={<PackageX size={48} className="text-orange-200" />}
                    title="Không tìm thấy sản phẩm"
                    description="Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác."
                  />
                </div>
              )}

              {hasMore && visibleData.length > 0 && (
                <div className="flex justify-center pt-8 pb-4">
                  <button onClick={loadMore} disabled={isLoadingMore}
                    className="flex items-center gap-2 px-10 py-3.5 rounded-xl border-2 transition-all hover:bg-orange-50 active:scale-95 shadow-sm shadow-orange-50"
                    style={{ borderColor: '#F58220', color: '#F58220', fontWeight: 700, fontSize: '14px' }}>
                    {isLoadingMore ? <Loader2 size={20} className="animate-spin" /> : <ChevronDown size={20} />}
                    {isLoadingMore ? 'Đang tải...' : 'Xem thêm sản phẩm'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Toppings View */}
      {activeTab === 'toppings' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={toppingSearch} onChange={(e) => setToppingSearch(e.target.value)}
                placeholder="Tìm topping theo tên..."
                className="w-full pl-10 pr-4 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-orange-100"
                style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '14px', background: '#FFFFFF' }}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {toppingCategories.map(cat => (
                <button key={cat} onClick={() => setActiveToppingCategory(cat)}
                  className="px-4 py-2 rounded-xl text-sm transition-all whitespace-nowrap border"
                  style={{
                    background: activeToppingCategory === cat ? '#F58220' : 'white',
                    color: activeToppingCategory === cat ? 'white' : '#A0845C',
                    borderColor: activeToppingCategory === cat ? '#F58220' : '#F0DCC8',
                    fontWeight: activeToppingCategory === cat ? 600 : 500
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#F0DCC8] overflow-hidden shadow-sm">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr style={{ background: '#FFF3E6' }}>
                    {['Mã', 'Tên Topping', 'Danh mục', 'Giá bán', 'Trạng thái', 'Hành động'].map((h) => (
                      <th key={h} className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF0E6]">
                  {toppingsLoading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-12" /></td>
                        <td className="px-6 py-4"><div className="flex items-center gap-3"><Skeleton className="w-10 h-10 rounded-lg" /><Skeleton className="h-4 w-32" /></div></td>
                        <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                        <td className="px-6 py-4"><div className="flex gap-2"><Skeleton className="w-9 h-9 rounded-lg" /><Skeleton className="w-9 h-9 rounded-lg" /></div></td>
                      </tr>
                    ))
                  ) : (
                    toppingPaginatedData.map((t) => (
                      <tr key={t.id} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-6 py-4" style={{ fontSize: '13px', color: '#A0845C', fontWeight: 600 }}>{t.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border bg-orange-50 border-orange-100">
                              <Box size={20} className="text-orange-300" />
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>{t.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: '#FFF3E6', color: '#F58220' }}>{t.category}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span style={{ fontSize: '14px', fontWeight: 800, color: '#F58220' }}>{formatVND(t.price)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide" 
                            style={{ background: t.status === 'active' ? '#E8F5E9' : '#F5F5F5', color: t.status === 'active' ? '#2E7D32' : '#757575' }}>
                            {t.status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => { setEditTopping(t); setShowToppingForm(true); }} 
                              className="p-2 rounded-xl border hover:bg-white hover:shadow-md transition-all text-orange-600" style={{ borderColor: '#F0DCC8' }}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => setDeleteTarget({ id: t.id, type: 'topping' })}
                              className="p-2 rounded-xl border hover:bg-white hover:shadow-md transition-all text-red-600" style={{ borderColor: '#FCBABD' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards for Toppings */}
            <div className="md:hidden divide-y divide-[#FAF0E6]">
              {toppingsLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 space-y-3">
                    <div className="flex justify-between"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-4 w-1/4" /></div>
                    <div className="flex justify-between"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-6 w-1/4" /></div>
                  </div>
                ))
              ) : (
                toppingPaginatedData.map((t) => (
                  <div key={t.id} className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border bg-orange-50 border-orange-100">
                          <Box size={20} className="text-orange-300" />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>{t.name}</div>
                          <div style={{ fontSize: '12px', color: '#A0845C' }}>{t.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#F58220' }}>{formatVND(t.price)}</div>
                        <span className="text-[10px] font-bold" style={{ color: t.status === 'active' ? '#2E7D32' : '#757575' }}>
                          {t.status === 'active' ? 'HOẠT ĐỘNG' : 'TẠM ẨN'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => { setEditTopping(t); setShowToppingForm(true); }}
                        className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl border transition-all text-xs font-bold text-orange-600"
                        style={{ borderColor: '#F0DCC8' }}>
                        <Edit2 size={14} /> Sửa
                      </button>
                      <button onClick={() => setDeleteTarget({ id: t.id, type: 'topping' })}
                        className="flex-1 flex items-center justify-center gap-2 h-9 rounded-xl border transition-all text-xs font-bold text-red-600"
                        style={{ borderColor: '#FCBABD' }}>
                        <Trash2 size={14} /> Xóa
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!toppingsLoading && toppingPaginatedData.length === 0 && (
              <div className="py-16 text-center">
                <EmptyState icon={<Box size={40} className="text-orange-200" />} title="Không tìm thấy Topping" description="Thử thay đổi từ khóa tìm kiếm." />
              </div>
            )}
          </div>

          {!toppingsLoading && totalPages > 1 && (
            <div className="flex justify-center pt-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {/* Categories View */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-2xl border border-[#F0DCC8] overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: '#FFF3E6' }}>
                  <th className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Tên Danh mục</th>
                  <th className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Số lượng SP</th>
                  <th className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Trạng thái</th>
                  <th className="px-6 py-4 text-right" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF0E6]">
                {productCategories.filter(c => c !== 'Tất cả').map((c, i) => (
                  <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-6 py-4" style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A1A' }}>{c}</td>
                    <td className="px-6 py-4" style={{ fontSize: '14px', color: '#A0845C', fontWeight: 500 }}>
                      {products.filter(p => p.category === c).length} sản phẩm
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#E8F5E9] text-[#2E7D32]">HIỂN THỊ</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-xl border transition-all text-orange-600 hover:bg-white hover:shadow-md" style={{ borderColor: '#F0DCC8' }}>
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => setDeleteTarget({ id: c, type: 'category' })}
                          className="p-2 rounded-xl border transition-all text-red-600 hover:bg-white hover:shadow-md" style={{ borderColor: '#FCBABD' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attributes View */}
      {activeTab === 'attributes' && (
        <div className="bg-white rounded-2xl border border-[#F0DCC8] overflow-hidden shadow-sm animate-in fade-in duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: '#FFF3E6' }}>
                  <th className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Tên Thuộc tính</th>
                  <th className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Các lựa chọn</th>
                  <th className="px-6 py-4" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Bắt buộc</th>
                  <th className="px-6 py-4 text-right" style={{ fontSize: '13px', fontWeight: 700, color: '#F58220' }}>Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF0E6]">
                {[
                  { name: 'Mức đường', options: ['0%', '30%', '50%', '70%', '100%'], required: true },
                  { name: 'Mức đá', options: ['Không đá', 'Đá riêng', 'Ít đá', 'Đá bình thường'], required: true },
                  { name: 'Kích cỡ', options: ['Size S', 'Size M', 'Size L'], required: true },
                ].map((a, i) => (
                  <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-6 py-4" style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A1A' }}>{a.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {a.options.map(o => (
                          <span key={o} className="px-2.5 py-1 rounded-lg border text-[11px] font-bold" style={{ borderColor: '#F0DCC8', color: '#A0845C', background: '#FFFAF5' }}>
                            {o}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#FFF3E6] text-[#F58220]">CÓ</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-xl border transition-all text-orange-600 hover:bg-white hover:shadow-md" style={{ borderColor: '#F0DCC8' }}>
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 rounded-xl border transition-all text-red-600 hover:bg-white hover:shadow-md" style={{ borderColor: '#FCBABD' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
