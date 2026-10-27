import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBeachAtmosphere } from '../../context/BeachAtmosphereContext';

export const InteractiveBeachBall: React.FC = () => {
  const [bouncing, setBouncing] = useState(false);
  const [bounceCount, setBounceCount] = useState(0);
  const { triggerSoundSplash } = useBeachAtmosphere();

  const handleBounce = () => {
    if (bouncing) return;
    setBouncing(true);
    setBounceCount((c) => c + 1);
    triggerSoundSplash(1.2);

    setTimeout(() => {
      setBouncing(false);
    }, 1200);
  };

  return (
    <div
      className="absolute left-[58%] sm:left-[55%] bottom-16 sm:bottom-24 md:bottom-28 z-30 pointer-events-auto select-none cursor-pointer"
      onClick={handleBounce}
      title="Klik bola pantai untuk memantulkan!"
    >
      <motion.div
        animate={
          bouncing
            ? {
                y: [0, -130, 0, -60, 0, -20, 0],
                rotate: [0, 240, 480, 640, 720],
                scale: [1, 0.9, 1.05, 0.95, 1]
              }
            : {
                y: [0, -4, 0],
                rotate: [-2, 3, -2]
              }
        }
        transition={
          bouncing
            ? { duration: 1.2, ease: 'easeOut' }
            : { repeat: Infinity, duration: 4, ease: 'easeInOut' }
        }
        className="relative group"
      >
        {/* Shadow */}
        <motion.div
          animate={
            bouncing
              ? {
                  scale: [1, 0.4, 1, 0.7, 1],
                  opacity: [0.7, 0.2, 0.7, 0.4, 0.7]
                }
              : {}
          }
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-[#8c6239]/30 rounded-full blur-[2px]"
        />

        {/* 3D Beach Ball SVG */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md transition-transform group-hover:scale-110"
        >
          {/* Main sphere */}
          <circle cx="18" cy="18" r="16" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          
          {/* Colorful beach ball segments */}
          <path d="M18 2 C10 8, 10 28, 18 34" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          <path d="M18 2 C26 8, 26 28, 18 34" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          <path d="M18 2 C18 10, 18 26, 18 34" stroke="#ef4444" strokeWidth="3" />

          {/* Top circle cap */}
          <circle cx="18" cy="5" r="3" fill="#fde047" stroke="#0f172a" strokeWidth="1" />

          {/* Gloss highlight */}
          <ellipse cx="14" cy="11" rx="3.5" ry="2" fill="#ffffff" fillOpacity="0.7" transform="rotate(-30 14 11)" />
        </svg>

        {bounceCount > 0 && (
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-[#fde047] border border-[#0f172a] text-[9px] font-mono font-black text-[#0f172a] shadow-xs">
            x{bounceCount}
          </span>
        )}
      </motion.div>
    </div>
  );
};
