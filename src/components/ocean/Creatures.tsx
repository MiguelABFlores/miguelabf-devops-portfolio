type JellyProps = {
  top: string;
  left: string;
  scale?: number;
  hue?: 'cyan' | 'magenta' | 'ice';
  delay?: string;
  duration?: string;
};

function Jellyfish({
  top,
  left,
  scale = 1,
  hue = 'cyan',
  delay = '0s',
  duration = '24s',
}: JellyProps) {
  const color =
    hue === 'magenta' ? '#b14eff' : hue === 'ice' ? '#7df9ff' : '#00d4ff';
  return (
    <div
      className="absolute pointer-events-none animate-drift"
      style={{
        top,
        left,
        transform: `scale(${scale})`,
        animationDelay: delay,
        animationDuration: duration,
      }}
      aria-hidden
    >
      <div className="animate-jellyfish" style={{ animationDelay: delay }}>
        <svg width="120" height="180" viewBox="0 0 120 180" style={{ filter: `drop-shadow(0 0 14px ${color}88)` }}>
          <defs>
            <radialGradient id={`bell-${hue}-${left}`} cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor={color} stopOpacity="0.6" />
              <stop offset="60%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* bell */}
          <path
            d="M10,60 Q10,10 60,10 Q110,10 110,60 Q110,80 95,82 Q80,84 80,70 Q70,82 60,70 Q50,82 40,70 Q40,84 25,82 Q10,80 10,60 Z"
            fill={`url(#bell-${hue}-${left})`}
            stroke={color}
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          {/* tentacles */}
          {[20, 35, 50, 65, 80, 95].map((x, i) => (
            <path
              key={i}
              d={`M${x},78 Q${x + (i % 2 ? 4 : -4)},110 ${x + (i % 2 ? -3 : 3)},150 Q${x},168 ${x},178`}
              fill="none"
              stroke={color}
              strokeOpacity={0.35 + (i % 2) * 0.1}
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function Fish({
  top,
  left,
  delay = '0s',
  duration = '38s',
  scale = 1,
}: {
  top: string;
  left: string;
  delay?: string;
  duration?: string;
  scale?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none animate-drift-slow"
      style={{
        top,
        left,
        transform: `scale(${scale})`,
        animationDelay: delay,
        animationDuration: duration,
      }}
      aria-hidden
    >
      <svg width="80" height="32" viewBox="0 0 80 32" style={{ filter: 'drop-shadow(0 0 8px #7df9ff66)' }}>
        <path
          d="M5,16 Q15,4 40,8 Q62,12 70,16 Q62,20 40,24 Q15,28 5,16 Z M70,16 L80,8 L78,16 L80,24 Z"
          fill="#7df9ff"
          fillOpacity="0.18"
          stroke="#7df9ff"
          strokeOpacity="0.45"
          strokeWidth="0.8"
        />
        <circle cx="22" cy="14" r="1.2" fill="#7df9ff" />
      </svg>
    </div>
  );
}

export default function Creatures() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Jellyfish top="12%" left="8%" scale={0.8} hue="cyan" delay="0s" duration="22s" />
      <Jellyfish top="38%" left="78%" scale={1.05} hue="magenta" delay="-6s" duration="28s" />
      <Jellyfish top="62%" left="20%" scale={0.65} hue="ice" delay="-12s" duration="20s" />
      <Fish top="22%" left="55%" delay="0s" duration="42s" scale={0.9} />
      <Fish top="48%" left="35%" delay="-12s" duration="50s" scale={0.7} />
      <Fish top="72%" left="65%" delay="-22s" duration="46s" scale={0.85} />
    </div>
  );
}
