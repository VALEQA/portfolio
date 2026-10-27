import { useState, useEffect } from 'react';
import { scrollToTarget } from './useLenisSmoothScroll';

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollY(currentScrollY);
          const nextIsScrolled = currentScrollY > 40;
          setIsScrolled((prev) => (prev !== nextIsScrolled ? nextIsScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    scrollToTarget(`#${id}`, -80);
  };

  return { scrollY, isScrolled, scrollToSection };
}
