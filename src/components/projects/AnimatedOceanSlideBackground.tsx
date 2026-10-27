import React, { useEffect, useRef } from 'react';
import {
  renderWaterBody,
  renderSandLayers,
  renderWaterWaves,
  renderBubbles
} from './oceanEnvironmentRenderers';
import { renderCreaturesByDepth } from './oceanCreatureRenderers';

interface AnimatedOceanSlideBackgroundProps {
  depthLevel: 1 | 2 | 3 | 4 | 5;
}

export const AnimatedOceanSlideBackground: React.FC<AnimatedOceanSlideBackgroundProps> = ({
  depthLevel
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let time = 0;
    let isVisible = false;
    let isRunning = true;
    let currentWidth = 0;
    let currentHeight = 0;

    const handleResize = () => {
      if (!canvas) return;
      currentWidth = window.innerWidth;
      currentHeight = window.innerHeight;
      canvas.width = currentWidth;
      canvas.height = currentHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!isRunning || !isVisible || !ctx || !canvas || currentWidth === 0) {
        animId = null;
        return;
      }

      const width = currentWidth;
      const height = currentHeight;

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // water background
      renderWaterBody(ctx, width, height, depthLevel);

      // sand layers
      const { waterMinY, waterMaxY } = renderSandLayers(ctx, width, height, depthLevel, time);

      // surface waves
      renderWaterWaves(ctx, width, waterMinY, waterMaxY, time);

      // marine creatures by depth
      renderCreaturesByDepth(ctx, depthLevel, width, height, time, waterMinY, waterMaxY);

      // bubbles
      renderBubbles(ctx, width, waterMinY, waterMaxY, time);

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId && isRunning) {
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.02 }
    );

    observer.observe(canvas);

    return () => {
      isRunning = false;
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [depthLevel]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
