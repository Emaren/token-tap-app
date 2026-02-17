import Link from 'next/link'

export const metadata = {
  title: 'Wally Wallet Lab — TokenTap',
  description: 'Wally wallet skin playground (isolated layout).',
}

export default function WallyWalletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-[100dvh] bg-white text-black">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-black/10">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-black/15 bg-white shadow-sm" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Wally Wallet Lab</div>
              <div className="text-xs text-black/60">White canvas, move fast</div>
            </div>
          </div>

          <nav className="flex items-center gap-3 text-sm">
            <Link className="underline hover:opacity-70" href="/demo-wallet">
              Demo Wallet
            </Link>
            <Link className="underline hover:opacity-70" href="/pricing">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
    </main>
  )
}
