import { useState } from "react";
import { Save, Bell, Shield, Store, CreditCard, Palette, Globe, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const settingsSections = [
  { id: 'general', label: 'Thông tin chung', icon: Store },
  { id: 'notifications', label: 'Thông báo', icon: Bell },
  { id: 'payment', label: 'Thanh toán', icon: CreditCard },
  { id: 'appearance', label: 'Giao diện', icon: Palette },
  { id: 'security', label: 'Bảo mật', icon: Shield },
  { id: 'localization', label: 'Ngôn ngữ & Địa phương', icon: Globe },
];

interface ToggleProps {
  defaultChecked?: boolean;
  label: string;
  description?: string;
}

function Toggle({ defaultChecked = false, label, description }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3.5 border-b last:border-0" style={{ borderColor: '#FFFAF5' }}>
      <div className="flex-1 mr-4">
        <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#1A1A1A' }}>{label}</div>
        {description && <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '1px' }}>{description}</div>}
      </div>
      <button onClick={() => setChecked(!checked)}
        className="relative flex-shrink-0 rounded-full transition-all duration-200"
        style={{ width: '40px', height: '22px', background: checked ? '#F58220' : '#E5E7EB' }}>
        <div className="absolute top-1 transition-all duration-200 w-3.5 h-3.5 rounded-full"
          style={{ background: 'white', left: checked ? '22px' : '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </button>
    </div>
  );
}

