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
  { label: 'Voucher', value: '3', icon: Gift, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Yêu thích', value: '8', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Điểm', value: '2.4K', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
];

export function UserProfile() {
  const { logout } = useUserAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialProfile);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const tier = TIER_CONFIG[profile.tier] ?? TIER_CONFIG['Bronze'];
  const progress = Math.min(100, Math.round((profile.points / profile.nextTierTarget) * 100));

  const handleLogout = () => {
    logout();
    navigate('/app/auth');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-28">
      {/* ─── PROFILE HERO HEADER ─── */}
      <section className="relative overflow-hidden bg-[#2D1606] pb-24 pt-8 anim-fade-up">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-orange-500 blur-[100px]" />
          <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-orange-400 blur-[80px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-2xl px-5">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Hồ sơ cá nhân</h1>
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-[10px] font-bold text-white/70 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              <Edit3 className="h-3 w-3" /> Chỉnh sửa
            </button>
          </div>

          {/* Avatar + Info */}
          <div className="flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-orange-400 to-orange-600 text-3xl font-black text-white shadow-2xl shadow-orange-500/30 ring-4 ring-white/10 sm:h-24 sm:w-24 sm:text-4xl">
                {profile.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg ring-2 ring-[#2D1606]">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-xl font-black text-white sm:text-2xl">{profile.name}</h2>
              <p className="mt-0.5 text-sm font-medium text-white/50">{profile.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className={`inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r ${tier.gradient} px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md ${tier.glow}`}>
                  <span>{tier.badge}</span> {profile.tier} Member
                </div>
                <span className="text-[10px] font-bold text-white/30">•</span>
                <span className="text-[10px] font-bold text-white/40">Từ {profile.joinedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 mx-auto -mt-16 max-w-2xl px-4">
        {/* ─── TIER PROGRESS CARD ─── */}
        <section className={`overflow-hidden rounded-[32px] bg-gradient-to-r ${tier.gradient} p-5 text-white shadow-xl ${tier.glow} anim-fade-up sm:p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 block">Hạng thành viên</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black sm:text-3xl">{profile.points.toLocaleString()}</span>
                <span className="text-xs font-bold opacity-60">điểm</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/20 text-2xl flex items-center justify-center backdrop-blur-md sm:h-14 sm:w-14 sm:text-3xl anim-float-badge">
              {tier.badge}
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-wider mb-1.5 opacity-70">
              <span>{profile.tier}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)] progress-fill" style={{ '--progress': `${progress}%` } as React.CSSProperties} />
            </div>
            <p className="mt-2.5 text-[11px] font-bold opacity-80">Còn {(profile.nextTierTarget - profile.points).toLocaleString()} điểm để lên hạng tiếp theo</p>
          </div>
        </section>

        {/* ─── QUICK STATS GRID ─── */}
        <section className="mt-4 grid grid-cols-4 gap-2 sm:gap-3 stagger-children">
          {QUICK_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 rounded-[24px] bg-white p-3 shadow-sm border border-gray-50 transition-all hover:shadow-md active:scale-95 sm:p-4">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} ${stat.color} sm:h-10 sm:w-10`}>
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="text-lg font-black text-[#2D1606] sm:text-xl">{stat.value}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</span>
            </div>
          ))}
        </section>

        <WalletInfo />

        {/* ─── ACTION LISTS ─── */}
        <section className="mt-6 space-y-3 stagger-children">
           <ProfileGroup title="Hoạt động">
              <ProfileItem icon={ShoppingBag} iconColor="text-blue-500" iconBg="bg-blue-50" label="Lịch sử đơn hàng" href="/app/orders" />
              <ProfileItem icon={Gift} iconColor="text-orange-500" iconBg="bg-orange-50" label="Ưu đãi của tôi" count={3} href="/app/offers" />
              <ProfileItem icon={Heart} iconColor="text-red-500" iconBg="bg-red-50" label="Món yêu thích" href="/app/favorites" />
           </ProfileGroup>

           <ProfileGroup title="Thông tin cá nhân">
              <ProfileItem icon={MapPin} iconColor="text-emerald-500" iconBg="bg-emerald-50" label="Địa chỉ đã lưu" href="/app/profile" />
              <ProfileItem icon={CreditCard} iconColor="text-indigo-500" iconBg="bg-indigo-50" label="Phương thức thanh toán" href="/app/profile" />
              <ProfileItem icon={Phone} iconColor="text-teal-500" iconBg="bg-teal-50" label="Liên hệ: {profile.phone}" />
           </ProfileGroup>

           <ProfileGroup title="Cài đặt & Hỗ trợ">
              <ProfileItem icon={Bell} iconColor="text-amber-500" iconBg="bg-amber-50" label="Thông báo" count={userPreviewNotifications.filter(n => n.unread).length} />
              <ProfileItem icon={ShieldCheck} iconColor="text-cyan-500" iconBg="bg-cyan-50" label="Quyền riêng tư" />
              <ProfileItem icon={Headphones} iconColor="text-rose-500" iconBg="bg-rose-50" label="Trung tâm hỗ trợ" />
              <ProfileItem icon={Info} iconColor="text-gray-500" iconBg="bg-gray-50" label="Về Chips v1.2" />
           </ProfileGroup>

           <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center justify-center gap-3 rounded-[28px] bg-white border border-red-100 py-4 text-sm font-black text-red-500 shadow-sm transition-all duration-300 hover:bg-red-50 active:scale-95"
           >
              <LogOut className="h-5 w-5" /> Đăng xuất tài khoản
           </button>
        </section>

        <p className="mt-10 mb-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">
           Product of Chips Vietnam • 2026
        </p>
      </main>

      {/* ─── LOGOUT MODAL ─── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/50 backdrop-blur-md" onClick={() => setShowLogoutModal(false)}>
           <div className="w-full max-w-sm rounded-t-[40px] sm:rounded-[40px] bg-white p-8 sm:p-10 text-center shadow-2xl anim-fade-up" onClick={(e) => e.stopPropagation()} style={{ animationDuration: '0.3s' }}>
              {/* Handle bar for mobile */}
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />
              <div className="mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-[28px] bg-red-50 text-4xl anim-bounce-in">😥</div>
              <h3 className="text-xl font-black text-[#2D1606] sm:text-2xl">Bạn muốn đi ư?</h3>
              <p className="mt-3 text-sm font-medium text-gray-500 leading-relaxed">Đăng xuất sẽ xóa phiên làm việc hiện tại, nhưng ưu đãi vẫn sẽ ở lại chờ bạn.</p>
              <div className="mt-8 flex gap-3">
                 <button onClick={() => setShowLogoutModal(false)} className="flex-1 rounded-[20px] bg-gray-50 py-4 text-sm font-bold text-gray-600 transition-all duration-300 hover:bg-gray-100 active:scale-95">Ở lại</button>
                 <button onClick={handleLogout} className="flex-1 rounded-[20px] bg-[#2D1606] py-4 text-sm font-black text-white shadow-xl transition-all duration-300 hover:bg-orange-600 active:scale-95">Xác nhận</button>
              </div>
           </div>
        </div>
      )}

      {/* ─── EDIT MODAL ─── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#2D1606]/80 backdrop-blur-2xl" onClick={() => setShowEditModal(false)}>
           <div className="w-full max-w-md rounded-t-[40px] sm:rounded-[40px] bg-white p-6 sm:p-8 shadow-2xl anim-fade-up" onClick={(e) => e.stopPropagation()} style={{ animationDuration: '0.3s' }}>
              {/* Handle bar for mobile */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gray-200 sm:hidden" />
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                 <h3 className="text-xl font-black text-[#2D1606] sm:text-2xl">Chỉnh sửa hồ sơ</h3>
                 <button onClick={() => setShowEditModal(false)} className="h-9 w-9 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-all hover:bg-gray-100 active:scale-90"><X className="h-4 w-4" /></button>
              </div>
              <div className="space-y-5">
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#8A552A] ml-1">Họ tên của bạn</label>
                    <input type="text" defaultValue={profile.name} className="mt-1.5 w-full rounded-[20px] bg-gray-50 border-none px-5 py-3.5 text-sm font-bold text-[#2D1606] outline-none transition-all focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:shadow-md" />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#8A552A] ml-1">Email</label>
                    <input type="email" defaultValue={profile.email} className="mt-1.5 w-full rounded-[20px] bg-gray-50 border-none px-5 py-3.5 text-sm font-bold text-[#2D1606] outline-none transition-all focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:shadow-md" />
                 </div>
                 <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#8A552A] ml-1">Số điện thoại</label>
                    <input type="text" defaultValue={profile.phone} className="mt-1.5 w-full rounded-[20px] bg-gray-50 border-none px-5 py-3.5 text-sm font-bold text-[#2D1606] outline-none transition-all focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:shadow-md" />
                 </div>
                 <button onClick={() => setShowEditModal(false)} className="w-full rounded-[20px] bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-sm font-black text-white shadow-xl shadow-orange-500/20 transition-all duration-300 hover:shadow-2xl active:scale-95 mt-2">
                    Lưu thay đổi
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// ─── HELPER COMPONENTS ───

function WalletInfo() {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-4 overflow-hidden rounded-[28px] bg-[#2D1606] p-5 text-white shadow-xl relative card-interactive sm:p-6">
       <div className="absolute top-0 right-0 p-4 opacity-5">
          <CreditCard className="h-20 w-20" />
       </div>
       <div className="flex items-center justify-between mb-5">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Ví SMYOU & MOMO</div>
          <button onClick={() => setShow(!show)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all active:scale-90">
             {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
       </div>
       <div className="space-y-3">
          <div className="flex items-center justify-between">
             <div className="text-[11px] font-bold opacity-60">Số dư ví SM</div>
             <div className="text-lg font-black sm:text-xl">{show ? '1.250.000đ' : '•••••••••'}</div>
          </div>
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-pink-500 flex items-center justify-center text-[8px] font-black">M</div>
                <span className="text-[11px] font-bold opacity-60">Ví MOMO</span>
             </div>
             <div className="text-sm font-black">{show ? '090****567' : '•••••••••'}</div>
          </div>
       </div>
    </div>
  );
}

function ProfileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-sm border border-gray-50">
       <div className="bg-[#FAFAFA] px-5 py-2.5 border-b border-gray-50">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">{title}</h4>
       </div>
       <div className="divide-y divide-gray-50">
          {children}
       </div>
    </div>
  );
}

function ProfileItem({ icon: Icon, iconColor, iconBg, label, count, href }: { 
  icon: any; iconColor: string; iconBg?: string; label: string; count?: number; href?: string 
}) {
  const content = (
    <div className="flex items-center justify-between px-5 py-4 hover:bg-orange-50/30 transition-colors duration-200 group active:bg-orange-50/50">
       <div className="flex items-center gap-3.5 min-w-0">
          <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${iconBg || 'bg-gray-50'} ${iconColor} transition-all duration-200 group-hover:scale-105`}>
             <Icon className="h-4 w-4" />
          </div>
          <span className="text-[13px] font-bold text-[#2D1606] truncate">{label}</span>
       </div>
       <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {count !== undefined && count > 0 && (
             <span className="flex h-5 min-w-[20px] items-center justify-center rounded-lg bg-red-100 px-1.5 text-[10px] font-black text-red-600">
                {count}
             </span>
          )}
          <ChevronRight className="h-4 w-4 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-orange-500" />
       </div>
    </div>
  );

  return href ? <Link to={href}>{content}</Link> : <button className="w-full text-left">{content}</button>;
}
