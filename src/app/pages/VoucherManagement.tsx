import { useState } from "react";
import { Plus, Tag, Copy, X, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { vouchers } from "../data/mockData";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vouchers.map((v) => {
          const usagePercent = Math.round((v.used / v.total) * 100);
          const isExpired = v.status === 'expired';
          return (
            <div key={v.id} className="rounded-xl overflow-hidden transition-all"
              style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', opacity: isExpired ? 0.7 : 1 }}>
              {/* Top section */}
              <div className="p-4 relative" style={{ background: isExpired ? '#F8FAF9' : '#E8F5EC' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 800, color: '#2D6A4F', letterSpacing: '0.05em' }}>{v.code}</div>
                    <div style={{ fontSize: '13px', color: '#6B9080', marginTop: '2px' }}>{v.name}</div>
                  </div>
                  <div className="text-right">
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 800, color: '#2D6A4F' }}>
                      {v.type === 'percent' ? `${v.discount}%` : formatVND(v.discount)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#6B9080' }}>giảm giá</div>
                  </div>
                </div>
                {/* Copy button */}
                <button onClick={() => copyCode(v.code)}
                  className="absolute bottom-3 right-4 flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all"
                  style={{ background: 'white', border: '1px solid #E0EDE6', fontSize: '11.5px', color: '#2D6A4F', fontWeight: 600 }}>
                  {copiedCode === v.code ? <CheckCircle2 size={12} style={{ color: '#166534' }} /> : <Copy size={12} />}
                  {copiedCode === v.code ? 'Đã sao chép' : 'Sao chép'}
                </button>
              </div>
              {/* Dashed divider */}
              <div className="relative py-0" style={{ borderTop: '1.5px dashed #E0EDE6' }} />
              {/* Bottom section */}
              <div className="px-4 py-3">
                <div className="flex justify-between text-xs mb-2" style={{ color: '#6B9080' }}>
                  <span>Đơn tối thiểu: {formatVND(v.minOrder)}</span>
                  <span>HSD: {v.expiry}</span>
                </div>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: '12px', color: '#6B9080' }}>Đã dùng: {v.used}/{v.total}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: isExpired ? '#F3F4F6' : '#DCFCE7', color: isExpired ? '#6B7280' : '#166534' }}>
                    {isExpired ? 'Hết hạn' : 'Đang chạy'}
                  </span>
                </div>
                {/* Progress */}
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F3F4F6' }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${usagePercent}%`, background: usagePercent >= 90 ? '#EF4444' : '#A8D5BA' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
