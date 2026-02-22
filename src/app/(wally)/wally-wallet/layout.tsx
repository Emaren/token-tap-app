import Link from "next/link";
import { Suspense } from "react";
import WallyLabNav from "@/components/WallyLabNav";

export const metadata = {
  title: "Wally Wallet Lab — TokenTap",
  description: "Wally wallet skin playground (isolated layout).",
};

export default function WallyWalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100dvh] bg-[var(--tt-app-bg)] text-black px-0 sm:px-4 py-0 sm:py-4 [--tt-shell-max:920px]">
      <div className="mx-auto w-full max-w-[var(--tt-shell-max)] bg-white text-black min-h-[100dvh] sm:min-h-0 sm:rounded-[28px] sm:shadow-[0_22px_70px_rgba(0,0,0,0.20)] overflow-hidden">
        <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-black/10">
          <div className="mx-auto w-full px-3 sm:px-4 py-3 pr-36 sm:pr-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl border border-black/15 bg-white shadow-sm" />
              <div className="leading-tight">
                <div className="text-sm font-semibold">Wally Wallet Lab</div>
                <div className="text-xs text-black/60">
                  White canvas, mobile-first stage
                </div>
              </div>
            </div>

            <Suspense
              fallback={
                <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <Link className="underline hover:opacity-70" href="/wally-wallet-dark">
                    Dark Lab
                  </Link>
                  <Link className="underline hover:opacity-70" href="/wally-wallet-egg">
                    Egg/Furry Lab
                  </Link>
                  <Link className="underline hover:opacity-70" href="/demo-wallet">
                    Demo Wallet
                  </Link>
                  <Link className="underline hover:opacity-70" href="/get-started">
                    Get Started
                  </Link>
                </nav>
              }
            >
              <WallyLabNav
                items={[
                  { href: "/wally-wallet-dark", label: "Dark Lab" },
                  { href: "/wally-wallet-egg", label: "Egg/Furry Lab" },
                  { href: "/demo-wallet", label: "Demo Wallet" },
                  { href: "/get-started", label: "Get Started" },
                ]}
              />
            </Suspense>
          </div>
        </header>

        <div className="mx-auto w-full px-3 sm:px-4 py-5 sm:py-6">
          {children}
        </div>
      </div>
    </main>
  );
}