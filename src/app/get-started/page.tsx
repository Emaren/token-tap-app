// src/app/get-started/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomerCard from "@/components/CustomerCard";
import { customers } from "@/components/customers";
import CreatureSprite from "@/components/CreatureSprite";
import {
  loadSelectedCreatureTiles,
  subscribeSelectedCreatureTiles,
  type StoredCreatureV1,
  type StoredSelectedCreatureTileV2,
} from "@/lib/selected-creature";

type TierPreview = "selected-creature" | "white-wally" | "dark-wally" | "egg-3d" | "egg-wally";

type Tier = {
  name: string;
  sub: string;
  price: string;
  features: string[];
  link: string;
  preview?: TierPreview;
  selectedTile?: PreviewTile;
};

type PreviewTile = {
  tileId: string;
  name: string;
  kind: "image" | "markup" | "creature" | "text";
  imageSrc?: string;
  markup?: string;
  creature?: StoredCreatureV1;
};

function loadBestEffortSelectedCreatureTiles(): { tiles: PreviewTile[]; source: string } {
  const libTiles = (loadSelectedCreatureTiles?.() ?? []) as StoredSelectedCreatureTileV2[];
  const normalizedFromLib: PreviewTile[] = libTiles.map((t) => {
    if (t.kind === "creature" && t.creature) {
      return {
        tileId: String(t.tileId ?? t.id ?? t.name),
        name: String(t.name ?? t.creature.name ?? "Creature"),
        kind: "creature",
        creature: t.creature,
        markup: typeof t.markup === "string" ? t.markup : undefined,
      };
    }

    if (t.kind === "image" && typeof t.imageSrc === "string") {
      return {
        tileId: String(t.tileId ?? t.id ?? t.name),
        name: String(t.name ?? "Creature"),
        kind: "image",
        imageSrc: t.imageSrc,
      };
    }

    if (t.kind === "markup" && typeof t.markup === "string") {
      return {
        tileId: String(t.tileId ?? t.id ?? t.name),
        name: String(t.name ?? "Creature"),
        kind: "markup",
        markup: t.markup,
      };
    }

    return {
      tileId: String(t.tileId ?? t.id ?? t.name),
      name: String(t.name ?? "Creature"),
      kind: "text",
    };
  });

  return { tiles: normalizedFromLib, source: "selected-creatures-v2" };
}

function WallyV0({ variant }: { variant: "white" | "dark" }) {
  const isDark = variant === "dark";

  const bodyBg = isDark
    ? "radial-gradient(120px 120px at 30% 25%, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.35))"
    : "radial-gradient(130px 130px at 30% 25%, rgba(255,255,255,0.99), rgba(245,245,245,0.96) 62%, rgba(228,228,228,0.94))";

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
      <div className="aspect-square flex items-center justify-center">
        <div style={{ animation: "ttTileBob 2600ms ease-in-out infinite", willChange: "transform" }}>
          <div
            className="w-[244px] h-[244px] rounded-3xl flex items-center justify-center"
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
      </div>
    </div>
  );
}

function DarkWallyPreview() {
  return (
    <div className="mx-auto w-full max-w-[260px] pointer-events-none">
      <div className="aspect-square flex items-center justify-center">
        <div style={{ animation: "ttTileBob 2600ms ease-in-out infinite", willChange: "transform" }}>
          <div
            className="w-[244px] h-[244px] rounded-3xl flex items-center justify-center"
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
      </div>
    </div>
  );
}

