import type { ReactNode } from "react";
import type { AccentColor, MediaArtKind } from "@/lib/types";
import { ACCENT_HEX } from "@/lib/types";

/* Deterministic PRNG. IMPORTANT: each renderer builds its OWN rng inside its
 * render from the seed — never share a stateful rng across components, or
 * React StrictMode's double-invoke desyncs server/client (hydration mismatch). */
function makeRng(seed: string) {
  let a = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) a = Math.imul(a ^ seed.charCodeAt(i), 16777619);
  return () => {
    a += 0x6d2b79f5;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---- shared bits -------------------------------------------------- */

function GridFloor({ c }: { c: string }) {
  const lines: ReactNode[] = [];
  for (let i = -6; i <= 6; i++) {
    lines.push(
      <line key={`v${i}`} x1={160 + i * 22} y1={110} x2={160 + i * 60} y2={180} stroke={c} strokeWidth={0.6} opacity={0.25} />,
    );
  }
  for (let i = 0; i < 5; i++) {
    const y = 112 + i * i * 3.2;
    lines.push(<line key={`h${i}`} x1={0} y1={y} x2={320} y2={y} stroke={c} strokeWidth={0.6} opacity={0.22} />);
  }
  return <g>{lines}</g>;
}

/* ---- subject renderers (each builds its own rng) ------------------ */

function Weapon({ c, seed, variant }: { c: string; seed: string; variant?: string }) {
  const rng = makeRng(seed);
  const soft = `${c}22`;
  const s = { stroke: c, strokeWidth: 2, fill: soft } as const;
  let body: ReactNode;
  switch (variant) {
    case "pistol":
      body = (
        <g>
          <rect x={150} y={86} width={78} height={15} rx={2} {...s} />
          <path d="M150 101 l6 40 h18 l6 -40 z" {...s} />
          <path d="M158 104 q14 8 28 0" fill="none" stroke={c} strokeWidth={2} />
        </g>
      );
      break;
    case "smg":
      body = (
        <g>
          <rect x={104} y={88} width={116} height={16} rx={2} {...s} />
          <polygon points="86,90 104,90 104,106 88,110" {...s} />
          <rect x={150} y={104} width={13} height={30} rx={1} {...s} />
          <path d="M132 104 l5 30 h12 l4 -30 z" {...s} />
          <rect x={220} y={92} width={30} height={6} {...s} />
        </g>
      );
      break;
    case "sniper":
      body = (
        <g>
          <rect x={56} y={96} width={214} height={6} rx={2} {...s} />
          <rect x={120} y={90} width={92} height={17} rx={2} {...s} />
          <rect x={148} y={72} width={74} height={12} rx={6} {...s} />
          <circle cx={158} cy={78} r={4} fill="none" stroke={c} strokeWidth={1.5} />
          <circle cx={212} cy={78} r={4} fill="none" stroke={c} strokeWidth={1.5} />
          <path d="M150 107 l6 34 h16 l5 -34 z" {...s} />
          <line x1={250} y1={102} x2={244} y2={132} stroke={c} strokeWidth={2} />
          <line x1={258} y1={102} x2={266} y2={132} stroke={c} strokeWidth={2} />
        </g>
      );
      break;
    case "heavy":
      body = (
        <g>
          <rect x={80} y={84} width={160} height={22} rx={2} {...s} />
          <circle cx={150} cy={120} r={18} {...s} />
          <polygon points="60,82 80,84 80,108 62,112" {...s} />
          <rect x={240} y={89} width={54} height={9} {...s} />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={248 + i * 9} y1={89} x2={248 + i * 9} y2={98} stroke={c} strokeWidth={1.4} />
          ))}
        </g>
      );
      break;
    default: // rifle & fallback
      body = (
        <g>
          <rect x={78} y={88} width={168} height={14} rx={2} {...s} />
          <polygon points="52,86 78,88 78,104 56,110" {...s} />
          <path d="M118 102 l5 36 h18 l3 -36 z" {...s} />
          <path d="M150 102 l6 26 h14 l4 -26 z" {...s} />
          <rect x={246} y={92} width={38} height={6} {...s} />
          <rect x={108} y={80} width={10} height={9} {...s} />
        </g>
      );
  }
  const flash = rng() > 0.4;
  return (
    <g style={{ filter: `drop-shadow(0 0 5px ${c})` }}>
      <circle cx={160} cy={95} r={62} fill="none" stroke={c} strokeWidth={0.8} opacity={0.35} />
      <line x1={90} y1={95} x2={118} y2={95} stroke={c} strokeWidth={0.8} opacity={0.5} />
      {body}
      {flash && (
        <g opacity={0.8}>
          {[0, 1, 2].map((i) => (
            <line key={i} x1={286} y1={95} x2={300 + i * 3} y2={88 + i * 7} stroke={c} strokeWidth={1.4} />
          ))}
        </g>
      )}
    </g>
  );
}

