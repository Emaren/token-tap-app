// src/app/get-started/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomerCard from "@/components/CustomerCard";
import { customers } from "@/components/customers";
import {
  loadSelectedCreatureTiles,
  subscribeSelectedCreatureTiles,
  type StoredSelectedCreatureTileV2,
} from "@/lib/selected-creature";

type TierPreview = "selected-creatures" | "white-wally" | "dark-wally";

type Tier = {
  name: string;
  sub: string;
  price: string;
  features: string[];
  link: string;
  preview?: TierPreview;
};

type PreviewTile = {
  tileId: string;
  name: string;
  kind: "image" | "markup" | "text";
  imageSrc?: string;
  markup?: string;
};

function isRenderableTile(t: PreviewTile) {
  return (t.kind === "image" && !!t.imageSrc) || (t.kind === "markup" && !!t.markup);
}

function safeParseJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function coerceTilesFromUnknown(value: unknown): PreviewTile[] {
  if (!value) return [];

  // allow { items: [...] } or { tiles: [...] } shapes
  const maybeArray =
    Array.isArray(value) ? value : (value as any)?.items ?? (value as any)?.tiles ?? (value as any)?.data;

  const arr = Array.isArray(maybeArray) ? maybeArray : [];

  return arr
    .map((v: any, idx: number): PreviewTile | null => {
      if (!v || typeof v !== "object") return null;

      const name = String(v.name ?? v.label ?? v.title ?? v.creatureName ?? `Creature ${idx + 1}`);
      const tileId = String(v.tileId ?? v.id ?? v.key ?? v.creatureId ?? name ?? idx);

      const markup = typeof v.markup === "string" ? v.markup : typeof v.html === "string" ? v.html : typeof v.tileMarkup === "string" ? v.tileMarkup : undefined;
      const imageSrc =
        typeof v.imageSrc === "string"
          ? v.imageSrc
          : typeof v.src === "string"
            ? v.src
            : typeof v.image === "string"
              ? v.image
              : undefined;

      const kindRaw = typeof v.kind === "string" ? v.kind : undefined;
      const kind: PreviewTile["kind"] =
        kindRaw === "image" || kindRaw === "markup" || kindRaw === "text"
          ? kindRaw
          : markup
            ? "markup"
            : imageSrc
              ? "image"
              : "text";

      return { tileId, name, kind, markup, imageSrc };
    })
    .filter(Boolean) as PreviewTile[];
}

function loadBestEffortSelectedCreatureTiles(): { tiles: PreviewTile[]; source: string } {
  // 1) Preferred: whatever your lib returns
  const libTiles = (loadSelectedCreatureTiles?.() ?? []) as StoredSelectedCreatureTileV2[];
  const normalizedFromLib: PreviewTile[] = libTiles.map((t: any) => ({
    tileId: String(t.tileId ?? t.id ?? t.key ?? t.name),
    name: String(t.name ?? "Creature"),
    kind: (t.kind === "image" || t.kind === "markup" || t.kind === "text" ? t.kind : t.markup ? "markup" : t.imageSrc ? "image" : "text") as PreviewTile["kind"],
    imageSrc: typeof t.imageSrc === "string" ? t.imageSrc : undefined,
    markup: typeof t.markup === "string" ? t.markup : undefined,
  }));

  // If the lib gives us *real render data*, stop here.
  if (normalizedFromLib.some(isRenderableTile)) {
    return { tiles: normalizedFromLib, source: "lib" };
  }

  // 2) Try common keys in localStorage/sessionStorage (and also scan for “creature” keys)
  const storages: Array<{ storage: Storage; label: string }> = [];
  if (typeof window !== "undefined") {
    storages.push({ storage: window.localStorage, label: "localStorage" });
    storages.push({ storage: window.sessionStorage, label: "sessionStorage" });
  }

  const commonKeys = [
    "tokentap:selectedCreatureTilesV2",
    "selectedCreatureTilesV2",
    "selectedCreatureTiles",
    "tokentap:selectedCreatureTiles",
    "tokentap:selectedCreatures",
    "selectedCreatures",
    "selectedCreaturesV1",
  ];

  for (const { storage, label } of storages) {
    // common keys first
    for (const k of commonKeys) {
      const parsed = safeParseJson(storage.getItem(k));
      const tiles = coerceTilesFromUnknown(parsed);
      if (tiles.some(isRenderableTile)) return { tiles, source: `${label}:${k}` };
    }

    // then scan any key containing "creature"
    for (let i = 0; i < storage.length; i++) {
      const k = storage.key(i);
      if (!k) continue;
      if (!k.toLowerCase().includes("creature")) continue;

      const parsed = safeParseJson(storage.getItem(k));
      const tiles = coerceTilesFromUnknown(parsed);
      if (tiles.some(isRenderableTile)) return { tiles, source: `${label}:${k}` };
    }
  }

  // 3) If we still don’t have renderable tiles, fall back to the lib’s output (likely text-only placeholders)
  return { tiles: normalizedFromLib, source: "fallback-text-only" };
}

