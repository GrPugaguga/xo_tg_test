import React from 'react';

const O_icon = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="O-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fbc2eb', stopOpacity: 1 }} /> 
          <stop offset="100%" style={{ stopColor: '#a6c1ee', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="30" stroke="url(#O-gradient)" strokeWidth="12" fill="none" />
    </svg>
  );
};

export default O_icon;
