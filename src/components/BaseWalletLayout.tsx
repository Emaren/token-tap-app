'use client'

import Image from 'next/image'

export default function BaseWalletLayout({
  brand,
  emoji,
  children,
}: {
  brand: string
  emoji?: string
  children: React.ReactNode
}) {
  return (
    <main className="min-h-[100dvh] text-white px-0 sm:px-4 py-0 sm:py-4 [--tt-shell-max:920px]">
      <div className="mx-auto w-full max-w-[var(--tt-shell-max)] min-h-[100dvh] sm:min-h-0 bg-[var(--tt-page-dark-bg)] px-4 sm:px-8 pt-10 sm:pt-12 pb-8 sm:pb-10 sm:rounded-[28px] sm:shadow-[0_22px_70px_rgba(0,0,0,0.45)] overflow-x-hidden">
        <div className="mx-auto w-full max-w-xl flex min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-8rem)] flex-col">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              {emoji && `${emoji} `}{brand} Wallet
            </h1>
          </header>

          {/* Page Content */}
          <div className="flex-1 flex flex-col justify-start items-center w-full">
            {children}
          </div>

          {/* Footer Links */}
          <footer className="mt-10 sm:mt-12 text-center space-y-2 text-sm">
            <a
              href="https://discord.gg/RYNBKz7n9y"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white underline hover:text-white/70 cursor-pointer"
            >
              <Image src="/images/discord.svg" alt="Discord" width={20} height={20} className="w-5 h-5" />
              Join the TokenTap Discord
            </a>
            <a
              href="mailto:contact@tokentap.ca"
              className="text-white underline hover:text-white/70 cursor-pointer block"
            >
              Contact TokenTap
            </a>
          </footer>
        </div>
      </div>
    </main>
  )
}
