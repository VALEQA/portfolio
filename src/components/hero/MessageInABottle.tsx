import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, ExternalLink, X, Compass } from 'lucide-react';
import { useBeachAtmosphere } from '../../context/BeachAtmosphereContext';
import { profileData } from '../../data/portfolioData';
import { useClipboard } from '../../hooks/useClipboard';

export const MessageInABottle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { triggerCorkPop, triggerSoundSplash } = useBeachAtmosphere();
  const { copied, copy } = useClipboard();

  const handleOpenBottle = () => {
    triggerCorkPop();
    triggerSoundSplash(1.5);
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Bottle in Ocean Water */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute left-6 sm:left-14 md:left-24 top-[56%] sm:top-[54%] z-20 select-none cursor-pointer group"
        onClick={handleOpenBottle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Klik pesan dalam botol!"
      >
        <motion.div
          animate={{
            y: [0, -12, 0, 8, 0],
            rotate: [-6, 8, -4, 6, -6],
            x: [0, 4, 0, -4, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5.5,
            ease: 'easeInOut'
          }}
          className="relative flex items-center justify-center"
        >
          {/* Subtle water ripple shadow */}
          <div className="absolute -bottom-2 w-14 h-4 bg-[#0284c7]/40 rounded-full blur-[3px] scale-y-75" />

          {/* Bobbing Glass Bottle SVG */}
          <svg
            width="54"
            height="54"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg transition-transform duration-300 group-hover:scale-115"
          >
            {/* Cork stopper */}
            <rect x="22" y="4" width="4" height="6" rx="1.5" fill="#8c6239" stroke="#5c3a21" strokeWidth="1" />
            
            {/* Bottle Neck */}
            <rect x="21" y="9" width="6" height="7" rx="1" fill="#bae6fd" fillOpacity="0.75" stroke="#0284c7" strokeWidth="1.5" />
            
            {/* Bottle Body */}
            <path
              d="M17 16 C17 16, 12 20, 12 28 C12 36, 16 41, 24 41 C32 41, 36 36, 36 28 C36 20, 31 16, 31 16 Z"
              fill="#e0f2fe"
              fillOpacity="0.75"
              stroke="#0284c7"
              strokeWidth="2"
            />
            
            {/* Rolled Scroll inside */}
            <path
              d="M20 22 C20 20, 28 20, 28 22 L27 34 C27 36, 21 36, 21 34 Z"
              fill="#fef08a"
              stroke="#ca8a04"
              strokeWidth="1.2"
            />
            {/* Red ribbon on scroll */}
            <rect x="20" y="27" width="8" height="2" fill="#ef4444" />

            {/* Glass shine highlights */}
            <path d="M16 22 C15 25, 15 31, 17 35" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="20" r="1" fill="#ffffff" />
          </svg>

          {/* Interactive Tooltip Badge */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: isHovered ? 1 : 0.85, y: isHovered ? -4 : 0 }}
            className="absolute -top-7 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#fde047] border border-[#0f172a] text-[#0f172a] text-[10px] font-mono font-black shadow-[2px_2px_0px_#0f172a] flex items-center gap-1 pointer-events-none"
          >
            <Sparkles className="w-2.5 h-2.5 text-[#0284c7]" />
            <span>Pesan Rahasia</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal Parchment Scroll View */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm"
            />

            {/* Parchment Letter Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-[#fffdf5] border-3 border-[#0f172a] shadow-[8px_8px_0px_#0f172a] overflow-hidden"
            >
              {/* Decorative Stamp Corner */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#fef08a] border border-[#0f172a] text-[#0f172a]">
                  POSTED FROM THE SEA
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#faeed1] hover:bg-[#fde047] border-2 border-[#0f172a] text-[#0f172a] flex items-center justify-center transition-all cursor-pointer shadow-[2px_2px_0px_#0f172a] active:shadow-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Header Title */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0f172a] tracking-tight">
                    Pesan dalam Botol
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#0284c7]">
                    Dari: {profileData.name} (Faishal)
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-3.5 text-xs sm:text-sm text-[#334155] leading-relaxed border-y-2 border-dashed border-[#e2d3b3] py-4 my-4 font-medium">
                <p>
                  Halo! Terima kasih banyak sudah menjelajahi portofolio pulau pantai saya sampai sejauh ini.
                </p>
                <p>
                  Sebagai mahasiswa semester 5 Teknik Informatika di Universitas Esa Unggul, saya selalu bersemangat mengembangkan platform web fungsional, aplikasi mobile Flutter, serta eksplorasi analisis data yang dapat memberikan dampak nyata bagi pengguna.
                </p>
                <div className="p-3 rounded-2xl bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] text-xs font-semibold">
                  💡 <em>"Kualitas sebuah perangkat lunak bukan hanya dari baris kodenya, tapi dari kemampuannya mempermudah kehidupan orang lain."</em>
                </div>
                <p className="text-xs text-[#64748b]">
                  Saat ini saya <strong>terbuka untuk program magang (internship)</strong>, kolaborasi tugas akhir, maupun junior roles. Jangan ragu untuk berdiskusi santai!
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copy(profileData.contact.email)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-mono font-bold border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{copied ? 'Tersalin!' : 'Salin Email'}</span>
                  </button>

                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fff9d4] hover:bg-[#fde047] text-[#0f172a] text-xs font-mono font-bold border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] transition-all"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-[#0284c7]" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#475569] text-xs font-mono font-bold transition-all cursor-pointer ml-auto"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
