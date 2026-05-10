'use client';

/* ────────────────────────────────────────────────────────────────
   SplashLife - sky and abyss creatures for the intro splash.

   Sky:
     - V-formation bird flocks drifting right-to-left
     - Shooting stars firing from different angles + directions

   Abyss (placed inside the wave layer container):
     - Distant whale silhouette with cyan rim glow
     - Schools of small fish with cyan glow halo

   All animations are pure CSS keyframes (defined in globals.css).
   Pure CSS (not Framer Motion) so they animate even when React is
   busy, and they don't add to the JS bundle.

   Keyframes used:
     birdFlap, flockDrift,
     shootStar, shootStarLeft, shootStarFlat, shootStarSteep,
     fishFlap, schoolLTR, schoolRTL, whaleDrift
   ──────────────────────────────────────────────────────────────── */

/* ─── Single bird (M-shape silhouette) ──────────────────────────── */
function Bird({ flapDelay = '0s' }: { flapDelay?: string }) {
  return (
    <svg
      width="22" height="11" viewBox="0 0 22 11"
      style={{
        display: 'block',
        animation: `birdFlap 0.7s ease-in-out ${flapDelay} infinite`,
        transformOrigin: '50% 50%',
        willChange: 'transform',
        filter: 'drop-shadow(0 0 4px rgba(125,249,255,0.4))',
      }}
    >
      <path
        d="M 1.5,7 Q 6,1 11,5 Q 16,1 20.5,7"
        stroke="#a8c4dc" strokeWidth="2.2" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
        opacity="0.95"
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
    { x: 36, y: 0,  d: '0s'    },
    { x: 22, y: 7,  d: '0.06s' },
    { x: 50, y: 7,  d: '0.04s' },
    { x: 8,  y: 14, d: '0.12s' },
    { x: 64, y: 14, d: '0.10s' },
    { x: -6, y: 21, d: '0.18s' },
    { x: 78, y: 21, d: '0.16s' },
  ];

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left: '105vw',                    // start off-screen right
        width: '100px',
        height: '32px',
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
type StarDir = 'right' | 'left' | 'flat' | 'steep';

function ShootingStar({ top, left, delay, duration, direction = 'right' }: {
  top: string; left: string; delay: string; duration: string; direction?: StarDir;
}) {
  // Each direction has its own keyframe so the path is consistent,
  // and its own inner-rotate angle so the streak points the right way.
  const angle = {
    right: 35,
    left:  145,
    flat:  10,
    steep: 60,
  }[direction];

  const animName = {
    right: 'shootStar',
    left:  'shootStarLeft',
    flat:  'shootStarFlat',
    steep: 'shootStarSteep',
  }[direction];

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left,
        width: 0,
        height: 0,
        opacity: 0,
        animation: `${animName} ${duration} linear ${delay} infinite`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Inner div carries the static rotation so the keyframe's
          translate doesn't fight with the angle. */}
      <div
        style={{
          width: '180px',
          height: '2px',
          background:
            'linear-gradient(to right, transparent 0%, transparent 25%, rgba(255,255,255,0.95) 80%, #7df9ff 95%, transparent 100%)',
          boxShadow: '0 0 8px rgba(255,255,255,0.7), 0 0 14px rgba(125,249,255,0.85)',
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
        filter: 'drop-shadow(0 0 4px rgba(125,249,255,0.55))',
      }}
    >
      {/* body */}
      <ellipse cx="7" cy="5" rx="6.5" ry="2.6" fill="#5a7d9c" opacity="0.85" />
      {/* tail */}
      <path d="M 13,5 L 18,1.5 L 17,5 L 18,8.5 Z" fill="#5a7d9c" opacity="0.85" />
      {/* tiny cyan-rim outline along the body */}
      <ellipse cx="7" cy="5" rx="6.5" ry="2.6" fill="none"
        stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="0.6" />
      {/* glowing eye dot */}
      <circle cx="3.5" cy="4.6" r="0.8" fill="#7df9ff" opacity="0.85" />
    </svg>
  );
}

