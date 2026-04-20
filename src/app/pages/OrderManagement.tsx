import { useState } from "react";
import { Search, Filter, Eye, X, Clock, CheckCircle2, AlertCircle, XCircle, Package, Printer, PackageX } from "lucide-react";
import { Logo } from "../components/Logo";
import { orders } from "../data/mockData";
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

type Order = typeof orders[0];

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';

const statusConfig: Record<string, { label: string; bg: string; color: string; icon: JSX.Element }> = {
  pending: { label: 'Chờ xử lý', bg: '#FEF3C7', color: '#92400E', icon: <Clock size={12} /> },
  processing: { label: 'Đang pha chế', bg: '#E8F5EC', color: '#2D6A4F', icon: <AlertCircle size={12} /> },
  ready: { label: 'Sẵn sàng', bg: '#EFF6FF', color: '#1E40AF', icon: <Package size={12} /> },
  completed: { label: 'Hoàn thành', bg: '#DCFCE7', color: '#166534', icon: <CheckCircle2 size={12} /> },
  cancelled: { label: 'Đã hủy', bg: '#FEE2E2', color: '#991B1B', icon: <XCircle size={12} /> },
};

const statusTabs = ['Tất cả', 'Chờ xử lý', 'Đang pha chế', 'Sẵn sàng', 'Hoàn thành', 'Đã hủy'];
const statusMap: Record<string, string> = {
  'Chờ xử lý': 'pending', 'Đang pha chế': 'processing', 'Sẵn sàng': 'ready',
  'Hoàn thành': 'completed', 'Đã hủy': 'cancelled'
};

interface OrderDetailProps {
  order: Order;
  onClose: () => void;
}

