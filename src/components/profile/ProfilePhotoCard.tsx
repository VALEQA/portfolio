import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, RefreshCw, UserCheck } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useCardTilt } from '../../hooks/useCardTilt';

interface ProfilePhotoCardProps {
  isFlooded: boolean;
}

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({ isFlooded }) => {
  const { tiltProps } = useCardTilt(6);
  const [avatarMode, setAvatarMode] = useState<'chibi' | 'real'>('chibi');

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  const toggleAvatarMode = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAvatarMode((prev) => (prev === 'chibi' ? 'real' : 'chibi'));
  };

  // Determine source image based on active mode
  const currentImageSrc =
    avatarMode === 'chibi'
      ? profileData.avatarChibiUrl || '/avatar.svg'
      : profileData.avatarUrl || '/avatar-real.png';

  return (
    <motion.div
      animate={
        isFlooded
          ? {
              rotate: isMobile ? -5 : -24,
              x: isMobile ? 0 : -32,
              y: isMobile ? 20 : 70,
              scale: isMobile ? 0.98 : 0.94,
              transition: { type: 'spring', stiffness: 160, damping: 16 }
            }
          : {
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }
      }
      className="relative w-full flex flex-col items-center lg:items-start gap-6 select-none"
    >
      <div
        {...tiltProps}
        onClick={() => toggleAvatarMode()}
        className="relative w-full max-w-sm rounded-[32px] p-3.5 bg-[#fffdf5] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a] group cursor-pointer transition-transform hover:-translate-y-1"
        title="Klik foto untuk beralih antara Mode Chibi dan Foto Biasa"
      >
        <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-[#faeed1] border-2 border-[#0f172a] flex items-center justify-center">
          {/* Top Left Badge Indicator */}
          <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0f172a]/80 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-white/20 shadow-sm pointer-events-none">
            <Sparkles className="w-3 h-3 text-[#fde047] animate-pulse" />
            <span>{avatarMode === 'chibi' ? 'MODE CHIBI' : 'FOTO ASLI'}</span>
          </div>

          {/* Top Right Toggle Button */}
          <button
            type="button"
            onClick={toggleAvatarMode}
            className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fde047] hover:bg-[#facc15] text-[#0f172a] text-[11px] font-mono font-black border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Klik untuk beralih foto"
          >
            <RefreshCw className="w-3 h-3 transition-transform group-hover:rotate-180 duration-500 text-[#0f172a]" />
            <span>{avatarMode === 'chibi' ? 'Ganti Biasa' : 'Ganti Chibi'}</span>
          </button>

          {/* Animated Avatar Image Switcher */}
          <AnimatePresence mode="wait">
            <motion.img
              key={avatarMode}
              initial={{ opacity: 0, scale: 0.93, rotate: avatarMode === 'chibi' ? -2 : 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              src={currentImageSrc}
              alt={`${profileData.name} (${avatarMode} avatar)`}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // If real photo or chibi file is not found, fallback safely to cartoon avatar
                target.src = '/avatar.svg';
              }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent opacity-75 pointer-events-none" />

          {/* Bottom Card Identity Overlay */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#fffdf5]/95 border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="text-sm font-black text-[#0f172a] leading-tight">
                {profileData.name}
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0284c7] bg-[#e0f2fe] px-2 py-0.5 rounded-md border border-[#0284c7]/30 flex items-center gap-1">
                <UserCheck className="w-2.5 h-2.5" />
                {avatarMode === 'chibi' ? 'Chibi' : 'Real'}
              </span>
            </div>
            <div className="text-[11px] text-[#8c6239] font-mono mt-0.5 font-semibold">
              {profileData.education}
            </div>
          </div>
        </div>

        {/* Card Footer Caption */}
        <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-[#8c6239] font-bold">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            KLIK UNTUK GANTI FOTO
          </span>
          <span>ID // {profileData.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Location & Operating Environment */}
      <motion.div
        animate={isFlooded ? { rotate: 12, x: 24, y: 30 } : { rotate: 0, x: 0, y: 0 }}
        className="w-full max-w-sm p-4 rounded-2xl bg-[#fffdf5] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] flex items-center justify-between text-xs font-mono text-[#0f172a]"
      >
        <div className="flex items-center gap-2 font-bold">
          <MapPin className="w-4 h-4 text-[#ef4444]" />
          <span>{profileData.contact.location}</span>
        </div>
        <span className="text-[#0284c7] font-black px-2 py-0.5 rounded-lg bg-[#e0f2fe] border border-[#0284c7]/40">
          Web &amp; Mobile
        </span>
      </motion.div>
    </motion.div>
  );
};
