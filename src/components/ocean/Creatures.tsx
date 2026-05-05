'use client';

/* ─────────────────────────────────────────────────────────────────
   Ocean Creatures
   All creatures use CSS animation via inline style so we can pass
   dynamic durations/delays without Tailwind JIT limitations.
   swimRight / swimLeft / squidDrift / whaleBob are defined in
   globals.css.
───────────────────────────────────────────────────────────────── */

/* ── Whale ──────────────────────────────────────────────────────── */
function Whale({
  top, delay, duration, flip = false,
}: { top: string; delay: string; duration: string; flip?: boolean }) {
  const C = '#00d4ff';
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left: 0,
        pointerEvents: 'none',
        willChange: 'transform',
        animation: `${flip ? 'swimLeft' : 'swimRight'} ${duration} linear ${delay} infinite`,
      }}
    >
      {/* gentle vertical bob nested inside the horizontal swim */}
      <div style={{ animation: 'whaleBob 9s ease-in-out infinite', willChange: 'transform' }}>
        <svg
          width="260" height="95"
          viewBox="0 0 260 95"
          style={{
            display: 'block',
            transform: flip ? 'scaleX(-1)' : undefined,
            filter: `drop-shadow(0 0 32px ${C}55) drop-shadow(0 0 12px ${C}33)`,
          }}
        >
          <defs>
            <radialGradient id={`wg${delay}`} cx="0.68" cy="0.48" r="0.52">
              <stop offset="0%"   stopColor={C} stopOpacity="0.42" />
              <stop offset="55%"  stopColor={C} stopOpacity="0.18" />
              <stop offset="100%" stopColor={C} stopOpacity="0.04" />
            </radialGradient>
          </defs>

          {/* main body */}
          <path
            d="M215,47 Q175,18 115,24 Q65,29 22,47 Q65,65 115,71 Q175,77 215,47 Z"
            fill={`url(#wg${delay})`}
            stroke={C} strokeOpacity="0.65" strokeWidth="1.6"
          />
          {/* tail flukes */}
          <path
            d="M25,47 Q6,26 0,13 Q11,33 11,47 Q11,61 0,81 Q6,68 25,47 Z"
            fill={C} fillOpacity="0.30"
            stroke={C} strokeOpacity="0.60" strokeWidth="1.3"
          />
          {/* lower fluke */}
          <path
            d="M25,47 Q10,58 3,72 Q13,58 13,47"
            fill="none" stroke={C} strokeOpacity="0.40" strokeWidth="1"
          />
          {/* pectoral fin */}
          <path
            d="M100,62 Q112,86 132,82 Q120,66 100,62 Z"
            fill={C} fillOpacity="0.22"
            stroke={C} strokeOpacity="0.50" strokeWidth="1.1"
          />
          {/* dorsal ridge */}
          <path
            d="M135,24 Q150,15 168,24"
            fill="none" stroke={C} strokeOpacity="0.45" strokeWidth="1.4"
          />
          {/* eye */}
          <circle cx="192" cy="41" r="3.2" fill={C} fillOpacity="0.90" />
          <circle cx="193" cy="40" r="1.1" fill="white" fillOpacity="0.60" />
          {/* blowhole bubbles */}
          <circle cx="180" cy="22" r="2"   fill="none" stroke={C} strokeOpacity="0.55" strokeWidth="1" />
          <circle cx="177" cy="14" r="2.8" fill="none" stroke={C} strokeOpacity="0.35" strokeWidth="0.9" />
          <circle cx="182" cy="6"  r="1.6" fill="none" stroke={C} strokeOpacity="0.20" strokeWidth="0.7" />
          {/* mouth */}
          <path d="M222,47 Q226,51 222,55" fill="none" stroke={C} strokeOpacity="0.38" strokeWidth="1.1" />
          {/* bioluminescent belly stripe */}
          <path
            d="M80,58 Q130,68 180,58"
            fill="none" stroke={C} strokeOpacity="0.18" strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Shark ──────────────────────────────────────────────────────── */
