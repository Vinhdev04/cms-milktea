import { useState } from "react";
import { Star, MessageSquare, User, Package, CheckCircle2, XCircle, Clock, Trash2, Filter, Search } from "lucide-react";
import { reviews } from "../data/mockData";
import { toast } from "sonner";
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

const statusConfig: Record<string, { label: string; bg: string; color: string; icon: JSX.Element }> = {
  approved: { label: 'Đã duyệt', bg: '#DCFCE7', color: '#166534', icon: <CheckCircle2 size={13} /> },
  pending: { label: 'Chờ duyệt', bg: '#FEF3C7', color: '#92400E', icon: <Clock size={13} /> },
  rejected: { label: 'Đã ẩn', bg: '#FEE2E2', color: '#991B1B', icon: <XCircle size={13} /> },
};

export function ReviewManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'product' | 'staff'>('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = reviews.filter(r => {
    const matchesTab = activeTab === 'all' || r.type === activeTab;
    const matchesSearch = r.target.toLowerCase().includes(search.toLowerCase()) || 
                          r.customer.toLowerCase().includes(search.toLowerCase()) ||
                          r.comment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  const { currentPage, setCurrentPage, totalPages, paginatedData, isLoading } = usePagination(filtered, 6);

  const handleStatusChange = (id: string, status: string) => {
    toast.success(`Đã cập nhật trạng thái đánh giá ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.error(`Đã xóa đánh giá ${id}`);
  };

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
            Đánh giá & Phản hồi
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B9080' }}>Quản lý nhận xét từ khách hàng về sản phẩm và nhân viên</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b" style={{ borderColor: '#E0EDE6' }}>
        {[
          { id: 'all', label: 'Tất cả', icon: <MessageSquare size={16} /> },
          { id: 'product', label: 'Sản phẩm', icon: <Package size={16} /> },
          { id: 'staff', label: 'Nhân viên', icon: <User size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all relative"
            style={{
              color: activeTab === tab.id ? '#2D6A4F' : '#6B9080',
            }}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: '#2D6A4F' }}></div>
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khách, sản phẩm, nội dung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all"
            style={{ borderColor: '#E0EDE6', fontSize: '14px', background: 'white' }}
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border outline-none appearance-none transition-all"
              style={{ borderColor: '#E0EDE6', fontSize: '14px', background: 'white', minWidth: '160px' }}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
              <option value="rejected">Đã ẩn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Reviews */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-2xl p-5 border" style={{ borderColor: '#E0EDE6', background: 'white' }}>
              <div className="flex justify-between mb-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="w-8 h-8 rounded-lg" />
                  <Skeleton className="w-8 h-8 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : paginatedData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {paginatedData.map((review) => (
              <div key={review.id} className="rounded-2xl p-5 border transition-all hover:shadow-md" 
                style={{ borderColor: '#E0EDE6', background: 'white' }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg" 
                    style={{ background: review.type === 'product' ? '#E8F5EC' : '#F0F7FF', color: review.type === 'product' ? '#2D6A4F' : '#0284C7' }}>
                    {review.type === 'product' ? <Package size={14} /> : <User size={14} />}
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{review.target}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: statusConfig[review.status].bg, color: statusConfig[review.status].color }}>
                    {statusConfig[review.status].icon}
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>{statusConfig[review.status].label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "#FBBF24" : "none"} color={i < review.rating ? "#FBBF24" : "#D1D5DB"} />
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: '#1A1A1A', lineHeight: 1.6 }} className="mb-4 italic">
                  "{review.comment}"
                </p>

                <div className="flex justify-between items-end border-t pt-4" style={{ borderColor: '#F0F7F3' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{review.customer}</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{review.date}</div>
                  </div>
                  <div className="flex gap-2">
                    {review.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusChange(review.id, 'approved')}
                        className="p-2 rounded-lg border transition-all hover:bg-green-50"
                        style={{ borderColor: '#DCFCE7' }}
                        title="Duyệt đánh giá"
                      >
                        <CheckCircle2 size={16} style={{ color: '#166534' }} />
                      </button>
                    )}
                    {review.status !== 'rejected' && (
                      <button 
                        onClick={() => handleStatusChange(review.id, 'rejected')}
                        className="p-2 rounded-lg border transition-all hover:bg-orange-50"
                        style={{ borderColor: '#FEF3C7' }}
                        title="Ẩn đánh giá"
                      >
                        <XCircle size={16} style={{ color: '#92400E' }} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="p-2 rounded-lg border transition-all hover:bg-red-50"
                      style={{ borderColor: '#FEE2E2' }}
                      title="Xóa đánh giá"
                    >
                      <Trash2 size={16} style={{ color: '#991B1B' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
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
      ) : (
        <div className="py-12 bg-white rounded-2xl border" style={{ borderColor: '#E0EDE6' }}>
          <EmptyState
            icon={<Star size={40} />}
            title="Chưa có đánh giá nào"
            description="Hiện tại chưa có phản hồi nào từ khách hàng phù hợp với điều kiện tìm kiếm."
          />
        </div>
      )}
    </div>
  );
}
