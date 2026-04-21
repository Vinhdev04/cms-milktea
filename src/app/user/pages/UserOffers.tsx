import { Clock3, Copy, TicketPercent } from 'lucide-react';
import { userPreviewOffers } from '../data/userPreviewData';

const offerStyle = {
  active: 'bg-[#FFF4E8] text-[#E56A00]',
  claimed: 'bg-[#EAF7EE] text-[#1E8E5A]',
  ending: 'bg-[#FFF0D9] text-[#C46A18]',
};

export function UserOffers() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#C46A18]">Voucher & ưu đãi</div>
        <h1 className="mt-2 font-heading text-4xl font-extrabold text-[#2D1606]">Ưu đãi cần rõ điều kiện, trạng thái và CTA sử dụng</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8A552A]">Thay vì một danh sách chung chung, mỗi voucher hiển thị mã, ngưỡng đơn tối thiểu, hạn dùng và khả năng sử dụng ngay.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {userPreviewOffers.map((offer) => (
          <article key={offer.id} className="surface-card overflow-hidden rounded-[32px]">
            <div className="bg-[linear-gradient(135deg,#FF8A1F,#E56A00)] p-5 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">
                <TicketPercent className="h-4 w-4" /> {offer.code}
              </div>
              <h2 className="mt-4 text-2xl font-extrabold">{offer.title}</h2>
              <p className="mt-2 text-sm leading-7 text-white/85">{offer.description}</p>
            </div>
            <div className="p-5">
              <div className="rounded-[24px] bg-[linear-gradient(180deg,#FFF8F0_0%,#FFEFD9_100%)] p-4 text-sm text-[#7A451A]">
                <div className="flex items-center justify-between"><span>Ưu đãi</span><span className="font-bold text-[#E56A00]">{offer.discountLabel}</span></div>
                <div className="mt-3 flex items-center justify-between"><span>Đơn tối thiểu</span><span className="font-semibold text-[#2D1606]">{offer.minOrder.toLocaleString('vi-VN')}đ</span></div>
                <div className="mt-3 flex items-center justify-between"><span>Hạn sử dụng</span><span className="font-semibold text-[#2D1606]">{offer.expiry}</span></div>
                <div className="mt-3 flex items-center justify-between"><span>Trạng thái</span><span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${offerStyle[offer.status]}`}>{offer.status}</span></div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF8A1F] to-[#E56A00] px-4 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5">Dùng ngay</button>
                <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F2D5BA] bg-white text-[#7A451A] transition-all hover:bg-[#FFF0E2]"><Copy className="h-4 w-4" /></button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#A05A22]"><Clock3 className="h-4 w-4 text-[#FF8A1F]" />Voucher hiển thị theo khả năng áp dụng thực tế.</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