export function SystemSettings() {
  const [activeSection, setActiveSection] = useState('general');

  return (
    <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <div className="mb-6">
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, color: '#1A1A1A' }}>
          Cấu hình hệ thống
        </h1>
        <p style={{ fontSize: '13.5px', color: '#A0845C' }}>Quản lý và tùy chỉnh hệ thống Chips MilkTea CMS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="rounded-xl overflow-hidden"
          style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', height: 'fit-content' }}>
          {settingsSections.map((s, i) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className="w-full flex items-center justify-between px-4 py-3.5 transition-all"
              style={{
                background: activeSection === s.id ? '#FFF3E6' : 'white',
                borderBottom: i < settingsSections.length - 1 ? '1px solid #FAF0E6' : 'none',
                color: activeSection === s.id ? '#F58220' : '#A0845C'
              }}>
              <div className="flex items-center gap-3 text-left">
                <s.icon size={16} className="flex-shrink-0" />
                <span style={{ fontSize: '13.5px', fontWeight: activeSection === s.id ? 600 : 400, lineHeight: '1.2' }}>{s.label}</span>
              </div>
              <ChevronRight size={14} style={{ opacity: activeSection === s.id ? 1 : 0.4 }} />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {activeSection === 'general' && (
            <>
              <div className="rounded-xl p-5"
                style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
                  Thông tin thương hiệu
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Tên thương hiệu', value: 'Chips MilkTea' },
                    { label: 'Địa chỉ trụ sở', value: '123 Nguyễn Huệ, Q.1, TP.HCM' },
                    { label: 'Hotline', value: '1900 xxxx' },
                    { label: 'Email liên hệ', value: 'contact@smyou.vn' },
                    { label: 'Website', value: 'https://smyou.vn' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#A0845C', display: 'block', marginBottom: '5px' }}>{f.label}</label>
                      <input defaultValue={f.value}
                        className="w-full px-4 rounded-xl border outline-none transition-all"
                        style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
                        onFocus={(e) => e.target.style.borderColor = '#F5C088'}
                        onBlur={(e) => e.target.style.borderColor = '#F0DCC8'}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-5"
                style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
                  Cấu hình đơn hàng
                </h2>
                <div className="space-y-1">
                  <Toggle label="Cho phép đặt hàng online" description="Khách hàng có thể đặt qua ứng dụng và website" defaultChecked={true} />
                  <Toggle label="Cho phép đặt trước" description="Đặt hàng trước tối thiểu 30 phút" defaultChecked={true} />
                  <Toggle label="Tự động xác nhận đơn" description="Tự động xác nhận khi thanh toán thành công" defaultChecked={false} />
                  <Toggle label="Cho phép hủy đơn" description="Khách hàng có thể hủy trong vòng 5 phút" defaultChecked={true} />
                </div>
              </div>
            </>
          )}

          {activeSection === 'notifications' && (
            <div className="rounded-xl p-5"
              style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
                Cấu hình thông báo
              </h2>
              <div className="space-y-1">
                <Toggle label="Thông báo đơn hàng mới" description="Gửi alert khi có đơn hàng mới" defaultChecked={true} />
                <Toggle label="Thông báo đơn bị hủy" description="Cảnh báo khi khách hàng hủy đơn" defaultChecked={true} />
                <Toggle label="Thông báo khách hàng mới" description="Khi có người đăng ký tài khoản" defaultChecked={false} />
                <Toggle label="Báo cáo cuối ngày" description="Gửi tổng kết qua email lúc 23:00" defaultChecked={true} />
                <Toggle label="Thông báo voucher sắp hết hạn" description="Nhắc nhở 3 ngày trước khi hết hạn" defaultChecked={true} />
              </div>
            </div>
          )}

          {activeSection === 'payment' && (
            <div className="rounded-xl p-5"
              style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
                Phương thức thanh toán
              </h2>
              <div className="space-y-1">
                <Toggle label="Thanh toán COD" description="Thanh toán khi nhận hàng" defaultChecked={true} />
                <Toggle label="Chuyển khoản ngân hàng" description="VietQR / Internet Banking" defaultChecked={true} />
                <Toggle label="Ví MoMo" description="Thanh toán qua ví điện tử MoMo" defaultChecked={true} />
                <Toggle label="ZaloPay" description="Thanh toán qua ZaloPay" defaultChecked={false} />
                <Toggle label="VNPay" description="Thanh toán qua cổng VNPay" defaultChecked={false} />
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="rounded-xl p-5"
              style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
                Màu sắc thương hiệu
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Màu chủ đạo', value: '#F58220' },
                  { label: 'Màu phụ', value: '#F5C088' },
                  { label: 'Màu nhấn', value: '#FCBABD' },
                  { label: 'Màu nền', value: '#FFF3E6' },
                ].map(c => (
                  <div key={c.label}>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#A0845C', display: 'block', marginBottom: '5px' }}>{c.label}</label>
                    <div className="flex items-center gap-2 px-3 rounded-xl border" style={{ height: '44px', borderColor: '#F0DCC8' }}>
                      <div className="w-6 h-6 rounded-lg" style={{ background: c.value, border: '1px solid rgba(0,0,0,0.1)' }} />
                      <span style={{ fontSize: '13px', color: '#1A1A1A', fontFamily: 'monospace' }}>{c.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="rounded-xl p-5"
              style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
                Cài đặt bảo mật
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Mật khẩu hiện tại', placeholder: '••••••••' },
                  { label: 'Mật khẩu mới', placeholder: '••••••••' },
                  { label: 'Xác nhận mật khẩu', placeholder: '••••••••' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#A0845C', display: 'block', marginBottom: '5px' }}>{f.label}</label>
                    <input type="password" placeholder={f.placeholder}
                      className="w-full px-4 rounded-xl border outline-none transition-all"
                      style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif" }}
                      onFocus={(e) => e.target.style.borderColor = '#F5C088'}
                      onBlur={(e) => e.target.style.borderColor = '#F0DCC8'}
                    />
                  </div>
                ))}
                <div className="space-y-1 pt-2">
                  <Toggle label="Xác thực 2 yếu tố (2FA)" description="Bảo vệ tài khoản admin bằng OTP" defaultChecked={false} />
                  <Toggle label="Tự động đăng xuất" description="Đăng xuất sau 30 phút không hoạt động" defaultChecked={true} />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'localization' && (
            <div className="rounded-xl p-5"
              style={{ background: 'white', border: '0.5px solid #F0DCC8', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>
                Ngôn ngữ & Múi giờ
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Ngôn ngữ', value: 'Tiếng Việt (vi)' },
                  { label: 'Múi giờ', value: 'Asia/Ho_Chi_Minh (UTC+7)' },
                  { label: 'Định dạng ngày', value: 'DD/MM/YYYY' },
                  { label: 'Định dạng tiền tệ', value: 'VND (₫)' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#A0845C', display: 'block', marginBottom: '5px' }}>{f.label}</label>
                    <input defaultValue={f.value}
                      className="w-full px-4 rounded-xl border outline-none"
                      style={{ height: '44px', borderColor: '#F0DCC8', fontSize: '13.5px', fontFamily: "'Be Vietnam Pro', sans-serif", color: '#1A1A1A' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="flex justify-end">
            <button onClick={() => toast.success('Đã lưu cấu hình thành công!')} className="flex items-center gap-2 px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
              style={{ background: '#F58220', color: 'white', fontFamily: "'Be Vietnam Pro', sans-serif", fontWeight: 600, fontSize: '13.5px' }}>
              <Save size={15} /> Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
