import React from 'react';

export const Logo: React.FC<{ className?: string; size?: number }> = ({ className, size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="50" r="48" fill="#F8FAF9" stroke="#2D6A4F" strokeWidth="2"/>
      <path d="M35 40H65V65C65 73.2843 58.2843 80 50 80C41.7157 80 35 73.2843 35 65V40Z" fill="#1B4332"/>
      <path d="M60 40C60 30 50 30 50 30" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="42" cy="55" r="3" fill="#A8D5BA"/>
      <circle cx="50" cy="62" r="3" fill="#A8D5BA"/>
      <circle cx="58" cy="55" r="3" fill="#A8D5BA"/>
      <circle cx="46" cy="68" r="3" fill="#A8D5BA"/>
      <circle cx="54" cy="68" r="3" fill="#A8D5BA"/>
      <text x="50" y="25" textAnchor="middle" fill="#1B4332" style={{ fontSize: '10px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>SMYOU</text>
    </svg>
  );
};
