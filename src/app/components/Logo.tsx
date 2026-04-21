import React from 'react';

export const Logo: React.FC<{ className?: string; size?: number }> = ({ className, size = 32 }) => {
  return (
    <img
      src="/chips-logo.png"
      alt="SMYOU Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};