function Shark({
  top, delay, duration, flip = false,
}: { top: string; delay: string; duration: string; flip?: boolean }) {
  const C = '#7df9ff';
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left: 0,
        pointerEvents: 'none',
        willChange: 'transform',
        animation: `${flip ? 'swimLeft' : 'swimRight'} ${duration} linear ${delay} infinite`,
      }}
    >
      <svg
        width="210" height="72"
        viewBox="0 0 210 72"
        style={{
          display: 'block',
          transform: flip ? 'scaleX(-1)' : undefined,
          filter: `drop-shadow(0 0 22px ${C}44) drop-shadow(0 0 8px ${C}22)`,
        }}
      >
        <defs>
          <radialGradient id={`sg${delay}`} cx="0.65" cy="0.5" r="0.50">
            <stop offset="0%"   stopColor={C} stopOpacity="0.32" />
            <stop offset="100%" stopColor={C} stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* main body */}
        <path
          d="M185,36 Q150,17 90,21 Q45,24 18,36 Q45,48 90,51 Q150,55 185,36 Z"
          fill={`url(#sg${delay})`}
          stroke={C} strokeOpacity="0.60" strokeWidth="1.5"
        />
        {/* upper caudal lobe */}
        <path
          d="M20,36 Q4,18 0,8 Q13,28 13,36 Z"
          fill={C} fillOpacity="0.28"
          stroke={C} strokeOpacity="0.55" strokeWidth="1.2"
        />
        {/* lower caudal lobe */}
        <path
          d="M20,36 Q7,50 0,62 Q13,44 13,36 Z"
          fill={C} fillOpacity="0.20"
          stroke={C} strokeOpacity="0.42" strokeWidth="1"
        />
        {/* dorsal fin */}
        <path
          d="M105,21 Q118,3 133,20"
          fill={C} fillOpacity="0.22"
          stroke={C} strokeOpacity="0.60" strokeWidth="1.4"
        />
        {/* pectoral fin */}
        <path
          d="M115,40 Q130,62 148,58 Q136,44 115,40 Z"
          fill={C} fillOpacity="0.18"
          stroke={C} strokeOpacity="0.42" strokeWidth="1"
        />
        {/* gill slits */}
        {[155, 163, 170, 177].map((x, i) => (
          <path
            key={i}
            d={`M${x},27 Q${x + 1.5},36 ${x},45`}
            fill="none" stroke={C} strokeOpacity="0.32" strokeWidth="0.9"
          />
        ))}
        {/* eye */}
        <circle cx="172" cy="32" r="2.8" fill={C} fillOpacity="0.85" />
        <circle cx="172.8" cy="31.2" r="0.9" fill="white" fillOpacity="0.55" />
        {/* snout */}
        <path d="M188,36 Q194,39 188,42" fill="none" stroke={C} strokeOpacity="0.38" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ── Jellyfish ──────────────────────────────────────────────────── */
