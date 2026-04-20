import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 24, text = "Đang tải...", fullScreen = false }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        <Loader2 size={size} className="animate-spin" style={{ color: '#F58220' }} />
      </div>
      {text && (
        <span style={{ fontSize: '13px', color: '#A0845C', fontWeight: 500, fontFamily: "'Be Vietnam Pro', sans-serif" }}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: '#FFFAF5' }}>
        {content}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-12">
      {content}
    </div>
  );
}
