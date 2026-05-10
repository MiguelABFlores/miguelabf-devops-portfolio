'use client';

/* ────────────────────────────────────────────────────────────────
   SplashLife - sky and abyss creatures for the intro splash.

   Sky:
     - V-formation bird flocks drifting right-to-left
     - Shooting stars at staggered intervals

   Abyss (placed inside the wave layer container):
     - Distant whale silhouette swimming slowly across the deep
     - Schools of small fish swimming both directions

   All animations are pure CSS keyframes (defined in globals.css).
   Pure CSS (not Framer Motion) so they animate even when React is
   busy and they don't add to the JS bundle.

   Keyframes used:
     birdFlap, flockDrift, shootStar, fishFlap, schoolLTR,
     schoolRTL, whaleDrift
   ──────────────────────────────────────────────────────────────── */

/* ─── Single bird (M-shape silhouette) ──────────────────────────── */
function Bird({ flapDelay = '0s' }: { flapDelay?: string }) {
  return (
    <svg
      width="16" height="8" viewBox="0 0 16 8"
      style={{
        display: 'block',
        animation: `birdFlap 0.7s ease-in-out ${flapDelay} infinite`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      <path
        d="M 1,5 Q 4,1 8,3.5 Q 12,1 15,5"
        stroke="#0a1f38" strokeWidth="1.4" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}

/* ─── V-formation flock ─────────────────────────────────────────── */
function BirdFlock({ top, duration, delay = '0s', size = 1 }: {
  top: string; duration: string; delay?: string; size?: number;
}) {
  // V-shape: leader at front, two wings trailing back
  const positions = [
    { x: 30, y: 0,  d: '0s'    },
    { x: 18, y: 5,  d: '0.06s' },
    { x: 42, y: 5,  d: '0.04s' },
    { x: 6,  y: 11, d: '0.12s' },
    { x: 54, y: 11, d: '0.10s' },
    { x: -6, y: 17, d: '0.18s' },
    { x: 66, y: 17, d: '0.16s' },
  ];

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left: '105vw',                  // start off-screen right
        width: '80px',
        height: '24px',
        transform: `scale(${size})`,
        transformOrigin: 'top left',
        animation: `flockDrift ${duration} linear ${delay} infinite`,
        willChange: 'transform',
      }}
    >
      {positions.map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: `${p.x}px`, top: `${p.y}px` }}>
          <Bird flapDelay={p.d} />
        </div>
      ))}
    </div>
  );
}

/* ─── Shooting star ─────────────────────────────────────────────── */
function ShootingStar({ top, left, delay, duration, angle = 35 }: {
  top: string; left: string; delay: string; duration: string; angle?: number;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top, left,
        width: '0',
        height: '0',
        opacity: 0,
        animation: `shootStar ${duration} linear ${delay} infinite`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Inner div carries the rotation so the keyframe's translate
          isn't fighting with the angle. */}
      <div
        style={{
          width: '160px',
          height: '2px',
          background:
            'linear-gradient(to right, transparent 0%, transparent 30%, #fff 80%, #7df9ff 95%, transparent 100%)',
          boxShadow: '0 0 6px rgba(125,249,255,0.85)',
          transform: `rotate(${angle}deg)`,
          transformOrigin: 'right center',
          borderRadius: '2px',
        }}
      />
    </div>
  );
}

/* ─── Tiny fish silhouette ──────────────────────────────────────── */
function Fish({ x, y, size, flapDelay }: {
  x: number; y: number; size: number; flapDelay: string;
}) {
  return (
    <svg
      width={size} height={size * 0.55} viewBox="0 0 18 10"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top:  `${y}px`,
        display: 'block',
        animation: `fishFlap 0.55s ease-in-out ${flapDelay} infinite`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      {/* body */}
      <ellipse cx="7" cy="5" rx="6.5" ry="2.6" fill="#020812" opacity="0.65" />
      {/* tail */}
      <path d="M 13,5 L 18,1.5 L 17,5 L 18,8.5 Z" fill="#020812" opacity="0.65" />
      {/* eye dot */}
      <circle cx="3" cy="4.6" r="0.6" fill="#7df9ff" opacity="0.45" />
    </svg>
  );
}

