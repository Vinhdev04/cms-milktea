import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  TrendingUp, ShoppingBag, Users, Store, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, AlertCircle, XCircle, Eye, MoreHorizontal
} from "lucide-react";
import { revenueData, weeklyData, categoryData, orders } from "../data/mockData";

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
  },
];

export function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState<'weekly' | 'monthly'>('monthly');

  const chartData = chartPeriod === 'monthly' ? revenueData : weeklyData;
  const xKey = chartPeriod === 'monthly' ? 'month' : 'day';

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      {/* Page header */}
      <div className="section-enter mb-6 rounded-[28px] border border-[#F0DCC8] bg-[linear-gradient(135deg,#FFF8F2_0%,#FFFFFF_68%)] p-4 shadow-[0_16px_40px_rgba(93,46,15,0.05)] sm:p-5">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1A1A1A', fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>
          Dashboard
        </h1>
        <p style={{ color: '#A0845C', fontSize: '13.5px' }}>Thứ Hai, 20 tháng 04 năm 2026 — Chào mừng trở lại, Admin!</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {statsCards.map((card, i) => (
          <div key={i} className="compact-stat-card hover-lift p-4 sm:p-5"
            style={{ boxShadow: '0 10px 24px rgba(93,46,15,0.05)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: card.iconBg }}>
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
            <div style={{ fontSize: '12px', color: '#A0845C', marginTop: '4px', lineHeight: 1.45 }}>{card.title}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-xl p-5"
          style={{ background: '#FFFFFF', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>
                Biểu đồ doanh thu
              </h2>
              <p style={{ fontSize: '12px', color: '#A0845C' }}>Theo {chartPeriod === 'monthly' ? 'tháng năm 2025' : 'tuần này'}</p>
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
        <div className="rounded-xl p-5"
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
              <div key={i} className="flex items-center justify-between">
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

      {/* Recent Orders */}
      <div className="rounded-xl overflow-hidden"
        style={{ background: '#FFFFFF', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#F0DCC8' }}>
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>
              Đơn hàng gần đây
            </h2>
            <p style={{ fontSize: '12px', color: '#A0845C' }}>Hôm nay, 20/04/2026</p>
          </div>
          <a href="/orders" style={{ fontSize: '13px', color: '#F58220', fontWeight: 600, textDecoration: 'none' }}
            className="flex items-center gap-1 hover:underline">
            Xem tất cả <Eye size={14} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FFF3E6' }}>
                {['Mã đơn', 'Khách hàng', 'Chi nhánh', 'Món', 'Tổng tiền', 'TT Thanh toán', 'Trạng thái', ''].map((h, i) => (
                  <th key={i} className="text-left px-4 py-3" style={{ fontSize: '12px', fontWeight: 600, color: '#F58220', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((order, i) => {
                const st = statusConfig[order.status];
                return (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#FAF0E6' }}>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#F58220' }}>{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div style={{ fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>{order.customer}</div>
                      <div style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{order.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '13px', color: '#A0845C' }}>{order.branch}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '13px', color: '#1A1A1A' }}>{order.items} món</span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{formatVND(order.total)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ fontSize: '12px', color: '#A0845C' }}>{order.payment}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
                        style={{ background: st.bg, color: st.color, fontSize: '11.5px', fontWeight: 600 }}>
                        {st.icon}
                        {st.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal size={16} style={{ color: '#9CA3AF' }} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
