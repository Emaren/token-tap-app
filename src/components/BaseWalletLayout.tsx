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
    <main className="min-h-screen flex flex-col bg-black text-white px-6 pt-20 pb-10 overflow-x-hidden">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          {emoji && `${emoji} `}{brand} Wallet
        </h1>
      </header>

      {/* Page Content */}
      <div className="flex-1 flex flex-col justify-start items-center w-full">
        {children}
      </div>

      {/* Footer Links */}
      <footer className="mt-12 text-center space-y-2 text-sm">
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
    </main>
  )
}