function WallyV0({ variant }: { variant: "white" | "dark" }) {
  const isDark = variant === "dark";

  const bodyBg = isDark
    ? "radial-gradient(120px 120px at 30% 25%, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.35))"
    : "radial-gradient(120px 120px at 30% 25%, rgba(0,0,0,0.03), rgba(0,0,0,0.00) 60%, rgba(0,0,0,0.05))";

  const bodyBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";

  const eyeColor = isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.85)";
  const mouthColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";
  const labelColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)";

  return (
    <div className="relative w-[210px] h-[210px]">
      <div
        className="absolute inset-0 rounded-[54px]"
        style={{
          background: bodyBg,
          border: `1px solid ${bodyBorder}`,
          boxShadow: isDark
            ? "0 14px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 14px 40px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(255,255,255,0.60)",
        }}
      />

      <div
        className="absolute left-[18px] top-[18px] w-[92px] h-[64px] rounded-[40px]"
        style={{
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
          filter: "blur(0.2px)",
        }}
      />

      <div
        className="absolute left-[-8px] top-[42px] w-[62px] h-[78px] rounded-[26px]"
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.92)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
          boxShadow: isDark ? "0 10px 22px rgba(0,0,0,0.45)" : "0 10px 22px rgba(0,0,0,0.12)",
        }}
      />
      <div
        className="absolute right-[-10px] top-[46px] w-[62px] h-[78px] rounded-[26px]"
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.92)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
          boxShadow: isDark ? "0 10px 22px rgba(0,0,0,0.45)" : "0 10px 22px rgba(0,0,0,0.12)",
        }}
      />
      <div
        className="absolute right-[16px] top-[112px] w-[44px] h-[44px] rounded-[18px]"
        style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.92)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"}`,
          boxShadow: isDark ? "0 10px 22px rgba(0,0,0,0.45)" : "0 10px 22px rgba(0,0,0,0.12)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[140px] h-[120px]">
          <div className="absolute left-[36px] top-[42px] w-[16px] h-[16px] rounded-full" style={{ background: eyeColor }} />
          <div className="absolute right-[36px] top-[42px] w-[16px] h-[16px] rounded-full" style={{ background: eyeColor }} />
          <div
            className="absolute left-1/2 top-[64px] w-[46px] h-[26px]"
            style={{
              transform: "translateX(-50%)",
              borderBottom: `3px solid ${mouthColor}`,
              borderRadius: "0 0 999px 999px",
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-[18px] left-0 right-0 text-center">
        <span className="text-[11px] tracking-wide" style={{ color: labelColor }}>
          WALLY v0
        </span>
      </div>
    </div>
  );
}

function WhiteWallyPreview() {
  return (
    <div className="mx-auto w-full max-w-[260px] pointer-events-none">
      <div
        className="aspect-square rounded-3xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.10), 0 18px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ transform: "scale(0.95)" }}>
          <WallyV0 variant="white" />
        </div>
      </div>
    </div>
  );
}

function DarkWallyPreview() {
  return (
    <div className="mx-auto w-full max-w-[260px] pointer-events-none">
      <div
        className="aspect-square rounded-3xl flex items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.06)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.10), 0 18px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div style={{ transform: "scale(0.95)" }}>
          <WallyV0 variant="dark" />
        </div>
      </div>
    </div>
  );
}

