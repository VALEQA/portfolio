export function drawClownFish(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  size: number = 14,
  flip: boolean = false
): void {
  ctx.save();
  ctx.translate(x, y);
  if (flip) ctx.scale(-1, 1);

  const tailWag = Math.sin(time * 8) * (size * 0.3);

  // tail fin
  ctx.fillStyle = '#f97316';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-size * 1.2, 0);
  ctx.lineTo(-size * 1.8, -size * 0.6 + tailWag);
  ctx.lineTo(-size * 1.5, tailWag * 0.5);
  ctx.lineTo(-size * 1.8, size * 0.6 + tailWag);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // body
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 1.2, size * 0.75, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // white stripes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(-size * 0.1, 0, size * 0.25, size * 0.72, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(-size * 0.7, 0, size * 0.18, size * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(size * 0.6, -size * 0.2, size * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(size * 0.68, -size * 0.2, size * 0.11, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawMantaRay(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  const wingFlap = Math.sin(time * 3) * 14;

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;

  // manta ray wings
  ctx.beginPath();
  ctx.moveTo(35, 0);
  ctx.quadraticCurveTo(10, -35 + wingFlap, -20, -50 + wingFlap * 1.2);
  ctx.quadraticCurveTo(-15, -15, -35, 0);
  ctx.quadraticCurveTo(-15, 15, -20, 50 - wingFlap * 1.2);
  ctx.quadraticCurveTo(10, 35 - wingFlap, 35, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // tail
  ctx.beginPath();
  ctx.moveTo(-35, 0);
  ctx.quadraticCurveTo(-60, Math.sin(time * 3) * 8, -95, 0);
  ctx.stroke();

  // cephalic fins
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(35, -8, 8, 4, -0.3, 0, Math.PI * 2);
  ctx.ellipse(35, 8, 8, 4, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawTerrifyingShark(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  scale: number = 1.25
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const tailWag = Math.sin(time * 5.5) * 10;

  // streamlined apex predator body
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.8;

  ctx.beginPath();
  ctx.moveTo(70, -2); // sharp predatory snout
  ctx.quadraticCurveTo(35, -28, -25, -18); // muscular arched back
  ctx.lineTo(-75, -40 + tailWag); // upper caudal fin
  ctx.lineTo(-58, -2 + tailWag * 0.4);
  ctx.lineTo(-78, 34 + tailWag); // lower caudal fin
  ctx.quadraticCurveTo(-30, 20, 20, 16);
  ctx.lineTo(38, 18); // lower jaw hinge
  ctx.lineTo(58, 10); // lower jaw tip
  ctx.lineTo(44, 2); // mouth corner
  ctx.lineTo(65, 0); // upper jaw
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // menacing jagged dorsal fin with battle notches
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(8, -24);
  ctx.lineTo(-6, -58);
  ctx.lineTo(-14, -42);
  ctx.lineTo(-10, -36);
  ctx.lineTo(-24, -20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // aggressive pectoral fin in attack dive pose
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(14, 12);
  ctx.lineTo(2, 44);
  ctx.lineTo(-12, 40);
  ctx.lineTo(-4, 15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // predatory underbelly
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(65, 0);
  ctx.quadraticCurveTo(28, 14, -20, 13);
  ctx.quadraticCurveTo(25, 4, 65, 0);
  ctx.closePath();
  ctx.fill();

  // gaping open jaws with dark blood-red interior
  ctx.fillStyle = '#450a0a';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(65, 0);
  ctx.lineTo(42, 3);
  ctx.lineTo(58, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // razor-sharp jagged upper teeth
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 1.2;
  const upperTeeth = [
    [64, 0, 61, 6, 58, 1],
    [58, 1, 55, 6, 52, 2],
    [52, 2, 49, 6, 46, 3],
    [46, 3, 44, 6, 42, 3]
  ];
  upperTeeth.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // lower jaw teeth
  const lowerTeeth = [
    [57, 9, 54, 4, 51, 8],
    [51, 8, 48, 3, 45, 6],
    [45, 6, 43, 2, 42, 4]
  ];
  lowerTeeth.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // terrifying predatory eye (amber glow with vertical black slit pupil and heavy brow ridge)
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.moveTo(42, -14);
  ctx.lineTo(54, -8);
  ctx.lineTo(42, -7);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#eab308';
  ctx.shadowColor = '#eab308';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(46, -9, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.ellipse(46, -9, 1.2, 4, 0.15, 0, Math.PI * 2);
  ctx.fill();

  // menacing battle scars across the snout
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(56, -14);
  ctx.lineTo(48, -4);
  ctx.moveTo(50, -16);
  ctx.lineTo(44, -7);
  ctx.stroke();

  // 4 dark gill slits
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.2;
  for (let i = 0; i < 4; i++) {
    const gx = 18 - i * 5;
    ctx.beginPath();
    ctx.moveTo(gx, -4);
    ctx.quadraticCurveTo(gx - 3, 4, gx - 1, 10);
    ctx.stroke();
  }

  ctx.restore();
}

export const drawCartoonShark = drawTerrifyingShark;

export function drawTerrifyingAngler(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  scale: number = 1.2,
  flip: boolean = false
): void {
  ctx.save();
  ctx.translate(x, y);
  if (flip) {
    ctx.scale(-scale, scale);
  } else {
    ctx.scale(scale, scale);
  }

  const tailWag = Math.sin(time * 7) * 7;

  // ambient bioluminescent aura cast by the lure onto head and surrounding water
  const lureWag = Math.sin(time * 2.8) * 8;
  const escaX = 44 + lureWag;
  const escaY = -42 + Math.cos(time * 3.5) * 6;

  const aura = ctx.createRadialGradient(escaX, escaY, 2, escaX, escaY, 60);
  aura.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
  aura.addColorStop(0.5, 'rgba(34, 211, 238, 0.12)');
  aura.addColorStop(1, 'rgba(34, 211, 238, 0)');
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(escaX, escaY, 60, 0, Math.PI * 2);
  ctx.fill();

  // hunched, spiny deep-sea body with visible slate-indigo gradient (pops against dark water)
  const bodyGrad = ctx.createLinearGradient(0, -30, 0, 30);
  bodyGrad.addColorStop(0, '#2d3d54'); // rich slate-indigo back
  bodyGrad.addColorStop(0.45, '#1b2738');
  bodyGrad.addColorStop(1, '#0e1724'); // deep shaded belly
  ctx.fillStyle = bodyGrad;
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.4;

  ctx.beginPath();
  ctx.moveTo(36, 12);
  ctx.quadraticCurveTo(32, 28, 10, 26);
  ctx.quadraticCurveTo(-26, 24, -36, 6);
  ctx.lineTo(-48, 14 + tailWag);
  ctx.lineTo(-42, 0);
  ctx.lineTo(-50, -14 + tailWag);
  ctx.quadraticCurveTo(-24, -26, 6, -26);
  ctx.quadraticCurveTo(24, -20, 28, -6);
  ctx.lineTo(14, 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // subtle cyan bioluminescent rim line along the hunched back
  ctx.save();
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(24, -20);
  ctx.quadraticCurveTo(6, -28, -24, -26);
  ctx.stroke();
  ctx.restore();

  // dorsal spiny fin rays with glowing tips
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  const finSpines = [[-6, -26, -10, -42], [-14, -24, -20, -38], [-22, -20, -28, -32]];
  finSpines.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // glowing spine tip
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(x2, y2, 1.6, 0, Math.PI * 2);
    ctx.fill();
  });

  // bioluminescent photophores (cyan glowing dots along lateral flank)
  ctx.save();
  ctx.fillStyle = '#38bdf8';
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 6;
  const photophores = [
    [16, -2],
    [6, 4],
    [-4, 8],
    [-14, 10],
    [-24, 8],
    [-32, 4]
  ];
  photophores.forEach(([px, py]) => {
    ctx.beginPath();
    ctx.arc(px, py, 1.8, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // eerie glowing bioluminescent lure stalk
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(14, -24);
  ctx.quadraticCurveTo(28, -52, escaX, escaY);
  ctx.stroke();

  // pulsing glowing lure bulb
  const pulse = 9 + Math.sin(time * 6) * 4;
  ctx.fillStyle = '#22d3ee';
  ctx.shadowColor = '#06b6d4';
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(escaX, escaY, pulse, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(escaX, escaY, pulse * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // gaping underbite mouth with dark blood-red maw
  ctx.fillStyle = '#3b0707';
  ctx.beginPath();
  ctx.moveTo(28, -6);
  ctx.lineTo(14, 2);
  ctx.lineTo(36, 12);
  ctx.closePath();
  ctx.fill();

  // long, needle-sharp translucent fangs protruding OUTSIDE jaws
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 1;

  const lowerFangs = [
    [35, 12, 33, -12, 31, 10],
    [29, 9, 27, -8, 25, 7],
    [23, 6, 21, -4, 19, 4],
    [17, 3, 16, -2, 15, 2]
  ];
  lowerFangs.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  const upperFangs = [
    [27, -5, 26, 10, 24, -4],
    [21, -3, 20, 8, 18, -2],
    [15, -1, 15, 5, 14, 0]
  ];
  upperFangs.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // ghostly, unblinking milky predator eye
  ctx.fillStyle = '#e0f2fe';
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(22, -14, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.arc(23, -14, 1.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export const drawAnglerFish = drawTerrifyingAngler;

export function drawViperFish(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  scale: number = 1.2
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const bodyWiggle = Math.sin(time * 7) * 8;

  // serpentine abyssal predator body
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.4;

  ctx.beginPath();
  ctx.moveTo(60, -4);
  ctx.quadraticCurveTo(20, -18, -40, -8 + bodyWiggle * 0.5);
  ctx.lineTo(-90, -22 + bodyWiggle);
  ctx.lineTo(-75, 0 + bodyWiggle * 0.5);
  ctx.lineTo(-92, 18 + bodyWiggle);
  ctx.quadraticCurveTo(-35, 14, 15, 10);
  ctx.lineTo(45, 16);
  ctx.lineTo(58, 6);
  ctx.lineTo(38, -2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // long trailing dorsal spine
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(10, -14);
  ctx.quadraticCurveTo(2, -38, -18, -44 + Math.sin(time * 4) * 6);
  ctx.stroke();

  // glass needle fangs
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 1.2;

  const viperLower = [
    [56, 7, 54, -20, 50, 6],
    [48, 9, 44, -14, 42, 8],
    [38, 12, 36, -8, 34, 10]
  ];
  viperLower.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  const viperUpper = [
    [58, -3, 56, 18, 54, -2],
    [48, -6, 46, 12, 44, -4],
    [38, -8, 38, 6, 36, -6]
  ];
  viperUpper.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // sinister glowing red predator eye
  ctx.fillStyle = '#ef4444';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(42, -10, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.arc(43, -10, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // bioluminescent photophores (cyan glowing dots along flank)
  ctx.fillStyle = '#38bdf8';
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 6;
  for (let i = 0; i < 9; i++) {
    const px = 30 - i * 9;
    const py = 8 + (i % 2) * 2;
    ctx.beginPath();
    ctx.arc(px, py, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;

  ctx.restore();
}

export function drawGiantSquid(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number,
  scale: number = 1.3
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // huge eerie mantle
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 2.6;

  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.quadraticCurveTo(10, -22, -60, -18);
  ctx.lineTo(-85, -28 + Math.sin(time * 3) * 6);
  ctx.lineTo(-75, 0);
  ctx.lineTo(-85, 28 + Math.sin(time * 3) * 6);
  ctx.quadraticCurveTo(-60, 18, 10, 22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // menacing unblinking golden squid eye
  ctx.fillStyle = '#f59e0b';
  ctx.shadowColor = '#fbbf24';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(28, -2, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.ellipse(28, -2, 2.5, 7, Math.PI / 2, 0, Math.PI * 2);
  ctx.fill();

  // sinuous tentacles with glowing suckers
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  const tentacleOffsets = [-12, -6, 0, 6, 12];
  tentacleOffsets.forEach((off, idx) => {
    const tWobble1 = Math.sin(time * 3.5 + idx) * 16;
    const tWobble2 = Math.cos(time * 2.8 + idx) * 20;

    ctx.beginPath();
    ctx.moveTo(45, off);
    ctx.quadraticCurveTo(80, off + tWobble1, 130 + idx * 8, off * 1.5 + tWobble2);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(85, off + tWobble1 * 0.6, 2.2, 0, Math.PI * 2);
    ctx.arc(115, off * 1.2 + tWobble2 * 0.8, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  ctx.restore();
}

export function drawScubaDiver(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  const kick = Math.sin(time * 5) * 6;

  // wetsuit body
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.2;

  ctx.beginPath();
  ctx.ellipse(0, 0, 22, 10, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // oxygen tank
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.rect(-12, -12, 18, 7);
  ctx.fill();
  ctx.stroke();

  // mask
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(18, -2, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // flippers
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-20, 2);
  ctx.lineTo(-34, 4 + kick);
  ctx.lineTo(-30, 10 + kick);
  ctx.lineTo(-18, 5);
  ctx.closePath();
  ctx.fill();

  // bubbles from regulator
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(24 + Math.sin(time * 3) * 3, -10 - ((time * 20) % 30), 3, 0, Math.PI * 2);
  ctx.arc(28 + Math.cos(time * 3) * 4, -20 - ((time * 24) % 35), 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawCartoonCrab(
  ctx: CanvasRenderingContext2D,
  time: number,
  x: number,
  y: number
): void {
  ctx.save();
  ctx.translate(x, y);

  // crab legs
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';

  const legWobble1 = Math.sin(time * 12) * 4;
  const legWobble2 = Math.cos(time * 12) * 4;

  ctx.beginPath();
  ctx.moveTo(-16, 8);
  ctx.lineTo(-26, 18 + legWobble1);
  ctx.moveTo(-8, 12);
  ctx.lineTo(-14, 22 + legWobble2);
  ctx.moveTo(16, 8);
  ctx.lineTo(26, 18 + legWobble2);
  ctx.moveTo(8, 12);
  ctx.lineTo(14, 22 + legWobble1);
  ctx.stroke();

  // shell
  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 24, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // claws
  ctx.beginPath();
  ctx.arc(-24, -14 + Math.sin(time * 6) * 4, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(24, -14 - Math.sin(time * 6) * 4, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // eyes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-8, -16, 6, 0, Math.PI * 2);
  ctx.arc(8, -16, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-7, -16, 3, 0, Math.PI * 2);
  ctx.arc(7, -16, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function renderCreaturesByDepth(
  ctx: CanvasRenderingContext2D,
  depthLevel: 1 | 2 | 3 | 4 | 5,
  width: number,
  height: number,
  time: number,
  waterMinY: number,
  waterMaxY: number
): void {
  if (depthLevel === 1) {
    // Flagship 1 (CiMart): Coastal surface water
    const fish1X = (time * 70) % (width + 160) - 80;
    const fish1Y = waterMinY + 60;
    drawClownFish(ctx, time, fish1X, fish1Y, 15);

    const fish2X = width - (((time * 55) % (width + 160)) - 80);
    const fish2Y = waterMinY + 140;
    drawClownFish(ctx, time, fish2X, fish2Y, 12, true);

    const diverX = (time * 40 + width * 0.4) % (width + 200) - 100;
    const diverY = waterMinY + 90;
    drawScubaDiver(ctx, time, diverX, diverY);
  } else if (depthLevel === 2) {
    // Flagship 2 (villaNaKey): Tropical mid-depth
    const mantaX = (time * 55) % (width + 240) - 120;
    const mantaY = height * 0.48;
    drawMantaRay(ctx, time, mantaX, mantaY);

    const fishX = width - (((time * 85) % (width + 160)) - 80);
    const fishY = height * 0.22;
    drawClownFish(ctx, time, fishX, fishY, 16, true);
  } else if (depthLevel === 3) {
    // Flagship 3 (kalorinAi): Deep Ocean - Terrifying Great White Shark with razor teeth & Menacing Anglerfish
    const sharkX = (time * 95) % (width + 360) - 180;
    const sharkY = height * 0.35;
    drawTerrifyingShark(ctx, time, sharkX, sharkY, 1.25);

    const anglerX = width - (((time * 40) % (width + 240)) - 120);
    const anglerY = height * 0.68;
    drawTerrifyingAngler(ctx, time, anglerX, anglerY, 1.2, true);
  } else if (depthLevel === 4) {
    // Flagship 4 (PaTo): Deep Twilight Sea - Terrifying Viperfish with glass needle fangs & Giant Squid with glowing tentacles
    const viperX = (time * 75) % (width + 300) - 150;
    const viperY = height * 0.36;
    drawViperFish(ctx, time, viperX, viperY, 1.25);

    const squidX = width - (((time * 35) % (width + 360)) - 180);
    const squidY = height * 0.70;
    drawGiantSquid(ctx, time, squidX, squidY, 1.2);
  } else if (depthLevel === 5) {
    // Dock (All Projects): Seafloor / Abyssal trench
    // Crab walking along bottom sandbed safely below cards
    const crabX = ((time * 35) % (width + 200)) - 100;
    const crabY = waterMaxY + 28;
    drawCartoonCrab(ctx, time, crabX, crabY);

    // Deep abyssal anglerfish swimming naturally in the open water above the seabed
    // Elevated safely above the bottom sandbed so it never touches or submerges into the sand
    const anglerX = width - (((time * 30) % (width + 240)) - 120);
    const anglerY = waterMaxY - 88 + Math.sin(time * 1.6) * 14;
    drawTerrifyingAngler(ctx, time, anglerX, anglerY, 1.15, true);
  }
}
