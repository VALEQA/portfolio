import React from 'react';
import { profileData } from '../../data/portfolioData';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  theme?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withText = false,
  theme = 'dark'
}) => {
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-xs' },
    md: { img: 'w-10 h-10', text: 'text-sm' },
    lg: { img: 'w-14 h-14', text: 'text-base' },
    xl: { img: 'w-24 h-24', text: 'text-lg' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 select-none">
        <img
          src="/logo.svg"
          alt="Faishal Logo"
          className={`${currentSize.img} object-contain drop-shadow-md`}
          loading="eager"
        />
      </div>

      {withText && (
        <div className="flex flex-col text-left">
          <span
            className={`font-black tracking-wide leading-tight transition-colors duration-300 ${
              theme === 'light'
                ? 'text-[#0f172a] drop-shadow-none'
                : 'text-white drop-shadow-sm'
            } ${currentSize.text}`}
          >
            {profileData.name}
          </span>
          <span
            className={`text-[11px] font-mono font-bold flex items-center gap-1 transition-colors duration-300 ${
              theme === 'light'
                ? 'text-[#8c6239] drop-shadow-none'
                : 'text-[#dfcca8] drop-shadow-sm'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {profileData.tagline}
          </span>
        </div>
      )}
    </div>
  );
};
