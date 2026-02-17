import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "Egg/Furry Wally Wallet Lab — TokenTap",
  description: "Egg/furry Wally wallet skin playground (isolated layout).",
};

export default function WallyWalletEggLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto w-full max-w-5xl px-3 sm:px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

      <div className="mx-auto w-full max-w-5xl px-3 sm:px-4 py-5 sm:py-6">{children}</div>
    </main>
  );
}