function OrderDetail({ order, onClose }: OrderDetailProps) {
  const st = statusConfig[order.status];
  const fakeItems = [
    { name: 'Trà Sữa Trân Châu Hoàng Kim', size: 'L', sugar: '70%', ice: '50%', topping: 'Trân Châu Đen', qty: 1, price: 55000 },
    { name: 'Matcha Đào Kem Cheese', size: 'M', sugar: '100%', ice: '100%', topping: 'Kem Cheese', qty: 1, price: 65000 },
    { name: 'Hồng Trà Vải Thiều', size: 'L', sugar: '50%', ice: '0%', topping: '', qty: 1, price: 50000 },
  ].slice(0, order.items);

  const timeline = [
    { label: 'Đặt hàng thành công', time: order.time, done: true },
    { label: 'Xác nhận đơn hàng', time: `${parseInt(order.time.split(':')[0])}:${String(parseInt(order.time.split(':')[1]) + 3).padStart(2, '0')}`, done: ['processing', 'ready', 'completed'].includes(order.status) },
    { label: 'Đang pha chế', time: '', done: ['ready', 'completed'].includes(order.status) },
    { label: 'Hoàn thành', time: '', done: order.status === 'completed' },
  ];

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-content, #invoice-content * { visibility: visible; }
          #invoice-content {
            position: absolute; left: 0; top: 0; width: 100%; height: auto !important;
            max-width: 100% !important; box-shadow: none !important;
          }
          .no-print { display: none !important; }
          /* Hide scrollbars for printing */
          #invoice-content .overflow-y-auto { overflow: visible !important; }
        }
      `}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-end" style={{ background: 'rgba(0,0,0,0.35)' }}>
        <div id="invoice-content" className="h-full w-full max-w-md flex flex-col"
          style={{ background: 'white', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)' }}>
          <div className="flex flex-col items-center py-6 border-b" style={{ borderColor: '#E0EDE6' }}>
            <div className="p-3 rounded-2xl bg-white mb-2" style={{ border: '1px solid #F0F7F3' }}>
              <Logo size={40} />
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 800, color: '#1B4332' }}>SMYOU MILKTEA</h1>
            <p style={{ fontSize: '12px', color: '#6B9080', fontWeight: 500 }}>Sweet moments for you</p>
          </div>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, color: '#1A1A1A' }}>
              Chi tiết đơn hàng
            </h2>
            <p style={{ fontSize: '12px', color: '#6B9080' }}>{order.id}</p>
          </div>
          <div className="flex items-center gap-2 no-print">
            <button onClick={() => window.print()} className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-gray-50 transition-colors" style={{ color: '#2D6A4F' }}>
              <Printer size={16} />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>In hóa đơn</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18} style={{ color: '#6B9080' }} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Status */}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: st.bg }}>
            <span className="flex items-center gap-1.5 font-semibold text-sm" style={{ color: st.color }}>
              {st.icon} {st.label}
            </span>
            <span style={{ fontSize: '12px', color: st.color }}>{order.time} · {order.date}</span>
          </div>

          {/* Customer Info */}
          <div className="rounded-xl p-4 space-y-2.5" style={{ border: '1px solid #E0EDE6' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: '#6B9080', marginBottom: '8px' }}>THÔNG TIN KHÁCH HÀNG</h3>
            {[
              { label: 'Tên khách', value: order.customer },
              { label: 'Điện thoại', value: order.phone },
              { label: 'Chi nhánh', value: order.branch },
              { label: 'Thanh toán', value: order.payment },
            ].map(item => (
              <div key={item.label} className="flex justify-between">
                <span style={{ fontSize: '13px', color: '#6B9080' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Items */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E0EDE6' }}>
            <div className="px-4 py-3 border-b" style={{ background: '#E8F5EC', borderColor: '#E0EDE6' }}>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: '#2D6A4F' }}>SẢN PHẨM ĐÃ ĐẶT</h3>
            </div>
            {fakeItems.map((item, i) => (
              <div key={i} className="px-4 py-3 border-b last:border-0" style={{ borderColor: '#F0F7F3' }}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A1A' }}>{item.name}</span>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#2D6A4F' }}>{formatVND(item.price)}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                  Size {item.size} · Đường {item.sugar} · Đá {item.ice}{item.topping ? ` · ${item.topping}` : ''}
                </div>
              </div>
            ))}
            <div className="px-4 py-3 flex justify-between" style={{ background: '#F8FAF9' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>Tổng cộng</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#2D6A4F' }}>{formatVND(order.total)}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl p-4" style={{ border: '1px solid #E0EDE6' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: '#6B9080', marginBottom: '12px' }}>TRẠNG THÁI ĐƠN HÀNG</h3>
            <div className="space-y-3">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: step.done ? '#A8D5BA' : '#F3F4F6' }}>
                    {step.done && <CheckCircle2 size={12} style={{ color: '#2D6A4F' }} />}
                  </div>
                  <div className="flex-1">
                    <div style={{ fontSize: '13px', fontWeight: step.done ? 600 : 400, color: step.done ? '#1A1A1A' : '#9CA3AF' }}>
                      {step.label}
                    </div>
                    {step.time && <div style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{step.time}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Actions */}
        {order.status === 'pending' && (
          <div className="px-5 py-4 border-t flex gap-3 no-print" style={{ borderColor: '#E0EDE6' }}>
            <button className="flex-1 py-2.5 rounded-xl border text-sm font-semibold"
              style={{ borderColor: '#FCBABD', color: '#8B3A4A', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              Hủy đơn
            </button>
            <button className="flex-1 py-2.5 rounded-xl text-sm"
              style={{ background: '#2D6A4F', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600 }}>
              Xác nhận
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export function OrderManagement() {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter(o => {
    const matchStatus = activeTab === 'Tất cả' || o.status === statusMap[activeTab];
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const { currentPage, setCurrentPage, totalPages, paginatedData, isLoading } = usePagination(filtered, 5);

  const countByStatus = (s: string) => s === 'Tất cả' ? orders.length : orders.filter(o => o.status === statusMap[s]).length;

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {selectedOrder && <OrderDetail order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

      <div className="mb-6">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
          Quản lý Đơn hàng
        </h1>
        <p style={{ fontSize: '13.5px', color: '#6B9080' }}>{orders.length} đơn hàng hôm nay · 20/04/2026</p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {statusTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm whitespace-nowrap transition-all"
            style={{
              background: activeTab === tab ? '#2D6A4F' : 'white',
              color: activeTab === tab ? 'white' : '#6B9080',
              border: `1px solid ${activeTab === tab ? '#2D6A4F' : '#E0EDE6'}`,
              fontWeight: activeTab === tab ? 600 : 400
            }}>
            {tab}
            <span className="px-1.5 py-0.5 rounded-full text-xs"
              style={{ background: activeTab === tab ? 'rgba(255,255,255,0.2)' : '#E8F5EC', color: activeTab === tab ? 'white' : '#2D6A4F' }}>
              {countByStatus(tab)}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden"
        style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo mã đơn, tên khách..."
              className="w-full pl-9 pr-4 rounded-xl border outline-none"
              style={{ height: '38px', borderColor: '#E0EDE6', fontSize: '13px', background: '#F8FAF9' }}
            />
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm"
            style={{ borderColor: '#E0EDE6', color: '#6B9080' }}>
            <Filter size={14} /> Lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#E8F5EC' }}>
                {['Mã đơn', 'Khách hàng', 'Chi nhánh', 'Thời gian', 'Món', 'Tổng tiền', 'Thanh toán', 'Trạng thái', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={`skeleton-${i}`} className="border-b" style={{ borderColor: '#F0F7F3', background: i % 2 === 1 ? '#FAFCFB' : 'white' }}>
                    <td className="px-4 py-3.5"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-4 w-32 mb-1" /><Skeleton className="h-3 w-24" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-4 w-8" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-6 w-24 rounded-full" /></td>
                    <td className="px-4 py-3.5"><Skeleton className="h-7 w-7 rounded-lg" /></td>
                  </tr>
                ))
              ) : (
                paginatedData.map((order, i) => {
                  const st = statusConfig[order.status];
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: '#F0F7F3', background: i % 2 === 1 ? '#FAFCFB' : 'white' }}>
                      <td className="px-4 py-3.5">
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#2D6A4F' }}>{order.id}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#1A1A1A' }}>{order.customer}</div>
                        <div style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{order.phone}</div>
                      </td>
                      <td className="px-4 py-3.5"><span style={{ fontSize: '13px', color: '#6B9080' }}>{order.branch}</span></td>
                      <td className="px-4 py-3.5"><span style={{ fontSize: '13px', color: '#6B9080' }}>{order.time}</span></td>
                      <td className="px-4 py-3.5"><span style={{ fontSize: '13px', color: '#1A1A1A' }}>{order.items}</span></td>
                      <td className="px-4 py-3.5"><span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{formatVND(order.total)}</span></td>
                      <td className="px-4 py-3.5"><span style={{ fontSize: '12px', color: '#6B9080' }}>{order.payment}</span></td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                          style={{ background: st.bg, color: st.color, fontSize: '11.5px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                          {st.icon} {st.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button onClick={() => setSelectedOrder(order)}
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
              <td colSpan={9}>
                <EmptyState 
                  icon={<PackageX size={28} />}
                  title="Không tìm thấy đơn hàng"
                  description="Không có đơn hàng nào khớp với điều kiện lọc hiện tại."
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
    </div>
  );
}