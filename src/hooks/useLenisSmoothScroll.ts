import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let globalLenisInstance: Lenis | null = null;
const scrollListeners = new Set<(lenis: Lenis) => void>();

export function getLenisInstance(): Lenis | null {
  return globalLenisInstance;
}

export function stopLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.stop();
  }
}

export function startLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.start();
  }
}

export function onLenisScroll(callback: (lenis: Lenis) => void): () => void {
  scrollListeners.add(callback);
  if (globalLenisInstance) {
    globalLenisInstance.on('scroll', callback);
  }
  return () => {
    scrollListeners.delete(callback);
    globalLenisInstance?.off('scroll', callback);
  };
}

export function scrollToTarget(target: string | number | HTMLElement, offset: number = -80): void {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, { offset, duration: 0.7 });
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }
}

export function useLenisSmoothScroll(): void {
  useEffect(() => {
    // Check if device is primarily touch/mobile
    const isTouchDevice = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768
    );

    // Responsive, high-performance lerp
    const lenis = new Lenis({
      lerp: 0.14,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      smoothWheel: !isTouchDevice,
      syncTouch: false,
      autoRaf: true,
      anchors: true
    });

    globalLenisInstance = lenis;

    // Attach any listeners registered before initialization
    scrollListeners.forEach((listener) => {
      lenis.on('scroll', listener);
    });

    return () => {
      scrollListeners.forEach((listener) => {
        lenis.off('scroll', listener);
      });
      lenis.destroy();
      globalLenisInstance = null;
    };
  }, []);
}
