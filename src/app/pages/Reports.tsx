import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, ShoppingBag, Users, ArrowUpRight } from "lucide-react";
import { revenueData, weeklyData } from "../data/mockData";

const formatVND = (v: number) => new Intl.NumberFormat('vi-VN').format(v) + 'đ';
const formatShort = (v: number) => {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v.toString();
};

const topProducts = [
  { name: 'Trà Sữa Trân Châu Hoàng Kim', sold: 1248, revenue: 68640000, trend: '+12%' },
  { name: 'Ô Long Trân Châu Nướng', sold: 897, revenue: 51129000, trend: '+8%' },
  { name: 'Matcha Đào Kem Cheese', sold: 986, revenue: 51272000, trend: '+21%' },
  { name: 'Cà Phê Muối Kem Béo', sold: 623, revenue: 36757000, trend: '+5%' },
  { name: 'Hồng Trà Vải Thiều', sold: 754, revenue: 37700000, trend: '-2%' },
];

const branchRevenue = [
  { branch: 'Q.1', revenue: 28500000, orders: 213 },
  { branch: 'Q.3', revenue: 21000000, orders: 157 },
  { branch: 'Q.7', revenue: 24300000, orders: 182 },
  { branch: 'B.Thạnh', revenue: 18700000, orders: 140 },
  { branch: 'T.Đức', revenue: 32000000, orders: 240 },
];

const periods = ['Tuần này', 'Tháng này', 'Quý 1/2026', 'Năm 2025'];

export function Reports() {
  const [period, setPeriod] = useState('Tháng này');

  const kpis = [
    { label: 'Tổng doanh thu', value: '726.500.000đ', change: '+18.4%', up: true, icon: TrendingUp, bg: '#E8F5EC', iconBg: '#A8D5BA', iconColor: '#2D6A4F' },
    { label: 'Tổng đơn hàng', value: '5.421', change: '+11.2%', up: true, icon: ShoppingBag, bg: '#EFF6FF', iconBg: '#BFDBFE', iconColor: '#1E40AF' },
    { label: 'Khách hàng mới', value: '312', change: '+6.8%', up: true, icon: Users, bg: '#FEF9C3', iconBg: '#FDE68A', iconColor: '#92400E' },
    { label: 'Giá trị TB/đơn', value: '134.000đ', change: '+2.1%', up: true, icon: ArrowUpRight, bg: '#FFF0F3', iconBg: '#FCBABD', iconColor: '#8B3A4A' },
  ];

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
            Báo cáo & Thống kê
          </h1>
          <p style={{ fontSize: '13.5px', color: '#6B9080' }}>Phân tích kinh doanh SMYOU MilkTea</p>
        </div>
        <div className="flex rounded-xl overflow-x-auto border w-full md:w-auto hide-scrollbar" style={{ borderColor: '#E0EDE6' }}>
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-3.5 py-2 text-sm transition-all whitespace-nowrap flex-1 md:flex-none"
              style={{
                background: period === p ? '#2D6A4F' : 'white',
                color: period === p ? 'white' : '#6B9080',
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: period === p ? 600 : 400,
                borderRight: '1px solid #E0EDE6'
              }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className="rounded-xl p-5"
            style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: k.iconBg }}>
                <k.icon size={20} style={{ color: k.iconColor }} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full"
                style={{ background: '#DCFCE7', color: '#166534', fontSize: '11px', fontWeight: 600 }}>
                {k.change}
              </span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A1A1A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{k.value}</div>
            <div style={{ fontSize: '12.5px', color: '#6B9080', marginTop: '2px' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Monthly Revenue */}
        <div className="rounded-xl p-5"
          style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' }}>
            Doanh thu theo tháng
          </h2>
          <p style={{ fontSize: '12px', color: '#6B9080', marginBottom: '16px' }}>Năm 2025 — 2026</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A8D5BA" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#A8D5BA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Be Vietnam Pro'" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Be Vietnam Pro'" }} axisLine={false} tickLine={false} tickFormatter={formatShort} width={38} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0EDE6', fontSize: '12px', fontFamily: "'Be Vietnam Pro'" }}
                formatter={(v: number) => [formatVND(v), 'Doanh thu']} />
              <Area type="monotone" dataKey="revenue" stroke="#2D6A4F" strokeWidth={2} fill="url(#revGrad2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Orders Bar */}
        <div className="rounded-xl p-5"
          style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' }}>
            Đơn hàng theo ngày trong tuần
          </h2>
          <p style={{ fontSize: '12px', color: '#6B9080', marginBottom: '16px' }}>Tuần 17 tháng 04/2026</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Be Vietnam Pro'" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: "'Be Vietnam Pro'" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0EDE6', fontSize: '12px', fontFamily: "'Be Vietnam Pro'" }}
                formatter={(v: number) => [v, 'Đơn hàng']} />
              <Bar dataKey="orders" fill="#A8D5BA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Branch Revenue + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Branch */}
        <div className="rounded-xl p-5"
          style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
            Doanh thu theo chi nhánh
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={branchRevenue} layout="vertical" barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={formatShort} />
              <YAxis type="category" dataKey="branch" tick={{ fontSize: 12, fill: '#6B9080', fontFamily: "'Be Vietnam Pro'" }} axisLine={false} tickLine={false} width={50} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E0EDE6', fontSize: '12px', fontFamily: "'Be Vietnam Pro'" }}
                formatter={(v: number) => [formatVND(v), 'Doanh thu']} />
              <Bar dataKey="revenue" fill="#2D6A4F" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="rounded-xl overflow-hidden"
          style={{ background: 'white', border: '0.5px solid #E0EDE6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#E0EDE6' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>
              Top sản phẩm bán chạy
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: '#F0F7F3' }}>
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center px-5 py-3.5 gap-3 hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: i < 3 ? '#A8D5BA' : '#F3F4F6', color: i < 3 ? '#1B4332' : '#6B7280', fontSize: '12px', fontWeight: 700 }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }} className="truncate">{p.name}</div>
                  <div style={{ fontSize: '11.5px', color: '#9CA3AF' }}>{p.sold.toLocaleString()} đã bán · {formatVND(p.revenue)}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: p.trend.startsWith('+') ? '#DCFCE7' : '#FEE2E2',
                    color: p.trend.startsWith('+') ? '#166534' : '#991B1B'
                  }}>
                  {p.trend}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
