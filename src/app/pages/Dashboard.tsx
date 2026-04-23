import { useState } from 'react';
import { 
  TrendingUp, ShoppingBag, Users, ArrowUpRight, 
  ArrowDownRight, Clock, AlertCircle, 
  Search, Calendar, LayoutDashboard, Settings2, PackageSearch,
  Truck, Activity, MoreVertical, Coffee
} from 'lucide-react';

// --- MOCK DATA ---
const MANAGEMENT_STATS = [
  { label: 'Tổng doanh thu', value: '128.5M', trend: '+12.5%', isUp: true, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Giá trị đơn TB', value: '54.2K', trend: '+2.1%', isUp: true, icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Khách hàng mới', value: '1,240', trend: '+18%', isUp: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Tỷ lệ quay lại', value: '64.2%', trend: '-0.4%', isUp: false, icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50' },
];

const OPERATIONAL_STATS = [
  { label: 'Đơn đang pha chế', value: '12', trend: 'High', isUp: false, icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Vận chuyển nhanh', value: '98.5%', trend: 'Stable', isUp: true, icon: Truck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Hết hàng (SKU)', value: '4', trend: 'Critical', isUp: false, icon: PackageSearch, color: 'text-rose-500', bg: 'bg-rose-50' },
  { label: 'Thời gian chờ TB', value: '8.5m', trend: '-1.2m', isUp: true, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
];

const TOP_PERFORMERS = [
  { name: 'Trà Sữa Hoàng Kim', sales: '842', revenue: '41.2M', growth: '+5.4%' },
  { name: 'Ô Long Nhài Trân Châu', sales: '621', revenue: '35.4M', growth: '+2.1%' },
  { name: 'Sữa Tươi Trân Châu ĐH', sales: '512', revenue: '28.1M', growth: '+8.2%' },
];

const RECENT_ALERTS = [
  { id: '1', type: 'inventory', title: 'Hết Trân Châu Trắng', time: '5 phút trước', status: 'critical' },
  { id: '2', type: 'order', title: 'Đơn #CHIPS-1245 chậm 15p', time: '12 phút trước', status: 'warning' },
  { id: '3', type: 'system', title: 'Chi nhánh Q1 mất kết nối', time: '30 phút trước', status: 'critical' },
];

// --- COMPONENTS ---
function KpiCard({ item }: { item: typeof MANAGEMENT_STATS[0] }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
           <item.icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${item.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
           {item.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
           {item.trend}
        </div>
      </div>
      <div className="text-slate-500 text-sm font-medium">{item.label}</div>
      <div className="text-2xl font-black text-slate-900 mt-1">{item.value}</div>
    </div>
  );
}

export function Dashboard() {
  const [viewMode, setViewMode] = useState<'management' | 'operational'>('management');
  const stats = viewMode === 'management' ? MANAGEMENT_STATS : OPERATIONAL_STATS;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 font-sans">
      {/* 1. Global Controls (Top Bar) */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
               <LayoutDashboard className="text-orange-500" size={24} />
            </div>
            <div>
               <h1 className="text-xl font-bold text-slate-900">Chips Dashboard</h1>
               <p className="text-xs text-slate-400 font-medium">Theo dõi thời gian thực hệ thống Chips MilkTea</p>
            </div>
         </div>

         <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Tìm kiếm báo cáo..." 
                 className="pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-64 shadow-sm"
               />
            </div>

            {/* Toggle Switch */}
            <div className="bg-white p-1 rounded-xl border border-slate-100 flex shadow-sm">
               <button 
                 onClick={() => setViewMode('management')}
                 className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                   viewMode === 'management' ? 'bg-gray-900 text-white' : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                  <Settings2 size={14} /> Quản trị
               </button>
               <button 
                 onClick={() => setViewMode('operational')}
                 className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                   viewMode === 'operational' ? 'bg-gray-900 text-white' : 'text-slate-400 hover:text-slate-600'
                 }`}
               >
                  <Activity size={14} /> Vận hành
               </button>
            </div>

            {/* Date Range */}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
               <Calendar size={18} className="text-slate-400" />
               Hôm nay, 23 Th4
            </button>
         </div>
      </header>

      {/* 2. Hero Metrics (KPI Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {stats.map((item, i) => (
           <KpiCard key={i} item={item} />
         ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
         {/* 3. Main Stage (Biểu đồ chính - CSS Mockup) */}
         <div className="lg:col-span-8 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h2 className="text-lg font-bold text-slate-900">{viewMode === 'management' ? 'Biểu đồ tăng trưởng' : 'Hiệu suất vận hành'}</h2>
                  <p className="text-xs text-slate-400">Tháng 04, 2026</p>
               </div>
               <div className="flex gap-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                     <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                     Doanh thu
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 ml-4">
                     <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                     Dự báo
                  </div>
               </div>
            </div>

            {/* Mock Trendline Chart using CSS Flex */}
            <div className="h-64 flex items-end justify-between gap-4 px-2">
               {[40, 65, 45, 90, 55, 75, 40, 85, 60, 95, 70, 80].map((height, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center group relative">
                    <div className="absolute -top-10 bg-gray-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                       {height}M
                    </div>
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 hover:bg-orange-600 ${
                        i % 2 === 0 ? 'bg-orange-500' : 'bg-orange-500/80'
                      }`}
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-400 mt-4">T{i + 1}</span>
                 </div>
               ))}
            </div>
         </div>

         {/* 4. Secondary Stage (Biểu đồ cơ cấu - Donut giả lập) */}
         <div className="lg:col-span-4 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Cơ cấu danh mục</h2>
            <p className="text-xs text-slate-400 mb-8">Dựa trên 24,500 đơn hàng</p>

            <div className="relative h-48 w-48 mx-auto mb-8">
               {/* Minimal CSS Donut */}
               <div className="absolute inset-0 rounded-full border-[16px] border-slate-50"></div>
               <div className="absolute inset-0 rounded-full border-[16px] border-orange-500 border-t-transparent border-l-transparent rotate-45"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-black text-slate-900">42%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trà Sữa</div>
               </div>
            </div>

            <div className="space-y-4">
               {[
                 { label: 'Trà Sữa', value: '42%', color: 'bg-orange-500' },
                 { label: 'Trà Trái Cây', value: '31%', color: 'bg-blue-500' },
                 { label: 'Cà Phê', value: '18%', color: 'bg-emerald-500' },
                 { label: 'Khác', value: '9%', color: 'bg-slate-200' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                       <span className="text-xs font-bold text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-xs font-black text-slate-900">{item.value}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* 5. Data Tables (Bảng chi tiết) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Top Performance */}
         <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
               <h2 className="text-lg font-bold text-slate-900">Sản phẩm bán chạy</h2>
               <button className="text-xs font-bold text-orange-500 hover:underline">Tất cả</button>
            </div>
            <div className="p-4 overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="text-left">
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tên sản phẩm</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Đã bán</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Doanh thu</th>
                        <th className="px-4 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Tăng trưởng</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {TOP_PERFORMERS.map((item, i) => (
                       <tr key={i} className="group hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-4 text-xs font-bold text-slate-900">{item.name}</td>
                          <td className="px-4 py-4 text-xs font-medium text-slate-600 text-center">{item.sales}</td>
                          <td className="px-4 py-4 text-xs font-black text-slate-900 text-right">{item.revenue}</td>
                          <td className="px-4 py-4 text-xs font-bold text-emerald-500 text-right">{item.growth}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Alerts / Tasks */}
         <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
               <h2 className="text-lg font-bold text-slate-900">Cảnh báo vận hành</h2>
               <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">3</div>
            </div>
            <div className="p-6 space-y-4">
               {RECENT_ALERTS.map((alert) => (
                 <div key={alert.id} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className={`p-2.5 rounded-xl ${alert.status === 'critical' ? 'bg-rose-50 text-rose-500' : 'bg-orange-50 text-orange-500'}`}>
                       {alert.type === 'inventory' ? <PackageSearch size={18} /> : alert.type === 'order' ? <ShoppingBag size={18} /> : <AlertCircle size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="text-sm font-bold text-slate-900 mb-0.5">{alert.title}</h3>
                       <p className="text-[10px] text-slate-400 font-medium">{alert.time}</p>
                    </div>
                    <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600">
                       <MoreVertical size={16} />
                    </button>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