function TacticalMap({ c, seed }: { c: string; seed: string }) {
  const rng = makeRng(seed);
  const range = (min: number, max: number) => min + rng() * (max - min);
  const ax = range(80, 130);
  const ay = range(50, 80);
  const bx = range(190, 240);
  const by = range(95, 130);
  const sweepA = rng() * 6.28;
  const Site = ({ x, y, label }: { x: number; y: number; label: string }) => (
    <g style={{ filter: `drop-shadow(0 0 4px ${c})` }}>
      <rect x={x - 13} y={y - 13} width={26} height={26} transform={`rotate(45 ${x} ${y})`} fill={`${c}22`} stroke={c} strokeWidth={1.6} />
      <text x={x} y={y + 4} fontSize={13} fontFamily="monospace" fill={c} textAnchor="middle" fontWeight="700">{label}</text>
    </g>
  );
  return (
    <g>
      <rect x={46} y={22} width={228} height={136} rx={6} fill="none" stroke={c} strokeWidth={1.6} opacity={0.85} />
      {[70, 110, 150, 190, 230].map((x) => (
        <line key={x} x1={x} y1={24} x2={x} y2={156} stroke={c} strokeWidth={0.5} opacity={0.12} />
      ))}
      {[52, 90, 128].map((y) => (
        <line key={y} x1={48} y1={y} x2={272} y2={y} stroke={c} strokeWidth={0.5} opacity={0.12} />
      ))}
      <polyline points={`60,150 ${ax},${ay + 18} ${bx - 20},${by}`} fill="none" stroke={c} strokeWidth={1.4} opacity={0.5} strokeDasharray="4 4" />
      <polyline points={`260,30 ${bx},${by - 16} ${ax + 16},${ay}`} fill="none" stroke={c} strokeWidth={1.4} opacity={0.5} strokeDasharray="4 4" />
      <Site x={ax} y={ay} label="A" />
      <Site x={bx} y={by} label="B" />
      <polygon points="150,150 144,160 156,160" fill={c} opacity={0.7} />
      <circle cx={160} cy={90} r={2.4} fill={c} />
      <line x1={160} y1={90} x2={160 + Math.cos(sweepA) * 60} y2={90 + Math.sin(sweepA) * 40} stroke={c} strokeWidth={1} opacity={0.6} />
      <text x={52} y={18} fontSize={7} fontFamily="monospace" fill={c} opacity={0.6}>RADAR//OVERVIEW</text>
    </g>
  );
}

function PlayerId({ c, seed, initials }: { c: string; seed: string; initials: string }) {
  const rng = makeRng(seed);
  const bars = [0, 1, 2, 3, 4].map(() => rng() > 0.5);
  const Bracket = ({ x, y, sx, sy }: { x: number; y: number; sx: number; sy: number }) => (
    <path d={`M${x} ${y + sy * 18} V${y} H${x + sx * 18}`} fill="none" stroke={c} strokeWidth={2} />
  );
  return (
    <g>
      <Bracket x={20} y={20} sx={1} sy={1} />
      <Bracket x={220} y={20} sx={-1} sy={1} />
      <Bracket x={20} y={300} sx={1} sy={-1} />
      <Bracket x={220} y={300} sx={-1} sy={-1} />
      <g style={{ filter: `drop-shadow(0 0 6px ${c})` }}>
        <circle cx={120} cy={120} r={44} fill={`${c}18`} stroke={c} strokeWidth={2} />
        <path d="M52 250 Q120 158 188 250 L188 268 L52 268 Z" fill={`${c}18`} stroke={c} strokeWidth={2} />
      </g>
      <line x1={30} y1={120} x2={210} y2={120} stroke={c} strokeWidth={0.8} opacity={0.4} strokeDasharray="3 5" />
      <text x={120} y={214} fontSize={44} fontFamily="monospace" fontWeight="800" fill={c} textAnchor="middle" style={{ filter: `drop-shadow(0 0 6px ${c})` }}>{initials}</text>
      {bars.map((on, i) => (
        <rect key={i} x={70 + i * 20} y={284} width={12} height={6} fill={c} opacity={on ? 0.8 : 0.3} />
      ))}
      <text x={30} y={40} fontSize={9} fontFamily="monospace" fill={c} opacity={0.7}>ID//PLAYER</text>
    </g>
  );
}

function Trophy({ c, seed }: { c: string; seed: string }) {
  const rng = makeRng(seed);
  const rays = 6 + Math.floor(rng() * 7);
  return (
    <g style={{ filter: `drop-shadow(0 0 6px ${c})` }}>
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i / rays) * Math.PI * 2;
        return <line key={i} x1={160} y1={78} x2={160 + Math.cos(a) * 78} y2={78 + Math.sin(a) * 62} stroke={c} strokeWidth={1} opacity={0.22} />;
      })}
      <path d="M120 52 h80 v10 q0 34 -40 42 q-40 -8 -40 -42 z" fill={`${c}22`} stroke={c} strokeWidth={2} />
      <path d="M120 58 q-22 2 -22 -18" fill="none" stroke={c} strokeWidth={2} />
      <path d="M200 58 q22 2 22 -18" fill="none" stroke={c} strokeWidth={2} />
      <rect x={150} y={104} width={20} height={16} fill={`${c}22`} stroke={c} strokeWidth={2} />
      <rect x={130} y={120} width={60} height={9} fill={`${c}22`} stroke={c} strokeWidth={2} />
      <rect x={138} y={130} width={44} height={8} fill={`${c}22`} stroke={c} strokeWidth={2} />
      <path d="M160 34 l4 8 9 1 -6.5 6 1.5 9 -8 -4.5 -8 4.5 1.5 -9 -6.5 -6 9 -1 z" fill={c} />
    </g>
  );
}

