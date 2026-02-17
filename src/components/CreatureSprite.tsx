"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";
import type { StoredCreatureV1 } from "@/lib/selected-creature";

const GLOBAL_STYLE_ID = "tt-creature-sprite-global-styles-v1";

function ensureCreatureSpriteGlobalStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(GLOBAL_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = GLOBAL_STYLE_ID;
  style.textContent = `
@keyframes blink {
  0%, 92%, 100% { transform: scaleY(1); }
  94%, 96% { transform: scaleY(0.10); }
}
@keyframes pupil {
  0%, 100% { transform: translate(0px, 0px); }
  50% { transform: translate(2px, 1px); }
}
/* STRICT: no rotations, no spins */
@keyframes bob {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes breathe {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-4px) scale(1.02); }
}
`;
  document.head.appendChild(style);
}

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rarityBoost(r: StoredCreatureV1["rarity"]) {
  if (r === "Legend") return { sat: 92, lit: 58, glow: 0.26 };
  if (r === "Epic") return { sat: 88, lit: 56, glow: 0.2 };
  if (r === "Rare") return { sat: 82, lit: 54, glow: 0.16 };
  return { sat: 74, lit: 52, glow: 0.12 };
}

export default function CreatureSprite({
  c,
  scale = 1,
  className,
  showTag = true,
}: {
  c: StoredCreatureV1;
  scale?: number; // 1 = 240px sprite, 0.75 = compact tiles, etc.
  className?: string;
  showTag?: boolean;
}) {
  useEffect(() => {
    ensureCreatureSpriteGlobalStyles();
  }, []);

  const s = xmur3(c.id)();
  const rnd = mulberry32(s);

  const boost = rarityBoost(c.rarity);
  const bodyA = `hsla(${c.hue}, ${boost.sat}%, ${boost.lit}%, 0.28)`;
  const bodyB = `hsla(${c.hue2}, ${Math.min(96, boost.sat + 6)}%, ${Math.min(62, boost.lit + 8)}%, 0.20)`;

  const glow = `0 18px 60px rgba(0,0,0,0.35), 0 0 34px hsla(${c.hue}, 90%, 60%, ${boost.glow})`;

  const dur = Math.floor(2700 + rnd() * 1800);
  const blinkMs = Math.floor(2600 + rnd() * 2400);
  const pupilMs = Math.floor(1600 + rnd() * 1800);

  const motionStyle: CSSProperties = {
    animation: `${c.motion} ${dur}ms ease-in-out infinite`,
    willChange: "transform",
  };

  const borderRadius = (() => {
    if (c.shape === "pill") return "999px";
    if (c.shape === "rounded") return "64px";
    if (c.shape === "soft") return "54px";
    return "44px";
  })();

  // STRICT, SYMMETRICAL FACE GEOMETRY
  const eyeY = 86;
  const eyeDx = 34;
  const mouthY = 136;

  const blinkStyle: CSSProperties = {
    animation: `blink ${blinkMs}ms ease-in-out infinite`,
    transformOrigin: "50% 55%",
    willChange: "transform",
  };

  const pupilDrift: CSSProperties = {
    animation: `pupil ${pupilMs}ms ease-in-out infinite`,
    willChange: "transform",
  };

  const Eye = ({ leftPct }: { leftPct: number }) => {
    const wrap: CSSProperties = {
      left: `${leftPct}%`,
      top: eyeY,
      transform: "translateX(-50%)",
    };

    if (c.eyes === "dot") {
      return (
        <div className="absolute" style={wrap}>
          <div className="w-[18px] h-[18px] rounded-full bg-white/90" style={blinkStyle}>
            <div className="w-[7px] h-[7px] rounded-full bg-black/80 mx-auto mt-[6px]" style={pupilDrift} />
          </div>
        </div>
      );
    }

    if (c.eyes === "sleepy") {
      return (
        <div className="absolute" style={wrap}>
          <div className="w-[22px] h-[18px] rounded-full bg-white/85" style={blinkStyle}>
            <div className="w-[10px] h-[6px] rounded-full bg-black/75 mx-auto mt-[7px]" style={pupilDrift} />
          </div>
        </div>
      );
    }

    if (c.eyes === "sparkle") {
      return (
        <div className="absolute" style={wrap}>
          <div className="w-[22px] h-[22px] rounded-full bg-white/92" style={blinkStyle}>
            <div className="w-[9px] h-[9px] rounded-full bg-black/80 mx-auto mt-[7px]" style={pupilDrift} />
            <div className="absolute left-[5px] top-[5px] w-[6px] h-[6px] rounded-full bg-white/90" />
            <div className="absolute left-[11px] top-[9px] w-[3px] h-[3px] rounded-full bg-white/80" />
          </div>
        </div>
      );
    }

    // oval (default)
    return (
      <div className="absolute" style={wrap}>
        <div className="w-[24px] h-[20px] rounded-full bg-white/92" style={blinkStyle}>
          <div className="w-[9px] h-[9px] rounded-full bg-black/80 mx-auto mt-[6px]" style={pupilDrift} />
          <div className="absolute left-[6px] top-[5px] w-[5px] h-[5px] rounded-full bg-white/85" />
        </div>
      </div>
    );
  };

  const Mouth = () => {
    const base = "absolute left-1/2 -translate-x-1/2";
    const stroke = "rgba(255,255,255,0.78)";

    if (c.mouth === "tiny") {
      return (
        <div className={base} style={{ top: mouthY }}>
          <div className="w-[16px] h-[10px] rounded-b-full border-b-[3px]" style={{ borderColor: stroke }} />
        </div>
      );
    }

    if (c.mouth === "open") {
      return (
        <div className={base} style={{ top: mouthY - 2 }}>
          <div
            className="relative w-[22px] h-[18px] rounded-full border"
            style={{ borderColor: "rgba(255,255,255,0.55)", background: "rgba(0,0,0,0.22)" }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[2px] w-[12px] h-[8px] rounded-full bg-pink-200/30" />
          </div>
        </div>
      );
    }

    if (c.mouth === "cat") {
      return (
        <div className={base} style={{ top: mouthY }}>
          <div className="relative w-[34px] h-[16px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-[2px] w-[4px] h-[4px] rounded-full bg-white/60" />
            <div className="absolute left-[0px] top-[2px] w-[16px] h-[12px] rounded-b-full border-b-[3px]" style={{ borderColor: stroke }} />
            <div className="absolute right-[0px] top-[2px] w-[16px] h-[12px] rounded-b-full border-b-[3px]" style={{ borderColor: stroke }} />
          </div>
        </div>
      );
    }

    // smile (default)
    return (
      <div className={base} style={{ top: mouthY }}>
        <div className="w-[40px] h-[16px] rounded-b-full border-b-[3px]" style={{ borderColor: stroke }} />
      </div>
    );
  };

  const Accessory = () => {
    if (c.accessory === "none") return null;

    if (c.accessory === "halo") {
      return (
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[14px] w-[92px] h-[28px] rounded-full border border-white/20"
          style={{
            background: "rgba(255,255,255,0.06)",
            boxShadow: `0 0 28px hsla(${c.hue},90%,60%,0.30)`,
          }}
        />
      );
    }

    if (c.accessory === "bow") {
      return (
        <div className="absolute left-1/2 -translate-x-1/2 -top-[10px] w-[92px] h-[38px]">
          <div
            className="absolute left-[0px] top-[10px] w-[40px] h-[22px] rounded-full border border-white/20"
            style={{ background: `hsla(${c.hue2}, 90%, 62%, 0.20)` }}
          />
          <div
            className="absolute right-[0px] top-[10px] w-[40px] h-[22px] rounded-full border border-white/20"
            style={{ background: `hsla(${c.hue}, 90%, 62%, 0.20)` }}
          />
          <div className="absolute left-1/2 -translate-x-1/2 top-[14px] w-[14px] h-[14px] rounded-full border border-white/20 bg-white/10" />
        </div>
      );
    }

    // crown (centered)
    return (
      <div className="absolute left-1/2 -translate-x-1/2 -top-[16px] w-[86px] h-[44px]">
        <div className="absolute inset-x-0 bottom-0 h-[14px] rounded-xl border border-white/20 bg-white/5" />
        {[10, 35, 60].map((x, i) => (
          <div
            key={i}
            className="absolute bottom-[10px] w-[16px] h-[22px]"
            style={{
              left: x,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: `hsla(${(c.hue + 25) % 360}, 92%, 65%, 0.35)`,
              filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.35))",
            }}
          />
        ))}
      </div>
    );
  };

  const cheeks = c.blush ? (
    <>
      <div
        className="absolute"
        style={{
          left: `calc(50% - ${eyeDx + 18}px)`,
          top: 122,
          width: 22,
          height: 14,
          borderRadius: 999,
          background: `hsla(${(c.hue2 + 10) % 360}, 95%, 72%, 0.18)`,
        }}
      />
      <div
        className="absolute"
        style={{
          left: `calc(50% + ${eyeDx - 4}px)`,
          top: 122,
          width: 22,
          height: 14,
          borderRadius: 999,
          background: `hsla(${(c.hue2 + 10) % 360}, 95%, 72%, 0.18)`,
        }}
      />
    </>
  ) : null;

  const base = 240;
  const size = Math.max(80, Math.round(base * scale));
  const inner = Math.round(210 * (size / base));
  const shadowW = Math.round(170 * (size / base));
  const shadowH = Math.round(20 * (size / base));
  const shadowBottom = Math.round(22 * (size / base));

  return (
    <div
      className={["relative flex items-center justify-center select-none", className].filter(Boolean).join(" ")}
      style={{ width: size, height: size }}
      aria-label={c.name}
    >
      {/* shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[2px]"
        style={{
          bottom: shadowBottom,
          width: shadowW,
          height: shadowH,
          background: "radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0))",
        }}
      />

      <div
        className="relative"
        style={{
          width: inner,
          height: inner,
          ...motionStyle,
          borderRadius,
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: glow,
          background: `radial-gradient(circle at 28% 22%, rgba(255,255,255,0.20), transparent 55%),
                      linear-gradient(180deg, ${bodyA}, ${bodyB})`,
        }}
      >
        {/* inner panel */}
        <div
          className="absolute"
          style={{
            inset: 10,
            borderRadius: `calc(${borderRadius} - 12px)`,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(0,0,0,0.14)",
          }}
        />

        {/* subtle sheen */}
        <div
          className="absolute rounded-full"
          style={{ left: 16, top: 14, width: 70, height: 32, background: "rgba(255,255,255,0.06)" }}
        />

        <Accessory />

        {/* STRICT SYMMETRY: 2 eyes */}
        <Eye leftPct={50 - (eyeDx / 210) * 100} />
        <Eye leftPct={50 + (eyeDx / 210) * 100} />

        {cheeks}

        {/* STRICT SYMMETRY: 1 centered mouth */}
        <Mouth />

        {showTag ? (
          <div className="absolute left-1/2 -translate-x-1/2 text-[11px] text-white/45" style={{ bottom: 14 }}>
            gotchi v2
          </div>
        ) : null}
      </div>
    </div>
  );
}
