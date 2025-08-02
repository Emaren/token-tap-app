'use client'

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
    <main className="min-h-screen flex flex-col justify-between bg-black text-white px-6 pt-[12vh] pb-6">
      {/* Top content */}
      <div className="text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">
          {emoji && `${emoji} `}{brand} Wallet
        </h1>
        {children}
      </div>

      {/* Bottom Links */}
      <section className="mt-10 text-center space-y-2 text-sm">
        <a
          href="https://discord.gg/RYNBKz7n9y"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white underline hover:text-white/70 cursor-pointer"
        >
          <img src="/images/discord.svg" alt="Discord" className="w-5 h-5" />
          Join the TokenTap Discord
        </a>
        <a
          href="mailto:contact@tokentap.ca"
          className="text-white underline hover:text-white/70 cursor-pointer block"
        >
          Contact TokenTap
        </a>
      </section>
    </main>
  )
}
