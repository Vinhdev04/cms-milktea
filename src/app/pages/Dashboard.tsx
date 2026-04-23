import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, ShoppingBag, Users, Store, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, AlertCircle, XCircle, Eye, MoreHorizontal, Info, Sparkles } from "lucide-react";
import { revenueData, weeklyData, categoryData, orders as initialOrders } from "../../data/mockData";
import { OrderService } from "../services/OrderService";
import { showToast } from "../utils/toast";

const formatCurrency = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
};

const formatVND = (value: number) => new Intl.NumberFormat('vi-VN').format(value) + 'đ';

const statusConfig: Record<string, { label: string; bg: string; color: string; icon: JSX.Element }> = {
  pending: { label: 'Chờ xử lý', bg: '#FEF3C7', color: '#92400E', icon: <Clock size={12} /> },
  processing: { label: 'Đang pha chế', bg: '#FFF3E6', color: '#F58220', icon: <AlertCircle size={12} /> },
  ready: { label: 'Sẵn sàng', bg: '#EFF6FF', color: '#1E40AF', icon: <CheckCircle2 size={12} /> },
  completed: { label: 'Hoàn thành', bg: '#FFEDD5', color: '#9A3412', icon: <CheckCircle2 size={12} /> },
  cancelled: { label: 'Đã hủy', bg: '#FEE2E2', color: '#991B1B', icon: <XCircle size={12} /> },
};

const statsCards = [
  {
    title: 'Doanh thu hôm nay',
    value: '18.500.000đ',
    sub: '+12.4% so hôm qua',
    trend: 'up',
    icon: TrendingUp,
    bg: '#FFF3E6',
    iconBg: '#F5C088',
    iconColor: '#F58220',
    hint: 'Tổng giá trị các đơn hàng đã được xác nhận thanh toán trong ngày hôm nay.'
  },
  {
    title: 'Đơn hàng hôm nay',
    value: '138',
    sub: '+8.2% so hôm qua',
    trend: 'up',
    icon: ShoppingBag,
    bg: '#EFF6FF',
    iconBg: '#BFDBFE',
    iconColor: '#1E40AF',
    hint: 'Số lượng đơn hàng được tạo tính từ 00:00 sáng đến thời điểm hiện tại.'
  },
  {
    title: 'Khách hàng mới',
    value: '24',
    sub: '-3.1% so hôm qua',
    trend: 'down',
    icon: Users,
    bg: '#FEF9C3',
    iconBg: '#FDE68A',
    iconColor: '#92400E',
    hint: 'Số lượng tài khoản khách hàng mới đăng ký trong vòng 24 giờ qua.'
  },
  {
    title: 'Chi nhánh hoạt động',
    value: '4/5',
    sub: '1 đang bảo trì',
    trend: 'neutral',
    icon: Store,
    bg: '#FFF0F3',
    iconBg: '#FCBABD',
    iconColor: '#8B3A4A',
    hint: 'Tỷ lệ chi nhánh đang hoạt động. Hiện tại hệ thống đang sử dụng cấu hình chi nhánh mặc định.'
  },
];

