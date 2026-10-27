import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useClipboard } from '../../hooks/useClipboard';
import { onLenisScroll } from '../../hooks/useLenisSmoothScroll';
import { profileData } from '../../data/portfolioData';
import { BrandLogo } from '../common/BrandLogo';
import { BeachAtmosphereControls } from '../common/BeachAtmosphereControls';

interface NavbarThemeConfig {
  headerBgScrolled: string;
  headerBorderScrolled: string;
  headerShadowScrolled: string;
  themeMode: 'light' | 'dark';
  navContainerBg: string;
  navContainerBorder: string;
  navContainerShadow: string;
  activePillBg: string;
  activePillBorder: string;
  activePillShadow: string;
  activePillDot?: string;
  activeTextColor: string;
  inactiveTextColor: string;
  inactiveHoverText: string;
  emailBtnBg: string;
  emailBtnBorder: string;
  emailBtnText: string;
  emailIconColor: string;
  mobileMenuBg: string;
  mobileMenuBorder: string;
}

const sectionThemes: Record<string, NavbarThemeConfig> = {
  hero: {
    headerBgScrolled: 'bg-[#0284c7]/85 backdrop-blur-xl',
    headerBorderScrolled: 'border-[#38bdf8]/40',
    headerShadowScrolled: 'shadow-[0_8px_32px_rgba(2,132,199,0.35)]',
    themeMode: 'dark',
    navContainerBg: 'bg-white/15 hover:bg-white/20',
    navContainerBorder: 'border-white/30',
    navContainerShadow: 'shadow-[0_4px_24px_rgba(2,132,199,0.2)]',
    activePillBg: 'bg-white/25',
    activePillBorder: 'border-white/40',
    activePillShadow: 'shadow-inner',
    activePillDot: 'bg-[#fff9d4] shadow-[0_0_6px_#fff9d4]',
    activeTextColor: 'text-white font-black',
    inactiveTextColor: 'text-white/80',
    inactiveHoverText: 'hover:text-white',
    emailBtnBg: 'bg-white/15 hover:bg-white/25',
    emailBtnBorder: 'border-white/30 hover:border-[#fff9d4]',
    emailBtnText: 'text-white',
    emailIconColor: 'text-[#fff9d4]',
    mobileMenuBg: 'bg-[#0284c7]/95 backdrop-blur-2xl',
    mobileMenuBorder: 'border-[#38bdf8]/40'
  },
  about: {
    headerBgScrolled: 'bg-[#fdf6db]/92 backdrop-blur-xl',
    headerBorderScrolled: 'border-[#0f172a]/20',
    headerShadowScrolled: 'shadow-[0_8px_24px_rgba(15,23,42,0.08)]',
    themeMode: 'light',
    navContainerBg: 'bg-[#0f172a]/8 hover:bg-[#0f172a]/12',
    navContainerBorder: 'border-[#0f172a]/25',
    navContainerShadow: 'shadow-[0_4px_16px_rgba(15,23,42,0.06)]',
    activePillBg: 'bg-[#fde047]',
    activePillBorder: 'border-2 border-[#0f172a]',
    activePillShadow: 'shadow-[2px_2px_0px_#0f172a]',
    activePillDot: 'bg-[#0f172a] shadow-none',
    activeTextColor: 'text-[#0f172a] font-black',
    inactiveTextColor: 'text-[#475569]',
    inactiveHoverText: 'hover:text-[#0f172a]',
    emailBtnBg: 'bg-[#fffdf5] hover:bg-[#fdf6db]',
    emailBtnBorder: 'border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]',
    emailBtnText: 'text-[#0f172a] font-bold',
    emailIconColor: 'text-[#0284c7]',
    mobileMenuBg: 'bg-[#fdf6db]/95 backdrop-blur-2xl',
    mobileMenuBorder: 'border-[#0f172a]/25'
  },
  projects: {
    headerBgScrolled: 'bg-[#034d70]/92 backdrop-blur-xl',
    headerBorderScrolled: 'border-[#38bdf8]/40',
    headerShadowScrolled: 'shadow-[0_8px_32px_rgba(3,77,112,0.45)]',
    themeMode: 'dark',
    navContainerBg: 'bg-white/15 hover:bg-white/20',
    navContainerBorder: 'border-white/30',
    navContainerShadow: 'shadow-[0_4px_24px_rgba(2,132,199,0.25)]',
    activePillBg: 'bg-[#0284c7]',
    activePillBorder: 'border-2 border-[#38bdf8]/80',
    activePillShadow: 'shadow-[0_0_12px_rgba(56,189,248,0.4)]',
    activePillDot: 'bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]',
    activeTextColor: 'text-white font-black',
    inactiveTextColor: 'text-sky-100/80',
    inactiveHoverText: 'hover:text-white',
    emailBtnBg: 'bg-white/15 hover:bg-white/25',
    emailBtnBorder: 'border-white/30 hover:border-[#38bdf8]',
    emailBtnText: 'text-white',
    emailIconColor: 'text-[#38bdf8]',
    mobileMenuBg: 'bg-[#034d70]/95 backdrop-blur-2xl',
    mobileMenuBorder: 'border-[#38bdf8]/40'
  },
  stack: {
    headerBgScrolled: 'bg-[#fdf6db]/92 backdrop-blur-xl',
    headerBorderScrolled: 'border-[#0f172a]/20',
    headerShadowScrolled: 'shadow-[0_8px_24px_rgba(15,23,42,0.08)]',
    themeMode: 'light',
    navContainerBg: 'bg-[#0f172a]/8 hover:bg-[#0f172a]/12',
    navContainerBorder: 'border-[#0f172a]/25',
    navContainerShadow: 'shadow-[0_4px_16px_rgba(15,23,42,0.06)]',
    activePillBg: 'bg-[#fde047]',
    activePillBorder: 'border-2 border-[#0f172a]',
    activePillShadow: 'shadow-[2px_2px_0px_#0f172a]',
    activePillDot: 'bg-[#0f172a] shadow-none',
    activeTextColor: 'text-[#0f172a] font-black',
    inactiveTextColor: 'text-[#475569]',
    inactiveHoverText: 'hover:text-[#0f172a]',
    emailBtnBg: 'bg-[#fffdf5] hover:bg-[#fdf6db]',
    emailBtnBorder: 'border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]',
    emailBtnText: 'text-[#0f172a] font-bold',
    emailIconColor: 'text-[#0284c7]',
    mobileMenuBg: 'bg-[#fdf6db]/95 backdrop-blur-2xl',
    mobileMenuBorder: 'border-[#0f172a]/25'
  },
  activity: {
    headerBgScrolled: 'bg-[#edd69a]/92 backdrop-blur-xl',
    headerBorderScrolled: 'border-[#0f172a]/20',
    headerShadowScrolled: 'shadow-[0_8px_24px_rgba(15,23,42,0.1)]',
    themeMode: 'light',
    navContainerBg: 'bg-[#0f172a]/8 hover:bg-[#0f172a]/12',
    navContainerBorder: 'border-[#0f172a]/25',
    navContainerShadow: 'shadow-[0_4px_16px_rgba(15,23,42,0.08)]',
    activePillBg: 'bg-[#fde047]',
    activePillBorder: 'border-2 border-[#0f172a]',
    activePillShadow: 'shadow-[2px_2px_0px_#0f172a]',
    activePillDot: 'bg-[#0f172a] shadow-none',
    activeTextColor: 'text-[#0f172a] font-black',
    inactiveTextColor: 'text-[#475569]',
    inactiveHoverText: 'hover:text-[#0f172a]',
    emailBtnBg: 'bg-[#fffdf5] hover:bg-[#fef9c3]',
    emailBtnBorder: 'border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a]',
    emailBtnText: 'text-[#0f172a] font-bold',
    emailIconColor: 'text-[#15803d]',
    mobileMenuBg: 'bg-[#edd69a]/95 backdrop-blur-2xl',
    mobileMenuBorder: 'border-[#0f172a]/25'
  },
  journey: {
    headerBgScrolled: 'bg-[#0284c7]/90 backdrop-blur-xl',
    headerBorderScrolled: 'border-[#38bdf8]/45',
    headerShadowScrolled: 'shadow-[0_8px_32px_rgba(2,132,199,0.4)]',
    themeMode: 'dark',
    navContainerBg: 'bg-white/15 hover:bg-white/20',
    navContainerBorder: 'border-white/30',
    navContainerShadow: 'shadow-[0_4px_24px_rgba(2,132,199,0.25)]',
    activePillBg: 'bg-[#fde047]',
    activePillBorder: 'border-2 border-[#0f172a]',
    activePillShadow: 'shadow-[2px_2px_0px_#0f172a]',
    activePillDot: 'bg-[#0f172a] shadow-none',
    activeTextColor: 'text-[#0f172a] font-black',
    inactiveTextColor: 'text-white/85',
    inactiveHoverText: 'hover:text-white',
    emailBtnBg: 'bg-white/15 hover:bg-white/25',
    emailBtnBorder: 'border-white/30 hover:border-[#fff9d4]',
    emailBtnText: 'text-white',
    emailIconColor: 'text-[#fff9d4]',
    mobileMenuBg: 'bg-[#0284c7]/95 backdrop-blur-2xl',
    mobileMenuBorder: 'border-[#38bdf8]/45'
  },
  contact: {
    headerBgScrolled: 'bg-[#024a68]/92 backdrop-blur-xl',
    headerBorderScrolled: 'border-[#38bdf8]/40',
    headerShadowScrolled: 'shadow-[0_8px_32px_rgba(2,74,104,0.5)]',
    themeMode: 'dark',
    navContainerBg: 'bg-white/15 hover:bg-white/20',
    navContainerBorder: 'border-white/30',
    navContainerShadow: 'shadow-[0_4px_24px_rgba(2,132,199,0.25)]',
    activePillBg: 'bg-[#fde047]',
    activePillBorder: 'border-2 border-[#0f172a]',
    activePillShadow: 'shadow-[2px_2px_0px_#0f172a]',
    activePillDot: 'bg-[#0f172a] shadow-none',
    activeTextColor: 'text-[#0f172a] font-black',
    inactiveTextColor: 'text-white/85',
    inactiveHoverText: 'hover:text-white',
    emailBtnBg: 'bg-white/15 hover:bg-white/25',
    emailBtnBorder: 'border-white/30 hover:border-[#fde047]',
    emailBtnText: 'text-white',
    emailIconColor: 'text-[#fde047]',
    mobileMenuBg: 'bg-[#024a68]/95 backdrop-blur-2xl',
    mobileMenuBorder: 'border-[#38bdf8]/40'
  }
};