/* ─── Drifting school ──────────────────────────────────────────── */
function FishSchool({ top, duration, delay = '0s', dir = 'ltr' }: {
  top: string; duration: string; delay?: string; dir?: 'ltr' | 'rtl';
}) {
  // Loose school formation
  const fishes = [
    { x: 0,   y: 0,  size: 10 },
    { x: 14,  y: 4,  size: 9 },
    { x: 28,  y: -2, size: 11 },
    { x: 42,  y: 3,  size: 9 },
    { x: 56,  y: 0,  size: 10 },
    { x: 70,  y: -3, size: 8 },
    { x: 84,  y: 5,  size: 9 },
    { x: 98,  y: 1,  size: 10 },
    { x: 112, y: -2, size: 11 },
    { x: 126, y: 4,  size: 9 },
    { x: 140, y: -1, size: 8 },
    { x: 154, y: 3,  size: 10 },
    { x: 168, y: 0,  size: 9 },
    { x: 182, y: -3, size: 9 },
  ];

  const animName = dir === 'ltr' ? 'schoolLTR' : 'schoolRTL';
  // Flip fish horizontally when swimming RTL (so they face the right way)
  const flipFish = dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)';

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left: 0,
        width:  '210px',
        height: '14px',
        animation: `${animName} ${duration} linear ${delay} infinite`,
        willChange: 'transform',
      }}
    >
      <div style={{ width: '100%', height: '100%', transform: flipFish }}>
        {fishes.map((f, i) => (
          <Fish key={i}
            x={f.x} y={f.y} size={f.size}
            flapDelay={`${(i * 0.045) % 0.55}s`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Distant whale silhouette ──────────────────────────────────── */
function DistantWhale({ top, duration, delay = '-30s' }: {
  top: string; duration: string; delay?: string;
}) {
  return (
    <svg
      width="320" height="100" viewBox="-20 0 340 100"
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left: 0,
        opacity: 0,
        filter: 'blur(1.8px)',
        animation: `whaleDrift ${duration} linear ${delay} infinite`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Tail flukes (extend into the negative-x area of viewBox) */}
      <path
        d="M 4,50 L -16,38 L -10,50 L -16,62 Z"
        fill="#020812" opacity="0.85"
      />
      {/* Main body */}
      <path
        d="M 305,50
           C 295,32 270,24 220,20
           C 160,18 80,22 40,32
           C 20,38 10,44 4,50
           C 10,56 20,62 40,68
           C 80,78 160,82 220,80
           C 270,76 295,68 305,50 Z"
        fill="#020812" opacity="0.85"
      />
      {/* Pectoral fin */}
      <path
        d="M 130,72 C 140,86 160,92 168,86 C 158,76 142,72 130,72 Z"
        fill="#020812" opacity="0.65"
      />
      {/* Dorsal hump */}
      <path
        d="M 175,16 C 185,8 200,8 208,16 C 195,17 185,18 175,16 Z"
        fill="#020812" opacity="0.7"
      />
      {/* Eye hint */}
      <circle cx="278" cy="42" r="1.4" fill="#020812" opacity="0.95" />
    </svg>
  );
}

/* ─── Exports ──────────────────────────────────────────────────── */

export function SkyLife() {
  return (
    <>
      {/* Bird flocks (right to left, two altitudes) */}
      <BirdFlock top="20%" duration="58s" delay="-12s" size={1} />
      <BirdFlock top="34%" duration="72s" delay="-32s" size={0.85} />

      {/* Shooting stars (staggered, different paths and angles) */}
      <ShootingStar top="6%"  left="62%" delay="-3s"  duration="14s" angle={28} />
      <ShootingStar top="11%" left="34%" delay="-8s"  duration="22s" angle={42} />
      <ShootingStar top="16%" left="76%" delay="-14s" duration="20s" angle={32} />
    </>
  );
}

export function AbyssLife() {
  return (
    <>
      {/* Distant whale (slowest, deepest, very faint) */}
      <DistantWhale top="240px" duration="90s" delay="-40s" />

      {/* Two fish schools at different depths and opposite directions */}
      <FishSchool top="232px" duration="48s" delay="-12s" dir="ltr" />
      <FishSchool top="282px" duration="56s" delay="-28s" dir="rtl" />
    </>
  );
}