export function Dashboard() {
  const [orders, setOrders] = useState(OrderService.getAllOrders());
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [orderFilter, setOrderFilter] = useState<'active' | 'completed' | 'cancelled'>('active');

  useEffect(() => {
    const handleRefresh = () => {
      setOrders(OrderService.getAllOrders());
    };
    window.addEventListener('storage', handleRefresh);
    const interval = setInterval(handleRefresh, 3000);
    return () => {
      window.removeEventListener('storage', handleRefresh);
      clearInterval(interval);
    };
  }, []);

  const todayStr = new Date().toLocaleDateString('vi-VN');
  const todayOrders = orders.filter(o => o.date === todayStr || (o.createdAt && o.createdAt.includes(new Date().toISOString().split('T')[0])));
  const todayRevenue = todayOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);

  const completedOrders = orders.filter(o => o.status === 'completed');
  const activeOrders = orders.filter(o => !['completed', 'cancelled'].includes(o.status));
  const cancelledOrders = orders.filter(o => o.status === 'cancelled');

  const filteredOrders = orderFilter === 'active' ? activeOrders : (orderFilter === 'completed' ? completedOrders : cancelledOrders);

  const dynamicStatsCards = [
    {
      title: 'Doanh thu hôm nay',
      value: formatVND(todayRevenue),
      sub: `Từ ${todayOrders.filter(o => o.status === 'completed').length} đơn thành công`,
      trend: 'up',
      icon: TrendingUp,
      bg: '#FFF3E6',
      iconBg: '#F5C088',
      iconColor: '#F58220',
      hint: 'Tổng giá trị các đơn hàng đã HOÀN THÀNH trong ngày hôm nay.'
    },
    {
      title: 'Đơn đang xử lý',
      value: activeOrders.length.toString(),
      sub: 'Cần xử lý ngay',
      trend: activeOrders.length > 5 ? 'down' : 'up',
      icon: ShoppingBag,
      bg: '#EFF6FF',
      iconBg: '#BFDBFE',
      iconColor: '#1E40AF',
      hint: 'Số lượng đơn hàng chưa hoàn tất hoặc chưa hủy.'
    },
    {
      title: 'Tỷ lệ thành công',
      value: `${((completedOrders.length / (orders.length || 1)) * 100).toFixed(1)}%`,
      sub: `${completedOrders.length} / ${orders.length} đơn`,
      trend: 'up',
      icon: CheckCircle2,
      bg: '#ECFDF5',
      iconBg: '#A7F3D0',
      iconColor: '#059669',
      hint: 'Tỷ lệ đơn hàng hoàn thành so với tổng số đơn.'
    },
    {
      title: 'Đơn đã hủy',
      value: cancelledOrders.length.toString(),
      sub: 'Cần tối ưu vận hành',
      trend: 'down',
      icon: XCircle,
      bg: '#FEF2F2',
      iconBg: '#FECACA',
      iconColor: '#DC2626',
      hint: 'Số lượng đơn hàng bị khách hoặc admin hủy.'
    },
  ];

  // ─── COMPREHENSIVE SIDEBAR TOUR LOGIC (DRIVER.JS) ───
  const runTour = () => {
    const windowAny = window as any;
    if (!windowAny.driver) return;

    const driverObj = windowAny.driver.js.driver({
      showProgress: true,
      nextBtnText: 'Tiếp theo',
      prevBtnText: 'Trước',
      doneBtnText: 'Hoàn tất',
      steps: [
        { 
          element: '#tour-admin-header', 
          popover: { 
            title: '👋 Chào mừng Admin!', 
            description: 'Hãy để chúng tôi giới thiệu nhanh các phân hệ quản trị trên thanh công cụ bên trái nhé.',
            side: "bottom", align: 'start' 
          } 
        },
        { 
            element: '#tour-side-dashboard', 
            popover: { 
              title: '📊 Dashboard', 
              description: 'Trang tổng quan hiển thị các chỉ số kinh doanh, biểu đồ doanh thu và các đơn hàng mới nhất.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-menu', 
            popover: { 
              title: '🍔 Quản lý Thực đơn', 
              description: 'Quản lý danh sách món, giá cả và các danh mục sản phẩm.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-orders', 
            popover: { 
              title: '📋 Quản lý Đơn hàng', 
              description: 'Theo dõi, xác nhận và cập nhật trạng thái đơn hàng (Chờ xử lý, Đang pha chế, Hoàn thành).',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-customers', 
            popover: { 
              title: '👥 Khách hàng', 
              description: 'Xem danh sách khách hàng, lịch sử đặt hàng và quản lý thông tin thành viên.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-vouchers', 
            popover: { 
              title: '🎫 Voucher & Ưu đãi (Soon)', 
              description: 'Chức năng phát hành mã giảm giá đang được phát triển.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-reports', 
            popover: { 
              title: '📈 Báo cáo kinh doanh', 
              description: 'Phân tích doanh thu, lợi nhuận và các báo cáo chi tiết theo ngày/tháng/năm.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-media', 
            popover: { 
              title: '🖼️ Thư viện Media (Soon)', 
              description: 'Nơi quản lý hình ảnh sản phẩm đang được phát triển.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-branches', 
            popover: { 
              title: '📍 Chi nhánh (Soon)', 
              description: 'Chức năng quản lý các chi nhánh đang được phát triển.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-staff', 
            popover: { 
              title: '👷 Nhân viên', 
              description: 'Phân quyền tài khoản và quản lý danh sách nhân sự vận hành hệ thống.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-reviews', 
            popover: { 
              title: '💬 Đánh giá & Phản hồi (Soon)', 
              description: 'Chức năng tiếp nhận phản hồi khách hàng đang được phát triển.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-audit', 
            popover: { 
              title: '🛡️ Audit Log', 
              description: 'Truy vết toàn bộ lịch sử thao tác của các tài khoản trên hệ thống để đảm bảo an ninh.',
              side: "right", align: 'start' 
            } 
        },
        { 
            element: '#tour-side-settings', 
            popover: { 
              title: '⚙️ Cấu hình hệ thống', 
              description: 'Thiết lập các tham số chung như thông tin cửa hàng, quy định thanh toán và giao diện.',
              side: "right", align: 'start' 
            } 
        },
        {
          popover: {
            title: '✨ Sẵn sàng khởi đầu!',
            description: 'Bạn đã nắm rõ các phân hệ của Chips CMS. Hãy bắt đầu quản lý cửa hàng ngay nhé!'
          }
        }
      ]
    });
    driverObj.drive();
  };

  // ─── INITIALIZATION ───
  useEffect(() => {
    const windowAny = window as any;
    
    if (windowAny.tippy) {
      windowAny.tippy('[data-tippy-content]', {
        animation: 'shift-away',
        allowHTML: true,
        inertia: true,
        interactive: true,
      });
    }

    const hasSeenTour = localStorage.getItem('hasSeenAdminTour');
    if (!hasSeenTour) {
       const timer = setTimeout(runTour, 1500);
       localStorage.setItem('hasSeenAdminTour', 'true');
       return () => clearTimeout(timer);
    }
  }, []);

  const chartData = chartPeriod === 'monthly' ? revenueData : weeklyData;
  const xKey = chartPeriod === 'monthly' ? 'month' : 'day';

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }} className="pb-10">
      {/* Page header */}
      <div id="tour-admin-header" className="section-enter mb-6 rounded-[28px] border border-[#F0DCC8] bg-[linear-gradient(135deg,#FFF8F2_0%,#FFFFFF_68%)] p-4 shadow-[0_16px_40px_rgba(93,46,15,0.05)] sm:p-5 flex justify-between items-center">
        <div>
           <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>
             Dashboard
           </h1>
           <p style={{ color: '#A0845C', fontSize: '13.5px' }}>Thứ Hai, 20 tháng 04 năm 2026 — Chào mừng trở lại, Admin!</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={runTour}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D1606] text-white text-[11px] font-black uppercase tracking-wider transition-all hover:bg-orange-600 hover:shadow-xl active:scale-95"
                data-tippy-content="Chạy lại hướng dẫn các phân hệ Sidebar"
                data-tippy-theme="chips-premium"
            >
                <Sparkles size={14} className="text-orange-400" /> Hướng dẫn chức năng
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div id="tour-stats-grid" className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
        {dynamicStatsCards.map((card, i) => (
          <div key={i} className="compact-stat-card hover-lift p-4 sm:p-5 group cursor-help"
            style={{ boxShadow: '0 10px 24px rgba(93,46,15,0.05)' }}
            data-tippy-content={`<div class="font-bold text-orange-400 mb-1">${card.title}</div><div class="text-[11px] leading-relaxed">${card.hint}</div>`}
            data-tippy-theme="chips-premium"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: card.iconBg }}>
                <card.icon size={20} style={{ color: card.iconColor }} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                style={{
                  background: card.trend === 'up' ? '#FFEDD5' : card.trend === 'down' ? '#FEE2E2' : '#F3F4F6',
                  color: card.trend === 'up' ? '#9A3412' : card.trend === 'down' ? '#991B1B' : '#6B7280',
                  fontSize: '11px'
                }}>
                {card.trend === 'up' ? <ArrowUpRight size={10} /> : card.trend === 'down' ? <ArrowDownRight size={10} /> : null}
                {card.sub.split(' ')[0]}
              </span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1A1A1A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {card.value}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
               <div style={{ fontSize: '12px', color: '#A0845C', lineHeight: 1.45 }}>{card.title}</div>
               <Info size={12} className="text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Revenue Chart */}
        <div id="tour-revenue-chart" className="lg:col-span-2 rounded-xl p-5"
          style={{ background: '#FFFFFF', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>
                  Biểu đồ doanh thu
                </h2>
                <p style={{ fontSize: '12px', color: '#A0845C' }}>Theo {chartPeriod === 'monthly' ? 'tháng năm 2025' : 'tuần này'}</p>
              </div>
              <div 
                className="p-1.5 rounded-full bg-orange-50 text-orange-500 cursor-help"
                data-tippy-content="Biểu đồ này giúp bạn so sánh doanh thu thực tế giữa các mốc thời gian."
                data-tippy-theme="chips-light"
              >
                <Info size={14} />
              </div>
            </div>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: '#F0DCC8' }}>
              {(['weekly', 'monthly'] as const).map((p) => (
                <button key={p} onClick={() => setChartPeriod(p)}
                  className="px-3 py-1.5 transition-all text-xs"
                  style={{
                    background: chartPeriod === p ? '#F58220' : 'white',
                    color: chartPeriod === p ? 'white' : '#A0845C',
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontWeight: chartPeriod === p ? 600 : 400
                  }}>
                  {p === 'weekly' ? 'Tuần' : 'Tháng'}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5C088" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F5C088" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Be Vietnam Pro', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Be Vietnam Pro', sans-serif" }} axisLine={false} tickLine={false} tickFormatter={formatCurrency} width={40} />
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: '1px solid #F0DCC8', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: '12px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                formatter={(value: number) => [formatVND(value), 'Doanh thu']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#F58220" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div id="tour-category-pie" className="rounded-xl p-5"
          style={{ background: '#FFFFFF', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' }}>
            Danh mục bán chạy
          </h2>
          <p style={{ fontSize: '12px', color: '#A0845C', marginBottom: '12px' }}>Tháng 04/2026</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #F0DCC8', fontSize: '12px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                formatter={(value: number) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between group cursor-help"
                   data-tippy-content={`Tỷ lệ tiêu thụ của nhóm <b>${cat.name}</b> chiếm ${cat.value}% tổng sản phẩm.`}
                   data-tippy-theme="chips-premium"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color, border: '1px solid rgba(0,0,0,0.08)' }}></div>
                  <span style={{ fontSize: '12px', color: '#A0845C' }}>{cat.name}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#F58220' }}>{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div id="tour-recent-orders" className="rounded-xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 border-b gap-4" style={{ borderColor: '#F0DCC8' }}>
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>
              Quản lý Đơn hàng
            </h2>
            <p style={{ fontSize: '12px', color: '#A0845C' }}>Lịch sử giao dịch thời gian thực</p>
          </div>
          
          <div className="flex bg-[#F9FAFB] p-1 rounded-xl border border-gray-100">
             {[
               { id: 'active', label: 'Đang xử lý', count: activeOrders.length, color: 'text-blue-600' },
               { id: 'completed', label: 'Thành công', count: completedOrders.length, color: 'text-emerald-600' },
               { id: 'cancelled', label: 'Đã hủy', count: cancelledOrders.length, color: 'text-rose-600' }
             ].map(t => (
               <button 
                key={t.id}
                onClick={() => setOrderFilter(t.id as any)}
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-lg transition-all ${
                  orderFilter === t.id ? 'bg-white shadow-sm text-[#2D1606]' : 'text-gray-400 hover:text-gray-600'
                }`}
               >
                 {t.label} <span className={`ml-1 opacity-60 ${orderFilter === t.id ? t.color : ''}`}>({t.count})</span>
               </button>
             ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FFF3E6' }}>
                <th className="text-left px-4 py-3 min-w-[100px]" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>Mã đơn</th>
                <th className="text-left px-4 py-3 min-w-[160px]" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>Khách hàng</th>
                <th className="text-left px-4 py-3 min-w-[100px]" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>Loại</th>
                <th className="text-left px-4 py-3 min-w-[110px]" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>Tổng tiền</th>
                <th className="text-left px-4 py-3 min-w-[110px]" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>Ngày đặt</th>
                <th className="text-left px-4 py-3 min-w-[130px]" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>Trạng thái</th>
                <th className="text-left px-4 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-20 text-center text-gray-400 text-sm italic">
                    Không có đơn hàng nào trong mục này.
                  </td>
                </tr>
              ) : (
                filteredOrders.slice(0, 20).map((order) => {
                  const st = statusConfig[order.status] || {
                    label: order.status || 'Không rõ',
                    bg: '#F3F4F6',
                    color: '#6B7280',
                    icon: <AlertCircle size={12} />
                  };
                  const typeLabel = order.type === 'delivery' ? 'Giao hàng' : order.type === 'takeaway' ? 'Mang về' : 'Tại quán';
                  const dateStr = new Date(order.createdAt).toLocaleDateString('vi-VN');

                  const handleStatusUpdate = (newStatus: any) => {
                    OrderService.updateOrderStatus(order.id, newStatus);
                    showToast.success(`Cập nhật đơn #${order.id}`, {
                      description: `Đã chuyển sang trạng thái: ${statusConfig[newStatus]?.label || newStatus}`
                    });
                  };

                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors"
                      style={{ borderColor: '#FAF0E6' }}>
                      <td className="px-4 py-3">
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#F58220' }}>{order.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div style={{ fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>{order.customerName}</div>
                        <div style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{order.customerId}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span style={{ fontSize: '12px', color: '#A0845C' }}>{typeLabel}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{formatVND(order.total)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span style={{ fontSize: '12px', color: '#A0845C' }}>{dateStr}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                          style={{ background: st.bg, color: st.color, fontSize: '11.5px', fontWeight: 600 }}>
                          {st.icon}
                          {st.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => handleStatusUpdate('confirmed')}
                              className="px-3 py-1.5 bg-orange-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-orange-600 transition-all active:scale-95"
                            >
                              Xác nhận
                            </button>
                          )}
                          {order.status === 'confirmed' && (
                            <button 
                              onClick={() => handleStatusUpdate('preparing')}
                              className="px-3 py-1.5 bg-blue-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-blue-600 transition-all active:scale-95"
                            >
                              Pha chế
                            </button>
                          )}
                          {order.status === 'preparing' && (
                            <button 
                              onClick={() => handleStatusUpdate('ready')}
                              className="px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-indigo-600 transition-all active:scale-95"
                            >
                              Giao hàng
                            </button>
                          )}
                          {order.status === 'ready' && (
                            <button 
                              onClick={() => handleStatusUpdate('completed')}
                              className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-emerald-600 transition-all active:scale-95"
                            >
                              Hoàn tất
                            </button>
                          )}
                          {['pending', 'confirmed'].includes(order.status) && (
                            <button 
                              onClick={() => handleStatusUpdate('cancelled')}
                              className="p-1.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors"
                              title="Hủy đơn"
                            >
                              <XCircle size={14} />
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <button 
                              onClick={() => window.print()}
                              className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                              title="In hóa đơn"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreHorizontal size={16} style={{ color: '#9CA3AF' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
