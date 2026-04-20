import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, ChevronDown, Box, Upload } from "lucide-react";
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
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#F0DCC8' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            {topping ? 'Chỉnh sửa Topping' : 'Thêm Topping mới'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"><X size={16} style={{ color: '#A0845C' }} /></button>
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
                style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                onFocus={(e) => { e.target.style.borderColor = '#F5C088'; }}
                onBlur={(e) => { e.target.style.borderColor = '#F0DCC8'; }}
              />
            </div>
          ))}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Danh mục</label>
            <div className="relative">
              <select className="w-full px-4 rounded-xl border outline-none appearance-none"
                defaultValue={topping?.category || 'Trân Châu'}
                style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", background: 'white' }}>
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
                    background: s === 'Hoạt động' ? '#F58220' : 'white',
                    color: s === 'Hoạt động' ? 'white' : '#A0845C',
                    borderColor: s === 'Hoạt động' ? '#F58220' : '#F0DCC8',
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
              style={{ borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
              onFocus={(e) => { e.target.style.borderColor = '#F5C088'; }}
              onBlur={(e) => { e.target.style.borderColor = '#F0DCC8'; }}
            />
          </div>
        </div>
        <div className="px-5 py-4 border-t flex gap-3 flex-shrink-0" style={{ borderColor: '#F0DCC8' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border transition-all text-sm"
            style={{ borderColor: '#F0DCC8', color: '#A0845C', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Hủy</button>
          <button 
            onClick={() => {
              toast.success(topping ? 'Cập nhật topping thành công!' : 'Đã thêm topping mới!');
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl text-sm transition-all"
            style={{ background: '#F58220', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600 }}>
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
          <p style={{ fontSize: '13.5px', color: '#A0845C' }}>{toppings.length} loại topping</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all cursor-pointer hover:bg-gray-50 flex-1 sm:flex-none"
            style={{ borderColor: '#F0DCC8', color: '#A0845C', fontWeight: 600, fontSize: '13.5px' }}>
            <Upload size={16} /> <span>Nhập File</span>
            <input type="file" className="hidden" accept=".csv" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                toast.loading('Đang xử lý file CSV...');
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const text = event.target?.result as string;
                    const lines = text.split('\n').filter(l => l.trim() !== '');
                    if (lines.length > 1) {
                      for (let i = 1; i < lines.length; i++) {
                        const cols = lines[i].split(',');
                        if (cols.length >= 3) {
                          toppings.unshift({
                            id: 'TP' + Math.floor(100 + Math.random() * 900),
                            name: cols[0].trim(),
                            category: cols[1].trim() || 'Thạch',
                            price: parseInt(cols[2].trim()) || 10000,
                            status: 'active',
                            stock: parseInt(cols[3]?.trim()) || 50,
                          });
                        }
                      }
                      setTimeout(() => {
                        toast.dismiss();
                        toast.success(`Đã nhập thành công ${lines.length - 1} topping!`);
                        setSearch(s => s + ' '); setTimeout(() => setSearch(s => s.trim()), 10);
                      }, 1000);
                    } else {
                      toast.dismiss(); toast.error('File CSV trống hoặc sai định dạng');
                    }
                  } catch (err) {
                    toast.dismiss(); toast.error('Lỗi khi đọc file');
                  }
                };
                reader.readAsText(file);
                e.target.value = '';
              }
            }} />
          </label>
          <button onClick={() => { setEditTopping(null); setShowForm(true); }}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl flex-1 sm:flex-none"
            style={{ background: '#F58220', color: 'white', fontWeight: 600, fontSize: '13.5px' }}>
            <Plus size={16} /> Thêm topping
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {toppingCategories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-3.5 py-2 rounded-xl text-sm transition-all"
            style={{
              background: activeCategory === cat ? '#F58220' : 'white',
              color: activeCategory === cat ? 'white' : '#A0845C',
              border: `1px solid ${activeCategory === cat ? '#F58220' : '#F0DCC8'}`,
              fontWeight: activeCategory === cat ? 600 : 400
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden rounded-xl overflow-hidden" style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#F0DCC8', background: '#FFF3E6' }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm topping..."
              className="w-full pl-8 pr-3 rounded-xl border outline-none"
              style={{ height: '34px', borderColor: '#F0DCC8', fontSize: '12px', background: 'white' }} />
          </div>
          <span style={{ fontSize: '12px', color: '#A0845C', marginLeft: '12px', whiteSpace: 'nowrap' }}>{filtered.length} kết quả</span>
        </div>
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b flex items-center gap-3" style={{ borderColor: '#FAF0E6' }}>
              <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
              <div className="flex-1"><Skeleton className="h-4 w-32 mb-1.5" /><Skeleton className="h-3 w-20" /></div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))
        ) : paginatedData.length === 0 ? (
          <div className="py-10"><EmptyState icon={<Box size={28} />} title="Không tìm thấy Topping" description="Không có Topping nào khớp." /></div>
        ) : (
          paginatedData.map((t) => (
            <div key={t.id} className="p-4 border-b flex items-center gap-3" style={{ borderColor: '#FAF0E6' }}>
              {t.image ? (
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-xl object-cover border flex-shrink-0" style={{ borderColor: '#F0DCC8' }} />
              ) : (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0" style={{ background: '#FFF3E6', borderColor: '#F0DCC8' }}>
                  <span className="text-xs" style={{ color: '#F5C088' }}>Ảnh</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A1A' }}>{t.name}</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: '#FFF3E6', color: '#F58220' }}>{t.category}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>{formatVND(t.price)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: t.status === 'active' ? '#FFEDD5' : '#F3F4F6', color: t.status === 'active' ? '#9A3412' : '#6B7280' }}>
                  {t.status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}
                </span>
                <div className="flex gap-1.5">
                  <button onClick={() => { setEditTopping(t); setShowForm(true); }} className="p-1.5 rounded-lg border" style={{ borderColor: '#F0DCC8' }}><Edit2 size={13} style={{ color: '#F58220' }} /></button>
                  <button className="p-1.5 rounded-lg border" style={{ borderColor: '#FCBABD' }}><Trash2 size={13} style={{ color: '#8B3A4A' }} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl overflow-hidden" style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#F0DCC8' }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm topping..."
              className="w-full pl-9 pr-4 rounded-xl border outline-none"
              style={{ height: '38px', borderColor: '#F0DCC8', fontSize: '13px', background: '#FFFAF5' }} />
          </div>
          <span style={{ fontSize: '13px', color: '#A0845C' }}>{filtered.length} kết quả</span>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#FFF3E6' }}>
              {['Mã', 'Tên Topping', 'Danh mục', 'Giá bán', 'Trạng thái', 'Hành động'].map((h) => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b" style={{ borderColor: '#FAF0E6', background: i % 2 === 1 ? '#FFFCF8' : 'white' }}>
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
                <tr key={t.id} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#FAF0E6', background: i % 2 === 1 ? '#FFFCF8' : 'white' }}>
                  <td className="px-5 py-3.5"><span style={{ fontSize: '12px', color: '#A0845C', fontWeight: 500 }}>{t.id}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="w-10 h-10 rounded-lg object-cover border" style={{ borderColor: '#F0DCC8' }} />
                      ) : (
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0" style={{ background: '#FFF3E6', borderColor: '#F0DCC8' }}><span className="text-xs" style={{ color: '#F5C088' }}>Ảnh</span></div>
                      )}
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A1A' }}>{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full text-xs" style={{ background: '#FFF3E6', color: '#F58220', fontWeight: 500 }}>{t.category}</span></td>
                  <td className="px-5 py-3.5"><span style={{ fontSize: '13.5px', fontWeight: 600, color: '#F58220' }}>{formatVND(t.price)}</span></td>
                  <td className="px-5 py-3.5"><span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: t.status === 'active' ? '#FFEDD5' : '#F3F4F6', color: t.status === 'active' ? '#9A3412' : '#6B7280' }}>{t.status === 'active' ? 'Hoạt động' : 'Tạm ẩn'}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditTopping(t); setShowForm(true); }} className="p-2 rounded-lg border transition-all hover:bg-gray-50" style={{ borderColor: '#F0DCC8' }}><Edit2 size={14} style={{ color: '#F58220' }} /></button>
                      <button className="p-2 rounded-lg border transition-all hover:bg-pink-50" style={{ borderColor: '#FCBABD' }}><Trash2 size={14} style={{ color: '#8B3A4A' }} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!isLoading && paginatedData.length === 0 && (
          <div className="py-10"><EmptyState icon={<Box size={28} />} title="Không tìm thấy Topping" description="Không có Topping nào khớp với điều kiện lọc hoặc từ khóa tìm kiếm." /></div>
        )}

        {!isLoading && totalPages > 1 && (
          <div className="px-5 py-4 border-t" style={{ borderColor: '#F0DCC8' }}>
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
