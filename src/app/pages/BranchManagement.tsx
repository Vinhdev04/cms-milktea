import { useState } from "react";
import { Plus, MapPin, Phone, Users, Star, Edit2, Trash2, X, CheckCircle2, AlertTriangle, Store } from "lucide-react";
import { branches } from "../data/mockData";
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

type Branch = typeof branches[0];

const statusConfig: Record<string, { label: string; bg: string; color: string; icon: JSX.Element }> = {
  open: { label: 'Đang mở cửa', bg: '#DCFCE7', color: '#166534', icon: <CheckCircle2 size={13} /> },
  maintenance: { label: 'Bảo trì', bg: '#FEF3C7', color: '#92400E', icon: <AlertTriangle size={13} /> },
  closed: { label: 'Đóng cửa', bg: '#FEE2E2', color: '#991B1B', icon: <X size={13} /> },
};

interface BranchFormProps {
  branch?: Branch | null;
  onClose: () => void;
}

function BranchForm({ branch, onClose }: BranchFormProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            {branch ? 'Chỉnh sửa Chi nhánh' : 'Thêm Chi nhánh mới'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={16} style={{ color: '#6B9080' }} /></button>
        </div>
        <div className="px-5 py-5 space-y-4">
          {[
            { label: 'Tên chi nhánh', placeholder: 'VD: SMYOU Quận 1', value: branch?.name || '' },
            { label: 'Địa chỉ', placeholder: 'Địa chỉ đầy đủ', value: branch?.address || '' },
            { label: 'Số điện thoại', placeholder: '028 xxxx xxxx', value: branch?.phone || '' },
            { label: 'Quản lý chi nhánh', placeholder: 'Tên quản lý', value: branch?.manager || '' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', display: 'block', marginBottom: '6px', fontFamily: "'Be Vietnam Pro', sans-serif" }}>{f.label}</label>
              <input defaultValue={f.value} placeholder={f.placeholder}
                className="w-full px-4 rounded-xl border outline-none transition-all"
                style={{ height: '44px', borderColor: '#E0EDE6', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = '#A8D5BA')}
                onBlur={(e) => (e.target.style.borderColor = '#E0EDE6')}
              />
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t flex gap-3" style={{ borderColor: '#E0EDE6' }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm"
            style={{ borderColor: '#E0EDE6', color: '#6B9080', fontFamily: "'Be Vietnam Pro', sans-serif" }}>Hủy</button>
          <button className="flex-1 py-2.5 rounded-xl text-sm"
            style={{ background: '#2D6A4F', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600 }}>
            {branch ? 'Lưu thay đổi' : 'Thêm chi nhánh'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function BranchManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editBranch, setEditBranch] = useState<Branch | null>(null);

  const { currentPage, setCurrentPage, totalPages, paginatedData, isLoading } = usePagination(branches, 6);

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {showForm && <BranchForm branch={editBranch} onClose={() => { setShowForm(false); setEditBranch(null); }} />}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
            Quản lý Chi nhánh
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B9080' }}>{branches.length} chi nhánh · {branches.filter(b => b.status === 'open').length} đang hoạt động</p>
        </div>
        <button onClick={() => { setEditBranch(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{ background: '#2D6A4F', color: 'white', fontWeight: 600, fontSize: '13.5px' }}>
          <Plus size={16} /> Thêm chi nhánh
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        {[
          { label: 'Đang mở cửa', value: branches.filter(b => b.status === 'open').length, bg: '#DCFCE7', color: '#166534' },
          { label: 'Đơn hàng hôm nay', value: branches.reduce((a, b) => a + b.todayOrders, 0), bg: '#EFF6FF', color: '#1E40AF' },
          { label: 'Tổng nhân viên', value: branches.reduce((a, b) => a + b.staff, 0), bg: '#E8F5EC', color: '#2D6A4F' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-3 md:p-4 flex flex-col xl:flex-row items-center xl:items-start gap-2 md:gap-3 text-center xl:text-left"
            style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.bg, color: s.color, fontSize: '18px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {s.value}
            </div>
            <div style={{ fontSize: '13px', color: '#6B9080' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Branch Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={`skeleton-${i}`} className="rounded-xl border" style={{ borderColor: '#E0EDE6', background: 'white' }}>
              <div className="px-4 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-24 rounded-full" />
                  </div>
                  <div className="flex gap-1.5"><Skeleton className="w-7 h-7 rounded-lg" /><Skeleton className="w-7 h-7 rounded-lg" /></div>
                </div>
              </div>
              <div className="px-4 py-4 space-y-2.5">
                <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded-full" /><Skeleton className="h-4 w-full" /></div>
                <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded-full" /><Skeleton className="h-4 w-2/3" /></div>
                <div className="flex items-center gap-2"><Skeleton className="h-4 w-4 rounded-full" /><Skeleton className="h-4 w-5/6" /></div>
              </div>
              <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#F0F7F3' }}>
                <div className="text-center"><Skeleton className="h-6 w-8 mx-auto mb-1" /><Skeleton className="h-3 w-16" /></div>
                <div className="flex items-center gap-1"><Skeleton className="h-4 w-4 rounded-full" /><Skeleton className="h-6 w-8" /></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginatedData.map((b) => {
              const st = statusConfig[b.status] || statusConfig.closed;
              return (
                <div key={b.id} className="rounded-xl overflow-hidden transition-all hover:-translate-y-0.5"
                  style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  {/* Header */}
                  <div className="px-4 py-4 border-b" style={{ borderColor: '#E0EDE6', background: '#F8FAF9' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>{b.name}</div>
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: st.bg, color: st.color }}>
                          {st.icon} {st.label}
                        </span>
                      </div>
                      <div className="flex gap-1.5 ml-2">
                        <button onClick={() => { setEditBranch(b); setShowForm(true); }}
                          className="p-1.5 rounded-lg border hover:bg-white transition-colors"
                          style={{ borderColor: '#E0EDE6' }}>
                          <Edit2 size={13} style={{ color: '#2D6A4F' }} />
                        </button>
                        <button className="p-1.5 rounded-lg border hover:bg-pink-50 transition-colors"
                          style={{ borderColor: '#FCBABD' }}>
                          <Trash2 size={13} style={{ color: '#8B3A4A' }} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-4 py-4 space-y-2.5">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#A8D5BA' }} />
                      <span style={{ fontSize: '12.5px', color: '#6B9080', lineHeight: 1.4 }}>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} style={{ color: '#A8D5BA' }} />
                      <span style={{ fontSize: '12.5px', color: '#6B9080' }}>{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} style={{ color: '#A8D5BA' }} />
                      <span style={{ fontSize: '12.5px', color: '#6B9080' }}>Quản lý: <strong style={{ color: '#1A1A1A' }}>{b.manager}</strong> · {b.staff} nhân viên</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#F0F7F3', background: '#F8FAF9' }}>
                    <div className="text-center">
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#2D6A4F', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{b.todayOrders}</div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF' }}>Đơn hôm nay</div>
                    </div>
                    <div className="h-8 w-px" style={{ background: '#E0EDE6' }} />
                    <div className="flex items-center gap-1">
                      <Star size={13} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1A1A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{b.rating}</div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF' }}>/ 5.0</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isLoading && paginatedData.length === 0 && (
            <div className="mt-8">
              <EmptyState 
                icon={<Store size={28} />}
                title="Không tìm thấy chi nhánh"
                description="Không có chi nhánh nào khớp với điều kiện hiện tại."
              />
            </div>
          )}

          {!isLoading && totalPages > 1 && (
            <div className="mt-6">
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
        </>
      )}
    </div>
  );
}
