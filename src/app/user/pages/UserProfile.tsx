import {
  Bell, CheckCircle2, CreditCard, Edit3, Eye, EyeOff,
  Gift, LogOut, MapPin, Medal, Phone, Plus, Settings,
  ShoppingBag, Star, Trash2, UserCircle2, X, ChevronRight,
  Headphones, Info, ShieldCheck, Heart, Crown, Zap, Award
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useUserAuth } from '../../context/UserAuthContext';
import {
  userPreviewAddresses,
  userPreviewNotifications,
  userPreviewPaymentMethods,
  userPreviewProfile as initialProfile,
} from '../data/userPreviewData';

const TIER_CONFIG: Record<string, { color: string; bg: string; badge: string; gradient: string; glow: string }> = {
  Bronze:   { color: 'text-amber-800', bg: 'bg-amber-100', badge: '🥉', gradient: 'from-amber-700 to-amber-900', glow: 'shadow-amber-500/20' },
  Silver:   { color: 'text-slate-600', bg: 'bg-slate-100', badge: '🥈', gradient: 'from-slate-400 to-slate-600', glow: 'shadow-slate-500/20' },
  Gold:     { color: 'text-orange-800', bg: 'bg-orange-100', badge: '🥇', gradient: 'from-orange-400 to-orange-600', glow: 'shadow-orange-500/20' },
  Platinum: { color: 'text-purple-800', bg: 'bg-purple-100', badge: '💎', gradient: 'from-purple-500 to-purple-800', glow: 'shadow-purple-500/20' },
};

const QUICK_STATS = [
  { label: 'Đơn hàng', value: '26', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Yêu thích', value: '8', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Đã tiết kiệm', value: '150K', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export function UserProfile() {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const [profile] = useState(initialProfile);

  const handleLogout = () => {
    logout();
    navigate('/app/auth');
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-hidden font-sans">
      {/* ─── HEADER ─── */}
      <header className="px-6 pt-8 pb-6 bg-white border-b border-gray-100">
         <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
               {profile.name.charAt(0)}
            </div>
            <div>
               <h1 className="text-xl font-bold text-gray-900">{profile.name}</h1>
               <p className="text-xs text-gray-400">{profile.email}</p>
            </div>
         </div>
      </header>

      {/* ─── CONTENT ─── */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
         <div className="grid grid-cols-3 gap-3">
            {QUICK_STATS.map(s => (
              <div key={s.label} className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
                 <div className="text-lg font-bold text-gray-900">{s.value}</div>
                 <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
         </div>

         <section className="space-y-2">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Tài khoản</h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
               <ProfileLink icon={ShoppingBag} label="Đơn hàng của tôi" href="/app/orders" />
               <ProfileLink icon={Heart} label="Món yêu thích" href="/app/favorites" />
               <ProfileLink icon={MapPin} label="Địa chỉ đã lưu" />
               <ProfileLink icon={CreditCard} label="Phương thức thanh toán" />
            </div>
         </section>

         <section className="space-y-2">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Khác</h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
               <ProfileLink icon={Bell} label="Thông báo" />
               <ProfileLink icon={ShieldCheck} label="Bảo mật & Quyền riêng tư" />
               <ProfileLink icon={Headphones} label="Hỗ trợ & Khiếu nại" />
            </div>
         </section>

         <button onClick={handleLogout} className="w-full bg-white text-red-500 py-4 rounded-2xl border border-red-50 font-bold text-sm">
            Đăng xuất
         </button>

         <div className="text-center py-10">
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Version 2.1.0 • Chips MilkTea</p>
         </div>
      </main>
    </div>
  );
}

function ProfileLink({ icon: Icon, label, href }: { icon: any; label: string; href?: string }) {
  const content = (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
       <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
             <Icon className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-gray-700">{label}</span>
       </div>
       <ChevronRight className="h-4 w-4 text-gray-300" />
    </div>
  );
  return href ? <Link to={href}>{content}</Link> : <button className="w-full text-left">{content}</button>;
}
