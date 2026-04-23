import { Construction, Timer, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface UnderDevelopmentProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
}

export function UnderDevelopment({
  title = "Chức năng đang phát triển",
  description = "Chúng tôi đang nỗ lực hoàn thiện tính năng này để mang lại trải nghiệm tốt nhất cho bạn. Vui lòng quay lại sau!",
  showBackButton = true,
}: UnderDevelopmentProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 bg-orange-100/50 blur-3xl rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[32px] bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl shadow-orange-200">
          <Construction className="h-12 w-12 text-white animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-lg border border-orange-50">
          <Timer className="h-5 w-5 text-orange-500" />
        </div>
      </div>

      <h2 className="font-heading text-2xl font-bold text-[#1A1A1A] mb-3">
        {title}
      </h2>
      <p className="max-w-md text-sm leading-relaxed text-[#A0845C] mb-10">
        {description}
      </p>

      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 rounded-2xl bg-[#2B1406] px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#3D1D09] active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Quay lại trang trước
        </button>
      )}
    </div>
  );
}
