import { useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { DuckExpression } from './SwimmingDuck';

export interface HeroPhysicsStageHandle {
  handleDuckDrop: (clientX: number, clientY: number, velocity: number) => void;
  handleDuckSwim: (duckX: number, duckY: number) => void;
  duckExpression: DuckExpression;
}

interface LetterData {
  id: string;
  char: string;
  wordIdx: number;
  letterIdx: number;
  posX: number;
  posY: number;
  wobble: number;
}

// Fungsi helper untuk menghasilkan data huruf nama Anda secara otomatis
export const createLettersFromWords = (words: string[]): Omit<LetterData, 'posX' | 'posY' | 'wobble'>[] => {
  const result: Omit<LetterData, 'posX' | 'posY' | 'wobble'>[] = [];
  words.forEach((wordStr, wordIdx) => {
    wordStr.trim().toUpperCase().split('').forEach((char, letterIdx) => {
      result.push({
        id: `w${wordIdx}-${letterIdx}-${char.toLowerCase()}`,
        char,
        wordIdx,
        letterIdx
      });
    });
  });
  return result;
};

// =======================================================================
// NAMA ANDA DI ATAS OMBAK PANTAI
// Anda bisa mengubah array kata di bawah ini kapan saja:
// Contoh: ['AHMAD', 'FAISHAL', 'BAIHAQI'] atau ['FAISHAL', 'BAIHAQI']
// =======================================================================
const INITIAL_LETTERS: Omit<LetterData, 'posX' | 'posY' | 'wobble'>[] = createLettersFromWords([
  'FAISHAL',
  'BAIHAQI'
]);

interface HeroPhysicsStageProps {
  onSplash: (clientX: number, clientY: number, intensity: number) => void;
  onRipple: (clientX: number, clientY: number, size?: number) => void;
  onDuckExpressionChange?: (expression: DuckExpression) => void;
}

export const HeroPhysicsStage = forwardRef<HeroPhysicsStageHandle, HeroPhysicsStageProps>(
  ({ onSplash, onRipple, onDuckExpressionChange }, ref) => {
    const [letters, setLetters] = useState<LetterData[]>(() =>
      INITIAL_LETTERS.map((item) => ({
        ...item,
        posX: 0,
        posY: 0,
        wobble: 0
      }))
    );
    const [activeGrabbedId, setActiveGrabbedId] = useState<string | null>(null);
    const [duckExpression, setDuckExpression] = useState<DuckExpression>('normal');
    const duckImpactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastRippleTimeRef = useRef<number>(0);
    const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastLetterHitTimeRef = useRef<Record<string, number>>({});

    const updateDuckExpression = useCallback((expr: DuckExpression) => {
      setDuckExpression(expr);
      if (onDuckExpressionChange) {
        onDuckExpressionChange(expr);
      }
    }, [onDuckExpressionChange]);

    const resolveCollisions = useCallback(
      (sourceId: string, centerX: number, centerY: number, intensity: number = 1): boolean => {
        let didHitAny = false;
        const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
        const minThreshold = isMobile ? 65 : 130;
        const maxStageX = typeof window !== 'undefined' ? Math.max(160, window.innerWidth * 0.44) : 400;
        const maxStageY = typeof window !== 'undefined' ? Math.max(140, window.innerHeight * 0.32) : 220;

        setLetters((prev) => {
          return prev.map((other) => {
            if (other.id === sourceId) return other;

            const otherEl = document.getElementById(`letter-${other.id}`);
            if (!otherEl) return other;

            const otherRect = otherEl.getBoundingClientRect();
            const otherCenterX = otherRect.left + otherRect.width / 2;
            const otherCenterY = otherRect.top + otherRect.height / 2;

            let dx = otherCenterX - centerX;
            let dy = otherCenterY - centerY;
            let dist = Math.sqrt(dx ** 2 + dy ** 2);

            if (dist < 1) {
              dx = (Math.random() - 0.5) * 50 || 30;
              dy = (Math.random() - 0.5) * 50 || 30;
              dist = Math.sqrt(dx ** 2 + dy ** 2);
            }

            if (dist < minThreshold) {
              didHitAny = true;
              const overlap = (minThreshold - dist) / minThreshold;
              const force = overlap * (isMobile ? 35 : 70) * Math.max(0.8, intensity);

              const moveX = (dx / dist) * force;
              const moveY = (dy / dist) * force;
              const wobbleAmount = (Math.random() - 0.5) * 16 * overlap;

              const now = Date.now();
              if (now - (lastLetterHitTimeRef.current[other.id] || 0) > 180) {
                lastLetterHitTimeRef.current[other.id] = now;
                onRipple(otherCenterX, otherCenterY, 50);
              }

              return {
                ...other,
                posX: Math.max(-maxStageX, Math.min(maxStageX, other.posX + moveX)),
                posY: Math.max(-maxStageY, Math.min(maxStageY, other.posY + moveY)),
                wobble: other.wobble + wobbleAmount
              };
            }

            return other;
          });
        });

        return didHitAny;
      },
      [onRipple]
    );

    const handleLetterDragStart = (id: string) => {
      setActiveGrabbedId(id);
      updateDuckExpression('lifted');
    };

    const handleLetterDragEnd = (id: string, _event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setActiveGrabbedId(null);
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
      const maxStageX = typeof window !== 'undefined' ? Math.max(160, window.innerWidth * 0.44) : 400;
      const maxStageY = typeof window !== 'undefined' ? Math.max(140, window.innerHeight * 0.32) : 220;

      const element = document.getElementById(`letter-${id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const speed = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);
        const intensity = Math.min(Math.max(speed / 400, 0.8), 2.5);

        onSplash(centerX, centerY, intensity);
        resolveCollisions(id, centerX, centerY, intensity);
      }

      setLetters((prev) =>
        prev.map((l) => {
          if (l.id === id) {
            const inertiaX = info.velocity.x * (isMobile ? 0.04 : 0.06);
            const inertiaY = info.velocity.y * (isMobile ? 0.04 : 0.06);
            const nextX = l.posX + info.offset.x + inertiaX;
            const nextY = l.posY + info.offset.y + inertiaY;

            return {
              ...l,
              posX: Math.max(-maxStageX, Math.min(maxStageX, nextX)),
              posY: Math.max(-maxStageY, Math.min(maxStageY, nextY)),
              wobble: (info.velocity.x / 40) % 20
            };
          }
          return l;
        })
      );

      if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
      returnTimeoutRef.current = setTimeout(() => {
        setLetters((prev) =>
          prev.map((l) => ({
            ...l,
            posX: l.posX * 0.35,
            posY: l.posY * 0.35,
            wobble: 0
          }))
        );
      }, 3500);

      updateDuckExpression('happy');
      setTimeout(() => {
        updateDuckExpression('normal');
      }, 1500);
    };

    const handleLetterDoubleClick = (id: string) => {
      const element = document.getElementById(`letter-${id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        onSplash(rect.left + rect.width / 2, rect.top + rect.height / 2, 2.0);
      }

      setLetters((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
              ...l,
              posY: l.posY - 45,
              wobble: l.wobble + (Math.random() > 0.5 ? 24 : -24)
            }
            : l
        )
      );

      updateDuckExpression('impact');
      setTimeout(() => {
        updateDuckExpression('normal');
      }, 1200);
    };

    const handleDuckDrop = (clientX: number, clientY: number, velocity: number) => {
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
      const hitRadius = isMobile ? 70 : 130;
      const splashIntensity = Math.min(Math.max(velocity / 300, 1.0), 3.0);
      onSplash(clientX, clientY, splashIntensity);

      let didHitLetter = false;

      setLetters((prev) => {
        return prev.map((letter) => {
          const element = document.getElementById(`letter-${letter.id}`);
          if (!element) return letter;

          const rect = element.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2;
          const letterCenterY = rect.top + rect.height / 2;

          const dx = letterCenterX - clientX;
          const dy = letterCenterY - clientY;
          const distance = Math.sqrt(dx ** 2 + dy ** 2);

          if (distance < hitRadius) {
            didHitLetter = true;
            const factor = (hitRadius - distance) / hitRadius;
            const pushMagnitude = factor * splashIntensity * (isMobile ? 24 : 45);

            const pushX = distance > 0 ? (dx / distance) * pushMagnitude : 0;
            const pushY = distance > 0 ? (dy / distance) * pushMagnitude : pushMagnitude;
            const wobble = (Math.random() - 0.5) * 22 * factor;

            return {
              ...letter,
              posX: letter.posX + pushX,
              posY: letter.posY + pushY,
              wobble: letter.wobble + wobble
            };
          }

          return letter;
        });
      });

      if (didHitLetter) {
        updateDuckExpression('impact');
        if (duckImpactTimeoutRef.current) clearTimeout(duckImpactTimeoutRef.current);
        duckImpactTimeoutRef.current = setTimeout(() => {
          updateDuckExpression('normal');
        }, 1400);

        if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
        returnTimeoutRef.current = setTimeout(() => {
          setLetters((prev) => prev.map((l) => ({ ...l, wobble: 0 })));
        }, 1200);
      }
    };

    const handleDuckSwim = (duckX: number, duckY: number) => {
      const now = Date.now();
      if (now - lastRippleTimeRef.current > 140) {
        lastRippleTimeRef.current = now;
        onRipple(duckX, duckY, 40);
      }

      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
      const swimRadius = isMobile ? 48 : 85;
      const maxStageX = typeof window !== 'undefined' ? Math.max(160, window.innerWidth * 0.44) : 400;
      const maxStageY = typeof window !== 'undefined' ? Math.max(140, window.innerHeight * 0.32) : 220;

      let didHitLetter = false;

      setLetters((prev) => {
        let moved = false;
        const updated = prev.map((letter) => {
          const element = document.getElementById(`letter-${letter.id}`);
          if (!element) return letter;

          const rect = element.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2;
          const letterCenterY = rect.top + rect.height / 2;

          const dx = letterCenterX - duckX;
          const dy = letterCenterY - duckY;
          const dist = Math.sqrt(dx ** 2 + dy ** 2);

          if (dist < swimRadius) {
            moved = true;
            didHitLetter = true;

            const pushY = dy >= 0 ? (isMobile ? 14 : 26) : (isMobile ? -14 : -26);
            const pushX = dx >= 0 ? (isMobile ? 12 : 22) : (isMobile ? -8 : -14);
            const wobble = dy >= 0 ? 9 : -9;

            onRipple(letterCenterX, letterCenterY, 55);

            return {
              ...letter,
              posX: Math.max(-maxStageX, Math.min(maxStageX, letter.posX + pushX)),
              posY: Math.max(-maxStageY, Math.min(maxStageY, letter.posY + pushY)),
              wobble
            };
          }

          return letter;
        });

        return moved ? updated : prev;
      });

      if (didHitLetter) {
        updateDuckExpression('impact');
        if (duckImpactTimeoutRef.current) clearTimeout(duckImpactTimeoutRef.current);
        duckImpactTimeoutRef.current = setTimeout(() => {
          updateDuckExpression('normal');
        }, 900);

        if (returnTimeoutRef.current) clearTimeout(returnTimeoutRef.current);
        returnTimeoutRef.current = setTimeout(() => {
          setLetters((prev) => prev.map((l) => ({ ...l, wobble: 0 })));
        }, 800);
      }
    };

    useImperativeHandle(ref, () => ({
      handleDuckDrop,
      handleDuckSwim,
      resetLetters: () => {
        setLetters(INITIAL_LETTERS.map((item) => ({ ...item, posX: 0, posY: 0, wobble: 0 })));
      },
      duckExpression
    }));

    // Kelompokkan kata-kata berdasarkan wordIdx
    const wordIndices = Array.from(new Set(letters.map((l) => l.wordIdx))).sort((a, b) => a - b);

    const renderLetter = (letter: LetterData) => {
      const isGrabbed = activeGrabbedId === letter.id;
      const phaseDelay = (letter.wordIdx * 7 + letter.letterIdx) * 0.18;

      return (
        <motion.div
          key={letter.id}
          id={`letter-${letter.id}`}
          drag
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => handleLetterDragStart(letter.id)}
          onDragEnd={(e, info) => handleLetterDragEnd(letter.id, e, info)}
          onDoubleClick={() => handleLetterDoubleClick(letter.id)}
          style={{ touchAction: 'none' }}
          animate={{
            x: letter.posX,
            y: letter.posY,
            rotate: isGrabbed ? (letter.letterIdx % 2 === 0 ? 5 : -5) : letter.wobble,
            scale: isGrabbed ? 1.2 : 1,
            zIndex: isGrabbed ? 60 : 20
          }}
          transition={{
            type: 'spring',
            stiffness: 180,
            damping: 18,
            mass: 0.8
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 1.22 }}
          className="relative inline-block cursor-grab active:cursor-grabbing select-none p-0.5 sm:p-1 mx-[1px] sm:mx-0.5 md:mx-1 pointer-events-auto"
        >
          <motion.div
            animate={
              isGrabbed
                ? { y: -16, rotate: 0 }
                : {
                  y: [0, -7, 0, 6, 0],
                  rotate: [0, -1.2, 0, 1.2, 0]
                }
            }
            transition={
              isGrabbed
                ? { type: 'spring', stiffness: 320, damping: 22 }
                : {
                  repeat: Infinity,
                  duration: 3.8,
                  delay: phaseDelay,
                  ease: 'easeInOut'
                }
            }
            className="relative"
          >
            <div className="absolute -bottom-4 left-1 right-1 h-4 bg-[#c4ad82]/40 rounded-full blur-[4px] transform scale-y-50" />
            <div className="absolute -bottom-3 left-2 right-2 h-3 bg-[#0284c7]/50 rounded-full blur-[3px]" />

            <span
              className="absolute top-1 sm:top-2 left-0.5 text-[24px] min-[390px]:text-[28px] sm:text-5xl md:text-6xl lg:text-[70px] font-black text-[#041628] tracking-tight select-none pointer-events-none"
              aria-hidden="true"
            >
              {letter.char}
            </span>
            <span
              className="absolute top-0.5 sm:top-1.5 left-0.5 text-[24px] min-[390px]:text-[28px] sm:text-5xl md:text-6xl lg:text-[70px] font-black text-[#0369a1] tracking-tight select-none pointer-events-none"
              aria-hidden="true"
            >
              {letter.char}
            </span>
            <span
              className="absolute top-0.5 left-0 text-[24px] min-[390px]:text-[28px] sm:text-5xl md:text-6xl lg:text-[70px] font-black text-[#0284c7] tracking-tight select-none pointer-events-none"
              aria-hidden="true"
            >
              {letter.char}
            </span>

            <span className="relative z-10 block text-[24px] min-[390px]:text-[28px] sm:text-5xl md:text-6xl lg:text-[70px] font-black text-white tracking-tight drop-shadow-[0_6px_16px_rgba(2,132,199,0.35)]">
              {letter.char}
            </span>
          </motion.div>
        </motion.div>
      );
    };

    return (
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        <div className="flex flex-row flex-nowrap items-center justify-center gap-x-2.5 sm:gap-x-6 md:gap-x-8 py-1 max-w-full px-1 overflow-visible">
          {wordIndices.map((wIdx) => (
            <div key={wIdx} className="flex flex-row flex-nowrap items-center justify-center shrink-0">
              {letters.filter((l) => l.wordIdx === wIdx).map(renderLetter)}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

HeroPhysicsStage.displayName = 'HeroPhysicsStage';