type JellyHue = 'cyan' | 'magenta' | 'ice';
function Jellyfish({
  top, left, scale = 1, hue = 'cyan', delay = '0s', duration = '24s',
}: {
  top: string; left: string; scale?: number;
  hue?: JellyHue; delay?: string; duration?: string;
}) {
  const C = hue === 'magenta' ? '#b14eff' : hue === 'ice' ? '#7df9ff' : '#00d4ff';
  const G = hue === 'magenta' ? '#b14eff' : '#00d4ff';
  const id = `jb-${hue}-${delay.replace('.', '')}`;
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
        willChange: 'transform',
        /* drift in globals.css keyframe */
        animation: `drift ${duration} ease-in-out ${delay} infinite`,
      }}
    >
      {/* separate bob animation nested */}
      <div style={{ animation: `jellyfish 5s ease-in-out ${delay} infinite`, willChange: 'transform' }}>
        <svg
          width="138" height="210"
          viewBox="0 0 138 210"
          style={{ filter: `drop-shadow(0 0 26px ${G}cc) drop-shadow(0 0 10px ${G}66)` }}
        >
          <defs>
            <radialGradient id={id} cx="0.5" cy="0.32" r="0.62">
              <stop offset="0%"   stopColor={C} stopOpacity="0.75" />
              <stop offset="45%"  stopColor={C} stopOpacity="0.40" />
              <stop offset="85%"  stopColor={C} stopOpacity="0.12" />
              <stop offset="100%" stopColor={C} stopOpacity="0.02" />
            </radialGradient>
          </defs>

          {/* bell */}
          <path
            d="M10,68 Q10,10 69,10 Q128,10 128,68
               Q128,92 108,94 Q93,96 93,80
               Q81,95 69,80 Q57,95 45,80
               Q45,96 30,94 Q10,92 10,68 Z"
            fill={`url(#${id})`}
            stroke={C} strokeOpacity="0.80" strokeWidth="1.6"
          />
          {/* inner glow dome */}
          <ellipse cx="69" cy="48" rx="25" ry="20"
            fill={C} fillOpacity="0.15"
            stroke={C} strokeOpacity="0.35" strokeWidth="0.9"
          />
          {/* oral arms (thicker inner tentacles) */}
          {[35, 55, 69, 83, 103].map((x, i) => (
            <path
              key={`arm-${i}`}
              d={`M${x},90 Q${x + (i % 2 ? 8 : -8)},128 ${x + (i % 2 ? -6 : 6)},168`}
              fill="none" stroke={C} strokeOpacity="0.55" strokeWidth={i === 2 ? 1.8 : 1.3}
            />
          ))}
          {/* thin trailing tentacles */}
          {[18, 32, 47, 62, 76, 91, 106, 122].map((x, i) => (
            <path
              key={`t-${i}`}
              d={`M${x},90 Q${x + (i % 2 ? 7 : -7)},130 ${x + (i % 2 ? -5 : 5)},168
                  Q${x},188 ${x + (i % 2 ? 4 : -4)},206`}
              fill="none" stroke={C}
              strokeOpacity={0.55 + (i % 2) * 0.15}
              strokeWidth={0.9 + (i % 3 === 0 ? 0.4 : 0)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ── Squid ──────────────────────────────────────────────────────── */
function Squid({
  top, left, scale = 1, delay = '0s', duration = '28s',
}: {
  top: string; left: string; scale?: number; delay?: string; duration?: string;
}) {
  const C = '#b14eff';
  const spots: [number, number][] = [
    [28, 28], [44, 22], [58, 28], [68, 44], [22, 52],
    [72, 58], [36, 72], [56, 76], [44, 56], [30, 40],
  ];
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
        willChange: 'transform',
        animation: `squidDrift ${duration} ease-in-out ${delay} infinite`,
      }}
    >
      <svg
        width="96" height="155"
        viewBox="0 0 96 155"
        style={{ filter: `drop-shadow(0 0 22px ${C}99) drop-shadow(0 0 8px ${C}55)` }}
      >
        <defs>
          <radialGradient id={`sqg${delay.replace('.', '')}`} cx="0.5" cy="0.28" r="0.62">
            <stop offset="0%"   stopColor={C} stopOpacity="0.60" />
            <stop offset="65%"  stopColor={C} stopOpacity="0.25" />
            <stop offset="100%" stopColor={C} stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* mantle */}
        <path
          d="M18,12 Q8,38 10,74 Q12,100 48,112 Q84,100 86,74 Q88,38 78,12 Q64,2 48,0 Q32,2 18,12 Z"
          fill={`url(#sqg${delay.replace('.', '')})`}
          stroke={C} strokeOpacity="0.70" strokeWidth="1.5"
        />
        {/* lateral fins */}
        <path d="M14,70 Q2,90 10,102 Q20,85 22,74 Z"
          fill={C} fillOpacity="0.28" stroke={C} strokeOpacity="0.55" strokeWidth="1.1" />
        <path d="M82,70 Q94,90 86,102 Q76,85 74,74 Z"
          fill={C} fillOpacity="0.28" stroke={C} strokeOpacity="0.55" strokeWidth="1.1" />

        {/* 2 long tentacles (with wider tips) */}
        <path d="M40,114 Q32,130 28,155" fill="none" stroke={C} strokeOpacity="0.70" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M56,114 Q64,130 68,155" fill="none" stroke={C} strokeOpacity="0.70" strokeWidth="1.6" strokeLinecap="round"/>
        {/* tentacle club hints */}
        <ellipse cx="28" cy="153" rx="3" ry="2" fill={C} fillOpacity="0.40" />
        <ellipse cx="68" cy="153" rx="3" ry="2" fill={C} fillOpacity="0.40" />

        {/* 8 shorter arms */}
        {[30, 36, 42, 46, 50, 54, 60, 66].map((x, i) => {
          const spread = (i - 3.5) * 4.5;
          return (
            <path
              key={i}
              d={`M${x},112 Q${x + spread},130 ${x + spread * 1.6},142`}
              fill="none" stroke={C}
              strokeOpacity={0.50 + (i % 2) * 0.12}
              strokeWidth="1"
              strokeLinecap="round"
            />
          );
        })}

        {/* large eyes */}
        <ellipse cx="34" cy="52" rx="7" ry="8" fill="none" stroke={C} strokeOpacity="0.75" strokeWidth="1.4" />
        <ellipse cx="34" cy="52" rx="3.5" ry="4" fill={C} fillOpacity="0.70" />
        <circle cx="32.5" cy="50.5" r="1.2" fill="white" fillOpacity="0.50" />
        <ellipse cx="62" cy="52" rx="7" ry="8" fill="none" stroke={C} strokeOpacity="0.75" strokeWidth="1.4" />
        <ellipse cx="62" cy="52" rx="3.5" ry="4" fill={C} fillOpacity="0.70" />
        <circle cx="60.5" cy="50.5" r="1.2" fill="white" fillOpacity="0.50" />

        {/* chromatophore spots */}
        {spots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.4 + (i % 3) * 0.5}
            fill={C} fillOpacity={0.38 + (i % 2) * 0.18} />
        ))}
      </svg>
    </div>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────── */
