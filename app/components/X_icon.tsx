import React from 'react';

const X_icon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="X-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fbc2eb', stopOpacity: 1 }} /> 
          <stop offset="100%" style={{ stopColor: '#a6c1ee', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <line x1="20" y1="20" x2="80" y2="80" stroke="url(#X-gradient)" strokeWidth="12" strokeLinecap="round" />
      <line x1="80" y1="20" x2="20" y2="80" stroke="url(#X-gradient)" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
};

export default X_icon;
