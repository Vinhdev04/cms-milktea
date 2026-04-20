import { Clock3, MapPin, Phone, Star, Store } from 'lucide-react';
import { userPreviewBranches } from '../data/userPreviewData';

const branchStatusStyle = {
  open: 'bg-[#EAF7EE] text-[#1E8E5A]',
  busy: 'bg-[#FFF0D9] text-[#C46A18]',
  closing: 'bg-[#FDECEC] text-[#C0392B]',
};

export function UserBranches() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#C46A18]">Chi nhánh phục vụ</div>
        <h1 className="mt-2 font-heading text-4xl font-extrabold text-[#2D1606]">Chọn chi nhánh theo khoảng cách, thời gian giao và dịch vụ</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#8A552A]">Trang này cần phục vụ đúng quyết định của khách: chi nhánh nào gần nhất, đang mở hay bận, và có hỗ trợ giao / pickup không.</p>
      </div>

      <div className="space-y-5">
        {userPreviewBranches.map((branch) => (
          <article key={branch.id} className="surface-card overflow-hidden rounded-[32px]">
            <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
              <img src={branch.image} alt={branch.name} className="h-full min-h-[260px] w-full object-cover" />
              <div className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-extrabold text-[#2D1606]">{branch.name}</h2>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${branchStatusStyle[branch.status]}`}>{branch.status}</span>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-[#8A552A]">
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#FF8A1F]" />{branch.address}</div>
                      <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#FF8A1F]" />{branch.openHours} • Giao {branch.deliveryTime}</div>
                      <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#FF8A1F]" />{branch.phone}</div>
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[linear-gradient(180deg,#FFF8F0_0%,#FFEFD9_100%)] px-4 py-3 text-sm font-semibold text-[#7A451A]">
                    <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-[#FDBA74] text-[#FDBA74]" />{branch.rating}</div>
                    <div className="mt-1">{branch.distance}</div>
                    <div className="mt-1">{branch.district}</div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {branch.services.map((service) => (
                    <span key={service} className="rounded-full bg-[#FFF3E7] px-3 py-1.5 text-xs font-semibold text-[#A05A22]">{service}</span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF8A1F] to-[#E56A00] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5">
                    <Store className="h-4 w-4" /> Chọn chi nhánh này
                  </button>
                  <button className="inline-flex items-center justify-center rounded-2xl border border-[#F2D5BA] bg-white px-5 py-3 text-sm font-semibold text-[#7A451A] transition-all hover:bg-[#FFF0E2]">Xem menu chi nhánh</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
