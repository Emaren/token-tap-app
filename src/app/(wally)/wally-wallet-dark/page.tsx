"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SelectedWalletTileArt from "@/components/SelectedWalletTileArt";
import { useSelectedWalletTile } from "@/lib/use-selected-wallet-tile";

function WallyV0Dark() {
  return (
    <div className="relative w-[210px] h-[210px]">
      <div
        className="absolute inset-0 rounded-[54px]"
        style={{
          background: "radial-gradient(120px 120px at 30% 25%, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.35))",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 14px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      />

      <div
        className="absolute left-[18px] top-[18px] w-[92px] h-[64px] rounded-[40px]"
        style={{ background: "rgba(255,255,255,0.06)", filter: "blur(0.2px)" }}
      />

      <div
        className="absolute left-[-8px] top-[42px] w-[62px] h-[78px] rounded-[26px]"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 10px 22px rgba(0,0,0,0.45)",
        }}
      />
      <div
        className="absolute right-[-10px] top-[46px] w-[62px] h-[78px] rounded-[26px]"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 10px 22px rgba(0,0,0,0.45)",
        }}
      />
      <div
        className="absolute right-[16px] top-[112px] w-[44px] h-[44px] rounded-[18px]"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 10px 22px rgba(0,0,0,0.45)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[140px] h-[120px]">
          <div className="absolute left-[36px] top-[42px] w-[16px] h-[16px] rounded-full bg-white/90" />
          <div className="absolute right-[36px] top-[42px] w-[16px] h-[16px] rounded-full bg-white/90" />
          <div
            className="absolute left-1/2 top-[64px] w-[46px] h-[26px]"
            style={{ transform: "translateX(-50%)", borderBottom: "3px solid rgba(255,255,255,0.55)", borderRadius: "0 0 999px 999px" }}
          />
        </div>
      </div>

      <div className="absolute bottom-[18px] left-0 right-0 text-center">
        <span className="text-[11px] tracking-wide text-white/45">WALLY v0</span>
      </div>
    </div>
  );
}

function WallyWalletDarkLabPageContent() {
  const searchParams = useSearchParams();
  const selectedMode = searchParams.get("selected") === "1";
  const requestedTileId = searchParams.get("tile");
  const selectedTile = useSelectedWalletTile(selectedMode, requestedTileId);

  const querySuffix = selectedMode
    ? `?selected=1${requestedTileId ? `&tile=${encodeURIComponent(requestedTileId)}` : ""}`
    : "";

  return (
    <div className="space-y-5 sm:space-y-6">
      <style jsx global>{`
        @keyframes ttWalletBobDark {
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
          <h1 className="text-2xl font-bold">Wally Wallet (Dark Lab)</h1>
          <p className="text-white/60">
            Night Runner skin. Mobile-first dark wallet stage.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href={`/wally-wallet-dark/send${querySuffix}`} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">
            Send
          </Link>
          <Link href={`/wally-wallet-dark/receive${querySuffix}`} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">
            Receive
          </Link>
          <Link href={`/wally-wallet-dark/request${querySuffix}`} className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5">
            Request
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
        <div className="p-4 sm:p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-4 sm:py-8">
            {selectedMode ? (
              selectedTile ? (
                <div
                  className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-3xl border border-white/15 bg-white/[0.03] overflow-hidden flex items-center justify-center"
                  style={{ animation: "ttWalletBobDark 2600ms ease-in-out infinite", willChange: "transform" }}
                >
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
              <div style={{ animation: "ttWalletBobDark 2600ms ease-in-out infinite", willChange: "transform" }}>
                <div
                  className="w-[244px] h-[244px] rounded-3xl flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.06)", boxShadow: "0 0 0 1px rgba(255,255,255,0.10), 0 18px 60px rgba(0,0,0,0.55)" }}
                >
                  <div style={{ transform: "scale(0.95)" }}>
                    <WallyV0Dark />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 text-sm text-white/60 text-center">
              {selectedMode && selectedTile
                ? `Selected creature preview: ${selectedTile.name}`
                : "Dark lab preview with bob animation."}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black p-5">
        <div className="text-sm font-semibold mb-2">Next steps (Dark Lab)</div>
        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
          <li>Keep this same stage shell across dark and egg skins.</li>
          <li>Add wallet chrome and interaction modules.</li>
          <li>Preserve selected-creature mode for QA and demo flows.</li>
        </ul>
      </section>
    </div>
  );
}

export default function WallyWalletDarkLabPage() {
  return (
    <Suspense fallback={<div className="h-[320px] rounded-2xl border border-white/10 bg-black/40 animate-pulse" />}>
      <WallyWalletDarkLabPageContent />
    </Suspense>
  );
}