export default function Creatures() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>

      {/* ── Whales (two passes, opposite directions) ── */}
      {/* Whale 1: goes right, upper zone. -28s delay so it's already mid-screen on load */}
      <Whale top="14%"  delay="-28s"  duration="92s"  />
      {/* Whale 2: goes left, deeper zone */}
      <Whale top="52%"  delay="-18s"  duration="78s"  flip />

      {/* ── Shark (fast, mid-depth) ── */}
      <Shark top="32%"  delay="-12s"  duration="52s"  flip />
      {/* second pass a bit later */}
      <Shark top="68%"  delay="-38s"  duration="64s"  />

      {/* ── Jellyfish (scattered, visible) ── */}
      <Jellyfish top="8%"   left="7%"  scale={0.90} hue="cyan"    delay="0s"   duration="20s" />
      <Jellyfish top="36%"  left="76%" scale={1.10} hue="magenta" delay="-7s"  duration="27s" />
      <Jellyfish top="60%"  left="18%" scale={0.70} hue="ice"     delay="-13s" duration="22s" />
      <Jellyfish top="22%"  left="50%" scale={0.80} hue="cyan"    delay="-4s"  duration="18s" />

      {/* ── Squids (wandering) ── */}
      <Squid top="44%" left="62%" scale={1.00} delay="0s"   duration="32s" />
      <Squid top="72%" left="30%" scale={0.80} delay="-11s" duration="26s" />
    </div>
  );
}
