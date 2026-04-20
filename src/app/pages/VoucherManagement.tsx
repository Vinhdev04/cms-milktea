import { useState } from "react";
import { Plus, Tag, Copy, X, CheckCircle2, Clock, AlertCircle, Loader2, Ticket } from "lucide-react";
import { vouchers } from "../data/mockData";
import { Skeleton } from "../components/ui/skeleton";
import { EmptyState } from "../components/ui/EmptyState";
import { useInfiniteScroll } from "../hooks/useDataFetching";

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';

interface VoucherFormProps {
  onClose: () => void;
}

function VoucherForm({ onClose }: VoucherFormProps) {
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            Tạo Voucher mới
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} style={{ color: '#6B9080' }} /></button>
        </div>
        <div className="px-5 py-5 space-y-4">
          {/* Code */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Mã voucher *
            </label>
            <input placeholder="VD: SUMMER2026" className="w-full px-4 rounded-xl border outline-none transition-all uppercase"
              style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", letterSpacing: '0.05em' }}
              onFocus={(e) => { e.target.style.borderColor = '#A8D5BA'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E0EDE6'; }}
            />
          </div>
          {/* Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Tên chương trình *
            </label>
            <input placeholder="VD: Khuyến mãi mùa hè" className="w-full px-4 rounded-xl border outline-none transition-all"
              style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
              onFocus={(e) => { e.target.style.borderColor = '#A8D5BA'; }}
              onBlur={(e) => { e.target.style.borderColor = '#E0EDE6'; }}
            />
          </div>
          {/* Discount type */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Loại giảm giá
            </label>
            <div className="flex gap-3">
              {(['percent', 'fixed'] as const).map((t) => (
                <button key={t} onClick={() => setDiscountType(t)}
                  className="flex-1 py-2.5 rounded-xl border transition-all text-sm"
                  style={{
                    background: discountType === t ? '#2D6A4F' : 'white',
                    color: discountType === t ? 'white' : '#6B9080',
                    borderColor: discountType === t ? '#2D6A4F' : '#E0EDE6',
                    fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600
                  }}>
                  {t === 'percent' ? '% Phần trăm' : '₫ Số tiền cố định'}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                Mức giảm {discountType === 'percent' ? '(%)' : '(đ)'}
              </label>
              <input placeholder={discountType === 'percent' ? '20' : '30000'} className="w-full px-4 rounded-xl border outline-none"
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                Đơn tối thiểu (đ)
              </label>
              <input placeholder="100000" className="w-full px-4 rounded-xl border outline-none"
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                Số lượng phát hành
              </label>
              <input placeholder="500" className="w-full px-4 rounded-xl border outline-none"
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
                Ngày hết hạn
              </label>
              <input type="date" className="w-full px-4 rounded-xl border outline-none"
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
              />
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor: '#E0EDE6' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm"
            style={{ borderColor: '#E0EDE6', color: '#6B9080', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Hủy</button>
          <button className="flex-1 py-2.5 rounded-xl text-sm"
            style={{ background: '#2D6A4F', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600 }}>
            Tạo Voucher
          </button>
        </div>
      </div>
    </div>
  );
}

export function VoucherManagement() {
  const [showForm, setShowForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const { visibleData, isLoading, isLoadingMore, loadMore, hasMore } = useInfiniteScroll(vouchers, 6);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {showForm && <VoucherForm onClose={() => setShowForm(false)} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
            Voucher & Ưu đãi
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B9080' }}>{vouchers.filter(v => v.status === 'active').length} voucher đang hoạt động</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ background: '#2D6A4F', color: 'white', fontWeight: 600, fontSize: '13.5px' }}>
          <Plus size={16} /> Tạo Voucher
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        {[
          { label: 'Đang hoạt động', value: vouchers.filter(v => v.status === 'active').length, icon: <CheckCircle2 size={20} style={{ color: '#166534' }} />, bg: '#DCFCE7' },
          { label: 'Tổng lượt dùng', value: vouchers.reduce((a, v) => a + v.used, 0), icon: <Tag size={20} style={{ color: '#1E40AF' }} />, bg: '#EFF6FF' },
          { label: 'Đã hết hạn', value: vouchers.filter(v => v.status === 'expired').length, icon: <Clock size={20} style={{ color: '#92400E' }} />, bg: '#FEF3C7' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-3 md:p-4 flex flex-col xl:flex-row items-center xl:items-start gap-2 md:gap-3 text-center xl:text-left"
            style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A1A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#6B9080' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Voucher Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={`skeleton-${i}`} className="rounded-2xl border" style={{ borderColor: '#E0EDE6', background: 'white' }}>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-7 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
                <div className="flex justify-end mt-4"><Skeleton className="h-8 w-24 rounded-lg" /></div>
              </div>
              <div className="px-5 py-4 border-t" style={{ borderColor: '#E0EDE6' }}>
                <div className="flex justify-between mb-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleData.map((v) => {
              const usagePercent = Math.round((v.used / v.total) * 100);
              const isExpired = v.status === 'expired';
              return (
                <div key={v.id} className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  style={{ background: 'white', border: '1px solid #E0EDE6', opacity: isExpired ? 0.75 : 1 }}>
                  
                  {/* Top section */}
                  <div className="p-5 relative overflow-hidden" 
                       style={{ background: isExpired ? '#F3F4F6' : 'linear-gradient(135deg, #E8F5EC 0%, #A8D5BA 100%)' }}>
                    {!isExpired && (
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-white opacity-20 blur-xl pointer-events-none" />
                    )}
                    <div className="flex items-start justify-between relative z-10">
                      <div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', fontWeight: 800, color: isExpired ? '#6B7280' : '#1B4332', letterSpacing: '0.05em' }}>{v.code}</div>
                        <div style={{ fontSize: '13.5px', color: isExpired ? '#9CA3AF' : '#2D6A4F', marginTop: '4px', fontWeight: 500 }}>{v.name}</div>
                      </div>
                      <div className="text-right">
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '26px', fontWeight: 900, color: isExpired ? '#6B7280' : '#1B4332' }}>
                          {v.type === 'percent' ? `${v.discount}%` : formatVND(v.discount)}
                        </div>
                        <div className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" 
                             style={{ background: isExpired ? 'rgba(0,0,0,0.05)' : 'rgba(27,67,50,0.1)', color: isExpired ? '#6B7280' : '#1B4332' }}>
                          Giảm giá
                        </div>
                      </div>
                    </div>

                    {/* Copy button */}
                    <div className="relative z-10 mt-4 flex justify-end">
                      <button onClick={() => copyCode(v.code)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
                        style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', fontSize: '12px', color: isExpired ? '#6B7280' : '#2D6A4F', fontWeight: 600 }}>
                        {copiedCode === v.code ? <CheckCircle2 size={14} style={{ color: '#166534' }} /> : <Copy size={14} />}
                        {copiedCode === v.code ? 'Đã chép' : 'Sao chép mã'}
                      </button>
                    </div>
                  </div>

                  {/* Dashed divider with ticket cutouts */}
                  <div className="relative flex items-center h-4 bg-white">
                    <div className="absolute left-[-8px] w-4 h-4 rounded-full" style={{ background: '#F5F5F5', borderRight: '1px solid #E0EDE6' }} />
                    <div className="w-full border-t-[2px] border-dashed" style={{ borderColor: '#E0EDE6' }} />
                    <div className="absolute right-[-8px] w-4 h-4 rounded-full" style={{ background: '#F5F5F5', borderLeft: '1px solid #E0EDE6' }} />
                  </div>

                  {/* Bottom section */}
                  <div className="px-5 pb-5 pt-2">
                    <div className="flex justify-between text-[13px] mb-3" style={{ color: '#6B9080' }}>
                      <span className="flex items-center gap-1.5"><AlertCircle size={14} /> Tối thiểu: {formatVND(v.minOrder)}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> HSD: {v.expiry}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 600 }}>Đã dùng: {v.used}/{v.total}</span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                        style={{ background: isExpired ? '#F3F4F6' : '#DCFCE7', color: isExpired ? '#9CA3AF' : '#166534' }}>
                        {isExpired ? 'Đã kết thúc' : 'Đang phát hành'}
                      </span>
                    </div>
                    
                    {/* Progress */}
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${usagePercent}%`, background: usagePercent >= 90 ? '#EF4444' : '#2D6A4F' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {!isLoading && visibleData.length === 0 && (
            <div className="mt-8">
              <EmptyState 
                icon={<Ticket size={28} />}
                title="Chưa có voucher nào"
                description="Hệ thống hiện tại chưa có voucher nào, hoặc voucher không khớp với điều kiện lọc."
              />
            </div>
          )}

          {/* Load More Button */}
          {hasMore && visibleData.length > 0 && (
            <div className="flex justify-center mt-10 mb-4">
              <button onClick={loadMore} disabled={isLoadingMore}
                className="flex items-center gap-2 px-8 py-3 rounded-xl border transition-all hover:-translate-y-0.5"
                style={{ background: 'white', borderColor: '#E0EDE6', color: '#2D6A4F', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(45, 106, 79, 0.08)' }}>
                {isLoadingMore ? <Loader2 size={18} className="animate-spin" /> : null}
                {isLoadingMore ? 'Đang tải thêm...' : 'Xem thêm Voucher'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