function Egg3DPreview() {
  return (
    <div className="mx-auto w-full max-w-[260px] pointer-events-none">
      <div
        className="relative aspect-square rounded-3xl overflow-hidden flex items-center justify-center bg-black/25"
        style={{
          boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div className="relative w-full h-full" style={{ animation: "ttTileBob 2600ms ease-in-out infinite", willChange: "transform" }}>
          <Image
            src="/images/Wallys/Egg.png"
            alt="3D Egg"
            fill
            sizes="260px"
            className="object-contain p-2"
          />
        </div>
      </div>
    </div>
  );
}

function EggWallyPreview() {
  return (
    <div className="mx-auto w-full max-w-[260px] pointer-events-none">
      <div
        className="relative aspect-square rounded-3xl overflow-hidden flex items-center justify-center bg-black/25"
        style={{
          boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
        }}
      >
        <div className="relative w-full h-full" style={{ animation: "ttTileBob 2600ms ease-in-out infinite", willChange: "transform" }}>
          <Image
            src="/images/Wallys/Wally%20t.png"
            alt="Wally t"
            fill
            sizes="260px"
            className="object-contain p-2"
          />
        </div>
      </div>
    </div>
  );
}

function SelectedCreaturePreview({ tile }: { tile: PreviewTile }) {
  return (
    <div className="mx-auto w-full max-w-[260px] pointer-events-none">
      <div
        className="relative aspect-square rounded-3xl bg-black/30 overflow-hidden flex items-center justify-center"
        style={{
          boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
        }}
      >
        {tile.kind === "creature" && tile.creature ? (
          <CreatureSprite c={tile.creature} />
        ) : tile.kind === "image" && tile.imageSrc ? (
          <Image
            src={tile.imageSrc}
            alt={tile.name}
            fill
            sizes="260px"
            unoptimized
            loader={({ src }) => src}
            className="object-contain p-2"
          />
        ) : tile.kind === "markup" && tile.markup ? (
          <div className="w-full h-full flex items-center justify-center p-2">
            <div
              className="w-[220px] h-[220px]"
              style={{
                transform: "scale(0.95)",
                transformOrigin: "center",
              }}
              dangerouslySetInnerHTML={{ __html: tile.markup }}
            />
          </div>
        ) : (
          <div className="px-3 text-sm text-white/80 text-center leading-tight">{tile.name}</div>
        )}
      </div>
    </div>
  );
}

export default function GetStartedPage() {
  const [showAll, setShowAll] = useState(false);
  const [selectedCreatureTiles, setSelectedCreatureTiles] = useState<PreviewTile[]>([]);

  useEffect(() => {
    const update = () => {
      const res = loadBestEffortSelectedCreatureTiles();
      const creatureOnly = res.tiles.filter(
        (tile): tile is PreviewTile & { kind: "creature"; creature: StoredCreatureV1 } =>
          tile.kind === "creature" && !!tile.creature
      );
      setSelectedCreatureTiles(creatureOnly.slice(0, 3));
    };

    update();

    const unsub =
      typeof subscribeSelectedCreatureTiles === "function"
        ? subscribeSelectedCreatureTiles(update)
        : () => {};

    const onFocus = () => update();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      unsub?.();
    };
  }, []);

  const coreTiers: Tier[] = [
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
      name: "Wally Wallet (3D Egg Lab)",
      sub: "“3D Egg Core”",
      price: "WIP",
      features: ["3D egg prototype", "Shape + silhouette testing", "Before fur skin pass"],
      link: "/wally-wallet-egg?skin=egg",
      preview: "egg-3d",
    },
    {
      name: "Wally Wallet (Egg/Furry Lab)",
      sub: "“3D Egg + Pixel Fur”",
      price: "WIP",
      features: ["Egg/furry skin playground", "Separate layout + animation", "Built for mobile PWA iteration"],
      link: "/wally-wallet-egg?skin=furry",
      preview: "egg-wally",
    },
  ];

  const selectedCreatureTiers: Tier[] = selectedCreatureTiles.map((tile, idx) => ({
    name: `Selected Creature Wallet ${idx + 1}`,
    sub: `“${tile.name}”`,
    price: "Sandbox",
    features: [
      "Single selected creature preview",
      "Uses the V2 selection tiles store",
      "Perfect demo button",
    ],
    link: `/wally-wallet?selected=1&tile=${encodeURIComponent(tile.tileId)}`,
    preview: "selected-creature",
    selectedTile: tile,
  }));

  const tiers: Tier[] = [
    ...coreTiers,
    ...selectedCreatureTiers,
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
      <style jsx global>{`
        @keyframes ttTileBob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
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
                    {tier.preview === "selected-creature" && tier.selectedTile ? (
                      <SelectedCreaturePreview tile={tier.selectedTile} />
                    ) : tier.preview === "white-wally" ? (
                      <WhiteWallyPreview />
                    ) : tier.preview === "dark-wally" ? (
                      <DarkWallyPreview />
                    ) : tier.preview === "egg-3d" ? (
                      <Egg3DPreview />
                    ) : tier.preview === "egg-wally" ? (
                      <EggWallyPreview />
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
