import { useState } from "react";
import { Search, Eye, X, Award, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { customers } from "../data/mockData";
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

type Customer = typeof customers[0];

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';

const tierConfig: Record<string, { bg: string; color: string }> = {
  Gold: { bg: '#FEF9C3', color: '#854D0E' },
  Silver: { bg: '#F3F4F6', color: '#374151' },
  Member: { bg: '#E8F5EC', color: '#2D6A4F' },
};

interface CustomerDetailProps {
  customer: Customer;
  onClose: () => void;
}

function CustomerDetail({ customer, onClose }: CustomerDetailProps) {
  const tier = tierConfig[customer.tier] || tierConfig.Member;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="h-full w-full max-w-md flex flex-col" style={{ background: 'white', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
            Hồ sơ khách hàng
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} style={{ color: '#6B9080' }} /></button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Avatar section */}
          <div className="px-5 py-6 text-center border-b" style={{ borderColor: '#E0EDE6', background: '#F8FAF9' }}>
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3"
              style={{ background: '#A8D5BA', fontSize: '24px', fontWeight: 700, color: '#1B4332' }}>
              {customer.name[0]}
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>{customer.name}</div>
            <div style={{ fontSize: '13px', color: '#6B9080', marginTop: '2px' }}>{customer.phone}</div>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: tier.bg, color: tier.color }}>
              ⭐ {customer.tier} Member
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-0 border-b" style={{ borderColor: '#E0EDE6' }}>
            {[
              { label: 'Điểm tích lũy', value: customer.points.toLocaleString(), icon: <Award size={16} style={{ color: '#2D6A4F' }} /> },
              { label: 'Đơn hàng', value: customer.totalOrders, icon: <ShoppingBag size={16} style={{ color: '#2D6A4F' }} /> },
              { label: 'Tổng chi tiêu', value: formatVND(customer.totalSpent), icon: <TrendingUp size={16} style={{ color: '#2D6A4F' }} /> },
            ].map((stat, i) => (
              <div key={i} className={`py-4 text-center ${i < 2 ? 'border-r' : ''}`} style={{ borderColor: '#E0EDE6' }}>
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="px-5 py-4 space-y-3">
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#6B9080', letterSpacing: '0.05em' }}>THÔNG TIN TÀI KHOẢN</h3>
            {[
              { label: 'Email', value: customer.email },
              { label: 'Ngày tham gia', value: customer.joinDate },
              { label: 'Đơn hàng gần nhất', value: customer.lastOrder },
              { label: 'Hạng thành viên', value: customer.tier },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2 border-b" style={{ borderColor: '#F0F7F3' }}>
                <span style={{ fontSize: '13px', color: '#6B9080' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomerManagement() {
  const [search, setSearch] = useState('');
  const [activeTier, setActiveTier] = useState('Tất cả');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const tiers = ['Tất cả', 'Gold', 'Silver', 'Member'];
  const filtered = customers.filter(c =>
    (activeTier === 'Tất cả' || c.tier === activeTier) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search))
  );

  const { currentPage, setCurrentPage, totalPages, paginatedData, isLoading } = usePagination(filtered, 5);

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {selectedCustomer && <CustomerDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}

      <div className="mb-6">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
          Quản lý Khách hàng
        </h1>
        <p style={{ fontSize: '13.5px', color: '#6B9080' }}>{customers.length} khách hàng đã đăng ký</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        {[
          { label: 'Gold Member', count: customers.filter(c => c.tier === 'Gold').length, bg: '#FEF9C3', color: '#854D0E' },
          { label: 'Silver Member', count: customers.filter(c => c.tier === 'Silver').length, bg: '#F3F4F6', color: '#374151' },
          { label: 'Member', count: customers.filter(c => c.tier === 'Member').length, bg: '#E8F5EC', color: '#2D6A4F' },
        ].map((card) => (
          <div key={card.label} className="rounded-xl p-3 md:p-4 flex flex-col xl:flex-row items-center xl:items-start gap-2 md:gap-3 text-center xl:text-left"
            style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: card.bg, color: card.color, fontWeight: 700, fontSize: '18px' }}>
              {card.count}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{card.label}</div>
              <div style={{ fontSize: '12px', color: '#6B9080' }}>thành viên</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên, số điện thoại..."
            className="w-full pl-9 pr-4 rounded-xl border outline-none"
            style={{ height: '40px', borderColor: '#E0EDE6', fontSize: '13px', background: 'white' }}
          />
        </div>
        <div className="flex gap-1.5">
          {tiers.map(t => (
            <button key={t} onClick={() => setActiveTier(t)}
              className="px-3.5 py-2 rounded-xl text-sm transition-all"
              style={{
                background: activeTier === t ? '#2D6A4F' : 'white',
                color: activeTier === t ? 'white' : '#6B9080',
                border: `1px solid ${activeTier === t ? '#2D6A4F' : '#E0EDE6'}`,
                fontWeight: activeTier === t ? 600 : 400
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden"
        style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#E8F5EC' }}>
              {['Khách hàng', 'Liên hệ', 'Hạng', 'Điểm', 'Đơn hàng', 'Chi tiêu', 'Tham gia', ''].map(h => (
                <th key={h} className="text-left px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b" style={{ borderColor: '#F0F7F3', background: i % 2 === 1 ? '#FAFCFB' : 'white' }}>
                  <td className="px-5 py-3.5"><div className="flex items-center gap-3"><Skeleton className="w-8 h-8 rounded-full" /><Skeleton className="h-4 w-24" /></div></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-24 mb-1" /><Skeleton className="h-3 w-32" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-5 w-16 rounded-full" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-12" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-8" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-20" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-7 w-7 rounded-lg" /></td>
                </tr>
              ))
            ) : (
              paginatedData.map((c, i) => {
                const tier = tierConfig[c.tier] || tierConfig.Member;
                return (
                  <tr key={c.id} className="border-b hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#F0F7F3', background: i % 2 === 1 ? '#FAFCFB' : 'white' }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#A8D5BA', color: '#1B4332', fontWeight: 700, fontSize: '13px' }}>
                          {c.name[0]}
                        </div>
                        <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A1A' }}>{c.name}</div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div style={{ fontSize: '13px', color: '#1A1A1A' }}>{c.phone}</div>
                      <div style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{c.email}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: tier.bg, color: tier.color }}>
                        {c.tier}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#2D6A4F' }}>{c.points.toLocaleString()}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontSize: '13px', color: '#1A1A1A' }}>{c.totalOrders}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{formatVND(c.totalSpent)}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span style={{ fontSize: '12px', color: '#6B9080' }}>{c.joinDate}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setSelectedCustomer(c)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <Eye size={15} style={{ color: '#2D6A4F' }} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {!isLoading && paginatedData.length === 0 && (
          <tr>
            <td colSpan={8}>
              <EmptyState 
                icon={<Users size={28} />}
                title="Không tìm thấy khách hàng"
                description="Không có khách hàng nào khớp với điều kiện lọc hiện tại."
              />
            </td>
          </tr>
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
