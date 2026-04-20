import { Bell, Briefcase, CalendarDays, Edit2, Mail, MapPin, Phone, Shield, Sparkles, Star, UserCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const recentActivities = [
  { title: "Duyệt 12 đánh giá mới", time: "10 phút trước", tone: "#FFF3E6", color: "#F58220" },
  { title: "Xuất báo cáo doanh thu tuần", time: "45 phút trước", tone: "#EFF6FF", color: "#2563EB" },
  { title: "Cập nhật cấu hình thông báo", time: "2 giờ trước", tone: "#E8F5E9", color: "#2E7D32" },
];

const quickStats = [
  { label: "Ca làm tuần này", value: "6", icon: <CalendarDays size={18} />, bg: "#FFF3E6", color: "#F58220" },
  { label: "Tác vụ xử lý", value: "128", icon: <Sparkles size={18} />, bg: "#FEF3C7", color: "#92400E" },
  { label: "Mức ưu tiên", value: "Admin", icon: <Shield size={18} />, bg: "#EFF6FF", color: "#2563EB" },
];

export function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-5" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <section className="section-enter overflow-hidden rounded-[30px] border border-[#F0DCC8] bg-[linear-gradient(135deg,#FFF8F2_0%,#FFFFFF_70%)] shadow-[0_18px_42px_rgba(93,46,15,0.05)]">
        <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr] lg:p-6">
          <div>
            <div className="inline-flex rounded-full bg-[#FFF1E1] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F58220]">
              Profile Page
            </div>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#F5C088,#F58220)] text-[30px] font-bold text-white shadow-[0_14px_28px_rgba(245,130,32,0.22)]">
                {user.name.split(" ").slice(-2).map((part) => part[0]).join("").toUpperCase()}
              </div>
              <div>
                <h1 className="font-heading text-[30px] font-bold text-[#1A1A1A]">{user.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FFF3E6] px-3 py-1 text-[12px] font-bold text-[#F58220]">{user.role}</span>
                  <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-[12px] font-bold text-[#2563EB]">{user.branch}</span>
                </div>
                <p className="mt-3 max-w-xl text-[13.5px] leading-6 text-[#A0845C]">
                  Trang hồ sơ quản trị tập trung thông tin cá nhân, trạng thái công việc và những thiết lập liên quan tới thông báo, bảo mật và năng suất làm việc.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#F0DCC8] bg-white/80 p-4 backdrop-blur sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-[17px] font-bold text-[#1A1A1A]">Liên hệ nhanh</h2>
              <button className="rounded-2xl border border-[#F0DCC8] p-2.5 text-[#F58220] transition-colors hover:bg-[#FFF8F1]">
                <Edit2 size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Mail size={16} />, label: "Email", value: user.email },
                { icon: <Phone size={16} />, label: "Số điện thoại", value: user.phone },
                { icon: <MapPin size={16} />, label: "Chi nhánh", value: user.branch },
                { icon: <Briefcase size={16} />, label: "Phân quyền", value: `${user.permissions.length} modules` },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-[#F6E8D8] bg-[#FFFDF9] px-4 py-3">
                  <div className="mt-0.5 text-[#F58220]">{item.icon}</div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C1874E]">{item.label}</div>
                    <div className="mt-1 text-[13px] font-semibold text-[#1A1A1A]">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="stats-grid-compact">
        {quickStats.map((item) => (
          <div key={item.label} className="compact-stat-card p-3 sm:p-4">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: item.bg, color: item.color }}>
              {item.icon}
            </div>
            <div className="font-heading text-[22px] font-bold text-[#1A1A1A]">{item.value}</div>
            <div className="text-[12px] text-[#A0845C]">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="section-enter rounded-[28px] border border-[#F0DCC8] bg-white p-5 shadow-[0_12px_30px_rgba(93,46,15,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-[18px] font-bold text-[#1A1A1A]">Thiết lập tài khoản</h2>
            <span className="rounded-full bg-[#FFF7EF] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#F58220]">Preview</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Thông báo đẩy", desc: "Nhận cảnh báo đơn hàng, đánh giá và hệ thống.", icon: <Bell size={18} />, active: true },
              { title: "Bảo mật 2 lớp", desc: "Bật OTP cho các phiên đăng nhập quản trị.", icon: <Shield size={18} />, active: false },
              { title: "Hồ sơ công việc", desc: "Đồng bộ dữ liệu chi nhánh và phân quyền.", icon: <UserCircle2 size={18} />, active: true },
              { title: "Đánh giá nội bộ", desc: "Theo dõi mức hài lòng từ đội vận hành.", icon: <Star size={18} />, active: true },
            ].map((item) => (
              <div key={item.title} className="rounded-[24px] border border-[#F6E8D8] bg-[#FFFDF9] p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFF3E6] text-[#F58220]">
                  {item.icon}
                </div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">{item.title}</div>
                <p className="mt-2 text-[12px] leading-5 text-[#A0845C]">{item.desc}</p>
                <div className="mt-4">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${item.active ? "bg-[#E8F5E9] text-[#2E7D32]" : "bg-[#F3F4F6] text-[#6B7280]"}`}>
                    {item.active ? "Đang bật" : "Chưa bật"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-enter rounded-[28px] border border-[#F0DCC8] bg-white p-5 shadow-[0_12px_30px_rgba(93,46,15,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-[18px] font-bold text-[#1A1A1A]">Hoạt động gần đây</h2>
            <span className="text-[12px] font-semibold text-[#A0845C]">Hôm nay</span>
          </div>
          <div className="space-y-3">
            {recentActivities.map((item) => (
              <div key={item.title} className="rounded-[22px] border border-[#F6E8D8] bg-[#FFFDF9] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-[13px] font-bold text-[#1A1A1A]">{item.title}</span>
                </div>
                <div className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: item.tone, color: item.color }}>
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