const navItems = [
  { label: 'Profil', id: 'about' },
  { label: 'Studi Kasus', id: 'projects' },
  { label: 'Tech Stack', id: 'stack' },
    { label: 'Milestone', id: 'journey' },
  { label: 'Kontak', id: 'contact' },
];

export const NavigationBar: React.FC = () => {
  const { isScrolled, scrollToSection } = useScrollPosition();
  const { copied, copy } = useClipboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const isManualClickRef = useRef<boolean>(false);
  const manualClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isManualClickRef.current) return;
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;

        const focalPoint = window.scrollY + window.innerHeight * 0.42;
        const isAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

        if (isAtBottom) {
          setActiveSection((prev) => (prev !== 'contact' ? 'contact' : prev));
          return;
        }

        // Check if user is in hero section before reaching Profile
        const aboutEl = document.getElementById('about');
        if (aboutEl && (window.scrollY + window.innerHeight * 0.35) < aboutEl.offsetTop) {
          setActiveSection((prev) => (prev !== 'hero' ? 'hero' : prev));
          return;
        }

        for (let i = navItems.length - 1; i >= 0; i--) {
          const item = navItems[i];
          const el = document.getElementById(item.id);
          if (el) {
            const top = el.offsetTop;
            if (focalPoint >= top) {
              setActiveSection((prev) => (prev !== item.id ? item.id : prev));
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const unsubscribeLenis = onLenisScroll(handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribeLenis();
    };
  }, []);

  const handleNavClick = (id: string) => {
    isManualClickRef.current = true;
    setActiveSection(id);
    scrollToSection(id);
    setMobileMenuOpen(false);

    if (manualClickTimerRef.current) clearTimeout(manualClickTimerRef.current);
    manualClickTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 700);
  };

  const currentTheme = sectionThemes[activeSection] || sectionThemes.hero;
  const brandTheme = !isScrolled ? 'dark' : currentTheme.themeMode;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transform-gpu will-change-[background-color,border-color] transition-[background-color,border-color,box-shadow,padding] duration-200 ease-out ${
        isScrolled
          ? `${currentTheme.headerBgScrolled} border-b ${currentTheme.headerBorderScrolled} py-3 ${currentTheme.headerShadowScrolled}`
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <BrandLogo size="md" withText theme={brandTheme} />
        </button>

        <nav
          className={`hidden md:flex items-center relative p-1.5 rounded-full backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 ease-out ${currentTheme.navContainerBg} border ${currentTheme.navContainerBorder} ${currentTheme.navContainerShadow}`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer group select-none"
              >
                {isActive && activeSection !== 'hero' && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className={`absolute inset-0 rounded-full pointer-events-none ${currentTheme.activePillBg} ${currentTheme.activePillBorder} ${currentTheme.activePillShadow}`}
                    transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.5 }}
                  >
                    {currentTheme.activePillDot && (
                      <span
                        className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${currentTheme.activePillDot}`}
                      />
                    )}
                  </motion.div>
                )}

                <span
                  className={`relative z-10 block transition-colors duration-300 ${
                    isActive
                      ? currentTheme.activeTextColor
                      : `${currentTheme.inactiveTextColor} ${currentTheme.inactiveHoverText}`
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono transition-all duration-300 backdrop-blur-xl cursor-pointer group active:scale-95 ${currentTheme.emailBtnBg} ${currentTheme.emailBtnBorder} ${currentTheme.emailBtnText}`}
            title="Salin email"
          >
            {copied ? (
              <>
                <Check className={`w-3.5 h-3.5 ${currentTheme.emailIconColor}`} />
                <span className={`font-bold ${currentTheme.emailBtnText}`}>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className={`w-3.5 h-3.5 ${currentTheme.emailIconColor} group-hover:rotate-6 transition-transform`} />
                <span className="font-medium">{profileData.contact.email}</span>
              </>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className={`p-2.5 rounded-xl border transition-all duration-300 backdrop-blur-md shadow-sm active:scale-95 ${currentTheme.emailBtnBg} ${currentTheme.emailBtnBorder} ${currentTheme.emailBtnText}`}
            aria-label="Salin email"
          >
            {copied ? (
              <Check className={`w-4 h-4 ${currentTheme.emailIconColor}`} />
            ) : (
              <Copy className={`w-4 h-4 ${currentTheme.emailIconColor}`} />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border transition-all duration-300 backdrop-blur-md shadow-sm active:scale-95 ${currentTheme.emailBtnBg} ${currentTheme.emailBtnBorder} ${currentTheme.emailBtnText}`}
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${currentTheme.mobileMenuBg} border-b ${currentTheme.mobileMenuBorder} px-6 py-4 mt-2 shadow-xl transition-colors duration-300`}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? `${currentTheme.activePillBg} ${currentTheme.activePillBorder} ${currentTheme.activeTextColor}`
                        : `${currentTheme.inactiveTextColor} hover:${currentTheme.activeTextColor}`
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="pt-3 mt-3 border-t border-white/20 flex justify-center"><BeachAtmosphereControls /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