/* ─── Drifting school ──────────────────────────────────────────── */
function FishSchool({ top, duration, delay = '0s', dir = 'ltr' }: {
  top: string; duration: string; delay?: string; dir?: 'ltr' | 'rtl';
}) {
  const fishes = [
    { x: 0,   y: 0,  size: 11 },
    { x: 14,  y: 4,  size: 10 },
    { x: 28,  y: -2, size: 12 },
    { x: 42,  y: 3,  size: 10 },
    { x: 56,  y: 0,  size: 11 },
    { x: 70,  y: -3, size: 9 },
    { x: 84,  y: 5,  size: 10 },
    { x: 98,  y: 1,  size: 11 },
    { x: 112, y: -2, size: 12 },
    { x: 126, y: 4,  size: 10 },
    { x: 140, y: -1, size: 9 },
    { x: 154, y: 3,  size: 11 },
    { x: 168, y: 0,  size: 10 },
    { x: 182, y: -3, size: 10 },
  ];

  const animName = dir === 'ltr' ? 'schoolLTR' : 'schoolRTL';
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

/* ─── Distant whale silhouette (dark body + cyan rim glow) ──────── */
function DistantWhale({ top, duration, delay = '-30s' }: {
  top: string; duration: string; delay?: string;
}) {
  // Reused path data for both body fill and cyan rim stroke.
  const bodyPath = `
    M 305,50
    C 295,32 270,24 220,20
    C 160,18 80,22 40,32
    C 20,38 10,44 4,50
    C 10,56 20,62 40,68
    C 80,78 160,82 220,80
    C 270,76 295,68 305,50 Z
  `;
  const flukePath = `M 4,50 L -16,38 L -10,50 L -16,62 Z`;
  const finPath   = `M 130,72 C 140,86 160,92 168,86 C 158,76 142,72 130,72 Z`;
  const humpPath  = `M 175,16 C 185,8 200,8 208,16 C 195,17 185,18 175,16 Z`;

  return (
    <svg
      width="320" height="100" viewBox="-20 0 340 100"
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left: 0,
        opacity: 0,
        filter: 'blur(1px) drop-shadow(0 0 10px rgba(125,249,255,0.35))',
        animation: `whaleDrift ${duration} linear ${delay} infinite`,
        willChange: 'transform, opacity',
      }}
    >
      {/* ── Body fill (silhouette) ── */}
      <path d={bodyPath}   fill="#02101e" opacity="0.9" />
      <path d={flukePath}  fill="#02101e" opacity="0.9" />
      <path d={finPath}    fill="#02101e" opacity="0.7" />
      <path d={humpPath}   fill="#02101e" opacity="0.75" />

      {/* ── Cyan rim glow tracing the silhouette ── */}
      <path d={bodyPath}   fill="none"
        stroke="#7df9ff" strokeOpacity="0.55" strokeWidth="1.2" />
      <path d={flukePath}  fill="none"
        stroke="#7df9ff" strokeOpacity="0.45" strokeWidth="1" />
      <path d={finPath}    fill="none"
        stroke="#7df9ff" strokeOpacity="0.45" strokeWidth="1" />

      {/* eye hint */}
      <circle cx="278" cy="42" r="1.4" fill="#7df9ff" opacity="0.7" />
    </svg>
  );
}

/* ─── Exports ──────────────────────────────────────────────────── */

export function SkyLife() {
  return (
    <>
      {/* Bird flocks (right to left, two altitudes, sized large enough to read) */}
      <BirdFlock top="20%" duration="58s" delay="-12s" size={1.4} />
      <BirdFlock top="34%" duration="72s" delay="-32s" size={1.2} />

      {/* Shooting stars - 6 stars, 4 different directions, varied delays */}
      <ShootingStar top="6%"  left="62%" delay="-3s"  duration="14s" direction="right" />
      <ShootingStar top="11%" left="34%" delay="-8s"  duration="22s" direction="left" />
      <ShootingStar top="16%" left="76%" delay="-14s" duration="20s" direction="flat" />
      <ShootingStar top="9%"  left="18%" delay="-18s" duration="25s" direction="steep" />
      <ShootingStar top="22%" left="84%" delay="-22s" duration="18s" direction="left" />
      <ShootingStar top="4%"  left="48%" delay="-27s" duration="24s" direction="right" />
    </>
  );
}

export function AbyssLife() {
  return (
    <>
      {/* Distant whale (slowest, deepest) */}
      <DistantWhale top="240px" duration="90s" delay="-40s" />

      {/* Two fish schools at different depths and opposite directions */}
      <FishSchool top="232px" duration="48s" delay="-12s" dir="ltr" />
      <FishSchool top="282px" duration="56s" delay="-28s" dir="rtl" />
    </>
  );
}