function SelectedCreaturesPreview() {
  const [tiles, setTiles] = useState<PreviewTile[]>([]);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const res = loadBestEffortSelectedCreatureTiles();
      setTiles(res.tiles);
      setSource(res.source);
    };

    update();

    const unsub = typeof subscribeSelectedCreatureTiles === "function" ? subscribeSelectedCreatureTiles(update) : () => {};

    const onFocus = () => update();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      unsub?.();
    };
  }, []);

  const visible = useMemo(() => {
    const copy = [...tiles];
    copy.reverse();
    return copy.slice(0, 6);
  }, [tiles]);

  const anyRenderable = useMemo(() => visible.some(isRenderableTile), [visible]);

  return (
    <div className="w-full pointer-events-none">
      <style jsx global>{`
        @keyframes blink {
          0%,
          92%,
          100% {
            transform: scaleY(1);
          }
          94%,
          96% {
            transform: scaleY(0.1);
          }
        }
        @keyframes pupil {
          0%,
          100% {
            transform: translate(0px, 0px);
          }
          50% {
            transform: translate(2px, 1px);
          }
        }
        @keyframes bob {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes breathe {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.02);
          }
        }
      `}</style>

      {!visible.length ? (
        <div className="py-3 text-sm text-white/60">No creatures selected yet (pick some in /creatures).</div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {visible.map((t) => (
              <div
                key={t.tileId}
                className="w-[92px] h-[92px] rounded-2xl border border-white/15 bg-black/20 flex items-center justify-center overflow-hidden"
              >
                {t.kind === "image" && t.imageSrc ? (
                  <img src={t.imageSrc} alt={t.name} className="w-full h-full object-contain" />
                ) : t.kind === "markup" && t.markup ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div
                      style={{
                        transform: "scale(0.35)",
                        transformOrigin: "center",
                      }}
                      dangerouslySetInnerHTML={{ __html: t.markup }}
                    />
                  </div>
                ) : (
                  <div className="px-2 text-[11px] text-white/70 text-center leading-tight">{t.name}</div>
                )}
              </div>
            ))}
          </div>

          {tiles.length > visible.length && (
            <div className="mt-2 text-xs text-white/50 text-center">+{tiles.length - visible.length} more selected</div>
          )}

          {/* Subtle hint if we only found text-only tiles */}
          {!anyRenderable && (
            <div className="mt-2 text-[11px] text-white/35 text-center">
              Tile art not found for this origin (source: {source}). Re-select in /creatures on the same domain.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function GetStartedPage() {
  const [showAll, setShowAll] = useState(false);

  const tiers: Tier[] = [
    {
      name: "Demo",
      sub: "“Curious Explorer”",
      price: "$0",
      features: ["Basic demo access", "Try TokenTap free", "See & Send your token"],
      link: "/demo",
    },
    {
      name: "Wally Wallet (White Lab)",
      sub: "“Skin Playground”",
      price: "WIP",
      features: ["White canvas wallet UI", "Animation sandbox", "Mobile-first PWA testing"],
      link: "/wally-wallet",
      preview: "white-wally",
    },
    {
      name: "Wally Wallet (Dark Lab)",
      sub: "“Night Runner”",
      price: "WIP",
      features: ["Dark standalone skin", "Different geometry + vibe", "Animation + feel testing"],
      link: "/wally-wallet-dark",
      preview: "dark-wally",
    },
    {
      name: "Wally Wallet (Egg/Furry Lab)",
      sub: "“3D Egg + Pixel Fur”",
      price: "WIP",
      features: ["Egg/furry skin playground", "Separate layout + animation", "Built for mobile PWA iteration"],
      link: "/wally-wallet-egg",
    },
    {
      name: "Selected Creature Wallet",
      sub: "“Wallygotchi Preview”",
      price: "Sandbox",
      features: ["Shows the creatures you selected in /creatures", "Uses the V2 selection tiles store", "Perfect demo button"],
      link: "/wally-wallet?selected=1",
      preview: "selected-creatures",
    },
    {
      name: "Creatures",
      sub: "“Creature Gallery”",
      price: "Sandbox",
      features: ["Creature variations grid", "Little motion + personality", "Preview the design ceiling"],
      link: "/creatures",
    },
  ];

  return (
    <main className="min-h-screen relative bg-black text-white px-4 pt-10 pb-10 max-w-md mx-auto">
      <Link href="/" className="absolute top-4 left-4 z-10">
        <Image
          src="/images/ttt-logo.png"
          alt="TokenTap Logo"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          priority
        />
      </Link>

      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-6">Featured Customers</h1>

        <div className="space-y-6">
          <CustomerCard {...customers[0]} priority />

          {showAll && customers.slice(1).map((c, i) => <CustomerCard key={i + 1} {...c} />)}

          {customers?.length > 1 && (
            <button onClick={() => setShowAll(!showAll)} className="mt-2 text-sm text-white hover:text-white/70">
              {showAll ? "Hide More Customers ⬆" : "More Customers ⬇"}
            </button>
          )}
        </div>
      </section>

      <section className="mt-2">
        <h2 className="text-xl font-semibold text-center">Loyalty Tokens</h2>

        <div className="mt-6 grid grid-cols-1 gap-6">
          {tiers.map((tier) => (
            <Link key={tier.link} href={tier.link} className="block">
              <div className="cursor-pointer border-2 border-white rounded-3xl p-8 text-center transition duration-200 hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black">
                <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
                <p className="text-white/70 text-sm mb-2">{tier.sub}</p>
                <p className="text-lg font-semibold mb-4">{tier.price}</p>

                {tier.preview && (
                  <div className="mb-5 flex justify-center">
                    {tier.preview === "selected-creatures" ? (
                      <div className="w-full max-w-[340px]">
                        <SelectedCreaturesPreview />
                      </div>
                    ) : tier.preview === "white-wally" ? (
                      <WhiteWallyPreview />
                    ) : tier.preview === "dark-wally" ? (
                      <DarkWallyPreview />
                    ) : null}
                  </div>
                )}

                <ul className="text-sm text-white/70 space-y-1">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 text-center space-y-2 text-sm">
        <Link href="/get-started/pricing" className="text-white underline hover:text-white/70 block cursor-pointer">
          More Pricing
        </Link>

        <a
          href="https://discord.gg/RYNBKz7n9y"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white underline hover:text-white/70 cursor-pointer"
        >
          <Image src="/images/discord.svg" alt="Discord" width={20} height={20} className="w-5 h-5" />
          Join the TokenTap Discord
        </a>

        <a href="mailto:contact@tokentap.ca" className="text-white underline hover:text-white/70 block cursor-pointer">
          Contact TokenTap
        </a>
      </section>
    </main>
  );
}
