'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  hue: number;
  alpha: number;
  wobble: number;
  wobbleSpeed: number;
  kind: 'bubble' | 'mote';
};

export default function Bubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let running = true;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const count = Math.min(70, Math.floor((W * H) / 26000));
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const spawn = (initial: boolean): Particle => {
      const isBubble = Math.random() > 0.35;
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : H + Math.random() * 60,
        r: isBubble ? 1.4 + Math.random() * 5 : 0.6 + Math.random() * 1.6,
        vy: isBubble ? 0.25 + Math.random() * 0.7 : 0.05 + Math.random() * 0.15,
        vx: (Math.random() - 0.5) * 0.15,
        hue: isBubble ? 190 + Math.random() * 30 : 200 + Math.random() * 60,
        alpha: isBubble ? 0.35 + Math.random() * 0.4 : 0.18 + Math.random() * 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.02,
        kind: isBubble ? 'bubble' : 'mote',
      };
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.y -= p.vy;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.4 + p.vx;

        if (p.y < -10 || p.x < -20 || p.x > W + 20) {
          Object.assign(p, spawn(false));
        }

        if (p.kind === 'bubble') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${p.hue}, 100%, 80%, ${p.alpha})`;
          ctx.lineWidth = 1;
          ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.alpha * 0.18})`;
          ctx.fill();
          ctx.stroke();

          // tiny highlight
          ctx.beginPath();
          ctx.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 100%, 95%, ${p.alpha * 0.7})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${p.alpha})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    };

    resize();
    seed();
    draw();

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    />
  );
}
