import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useBeachAtmosphere } from '../../context/BeachAtmosphereContext';

export interface OceanHeroHandle {
  triggerSplash: (x: number, y: number, intensity?: number) => void;
  triggerRipple: (x: number, y: number, size?: number) => void;
}

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  phase: number;
  speed: number;
}

const atmospherePalettes = {
  day: {
    ocean: ['#02587a', '#0284c7', '#0ea5e9', '#38bdf8'],
    sunpatch: '#fff9d4',
    wave1: 'rgba(255, 255, 255, 0.45)',
    wave2: 'rgba(255, 255, 255, 0.65)',
    sand: '#fff9d4',
    shoreline: '#e5dbae',
    foam: 'rgba(255, 255, 255, 0.98)',
    bubble: 'rgba(255, 255, 255, 0.92)',
    ripplePrimary: 'rgba(255, 255, 255, ',
    rippleSecondary: 'rgba(103, 232, 249, ',
    splashShadow: '#67e8f9'
  },
  sunset: {
    ocean: ['#3b0764', '#7c2d12', '#c2410c', '#f59e0b'],
    sunpatch: '#fed7aa',
    wave1: 'rgba(254, 240, 138, 0.55)',
    wave2: 'rgba(255, 237, 213, 0.75)',
    sand: '#fed7aa',
    shoreline: '#fb923c',
    foam: 'rgba(254, 240, 138, 0.98)',
    bubble: 'rgba(255, 247, 237, 0.92)',
    ripplePrimary: 'rgba(254, 240, 138, ',
    rippleSecondary: 'rgba(249, 115, 22, ',
    splashShadow: '#f97316'
  },
  night: {
    ocean: ['#020617', '#090d16', '#0f172a', '#0369a1'],
    sunpatch: '#38bdf8',
    wave1: 'rgba(56, 189, 248, 0.45)',
    wave2: 'rgba(45, 212, 191, 0.70)',
    sand: '#94a3b8',
    shoreline: '#64748b',
    foam: 'rgba(56, 189, 248, 0.98)',
    bubble: 'rgba(45, 212, 191, 0.95)',
    ripplePrimary: 'rgba(56, 189, 248, ',
    rippleSecondary: 'rgba(45, 212, 191, ',
    splashShadow: '#2dd4bf'
  }
};

