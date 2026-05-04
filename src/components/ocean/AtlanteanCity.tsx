export default function AtlanteanCity() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[42vh] pointer-events-none animate-drift-slow"
      style={{ filter: 'blur(6px)', opacity: 0.55 }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1600 500"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="cityGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d2a4d" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#06122a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020611" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="domeLight" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#7df9ff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7df9ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="domeLightMag" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#b14eff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#b14eff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* far back ridge */}
        <path
          d="M0,360 L80,330 L160,345 L240,300 L320,330 L400,290 L500,320 L600,280 L700,310 L820,275 L920,310 L1020,285 L1120,315 L1240,290 L1340,320 L1450,300 L1600,330 L1600,500 L0,500 Z"
          fill="#081428"
          opacity="0.6"
        />

        {/* mid ridge with domes */}
        <g opacity="0.85">
          {/* tower 1 */}
          <path d="M120,420 L120,330 L150,300 L180,330 L180,420 Z" fill="url(#cityGrad)" />
          {/* dome 1 */}
          <path d="M250,420 L250,360 Q250,300 310,300 Q370,300 370,360 L370,420 Z" fill="url(#cityGrad)" />
          <circle cx="310" cy="320" r="40" fill="url(#domeLight)" />
          {/* spire */}
          <path d="M420,420 L430,260 L440,420 Z" fill="url(#cityGrad)" />
          <circle cx="430" cy="262" r="14" fill="url(#domeLightMag)" />
          {/* tower cluster */}
          <path d="M500,420 L500,310 L530,290 L560,310 L560,420 Z" fill="url(#cityGrad)" />
          <path d="M580,420 L580,340 L605,322 L630,340 L630,420 Z" fill="url(#cityGrad)" />
          {/* big central dome */}
          <path
            d="M700,420 L700,330 Q700,240 800,240 Q900,240 900,330 L900,420 Z"
            fill="url(#cityGrad)"
          />
          <circle cx="800" cy="262" r="64" fill="url(#domeLight)" />
          <path d="M800,160 L800,240" stroke="#7df9ff" strokeWidth="2" opacity="0.7" />
          <circle cx="800" cy="156" r="6" fill="#7df9ff" />
          {/* second dome */}
          <path d="M960,420 L960,360 Q960,300 1010,300 Q1060,300 1060,360 L1060,420 Z" fill="url(#cityGrad)" />
          <circle cx="1010" cy="320" r="32" fill="url(#domeLightMag)" />
          {/* tall arch tower */}
          <path d="M1110,420 L1110,300 L1140,275 L1170,300 L1170,420 Z M1130,420 L1130,360 L1150,360 L1150,420 Z" fill="url(#cityGrad)" />
          {/* far right cluster */}
          <path d="M1230,420 L1230,330 L1260,310 L1290,330 L1290,420 Z" fill="url(#cityGrad)" />
          <path d="M1320,420 L1320,360 Q1320,310 1370,310 Q1420,310 1420,360 L1420,420 Z" fill="url(#cityGrad)" />
          <circle cx="1370" cy="328" r="28" fill="url(#domeLight)" />
          <path d="M1470,420 L1480,265 L1490,420 Z" fill="url(#cityGrad)" />
          <circle cx="1480" cy="268" r="12" fill="url(#domeLightMag)" />
        </g>

        {/* foreground sea floor */}
        <path
          d="M0,460 Q300,430 700,455 Q1100,475 1600,440 L1600,500 L0,500 Z"
          fill="#020611"
        />

        {/* tiny window lights */}
        <g fill="#7df9ff" opacity="0.7">
          <circle cx="150" cy="370" r="1.4" />
          <circle cx="305" cy="380" r="1.4" />
          <circle cx="320" cy="395" r="1.4" />
          <circle cx="540" cy="370" r="1.4" />
          <circle cx="610" cy="370" r="1.4" />
          <circle cx="780" cy="380" r="1.6" />
          <circle cx="820" cy="380" r="1.6" />
          <circle cx="800" cy="400" r="1.6" />
          <circle cx="1010" cy="380" r="1.4" />
          <circle cx="1140" cy="350" r="1.4" />
          <circle cx="1260" cy="380" r="1.4" />
          <circle cx="1370" cy="380" r="1.4" />
        </g>
      </svg>
    </div>
  );
}
