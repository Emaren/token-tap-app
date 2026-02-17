'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import QRCode from 'react-qr-code'

export default function BaseWallet({
  token,
  balance,
  brand,
  emoji,
}: {
  token: string
  balance: number
  brand: string
  emoji?: string
}) {
  const router = useRouter()
  const displayToken = `$${token.toUpperCase()}`
  const walletAddress = `${token}`

  return (
    <main className="min-h-[100dvh] text-white px-0 sm:px-4 py-0 sm:py-4 [--tt-shell-max:920px]">
      <div className="mx-auto w-full max-w-[var(--tt-shell-max)] min-h-[100dvh] sm:min-h-0 bg-[var(--tt-page-dark-bg)] px-4 sm:px-8 py-8 sm:py-10 sm:rounded-[28px] sm:shadow-[0_22px_70px_rgba(0,0,0,0.45)]">
      <div className="mx-auto w-full max-w-xl flex min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-8rem)] flex-col">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3 sm:gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            {emoji && `${emoji} `}{brand} Wallet
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            You’ve been given {balance.toLocaleString()} {displayToken} tokens.
          </p>
          <p className="text-white font-mono text-2xl sm:text-3xl font-semibold">
            Balances: {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {displayToken}
          </p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center mt-7 sm:mt-10 gap-2">
          <div className="w-full max-w-[120px] aspect-square p-2 rounded">
            <QRCode
              value={walletAddress}
              className="w-full h-full"
              bgColor="#000000"
              fgColor="#ffffff"
            />
          </div>
          <p className="text-sm text-white/60 break-all text-center">{walletAddress}</p>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-7 sm:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={() => router.push(`/demo-wallet/send?token=${token}`)}
              className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring hover:ring-white/70 cursor-pointer"
            >
              Send
            </button>
            <button
              onClick={() => router.push(`/demo-wallet/receive?token=${token}`)}
              className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring hover:ring-white/70 cursor-pointer"
            >
              Receive
            </button>
            <button
              onClick={() => router.push(`/demo-wallet/request?token=${token}`)}
              className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring hover:ring-white/70 cursor-pointer"
            >
              Request
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 sm:pt-10 text-center flex flex-col items-center gap-4">
          <button
            onClick={() => router.push('/get-started')}
            className="border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70 cursor-pointer"
          >
            Back
          </button>

          <section className="space-y-2 text-sm pt-2">
            <a
              href="https://discord.gg/RYNBKz7n9y"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white underline hover:text-white/70"
            >
              <Image src="/images/discord.svg" alt="Discord" width={20} height={20} className="w-5 h-5" />
              Join the TokenTap Discord
            </a>
            <a
              href="mailto:contact@tokentap.ca"
              className="block text-white underline hover:text-white/70"
            >
              Contact TokenTap
            </a>
          </section>
        </div>
      </div>
      </div>
    </main>
  )
}
