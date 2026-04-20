import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, ChevronDown, Box } from "lucide-react";
import { toast } from "sonner";
import { toppings } from "../data/mockData";
import { Skeleton } from "../components/ui/skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { usePagination } from "../hooks/useDataFetching";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

type Topping = typeof toppings[0];

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';
const toppingCategories = ['Tất cả', 'Trân Châu', 'Thạch', 'Kem', 'Pudding', 'Đậu'];

interface ToppingFormProps {
  topping?: Topping | null;
  onClose: () => void;
}

function ToppingForm({ topping, onClose }: ToppingFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl overflow-hidden flex flex-col"
        style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            {topping ? 'Chỉnh sửa Topping' : 'Thêm Topping mới'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={16} style={{ color: '#6B9080' }} /></button>
        </div>
        <div className="px-5 py-5 space-y-4 overflow-y-auto flex-1">
          {[
            { label: 'Tên topping', key: 'name', placeholder: 'VD: Trân Châu Đen', value: topping?.name || '' },
            { label: 'Giá bán', key: 'price', placeholder: 'VD: 10000', value: topping?.price?.toString() || '' },
          ].map((f) => (
            <div key={f.key}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>{f.label}</label>
              <input defaultValue={f.value} placeholder={f.placeholder}
                className="w-full px-4 rounded-xl border outline-none transition-all"
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                onFocus={(e) => { e.target.style.borderColor = '#A8D5BA'; }}
                onBlur={(e) => { e.target.style.borderColor = '#E0EDE6'; }}
              />
            </div>
          ))}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Danh mục</label>
            <div className="relative">
              <select className="w-full px-4 rounded-xl border outline-none appearance-none"
                defaultValue={topping?.category || 'Trân Châu'}
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", background: 'white' }}>
                {['Trân Châu', 'Thạch', 'Kem', 'Pudding', 'Đậu'].map(c => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Trạng thái</label>
            <div className="flex gap-3">
              {['Hoạt động', 'Tạm ẩn'].map((s) => (
                <button key={s} className="flex-1 py-2.5 rounded-xl border transition-all text-sm"
                  style={{
                    background: s === 'Hoạt động' ? '#2D6A4F' : 'white',
                    color: s === 'Hoạt động' ? 'white' : '#6B9080',
                    borderColor: s === 'Hoạt động' ? '#2D6A4F' : '#E0EDE6',
                    fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Mô tả topping
            </label>
            <textarea rows={2} placeholder="Mô tả nguyên liệu, công dụng..."
              defaultValue={(topping as any)?.description || ''}
              className="w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none"
              style={{ borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
              onFocus={(e) => { e.target.style.borderColor = '#A8D5BA'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E0EDE6'; }}
            />
          </div>
        </div>
        <div className="px-5 py-4 border-t flex gap-3 flex-shrink-0" style={{ borderColor: '#E0EDE6' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border transition-all text-sm"
            style={{ borderColor: '#E0EDE6', color: '#6B9080', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Hủy</button>
          <button 
            onClick={() => {
              toast.success(topping ? 'Cập nhật topping thành công!' : 'Đã thêm topping mới!');
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl text-sm transition-all"
            style={{ background: '#2D6A4F', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600 }}>
            {topping ? 'Lưu thay đổi' : 'Thêm topping'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ToppingManagement() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [showForm, setShowForm] = useState(false);
  const [editTopping, setEditTopping] = useState<Topping | null>(null);
  const [search, setSearch] = useState('');

  const filtered = toppings.filter(t =>
    (activeCategory === 'Tất cả' || t.category === activeCategory) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const { currentPage, setCurrentPage, totalPages, paginatedData, isLoading } = usePagination(filtered, 5);

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {showForm && <ToppingForm topping={editTopping} onClose={() => { setShowForm(false); setEditTopping(null); }} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
            Quản lý Topping
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B9080' }}>{toppings.length} loại topping</p>
        </div>
        <button onClick={() => { setEditTopping(null); setShowForm(true); }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl w-full sm:w-auto"
          style={{ background: '#2D6A4F', color: 'white', fontWeight: 600, fontSize: '13.5px' }}>
          <Plus size={16} /> Thêm topping
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {toppingCategories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-3.5 py-2 rounded-xl text-sm transition-all"
            style={{
              background: activeCategory === cat ? '#2D6A4F' : 'white',
              color: activeCategory === cat ? 'white' : '#6B9080',
              border: `1px solid ${activeCategory === cat ? '#2D6A4F' : '#E0EDE6'}`,
              fontWeight: activeCategory === cat ? 600 : 400
            }}>
            {cat}
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden"
        style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm topping..."
              className="w-full pl-9 pr-4 rounded-xl border outline-none"
              style={{ height: '38px', borderColor: '#E0EDE6', fontSize: '13px', background: '#F8FAF9' }}
            />
          </div>
          <span style={{ fontSize: '13px', color: '#6B9080' }}>{filtered.length} kết quả</span>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#E8F5EC' }}>
              {['Mã', 'Tên Topping', 'Danh mục', 'Giá bán', 'Trạng thái', 'Hành động'].map((h) => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b" style={{ borderColor: '#F0F7F3', background: i % 2 === 1 ? '#FAFCFB' : 'white' }}>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-12" /></td>
                  <td className="px-5 py-3.5"><div className="flex items-center gap-3"><Skeleton className="w-10 h-10 rounded-lg" /><Skeleton className="h-4 w-32" /></div></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-6 w-20 rounded-full" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-6 w-24 rounded-full" /></td>
                  <td className="px-5 py-3.5"><div className="flex gap-2"><Skeleton className="w-8 h-8 rounded-lg" /><Skeleton className="w-8 h-8 rounded-lg" /></div></td>
                </tr>
              ))
            ) : (
              paginatedData.map((t, i) => (
                <tr key={t.id} className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: '#F0F7F3', background: i % 2 === 1 ? '#FAFCFB' : 'white' }}>
                  <td className="px-5 py-3.5">
                    <span style={{ fontSize: '12px', color: '#6B9080', fontWeight: 500 }}>{t.id}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="w-10 h-10 rounded-lg object-cover border" style={{ borderColor: '#E0EDE6' }} />
                      ) : (
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0" style={{ background: '#E8F5EC', borderColor: '#E0EDE6' }}>
                          <span className="text-xs" style={{ color: '#A8D5BA' }}>Ảnh</span>
                        </div>
                      )}
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A1A' }}>{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs"
                      style={{ background: '#E8F5EC', color: '#2D6A4F', fontWeight: 500 }}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#2D6A4F' }}>{formatVND(t.price)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                      style={{
                        background: t.status === 'active' ? '#DCFCE7' : '#F3F4F6',
                        color: t.status === 'active' ? '#166534' : '#6B7280'
                      }}>
                      {t.status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditTopping(t); setShowForm(true); }}
                        className="p-2 rounded-lg border transition-all hover:bg-gray-50"
                        style={{ borderColor: '#E0EDE6' }}>
                        <Edit2 size={14} style={{ color: '#2D6A4F' }} />
                      </button>
                      <button className="p-2 rounded-lg border transition-all hover:bg-pink-50"
                        style={{ borderColor: '#FCBABD' }}>
                        <Trash2 size={14} style={{ color: '#8B3A4A' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {!isLoading && paginatedData.length === 0 && (
          <div className="py-10">
            <EmptyState 
              icon={<Box size={28} />}
              title="Không tìm thấy Topping"
              description="Không có Topping nào khớp với điều kiện lọc hoặc từ khóa tìm kiếm."
            />
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="px-5 py-4 border-t" style={{ borderColor: '#E0EDE6' }}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

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
    </div>
  );
}
