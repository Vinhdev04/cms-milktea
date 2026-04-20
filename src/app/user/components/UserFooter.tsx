import { Link } from 'react-router';
import { Facebook, Instagram, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export function UserFooter() {
  return (
    <footer className="mt-16 border-t border-[#F3D9BE] bg-[linear-gradient(180deg,#FFF6EC_0%,#FFF0E0_100%)] text-[#4A2508]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF8A1F] to-[#E56A00] text-sm font-extrabold text-white">SM</div>
              <div>
                <div className="font-heading text-lg font-bold">SMYOU Delivery</div>
                <div className="text-sm text-[#A05A22]">Ứng dụng đặt món nhanh, rõ và gọn</div>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#7A451A]">
              Trải nghiệm thành viên được tối ưu cho đặt hàng, voucher và theo dõi đơn theo đúng luồng nghiệp vụ của ứng dụng giao đồ uống.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram].map((Icon, index) => (
                <a key={index} href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#F2D5BA] bg-white text-[#A05A22] transition-all hover:-translate-y-0.5 hover:text-[#E56A00]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold">Tác vụ nhanh</h3>
            <div className="space-y-3 text-sm text-[#7A451A]">
              <Link to="/app/menu" className="block transition-colors hover:text-[#E56A00]">Đặt món</Link>
              <Link to="/app/orders" className="block transition-colors hover:text-[#E56A00]">Theo dõi đơn hàng</Link>
              <Link to="/app/offers" className="block transition-colors hover:text-[#E56A00]">Voucher và ưu đãi</Link>
              <Link to="/app/branches" className="block transition-colors hover:text-[#E56A00]">Chọn chi nhánh</Link>
              <Link to="/app/profile" className="block transition-colors hover:text-[#E56A00]">Hồ sơ thành viên</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold">Liên hệ</h3>
            <div className="space-y-3 text-sm text-[#7A451A]">
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-[#FF8A1F]" /><span>1900 6868</span></div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#FF8A1F]" /><span>hello@smyou.vn</span></div>
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[#FF8A1F]" /><span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold">Cam kết</h3>
            <div className="rounded-[24px] border border-[#F2D5BA] bg-white/80 p-4 text-sm text-[#7A451A]">
              <div className="mb-3 flex items-center gap-3 font-semibold text-[#4A2508]">
                <ShieldCheck className="h-4 w-4 text-[#FF8A1F]" />
                Vận hành rõ ràng cho app delivery
              </div>
              <div className="space-y-2 leading-6">
                <div>Luồng đặt món tách biệt theo mang đi / giao hàng</div>
                <div>Voucher có điều kiện áp dụng và trạng thái rõ</div>
                <div>Lịch sử đơn và địa chỉ giao hàng quản lý riêng</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#F2D5BA] pt-6 text-sm text-[#A05A22] md:flex-row md:items-center md:justify-between">
          <p>© 2026 SMYOU. Orange preview for member app.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="transition-colors hover:text-[#E56A00]">Chính sách bảo mật</a>
            <a href="#" className="transition-colors hover:text-[#E56A00]">Điều khoản sử dụng</a>
            <a href="#" className="transition-colors hover:text-[#E56A00]">Hướng dẫn đặt hàng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