export const OceanHeroCanvas = forwardRef<OceanHeroHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const { atmosphere } = useBeachAtmosphere();
    const atmosphereRef = useRef(atmosphere);

    useEffect(() => {
      atmosphereRef.current = atmosphere;
    }, [atmosphere]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dropletsRef = useRef<SplashDroplet[]>([]);
    const ripplesRef = useRef<WaterRipple[]>([]);
    const starsRef = useRef<Star[]>([]);
    const animRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);

    const triggerSplash = (clientX: number, clientY: number, intensity: number = 1) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (y > rect.height * 0.70) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.min(260, rect.width * 0.45) * Math.max(0.7, intensity),
        alpha: 0.95,
        speed: 3.6 * Math.max(0.6, intensity)
      });

      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.min(180, rect.width * 0.3) * Math.max(0.7, intensity),
        alpha: 0.7,
        speed: 2.2 * Math.max(0.6, intensity)
      });

      const count = Math.floor(32 * Math.min(2.5, intensity));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = (3.2 + Math.random() * 6.5) * Math.min(2, intensity);
        dropletsRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed * 0.85,
          vy: -Math.abs(Math.sin(angle) * speed * 1.5) - 3.5 * intensity,
          radius: 1.8 + Math.random() * 3.0,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.02,
          gravity: 0.28
        });
      }
    };

    const triggerRipple = (clientX: number, clientY: number, size: number = 75) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (y > rect.height * 0.70) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: size,
        alpha: 0.55,
        speed: 1.9
      });
    };

    useImperativeHandle(ref, () => ({
      triggerSplash,
      triggerRipple
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let isRunning = true;
      let isVisible = true;
      let currentWidth = 0;
      let currentHeight = 0;

      const handleResize = () => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        currentWidth = rect.width;
        currentHeight = rect.height;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        // Generate stars for night sky
        starsRef.current = Array.from({ length: 48 }, () => ({
          x: Math.random() * currentWidth,
          y: Math.random() * (currentHeight * 0.45),
          radius: 0.8 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          speed: 0.8 + Math.random() * 2.2
        }));
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const render = () => {
        if (!isRunning || !isVisible || !canvas || currentWidth === 0) {
          animRef.current = null;
          return;
        }

        const width = currentWidth;
        const height = currentHeight;
        const mode = atmosphereRef.current || 'day';
        const palette = atmospherePalettes[mode] || atmospherePalettes.day;

        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.014;
        const t = timeRef.current;

        const shoreBaseY = height * 0.68;
        const tidalCycle = (Math.sin(t * 0.22) + 1) * 0.5;
        const tideAmplitude = 18;

        const getTideY = (x: number) => {
          return shoreBaseY + tidalCycle * tideAmplitude + Math.sin(x * 0.0045 + t * 0.5) * 8 + Math.cos(x * 0.009 - t * 0.3) * 4;
        };

        // Draw Sky Background / Ocean Gradient
        const oceanGrad = ctx.createLinearGradient(0, 0, 0, shoreBaseY);
        oceanGrad.addColorStop(0, palette.ocean[0]);
        oceanGrad.addColorStop(0.35, palette.ocean[1]);
        oceanGrad.addColorStop(0.70, palette.ocean[2]);
        oceanGrad.addColorStop(1, palette.ocean[3]);
        ctx.fillStyle = oceanGrad;
        ctx.fillRect(0, 0, width, height);

        // Sky atmosphere features
        if (mode === 'night') {
          // Night twinkling stars
          ctx.save();
          for (const star of starsRef.current) {
            const alpha = 0.35 + (Math.sin(t * star.speed + star.phase) + 1) * 0.32;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 4;
            ctx.fill();
          }
          ctx.restore();
        } else if (mode === 'sunset') {
          // Sunset golden sun disc & warm radial glow
          ctx.save();
          const sunX = width * 0.74;
          const sunY = height * 0.20;
          const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 160);
          sunGlow.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
          sunGlow.addColorStop(0.4, 'rgba(249, 115, 22, 0.40)');
          sunGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
          ctx.fillStyle = sunGlow;
          ctx.beginPath();
          ctx.arc(sunX, sunY, 160, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(sunX, sunY, 26, 0, Math.PI * 2);
          ctx.fillStyle = '#fffbeb';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 18;
          ctx.fill();
          ctx.restore();
        } else {
          // Day sun patches
          ctx.save();
          ctx.globalAlpha = 0.08;
          ctx.fillStyle = palette.sunpatch;
          for (let i = 0; i < 4; i++) {
            const patchX = (width * 0.25 * i + Math.sin(t * 0.15 + i) * 20) % width;
            const patchY = height * 0.32 + (i % 2) * (height * 0.12);
            ctx.beginPath();
            ctx.ellipse(patchX, patchY, 120, 45, Math.PI / 8, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // Ocean Wave Horizon 1
        const wave1Y = height * 0.26;
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const cy = wave1Y + Math.sin(x * 0.005 + t * 0.45) * 12 + Math.cos(x * 0.009 - t * 0.3) * 5;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = palette.wave1;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();

        // Ocean Wave Horizon 2
        const wave2Y = height * 0.45;
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const cy = wave2Y + Math.sin(x * 0.006 + t * 0.55 + 1.5) * 14 + Math.sin(x * 0.012 - t * 0.25) * 6;
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = palette.wave2;
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();

        // Sand Shore Area
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, getTideY(0));
        for (let x = 0; x <= width; x += 3) {
          ctx.lineTo(x, getTideY(x));
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = palette.sand;
        ctx.fill();
        ctx.restore();

        // Wet Sand Shoreline Shadow
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const cy = getTideY(x);
          if (x === 0) ctx.moveTo(x, cy + 2);
          else ctx.lineTo(x, cy + 2);
        }
        ctx.strokeStyle = palette.shoreline;
        ctx.lineWidth = 4.0;
        ctx.stroke();

        // Surf Foam Edge
        ctx.beginPath();
        for (let x = 0; x <= width; x += 3) {
          const cy = getTideY(x);
          if (x === 0) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = palette.foam;
        ctx.lineWidth = 3.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (mode === 'night') {
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
        }
        ctx.stroke();

        // Surf Bubbles
        for (let x = 6; x < width; x += 16) {
          const cy = getTideY(x);
          const bubbleSpread = (Math.sin(x * 0.06 + t * 0.8) + 1) * 3 + 1;
          ctx.beginPath();
          ctx.arc(x + Math.sin(t * 0.8 + x) * 2, cy + bubbleSpread, 1.6 + Math.sin(x * 0.3) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = palette.bubble;
          ctx.fill();
        }
        ctx.restore();

        // Animated Water Ripples
        for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
          const r = ripplesRef.current[i];
          r.radius += r.speed;
          r.alpha -= 0.012;

          if (r.alpha <= 0 || r.radius >= r.maxRadius) {
            ripplesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.42, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `${palette.ripplePrimary}${r.alpha * 0.95})`;
          ctx.lineWidth = 2.4;
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius * 0.68, r.radius * 0.28, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `${palette.rippleSecondary}${r.alpha * 0.75})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
          ctx.restore();
        }

        // Animated Splash Droplets
        for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
          const d = dropletsRef.current[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += d.gravity;
          d.alpha -= d.decay;

          if (d.alpha <= 0) {
            dropletsRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
          ctx.shadowColor = palette.splashShadow;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }

        animRef.current = requestAnimationFrame(render);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animRef.current && isRunning) {
              animRef.current = requestAnimationFrame(render);
            }
          });
        },
        { threshold: 0.05 }
      );

      observer.observe(canvas);

      return () => {
        isRunning = false;
        observer.disconnect();
        if (animRef.current) cancelAnimationFrame(animRef.current);
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (Math.random() < 0.16) {
        triggerRipple(e.clientX, e.clientY, 65);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      triggerSplash(e.clientX, e.clientY, 1.4);
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`w-full h-full block cursor-pointer select-none ${className}`}
      />
    );
  }
);

OceanHeroCanvas.displayName = 'OceanHeroCanvas';
