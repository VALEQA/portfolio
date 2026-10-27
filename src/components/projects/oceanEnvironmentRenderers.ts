export interface WaterBounds {
  waterMinY: number;
  waterMaxY: number;
}

export function renderWaterBody(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4 | 5
): void {
  let waterTop: string;
  let waterMid: string;
  let waterBottom: string;

  if (depthLevel === 1) {
    // Flagship 1: Surface coastal water (sunny cyan/blue)
    waterTop = '#38bdf8';
    waterMid = '#0284c7';
    waterBottom = '#0369a1';
  } else if (depthLevel === 2) {
    // Flagship 2: Clear tropical mid-depth (medium blue)
    waterTop = '#0284c7';
    waterMid = '#0369a1';
    waterBottom = '#075985';
  } else if (depthLevel === 3) {
    // Flagship 3: Deeper oceanic layer (dark blue)
    waterTop = '#0369a1';
    waterMid = '#075985';
    waterBottom = '#0c4a6e';
  } else if (depthLevel === 4) {
    // Flagship 4: Deep twilight sea (darkest flagship, but distinctly blue, not black)
    waterTop = '#075985';
    waterMid = '#0c4a6e';
    waterBottom = '#082f49';
  } else {
    // Depth 5: All projects dock overview - abyssal floor (darkest of all)
    waterTop = '#082f49';
    waterMid = '#03192e';
    waterBottom = '#010a14';
  }

  const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
  waterGrad.addColorStop(0, waterTop);
  waterGrad.addColorStop(0.55, waterMid);
  waterGrad.addColorStop(1, waterBottom);
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, 0, width, height);
}

export function renderSandLayers(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  depthLevel: 1 | 2 | 3 | 4 | 5,
  time: number
): WaterBounds {
  let waterMinY = 0;
  let waterMaxY = height;

  if (depthLevel === 1) {
    const topSandHeight = height * 0.20;
    waterMinY = topSandHeight;

    ctx.save();
    const topSandGrad = ctx.createLinearGradient(0, 0, 0, topSandHeight);
    topSandGrad.addColorStop(0, '#f8ecc8');
    topSandGrad.addColorStop(0.25, '#f5e4ba');
    topSandGrad.addColorStop(0.55, '#ebd7a8');
    topSandGrad.addColorStop(0.80, '#e2cb96');
    topSandGrad.addColorStop(1.0, '#dfcca8');
    ctx.fillStyle = topSandGrad;

    // coastal shoreline fill
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, topSandHeight);

    for (let x = width; x >= 0; x -= 6) {
      const sy =
        topSandHeight +
        Math.sin(x * 0.005 + time * 0.8) * 8 +
        Math.cos(x * 0.009 - time * 0.4) * 4;
      ctx.lineTo(x, sy);
    }

    ctx.closePath();
    ctx.fill();

    // shoreline foam edge (dual-layer soft translucent wave)
    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        topSandHeight +
        Math.sin(x * 0.005 + time * 0.8) * 8 +
        Math.cos(x * 0.009 - time * 0.4) * 4;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        topSandHeight +
        Math.sin(x * 0.005 + time * 0.8) * 8 +
        Math.cos(x * 0.009 - time * 0.4) * 4;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
  } else if (depthLevel === 5) {
    const bottomSandY = height * 0.82;
    waterMaxY = bottomSandY;

    ctx.save();
    const bottomSandGrad = ctx.createLinearGradient(0, bottomSandY, 0, height);
    bottomSandGrad.addColorStop(0, '#ebdcae');
    bottomSandGrad.addColorStop(0.25, '#f2e4b8');
    bottomSandGrad.addColorStop(0.55, '#f7ebc2');
    bottomSandGrad.addColorStop(0.82, '#fbf2d0');
    bottomSandGrad.addColorStop(1.0, '#fdf6db');
    ctx.fillStyle = bottomSandGrad;

    // seabed sand fill
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, bottomSandY);

    for (let x = 0; x <= width; x += 6) {
      const sy =
        bottomSandY +
        Math.sin(x * 0.004 + time * 0.6) * 10 +
        Math.cos(x * 0.008 - time * 0.3) * 5;
      ctx.lineTo(x, sy);
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // seabed foam edge (dual-layer soft translucent wave)
    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        bottomSandY +
        Math.sin(x * 0.004 + time * 0.6) * 10 +
        Math.cos(x * 0.008 - time * 0.3) * 5;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.beginPath();
    for (let x = 0; x <= width; x += 6) {
      const sy =
        bottomSandY +
        Math.sin(x * 0.004 + time * 0.6) * 10 +
        Math.cos(x * 0.008 - time * 0.3) * 5;
      if (x === 0) ctx.moveTo(x, sy);
      else ctx.lineTo(x, sy);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
  }

  return { waterMinY, waterMaxY };
}

export function renderWaterWaves(
  ctx: CanvasRenderingContext2D,
  width: number,
  waterMinY: number,
  waterMaxY: number,
  time: number
): void {
  const wave1Y = waterMinY + (waterMaxY - waterMinY) * 0.35;
  ctx.save();
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const cy =
      wave1Y +
      Math.sin(x * 0.004 + time * 1.1) * 14 +
      Math.cos(x * 0.008 - time * 0.5) * 6;
    if (x === 0) ctx.moveTo(x, cy);
    else ctx.lineTo(x, cy);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 2.8;
  ctx.stroke();
  ctx.restore();

  const wave2Y = waterMinY + (waterMaxY - waterMinY) * 0.72;
  ctx.save();
  ctx.beginPath();
  for (let x = 0; x <= width; x += 6) {
    const cy =
      wave2Y +
      Math.sin(x * 0.005 + time * 0.9 + 2) * 16 +
      Math.sin(x * 0.01 - time * 0.4) * 8;
    if (x === 0) ctx.moveTo(x, cy);
    else ctx.lineTo(x, cy);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 2.4;
  ctx.stroke();
  ctx.restore();
}

export function renderBubbles(
  ctx: CanvasRenderingContext2D,
  width: number,
  waterMinY: number,
  waterMaxY: number,
  time: number
): void {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;

  const waterHeight = waterMaxY - waterMinY;
  for (let i = 0; i < 14; i++) {
    const speed = 0.5 + (i % 4) * 0.25;
    const bx = ((width * 0.075 * i + Math.sin(time * 0.8 + i) * 25 + width) % width);
    const by = waterMinY + (waterHeight - (((time * 50 * speed + i * 40) % waterHeight)));
    const r = 3.5 + (i % 3) * 2;

    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // bubble highlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(bx - r * 0.35, by - r * 0.35, r * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
