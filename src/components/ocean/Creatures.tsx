'use client';

/* ─────────────────────────────────────────────────────────────────
   Ocean Creatures — realistic deep-sea cast
   Animations defined in globals.css:
     swimRight, swimLeft, whaleBob, drift, jellyfish, squidDrift, lurePulse
   All sizes/delays are inline so Tailwind JIT won't purge them.
───────────────────────────────────────────────────────────────── */

/* ── Giant Blue Whale ──────────────────────────────────────────── */
function GiantWhale({
  top, delay, duration, flip = false,
}: { top: string; delay: string; duration: string; flip?: boolean }) {
  const id = `gw${delay.replace(/[^0-9]/g, '')}`;
  const acc = '#00d4ff';
  return (
    <div aria-hidden style={{
      position: 'absolute', top, left: 0,
      pointerEvents: 'none', willChange: 'transform',
      animation: `${flip ? 'swimLeft' : 'swimRight'} ${duration} linear ${delay} infinite`,
    }}>
      <div style={{ animation: 'whaleBob 14s ease-in-out infinite', willChange: 'transform' }}>
        <svg width="580" height="165" viewBox="0 0 580 165" style={{
          display: 'block',
          transform: flip ? 'scaleX(-1)' : undefined,
          filter: `drop-shadow(0 0 44px rgba(0,180,220,0.30)) drop-shadow(0 0 18px rgba(0,212,255,0.16))`,
        }}>
          <defs>
            <radialGradient id={`${id}b`} cx="0.62" cy="0.40" r="0.60">
              <stop offset="0%"   stopColor="#1e5e82" stopOpacity="0.58" />
              <stop offset="40%"  stopColor="#0e3d5e" stopOpacity="0.44" />
              <stop offset="100%" stopColor="#061828" stopOpacity="0.16" />
            </radialGradient>
            <radialGradient id={`${id}v`} cx="0.5" cy="0.90" r="0.55">
              <stop offset="0%"   stopColor="#2a7898" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#0e3d5e" stopOpacity="0.04" />
            </radialGradient>
          </defs>

          {/* ── Main body ── */}
          <path d={`
            M 555,82
            C 534,56 494,36 432,26
            C 370,16 288,14 222,18
            C 156,22 98,36 62,56
            C 42,66 28,75 22,82
            C 28,89 42,98 62,108
            C 98,128 156,142 222,146
            C 288,150 370,148 432,138
            C 494,128 534,108 555,82 Z`}
            fill={`url(#${id}b)`}
            stroke={acc} strokeOpacity="0.44" strokeWidth="1.5"
          />

          {/* ── Belly countershading (lighter underside) ── */}
          <path d={`
            M 22,82
            C 28,89 42,98 62,108
            C 98,128 156,142 222,146
            C 288,150 370,148 432,138
            C 494,128 534,108 555,82
            C 538,95 498,108 440,118
            C 370,128 285,130 215,126
            C 136,122 78,108 36,93 Z`}
            fill={`url(#${id}v)`}
          />

          {/* ── Ventral pleats ── */}
          {[0,1,2,3,4,5].map(i => (
            <line key={i}
              x1={330 + i * 18} y1={90 + i * 1.5}
              x2={380 + i * 15} y2={96 + i * 1.5}
              stroke={acc} strokeOpacity="0.11" strokeWidth="0.9"
            />
          ))}

          {/* ── Upper tail fluke ── */}
          <path d={`
            M 22,82
            C 16,64 10,44 5,30
            C 1,18 8,12 16,20
            C 22,28 26,50 27,68 Z`}
            fill="#0e3d5e" fillOpacity="0.70"
            stroke={acc} strokeOpacity="0.40" strokeWidth="1.3"
          />
          {/* ── Lower tail fluke ── */}
          <path d={`
            M 22,82
            C 27,96 22,116 16,128
            C 10,140 1,136 5,124
            C 10,110 16,96 22,82 Z`}
            fill="#0e3d5e" fillOpacity="0.58"
            stroke={acc} strokeOpacity="0.34" strokeWidth="1.1"
          />
          {/* fluke notch */}
          <line x1="20" y1="80" x2="20" y2="84" stroke={acc} strokeOpacity="0.28" strokeWidth="1" />

          {/* ── Long pectoral fin (diagnostic blue whale feature) ── */}
          <path d={`
            M 325,135
            C 342,148 372,163 396,159
            C 414,155 420,145 405,137
            C 388,129 357,127 325,135 Z`}
            fill="#0e3d5e" fillOpacity="0.58"
            stroke={acc} strokeOpacity="0.32" strokeWidth="1.1"
          />
          <path d="M 325,135 C 348,142 378,153 395,151"
            fill="none" stroke={acc} strokeOpacity="0.18" strokeWidth="0.9"
          />

          {/* ── Dorsal ridge (tiny in blue whales) ── */}
          <path d="M 220,18 C 233,7 252,5 267,13 C 258,18 243,21 220,18 Z"
            fill="#0e3d5e" fillOpacity="0.65"
            stroke={acc} strokeOpacity="0.28" strokeWidth="1"
          />

          {/* ── Rostrum ── */}
          <path d="M 555,82 C 562,78 567,82 562,87 C 558,91 555,86 555,82 Z"
            fill="#091e30" fillOpacity="0.72"
          />
          <path d="M 557,83 Q 563,87 559,91"
            fill="none" stroke={acc} strokeOpacity="0.26" strokeWidth="1.2" strokeLinecap="round"
          />

          {/* ── Blowholes ── */}
          <ellipse cx="498" cy="23" rx="4.5" ry="2.5" fill="#091e30" fillOpacity="0.58" />
          <ellipse cx="488" cy="21" rx="2.8" ry="1.6" fill="#091e30" fillOpacity="0.46" />
          {/* bubbles */}
          <circle cx="500" cy="14" r="3.2" fill="none" stroke={acc} strokeOpacity="0.38" strokeWidth="0.9" />
          <circle cx="493" cy="6"  r="4.0" fill="none" stroke={acc} strokeOpacity="0.22" strokeWidth="0.8" />
          <circle cx="503" cy="1"  r="2.2" fill="none" stroke={acc} strokeOpacity="0.13" strokeWidth="0.7" />

          {/* ── Eye ── */}
          <ellipse cx="527" cy="71" rx="6" ry="5.5" fill="#081520" fillOpacity="0.95" />
          <ellipse cx="528" cy="70" rx="2.8" ry="2.4" fill="#1a4e6e" fillOpacity="0.72" />
          <circle  cx="530" cy="69" r="1.1" fill="white" fillOpacity="0.46" />

          {/* ── Mottled skin patches ── */}
          {([
            [158,34,24,12],[242,26,20,9],[334,22,26,10],
            [422,33,17,8],[298,54,13,6],[178,60,11,5],
          ] as [number,number,number,number][]).map(([x,y,rx,ry], i) => (
            <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry}
              fill="#2a6e8e" fillOpacity="0.13" />
          ))}

          {/* ── Belly stripe glow ── */}
          <path d="M 195,126 Q 305,136 425,120"
            fill="none" stroke={acc} strokeOpacity="0.10" strokeWidth="3.5" strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Manta Ray ─────────────────────────────────────────────────── */
function MantaRay({
  top, delay, duration, flip = false,
}: { top: string; delay: string; duration: string; flip?: boolean }) {
  const C  = '#7df9ff';
  const id = `mr${delay.replace(/[^0-9]/g, '')}`;
  return (
    <div aria-hidden style={{
      position: 'absolute', top, left: 0,
      pointerEvents: 'none', willChange: 'transform',
      animation: `${flip ? 'swimLeft' : 'swimRight'} ${duration} linear ${delay} infinite`,
    }}>
      <div style={{ animation: 'whaleBob 8s ease-in-out infinite', willChange: 'transform' }}>
        <svg width="380" height="210" viewBox="0 0 380 210" style={{
          display: 'block',
          transform: flip ? 'scaleX(-1)' : undefined,
          filter: `drop-shadow(0 0 28px rgba(125,249,255,0.28)) drop-shadow(0 0 10px rgba(125,249,255,0.16))`,
        }}>
          <defs>
            <radialGradient id={`${id}w`} cx="0.5" cy="0.5" r="0.56">
              <stop offset="0%"   stopColor={C} stopOpacity="0.46" />
              <stop offset="55%"  stopColor={C} stopOpacity="0.20" />
              <stop offset="100%" stopColor={C} stopOpacity="0.04" />
            </radialGradient>
          </defs>

          {/* ── Upper wing (leading edge curves elegantly up and back) ── */}
          <path d={`
            M 340,105
            C 316,88 272,62 214,42
            C 158,22 94,14 48,22
            C 20,28 6,40 8,54
            C 10,68 30,76 64,82
            C 98,88 140,94 180,100
            C 220,106 280,108 340,105 Z`}
            fill={`url(#${id}w)`}
            stroke={C} strokeOpacity="0.50" strokeWidth="1.3"
          />

          {/* ── Lower wing ── */}
          <path d={`
            M 340,105
            C 280,102 220,104 180,110
            C 140,116 98,122 64,128
            C 30,134 10,142 8,156
            C 6,170 20,182 48,188
            C 94,196 158,188 214,168
            C 272,148 316,122 340,105 Z`}
            fill={`url(#${id}w)`}
            stroke={C} strokeOpacity="0.50" strokeWidth="1.3"
          />

          {/* ── Wing vein detail ── */}
          <path d="M 340,105 L 100,48"  stroke={C} strokeOpacity="0.13" strokeWidth="0.8" />
          <path d="M 340,105 L 30,60"   stroke={C} strokeOpacity="0.08" strokeWidth="0.6" />
          <path d="M 340,105 L 100,162" stroke={C} strokeOpacity="0.13" strokeWidth="0.8" />
          <path d="M 340,105 L 30,150"  stroke={C} strokeOpacity="0.08" strokeWidth="0.6" />

          {/* ── Central body ── */}
          <path d={`
            M 340,105
            C 356,98 370,100 374,106
            C 378,112 370,120 356,118
            C 346,116 342,111 340,105 Z`}
            fill={C} fillOpacity="0.36"
            stroke={C} strokeOpacity="0.60" strokeWidth="1.4"
          />

          {/* ── Cephalic fins (horns) ── */}
          <path d="M 358,97 C 364,86 368,76 362,68 C 354,76 352,88 358,97 Z"
            fill={C} fillOpacity="0.30"
            stroke={C} strokeOpacity="0.50" strokeWidth="1.1"
          />
          <path d="M 356,114 C 362,124 366,134 360,142 C 352,134 350,122 356,114 Z"
            fill={C} fillOpacity="0.30"
            stroke={C} strokeOpacity="0.50" strokeWidth="1.1"
          />

          {/* ── Mouth ── */}
          <path d="M 368,104 Q 376,108 370,114"
            fill="none" stroke={C} strokeOpacity="0.38" strokeWidth="1.5" strokeLinecap="round"
          />

          {/* ── Eyes ── */}
          <circle cx="362" cy="96"  r="3.0" fill={C} fillOpacity="0.88" />
          <circle cx="362.8" cy="95.2" r="1.1" fill="white" fillOpacity="0.50" />
          <circle cx="362" cy="116" r="3.0" fill={C} fillOpacity="0.88" />
          <circle cx="362.8" cy="115.2" r="1.1" fill="white" fillOpacity="0.50" />

          {/* ── Long whip tail ── */}
          <path d="M 165,106 C 120,102 75,98 40,96 C 20,95 8,96 2,100"
            fill="none" stroke={C} strokeOpacity="0.42" strokeWidth="1.8" strokeLinecap="round"
          />
          <path d="M 2,100 C -5,104 -6,108 -2,110"
            fill="none" stroke={C} strokeOpacity="0.22" strokeWidth="1.0" strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Anglerfish ────────────────────────────────────────────────── */
function Anglerfish({
  top, left,
}: { top: string; left: string }) {
  const C  = '#b14eff';
  const LC = '#b8ff80'; /* bioluminescent lure color — yellow-green */
  return (
    <div aria-hidden style={{
      position: 'absolute', top, left,
      pointerEvents: 'none', willChange: 'transform',
      animation: 'squidDrift 48s ease-in-out 0s infinite',
    }}>
      <svg width="220" height="260" viewBox="0 0 220 260" style={{
        filter: `drop-shadow(0 0 22px rgba(177,78,255,0.28)) drop-shadow(0 0 8px rgba(177,78,255,0.18))`,
      }}>
        <defs>
          <radialGradient id="af-body" cx="0.44" cy="0.46" r="0.58">
            <stop offset="0%"   stopColor="#2e1050" stopOpacity="0.85" />
            <stop offset="58%"  stopColor="#1a0830" stopOpacity="0.70" />
            <stop offset="100%" stopColor="#080412" stopOpacity="0.38" />
          </radialGradient>
          <radialGradient id="af-lure" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor={LC} stopOpacity="1.00" />
            <stop offset="45%"  stopColor={LC} stopOpacity="0.65" />
            <stop offset="100%" stopColor={LC} stopOpacity="0.00" />
          </radialGradient>
        </defs>

        {/* ── Illicium (fishing rod spine) ── */}
        <path d="M 148,55 C 138,32 118,12 96,2"
          fill="none" stroke="#3a1860" strokeOpacity="0.88" strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ── Esca outer glow halo ── */}
        <circle cx="94" cy="0" r="22" fill="url(#af-lure)" fillOpacity="0.50"
          style={{ animation: 'lurePulse 2.6s ease-in-out infinite' }}
        />
        {/* ── Esca mid glow ── */}
        <circle cx="94" cy="0" r="12" fill={LC} fillOpacity="0.80"
          style={{ animation: 'lurePulse 2.6s ease-in-out infinite' }}
        />
        {/* ── Esca core ── */}
        <circle cx="94" cy="0" r="6" fill="white" fillOpacity="0.95"
          style={{ animation: 'lurePulse 2.6s ease-in-out infinite' }}
        />
        {/* ── Light cast below lure ── */}
        <ellipse cx="94" cy="22" rx="24" ry="10" fill={LC} fillOpacity="0.08" />

        {/* ── Main body ── */}
        <path d={`
          M 55,135
          C 42,126 30,110 26,92
          C 22,74 24,54 35,40
          C 46,26 64,18 92,16
          C 120,14 142,22 158,38
          C 174,54 180,76 176,98
          C 172,120 160,138 144,148
          C 128,158 100,158 78,152
          C 64,146 56,140 55,135 Z`}
          fill="url(#af-body)"
          stroke={C} strokeOpacity="0.52" strokeWidth="1.6"
        />

        {/* ── Dorsal fin rays ── */}
        {([78,93,108,123,138] as number[]).map((x, i) => {
          const base = 16 + (x - 78) * 0.1;
          const h    = [18, 23, 21, 16, 10][i];
          return (
            <path key={i}
              d={`M ${x},${base} L ${x + 2},${base - h} L ${x + 4},${base}`}
              fill={C} fillOpacity="0.28"
              stroke={C} strokeOpacity="0.48" strokeWidth="0.9"
            />
          );
        })}

        {/* ── Upper jaw edge ── */}
        <path d="M 55,135 C 80,140 120,142 160,136"
          fill="none" stroke={C} strokeOpacity="0.40" strokeWidth="1"
        />

        {/* ── Lower jaw (extends further forward — hinged open) ── */}
        <path d={`
          M 62,140
          C 84,148 120,152 156,146
          C 170,143 180,137 178,130
          C 178,136 174,146 162,154
          C 144,164 112,168 82,164
          C 62,160 48,150 52,142 Z`}
          fill="url(#af-body)"
          stroke={C} strokeOpacity="0.44" strokeWidth="1.3"
        />

        {/* ── Lower teeth (curved in, like real anglerfish) ── */}
        {([67,82,97,112,128,146,162] as number[]).map((x, i) => {
          const h = [11, 15, 13, 16, 12, 10, 7][i];
          return (
            <path key={i}
              d={`M ${x},142 L ${x + 3},${142 - h} L ${x + 6},142`}
              fill="#180830" stroke={C} strokeOpacity="0.52" strokeWidth="0.9"
            />
          );
        })}

        {/* ── Upper teeth ── */}
        {([58,73,88,103,120,140,158,175] as number[]).map((x, i) => {
          const h = [12, 17, 15, 18, 14, 11, 9, 6][i];
          return (
            <path key={i}
              d={`M ${x},140 L ${x + 3},${140 + h} L ${x + 6},140`}
              fill="#180830" stroke={C} strokeOpacity="0.52" strokeWidth="0.9"
            />
          );
        })}

        {/* ── Gill slit ── */}
        <path d="M 48,95 Q 44,106 46,118"
          fill="none" stroke={C} strokeOpacity="0.38" strokeWidth="1.8" strokeLinecap="round"
        />

        {/* ── Eye (large, with reflected lure light) ── */}
        <circle cx="152" cy="58" r="12" fill="#080412" fillOpacity="0.94" />
        <circle cx="152" cy="58" r="12" fill="none" stroke={C} strokeOpacity="0.50" strokeWidth="1.4" />
        <circle cx="152" cy="58" r="5.5" fill="#1e0838" />
        {/* lure reflection in eye */}
        <circle cx="156" cy="53" r="3.5" fill={LC} fillOpacity="0.38" />
        <circle cx="157" cy="52" r="1.6" fill="white" fillOpacity="0.55" />

        {/* ── Pectoral fin ── */}
        <path d={`
          M 52,112
          C 34,120 20,132 16,144
          C 12,156 22,162 36,154
          C 46,146 50,128 52,112 Z`}
          fill={C} fillOpacity="0.22"
          stroke={C} strokeOpacity="0.38" strokeWidth="1.1"
        />

        {/* ── Photophores (bioluminescent spots along belly) ── */}
        {([
          [44,80],[38,96],[40,112],[44,128],[58,158],
          [80,164],[104,167],[128,162],[152,152],
        ] as [number,number][]).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.8 + (i % 2) * 0.9}
            fill={C} fillOpacity={0.34 + (i % 3) * 0.12}
          />
        ))}

        {/* ── Belly bioluminescent stripe ── */}
        <path d="M 55,160 Q 100,172 148,158"
          fill="none" stroke={C} strokeOpacity="0.18" strokeWidth="2.5" strokeLinecap="round"
        />
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
  const id = `jb-${hue}-${delay.replace(/\D/g, '')}`;
  return (
    <div aria-hidden style={{
      position: 'absolute', top, left,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      pointerEvents: 'none', willChange: 'transform',
      animation: `drift ${duration} ease-in-out ${delay} infinite`,
    }}>
      <div style={{ animation: `jellyfish 5s ease-in-out ${delay} infinite`, willChange: 'transform' }}>
        <svg width="148" height="240" viewBox="0 0 148 240"
          style={{ filter: `drop-shadow(0 0 28px ${G}cc) drop-shadow(0 0 10px ${G}66)` }}
        >
          <defs>
            <radialGradient id={id} cx="0.5" cy="0.28" r="0.64">
              <stop offset="0%"   stopColor={C} stopOpacity="0.78" />
              <stop offset="40%"  stopColor={C} stopOpacity="0.44" />
              <stop offset="80%"  stopColor={C} stopOpacity="0.14" />
              <stop offset="100%" stopColor={C} stopOpacity="0.02" />
            </radialGradient>
          </defs>

          {/* ── Bell ── */}
          <path d={`
            M 10,72 Q 10,10 74,10 Q 138,10 138,72
            Q 138,96 118,98 Q 103,100 103,84
            Q 91,99 74,84 Q 57,99 45,84
            Q 45,100 30,98 Q 10,96 10,72 Z`}
            fill={`url(#${id})`}
            stroke={C} strokeOpacity="0.82" strokeWidth="1.7"
          />

          {/* ── Inner radial canal lines (realistic jellyfish anatomy) ── */}
          {[30,50,65,74,83,98,118].map((x, i) => (
            <path key={`canal-${i}`}
              d={`M 74,22 Q ${x},50 ${x},74`}
              fill="none" stroke={C} strokeOpacity="0.18" strokeWidth="0.7"
            />
          ))}

          {/* ── Inner dome glow ── */}
          <ellipse cx="74" cy="46" rx="28" ry="22"
            fill={C} fillOpacity="0.16"
            stroke={C} strokeOpacity="0.38" strokeWidth="0.9"
          />
          {/* center nucleus */}
          <ellipse cx="74" cy="44" rx="10" ry="9"
            fill={C} fillOpacity="0.28" />

          {/* ── Oral arms (thick, wavy inner tentacles) ── */}
          {[38, 58, 74, 90, 110].map((x, i) => (
            <path key={`arm-${i}`}
              d={`M ${x},94
                  Q ${x + (i % 2 ? 10 : -10)},118
                    ${x + (i % 2 ? -8 : 8)},142
                  Q ${x + (i % 2 ? 6 : -6)},162
                    ${x + (i % 2 ? -4 : 4)},178`}
              fill="none" stroke={C}
              strokeOpacity={i === 2 ? 0.70 : 0.52}
              strokeWidth={i === 2 ? 2.0 : 1.4}
              strokeLinecap="round"
            />
          ))}

          {/* ── Trailing tentacles (long, thin, organic) ── */}
          {[14, 28, 42, 56, 70, 78, 92, 106, 120, 134].map((x, i) => (
            <path key={`t-${i}`}
              d={`M ${x},92
                  Q ${x + (i % 2 ? 9 : -9)},122
                    ${x + (i % 2 ? -7 : 7)},152
                  Q ${x + (i % 2 ? 5 : -5)},176
                    ${x + (i % 2 ? -3 : 3)},200
                  Q ${x},218 ${x + (i % 2 ? 2 : -2)},236`}
              fill="none" stroke={C}
              strokeOpacity={0.38 + (i % 3) * 0.12}
              strokeWidth={0.8 + (i % 4 === 0 ? 0.4 : 0)}
              strokeLinecap="round"
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
    [28,28],[44,22],[58,28],[68,44],[22,52],
    [72,58],[36,72],[56,76],[44,56],[30,40],
  ];
  return (
    <div aria-hidden style={{
      position: 'absolute', top, left,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      pointerEvents: 'none', willChange: 'transform',
      animation: `squidDrift ${duration} ease-in-out ${delay} infinite`,
    }}>
      <svg width="96" height="155" viewBox="0 0 96 155"
        style={{ filter: `drop-shadow(0 0 22px ${C}99) drop-shadow(0 0 8px ${C}55)` }}
      >
        <defs>
          <radialGradient id={`sq${delay.replace(/\D/g,'')}`} cx="0.5" cy="0.28" r="0.62">
            <stop offset="0%"   stopColor={C} stopOpacity="0.62" />
            <stop offset="65%"  stopColor={C} stopOpacity="0.26" />
            <stop offset="100%" stopColor={C} stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* mantle */}
        <path d="M 18,12 Q 8,38 10,74 Q 12,100 48,112 Q 84,100 86,74 Q 88,38 78,12 Q 64,2 48,0 Q 32,2 18,12 Z"
          fill={`url(#sq${delay.replace(/\D/g,'')})`}
          stroke={C} strokeOpacity="0.72" strokeWidth="1.5"
        />
        {/* fins */}
        <path d="M 14,70 Q 2,90 10,102 Q 20,85 22,74 Z"
          fill={C} fillOpacity="0.30" stroke={C} strokeOpacity="0.56" strokeWidth="1.1" />
        <path d="M 82,70 Q 94,90 86,102 Q 76,85 74,74 Z"
          fill={C} fillOpacity="0.30" stroke={C} strokeOpacity="0.56" strokeWidth="1.1" />
        {/* 2 long tentacles */}
        <path d="M 40,114 Q 32,130 28,155"
          fill="none" stroke={C} strokeOpacity="0.72" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M 56,114 Q 64,130 68,155"
          fill="none" stroke={C} strokeOpacity="0.72" strokeWidth="1.6" strokeLinecap="round"/>
        <ellipse cx="28" cy="153" rx="3" ry="2" fill={C} fillOpacity="0.42" />
        <ellipse cx="68" cy="153" rx="3" ry="2" fill={C} fillOpacity="0.42" />
        {/* 8 shorter arms */}
        {[30,36,42,46,50,54,60,66].map((x, i) => {
          const spread = (i - 3.5) * 4.5;
          return (
            <path key={i}
              d={`M ${x},112 Q ${x + spread},130 ${x + spread * 1.6},142`}
              fill="none" stroke={C}
              strokeOpacity={0.50 + (i % 2) * 0.14}
              strokeWidth="1.1" strokeLinecap="round"
            />
          );
        })}
        {/* eyes */}
        <ellipse cx="34" cy="52" rx="7" ry="8" fill="none" stroke={C} strokeOpacity="0.78" strokeWidth="1.4" />
        <ellipse cx="34" cy="52" rx="3.5" ry="4" fill={C} fillOpacity="0.72" />
        <circle cx="32.5" cy="50.5" r="1.2" fill="white" fillOpacity="0.52" />
        <ellipse cx="62" cy="52" rx="7" ry="8" fill="none" stroke={C} strokeOpacity="0.78" strokeWidth="1.4" />
        <ellipse cx="62" cy="52" rx="3.5" ry="4" fill={C} fillOpacity="0.72" />
        <circle cx="60.5" cy="50.5" r="1.2" fill="white" fillOpacity="0.52" />
        {/* chromatophores */}
        {spots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.4 + (i % 3) * 0.5}
            fill={C} fillOpacity={0.40 + (i % 2) * 0.18} />
        ))}
      </svg>
    </div>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────── */
export default function Creatures() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>

      {/* ── Giant Blue Whales (two passes, opposite directions) ── */}
      <GiantWhale top="8%"  delay="-32s" duration="100s" />
      <GiantWhale top="48%" delay="-20s" duration="85s"  flip />

      {/* ── Manta Ray ── */}
      <MantaRay top="28%" delay="-15s" duration="68s" flip />

      {/* ── Anglerfish — lurks in the deep, near bottom ── */}
      <Anglerfish top="66%" left="22%" />

      {/* ── Jellyfish (scattered at varied depths) ── */}
      <Jellyfish top="6%"  left="6%"  scale={0.92} hue="cyan"    delay="0s"   duration="21s" />
      <Jellyfish top="34%" left="78%" scale={1.15} hue="magenta" delay="-8s"  duration="28s" />
      <Jellyfish top="58%" left="55%" scale={0.72} hue="ice"     delay="-14s" duration="23s" />
      <Jellyfish top="20%" left="42%" scale={0.82} hue="cyan"    delay="-4s"  duration="19s" />
      <Jellyfish top="72%" left="78%" scale={0.65} hue="magenta" delay="-9s"  duration="25s" />

      {/* ── Squids (drifting, mid-deep) ── */}
      <Squid top="42%" left="60%" scale={1.00} delay="0s"   duration="34s" />
      <Squid top="70%" left="15%" scale={0.82} delay="-12s" duration="27s" />
    </div>
  );
}
