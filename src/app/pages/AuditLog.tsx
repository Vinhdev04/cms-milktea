import { useState } from "react";
import { Search, Filter, ShieldAlert, FileText, CheckCircle2, AlertTriangle, XCircle, Activity } from "lucide-react";

const mockLogs = [
  { id: 'LOG-001', user: 'Admin SMYOU', role: 'Super Admin', action: 'CREATE', target: 'Product', detail: 'Thêm sản phẩm "Trà Sữa Oolong Nướng"', time: '10:25:34 20/04/2026', ip: '192.168.1.45', status: 'success' },
  { id: 'LOG-002', user: 'Nguyễn Văn Bình', role: 'Quản lý chi nhánh', action: 'UPDATE', target: 'Order', detail: 'Cập nhật trạng thái đơn hàng ORD-2412002 thành "Đang pha chế"', time: '10:42:12 20/04/2026', ip: '118.69.23.11', status: 'success' },
  { id: 'LOG-003', user: 'Lê Thị Thu', role: 'Quản lý chi nhánh', action: 'DELETE', target: 'Topping', detail: 'Xóa topping "Nata De Coco"', time: '09:15:00 20/04/2026', ip: '14.161.45.12', status: 'success' },
  { id: 'LOG-004', user: 'System', role: 'System', action: 'LOGIN_FAILED', target: 'Auth', detail: 'Cảnh báo: Đăng nhập sai mật khẩu 5 lần liên tiếp', time: '08:30:22 20/04/2026', ip: '103.11.23.44', status: 'warning' },
  { id: 'LOG-005', user: 'Admin SMYOU', role: 'Super Admin', action: 'EXPORT', target: 'Report', detail: 'Xuất báo cáo doanh thu tháng 3/2026', time: '16:45:10 19/04/2026', ip: '192.168.1.45', status: 'success' },
  { id: 'LOG-006', user: 'Trần Thị Ngọc', role: 'Quản lý chi nhánh', action: 'UPDATE', target: 'Settings', detail: 'Thay đổi giờ mở cửa chi nhánh Quận 1', time: '14:20:05 19/04/2026', ip: '113.190.45.67', status: 'success' },
  { id: 'LOG-007', user: 'Unknown', role: 'Guest', action: 'UNAUTHORIZED_ACCESS', target: 'System', detail: 'Cố gắng truy cập API /api/v1/settings không có token', time: '02:15:00 19/04/2026', ip: '45.112.33.11', status: 'error' },
];

const actionColors: Record<string, { bg: string, color: string }> = {
  'CREATE': { bg: '#DCFCE7', color: '#166534' },
  'UPDATE': { bg: '#EFF6FF', color: '#1E40AF' },
  'DELETE': { bg: '#FEE2E2', color: '#991B1B' },
  'EXPORT': { bg: '#FEF3C7', color: '#92400E' },
  'LOGIN_FAILED': { bg: '#FEF3C7', color: '#92400E' },
  'UNAUTHORIZED_ACCESS': { bg: '#FEE2E2', color: '#991B1B' },
};

const statusIcons: Record<string, JSX.Element> = {
  'success': <CheckCircle2 size={14} style={{ color: '#166534' }} />,
  'warning': <AlertTriangle size={14} style={{ color: '#92400E' }} />,
  'error': <XCircle size={14} style={{ color: '#991B1B' }} />,
};

export function AuditLog() {
  const [search, setSearch] = useState('');

  const filtered = mockLogs.filter(log =>
    log.user.toLowerCase().includes(search.toLowerCase()) ||
    log.detail.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }} className="flex items-center gap-2">
          <Activity size={24} style={{ color: '#2D6A4F' }} /> Nhật ký Hệ thống (Audit Log)
        </h1>
        <p style={{ fontSize: '13.5px', color: '#6B9080' }}>Theo dõi mọi hoạt động, thay đổi cấu hình và đăng nhập trên hệ thống.</p>
      </div>

      <div className="rounded-xl overflow-hidden"
        style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo user, hành động, mô tả..."
              className="w-full pl-9 pr-4 rounded-xl border outline-none"
              style={{ height: '38px', borderColor: '#E0EDE6', fontSize: '13px', background: '#F8FAF9' }}
            />
          </div>
          <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border text-sm transition-all hover:bg-gray-50"
            style={{ borderColor: '#E0EDE6', color: '#6B9080', fontWeight: 500 }}>
            <Filter size={14} /> Lọc kết quả
          </button>
          <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border text-sm transition-all hover:bg-gray-50"
            style={{ borderColor: '#E0EDE6', color: '#1A1A1A', fontWeight: 600 }}>
            <FileText size={14} /> Xuất CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: '#E8F5EC' }}>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>Mã log</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>Thời gian</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>Người dùng</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>Hành động</th>
                <th className="px-5 py-3 min-w-[280px]" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F' }}>Chi tiết (Target)</th>
                <th className="px-5 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#2D6A4F', whiteSpace: 'nowrap' }}>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <tr key={log.id} className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: '#F0F7F3', background: i % 2 === 1 ? '#FAFCFB' : 'white' }}>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#6B9080' }}>{log.id}</span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: '12.5px', color: '#1A1A1A' }}>{log.time}</span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{log.user}</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{log.role}</div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
                      style={{ background: actionColors[log.action]?.bg || '#F3F4F6', color: actionColors[log.action]?.color || '#374151' }}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-1.5">
                      <div className="mt-0.5">{statusIcons[log.status]}</div>
                      <div>
                        <div style={{ fontSize: '13px', color: '#1A1A1A', lineHeight: 1.4 }}>{log.detail}</div>
                        <div style={{ fontSize: '11.5px', color: '#9CA3AF', marginTop: '2px' }}>Target: {log.target}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span style={{ fontSize: '12.5px', color: '#6B9080', fontFamily: 'monospace' }}>{log.ip}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12" style={{ color: '#9CA3AF', fontSize: '14px' }}>
              Không tìm thấy log nào phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
