"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SelectedWalletTileArt from "@/components/SelectedWalletTileArt";
import { useSelectedWalletTile } from "@/lib/use-selected-wallet-tile";
import { isDarkTtTheme, useTtTheme } from "@/lib/use-tt-theme";

function WallyV0White() {
  return (
    <div className="relative w-[210px] h-[210px]">
      <div
        className="absolute inset-0 rounded-[54px]"
        style={{
          background:
            "radial-gradient(130px 130px at 30% 25%, rgba(255,255,255,0.99), rgba(245,245,245,0.96) 62%, rgba(228,228,228,0.94))",
          border: "1px solid rgba(0,0,0,0.10)",
          boxShadow:
            "0 14px 40px rgba(0,0,0,0.10), inset 0 0 0 1px rgba(255,255,255,0.60)",
        }}
      />

      <div
        className="absolute left-[18px] top-[18px] w-[92px] h-[64px] rounded-[40px]"
        style={{ background: "rgba(255,255,255,0.55)", filter: "blur(0.2px)" }}
      />

      <div
        className="absolute left-[-8px] top-[42px] w-[62px] h-[78px] rounded-[26px]"
        style={{
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
        }}
      />
      <div
        className="absolute right-[-10px] top-[46px] w-[62px] h-[78px] rounded-[26px]"
        style={{
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
        }}
      />
      <div
        className="absolute right-[16px] top-[112px] w-[44px] h-[44px] rounded-[18px]"
        style={{
          background: "rgba(255,255,255,0.92)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 10px 22px rgba(0,0,0,0.12)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[140px] h-[120px]">
          <div className="absolute left-[36px] top-[42px] w-[16px] h-[16px] rounded-full bg-black/85" />
          <div className="absolute right-[36px] top-[42px] w-[16px] h-[16px] rounded-full bg-black/85" />
          <div
            className="absolute left-1/2 top-[64px] w-[46px] h-[26px]"
            style={{
              transform: "translateX(-50%)",
              borderBottom: "3px solid rgba(0,0,0,0.45)",
              borderRadius: "0 0 999px 999px",
            }}
          />
        </div>
      </div>

      <div className="absolute bottom-[18px] left-0 right-0 text-center">
        <span className="text-[11px] tracking-wide text-black/35">WALLY v0</span>
      </div>
    </div>
  );
}

function WallyWalletLabPageContent() {
  const theme = useTtTheme();
  const dark = isDarkTtTheme(theme);

  const searchParams = useSearchParams();
  const selectedMode = searchParams.get("selected") === "1";
  const requestedTileId = searchParams.get("tile");
  const selectedTile = useSelectedWalletTile(selectedMode, requestedTileId);

  const querySuffix = selectedMode
    ? `?selected=1${
        requestedTileId ? `&tile=${encodeURIComponent(requestedTileId)}` : ""
      }`
    : "";

  const muted = dark ? "text-white/60" : "text-black/60";
  const border = dark ? "border-white/10" : "border-black/10";
  const cardBg = dark ? "bg-white/5" : "bg-white";
  const cardShadow = dark
    ? "shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
    : "shadow-[0_18px_60px_rgba(0,0,0,0.08)]";
  const btn = dark
    ? "border-white/15 hover:bg-white/10"
    : "border-black/15 hover:bg-black/5";

  return (
    <div className="space-y-5 sm:space-y-6">
      <style jsx global>{`
        @keyframes ttWalletBob {
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
          <h1 className="text-2xl font-bold">Wally Wallet</h1>
          <p className={muted}>
            White canvas. Mobile-first wallet lab with selected creature support.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/wally-wallet/send${querySuffix}`}
            className={`px-4 py-2 rounded-xl border ${btn}`}
          >
            Send
          </Link>
          <Link
            href={`/wally-wallet/receive${querySuffix}`}
            className={`px-4 py-2 rounded-xl border ${btn}`}
          >
            Receive
          </Link>
          <Link
            href={`/wally-wallet/request${querySuffix}`}
            className={`px-4 py-2 rounded-xl border ${btn}`}
          >
            Request
          </Link>
        </div>
      </div>

      <section
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border ${border} ${cardBg} ${cardShadow}`}
      >
        <div className="p-4 sm:p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-4 sm:py-8">
            {selectedMode ? (
              selectedTile ? (
                <div
                  className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-3xl overflow-hidden flex items-center justify-center"
                  style={{
                    animation: "ttWalletBob 2600ms ease-in-out infinite",
                    willChange: "transform",
                    boxShadow: dark
                      ? "0 18px 60px rgba(0,0,0,0.35)"
                      : "0 18px 60px rgba(0,0,0,0.18)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: dark
                        ? "radial-gradient(60% 55% at 50% 25%, rgba(255,255,255,0.12), rgba(0,0,0,0.92) 55%, rgba(0,0,0,0.98) 100%)"
                        : "radial-gradient(60% 55% at 50% 25%, rgba(0,0,0,0.04), rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.18) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      boxShadow: dark
                        ? "inset 0 0 0 1px rgba(255,255,255,0.10)"
                        : "inset 0 0 0 1px rgba(0,0,0,0.10)",
                    }}
                  />

                  <div className="relative">
                    <SelectedWalletTileArt tile={selectedTile} />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div
                    className={`text-sm ${
                      dark ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    No selected creature tile found.
                  </div>
                  <Link
                    href="/creatures"
                    className={`mt-3 inline-flex px-4 py-2 rounded-full border text-sm ${btn}`}
                  >
                    Pick in Creatures
                  </Link>
                </div>
              )
            ) : (
              <div
                style={{
                  animation: "ttWalletBob 2600ms ease-in-out infinite",
                  willChange: "transform",
                }}
              >
                <div
                  className="w-[244px] h-[244px] rounded-3xl flex items-center justify-center"
                  style={{
                    background: dark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.95)",
                    boxShadow: dark
                      ? "0 0 0 1px rgba(255,255,255,0.10), 0 18px 60px rgba(0,0,0,0.40)"
                      : "0 0 0 1px rgba(0,0,0,0.10), 0 18px 60px rgba(0,0,0,0.25)",
                  }}
                >
                  <div style={{ transform: "scale(0.95)" }}>
                    <WallyV0White />
                  </div>
                </div>
              </div>
            )}

            <div className={`mt-5 text-sm ${muted} text-center`}>
              {selectedMode && selectedTile
                ? `Selected creature preview: ${selectedTile.name}`
                : "White lab preview with bob animation."}
            </div>
          </div>
        </div>
      </section>

      <section className={`rounded-2xl border ${border} ${cardBg} p-5`}>
        <div className="text-sm font-semibold mb-2">Next steps (White Lab)</div>
        <ul
          className={`text-sm ${
            dark ? "text-white/70" : "text-black/70"
          } list-disc pl-5 space-y-1`}
        >
          <li>Keep mobile-first sizing and spacing as baseline.</li>
          <li>Add wallet chrome (balance, chips, recent activity).</li>
          <li>Use this same stage shell across all skins.</li>
        </ul>
      </section>
    </div>
  );
}

export default function WallyWalletLabPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[320px] rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
      }
    >
      <WallyWalletLabPageContent />
    </Suspense>
  );
}