import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Egg/Furry Wally Wallet Lab — TokenTap",
  description: "Egg/furry Wally wallet skin playground (isolated layout).",
};

export default function WallyWalletEggLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] bg-[var(--tt-app-bg)] text-white px-0 sm:px-4 py-0 sm:py-4 [--tt-shell-max:920px]">
      <div className="mx-auto w-full max-w-[var(--tt-shell-max)] bg-black text-white min-h-[100dvh] sm:min-h-0 sm:rounded-[28px] sm:shadow-[0_22px_70px_rgba(0,0,0,0.55)] overflow-hidden">
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-white/10">
          <div className="mx-auto w-full px-3 sm:px-4 py-3 pr-36 sm:pr-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl border border-white/15 bg-white/5 shadow-sm" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">Egg/Furry Wally Lab</div>
                <div className="text-xs text-white/60">Dark canvas, build the creature skin</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <Link className="underline hover:opacity-70" href="/wally-wallet">
                White Lab
              </Link>
              <Link className="underline hover:opacity-70" href="/wally-wallet-dark">
                Dark Lab
              </Link>
              <Link className="underline hover:opacity-70" href="/demo-wallet">
                Demo Wallet
              </Link>
              <Link className="underline hover:opacity-70" href="/get-started">
                Get Started
              </Link>
            </nav>
          </div>
        </header>

        <div className="mx-auto w-full px-3 sm:px-4 py-5 sm:py-6">{children}</div>
      </div>
    </main>
  );
}
