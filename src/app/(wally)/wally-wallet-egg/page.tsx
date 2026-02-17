"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SelectedWalletTileArt from "@/components/SelectedWalletTileArt";
import { useSelectedWalletTile } from "@/lib/use-selected-wallet-tile";

function WallyWalletEggPageContent() {
  const searchParams = useSearchParams();
  const selectedMode = searchParams.get("selected") === "1";
  const requestedTileId = searchParams.get("tile");
  const selectedTile = useSelectedWalletTile(selectedMode, requestedTileId);
  const skin = searchParams.get("skin") === "egg" ? "egg" : "furry";
  const heroSrc = skin === "egg" ? "/images/Wallys/Egg.png" : "/images/Wallys/Wally%20t.png";
  const heroLabel = skin === "egg" ? "3D Egg" : "Wally t";

  const querySuffix = selectedMode
    ? `?selected=1${requestedTileId ? `&tile=${encodeURIComponent(requestedTileId)}` : ""}`
    : skin === "egg"
      ? "?skin=egg"
      : "?skin=furry";

  return (
    <div className="space-y-5 sm:space-y-6">
      <style jsx global>{`
        @keyframes ttWalletBobEgg {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Egg/Furry Wally Wallet</h1>
          <p className="text-white/60">
            Dark canvas. Mobile-first stage for egg and furry variants.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href={`/wally-wallet-egg/send${querySuffix}`} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">
            Send
          </Link>
          <Link href={`/wally-wallet-egg/receive${querySuffix}`} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">
            Receive
          </Link>
          <Link href={`/wally-wallet-egg/request${querySuffix}`} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">
            Request
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
        <div className="p-4 sm:p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-4 sm:py-8">
            {selectedMode ? (
              selectedTile ? (
                <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] flex items-center justify-center">
                  <SelectedWalletTileArt tile={selectedTile} />
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-sm text-white/70">No selected creature tile found.</div>
                  <Link href="/creatures" className="mt-3 inline-flex px-4 py-2 rounded-full border border-white/15 hover:bg-white/5 text-sm">
                    Pick in Creatures
                  </Link>
                </div>
              )
            ) : (
              <div style={{ animation: "ttWalletBobEgg 2600ms ease-in-out infinite", willChange: "transform" }}>
                <div className="relative w-[250px] h-[290px] sm:w-[300px] sm:h-[340px]">
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[4px] w-[220px] h-[28px] rounded-full bg-black/60 blur-[2px]" />
                  <Image
                    src={heroSrc}
                    alt={heroLabel}
                    fill
                    priority
                    sizes="(max-width: 768px) 250px, 300px"
                    className="object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
                  />
                </div>
              </div>
            )}

            <div className="mt-5 text-sm text-white/60 text-center">
              {selectedMode && selectedTile
                ? `Selected creature preview: ${selectedTile.name}`
                : `${heroLabel} preview with bob animation.`}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black p-5">
        <div className="text-sm font-semibold mb-2">Next steps (Egg/Furry Lab)</div>
        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
          <li>Keep one stage shell and swap skin art by query.</li>
          <li>Add wallet chrome and interaction layers.</li>
          <li>Maintain selected-creature mode for wallet QA flow.</li>
        </ul>
      </section>
    </div>
  );
}

export default function WallyWalletEggPage() {
  return (
    <Suspense fallback={<div className="h-[320px] rounded-2xl border border-white/10 bg-black/40 animate-pulse" />}>
      <WallyWalletEggPageContent />
    </Suspense>
  );
}
