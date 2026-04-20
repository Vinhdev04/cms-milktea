import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center w-full">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" 
        style={{ background: '#F8FAF9', color: '#9CA3AF' }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 600, color: '#1A1A1A', marginBottom: '8px' }}>
        {title}
      </h3>
      {description && (
        <p style={{ fontSize: '13.5px', color: '#6B9080', maxWidth: '300px', marginBottom: '16px' }}>
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
