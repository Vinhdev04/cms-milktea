import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 24, text = "Đang tải...", fullScreen = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-[28px] border border-[#F0DCC8] bg-white/90 p-4 shadow-[0_18px_40px_rgba(93,46,15,0.08)]"
        style={{ backdropFilter: "blur(16px)" }}
      >
        <div className="absolute inset-2 rounded-[22px] bg-[linear-gradient(135deg,rgba(245,192,136,0.18),rgba(255,243,230,0.7))]" />
        <Loader2 size={size} className="relative z-10 animate-spin" style={{ color: "#F58220" }} />
      </div>
      {text && (
        <span style={{ fontSize: "13px", color: "#A0845C", fontWeight: 600, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at top, rgba(245,192,136,0.22), transparent 28%), linear-gradient(180deg, rgba(255,250,245,0.98), rgba(255,247,239,0.98))",
        }}
      >
        {content}
      </div>
    );
  }

  return <div className="section-enter flex w-full justify-center py-12">{content}</div>;
}