function KzRun({ c }: { c: string }) {
  return (
    <g style={{ filter: `drop-shadow(0 0 4px ${c})` }}>
      <line x1={16} y1={150} x2={304} y2={150} stroke={c} strokeWidth={1.4} opacity={0.6} />
      <rect x={28} y={136} width={18} height={14} fill={`${c}22`} stroke={c} strokeWidth={1.6} />
      <rect x={258} y={128} width={30} height={22} fill={`${c}22`} stroke={c} strokeWidth={1.6} />
      <path d="M48 136 Q160 30 272 128" fill="none" stroke={c} strokeWidth={2} strokeDasharray="2 6" />
      <polygon points="160,44 154,56 166,56" fill={c} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={40 + i * 34} y={162} width={22} height={6} fill={c} opacity={i < 4 ? 0.85 : 0.28} />
      ))}
      <text x={20} y={26} fontSize={8} fontFamily="monospace" fill={c} opacity={0.7}>TRAJECTORY//KZ</text>
    </g>
  );
}

function ModeEmblem({ c, seed }: { c: string; seed: string }) {
  const rng = makeRng(seed);
  const nodes = 4 + Math.floor(rng() * 4);
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 })
      .map((_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
      })
      .join(" ");
  return (
    <g style={{ filter: `drop-shadow(0 0 5px ${c})` }}>
      <polygon points={hex(160, 90, 52)} fill="none" stroke={c} strokeWidth={2} />
      <polygon points={hex(160, 90, 40)} fill={`${c}18`} stroke={c} strokeWidth={0.8} opacity={0.6} />
      <polygon points="146,70 146,110 180,90" fill={c} style={{ filter: `drop-shadow(0 0 4px ${c})` }} />
      {Array.from({ length: nodes }).map((_, i) => {
        const a = (i / nodes) * Math.PI * 2;
        return <circle key={i} cx={160 + Math.cos(a) * 72} cy={90 + Math.sin(a) * 58} r={3} fill={c} opacity={0.8} />;
      })}
      <text x={112} y={30} fontSize={8} fontFamily="monospace" fill={c} opacity={0.7}>GAME//MODE</text>
    </g>
  );
}

function EraRing({ c, seed }: { c: string; seed: string }) {
  const rng = makeRng(seed);
  const extra = rng() > 0.5;
  return (
    <g style={{ filter: `drop-shadow(0 0 5px ${c})` }}>
      {[54, 40, 26].map((r, i) => (
        <circle key={r} cx={160} cy={90} r={r} fill="none" stroke={c} strokeWidth={i === 0 ? 1.8 : 1} opacity={0.5 + i * 0.15} strokeDasharray={i === 1 ? "5 5" : undefined} />
      ))}
      <line x1={20} y1={90} x2={300} y2={90} stroke={c} strokeWidth={1} opacity={0.4} />
      {[40, 80, 120, 200, 240, 280].map((x) => (
        <line key={x} x1={x} y1={86} x2={x} y2={94} stroke={c} strokeWidth={1} opacity={0.5} />
      ))}
      <circle cx={160} cy={90} r={5} fill={c} />
      <circle cx={160} cy={90} r={11} fill="none" stroke={c} strokeWidth={1} opacity={0.7} />
      {extra && <circle cx={200} cy={90} r={3} fill={c} opacity={0.8} />}
      <text x={20} y={26} fontSize={8} fontFamily="monospace" fill={c} opacity={0.7}>TIMELINE//NODE</text>
    </g>
  );
}

/* ---- dispatcher --------------------------------------------------- */

export function MediaArt({
  art,
  seed,
  accent = "cyan",
  label,
  variant,
  className,
}: {
  art: MediaArtKind;
  seed: string;
  accent?: AccentColor;
  label?: string;
  variant?: string;
  className?: string;
}) {
  const c = ACCENT_HEX[accent];
  const s = seed + art;

  if (art === "player") {
    const initials =
      (label ?? "").replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "CS";
    return (
      <svg viewBox="0 0 240 320" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
        <PlayerId c={c} seed={s} initials={initials} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      {(art === "weapon" || art === "kz") && <GridFloor c={c} />}
      {art === "weapon" && <Weapon c={c} seed={s} variant={variant} />}
      {art === "map" && <TacticalMap c={c} seed={s} />}
      {art === "tournament" && <Trophy c={c} seed={s} />}
      {art === "kz" && <KzRun c={c} />}
      {art === "mode" && <ModeEmblem c={c} seed={s} />}
      {art === "history" && <EraRing c={c} seed={s} />}
    </svg>
  );
}
