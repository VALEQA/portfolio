import React from 'react';

interface AnimatedOceanSlideBackgroundProps {
  depthLevel: 1 | 2 | 3 | 4 | 5;
}

const depthGradients: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1]',
  2: 'bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#075985]',
  3: 'bg-gradient-to-b from-[#0369a1] via-[#075985] to-[#0c4a6e]',
  4: 'bg-gradient-to-b from-[#075985] via-[#0c4a6e] to-[#082f49]',
  5: 'bg-gradient-to-b from-[#082f49] via-[#03192e] to-[#010a14]'
};

export const AnimatedOceanSlideBackground: React.FC<AnimatedOceanSlideBackgroundProps> = ({
  depthLevel
}) => {
  const gradientClass = depthGradients[depthLevel] || depthGradients[1];

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none ${gradientClass}`}>
      {/* Background Subtle Water Caustics / Waves via SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <path
          d="M0,180 C360,120 720,240 1080,160 C1260,120 1380,180 1440,200 L1440,900 L0,900 Z"
          fill="rgba(255, 255, 255, 0.06)"
        />
        <path
          d="M0,320 C420,280 840,360 1200,300 C1340,280 1400,320 1440,340 L1440,900 L0,900 Z"
          fill="rgba(0, 0, 0, 0.12)"
        />
        <path
          d="M0,520 C320,480 780,560 1140,500 C1320,470 1400,510 1440,530 L1440,900 L0,900 Z"
          fill="rgba(0, 0, 0, 0.18)"
        />
      </svg>

      {/* Lightweight GPU-accelerated CSS Rising Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-20px] left-[15%] w-3 h-3 rounded-full bg-white/20 animate-bubble-float-1" />
        <div className="absolute bottom-[-20px] left-[35%] w-2 h-2 rounded-full bg-white/15 animate-bubble-float-2" />
        <div className="absolute bottom-[-20px] left-[65%] w-4 h-4 rounded-full bg-white/10 animate-bubble-float-3" />
        <div className="absolute bottom-[-20px] left-[85%] w-2.5 h-2.5 rounded-full bg-white/20 animate-bubble-float-1" />
      </div>
    </div>
  );
};
