'use client'

import { useRouter } from 'next/navigation'
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
    <main className="min-h-screen bg-black text-white px-6 py-10 flex flex-col justify-between">
      {/* Header */}
      <div className="text-center flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">
          {emoji && `${emoji} `}{brand} Wallet
        </h1>
        <p className="text-white/70">
          You’ve been given {balance.toLocaleString()} {displayToken} tokens.
        </p>
        <p className="text-white font-mono text-3xl font-semibold">
          Balances: {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {displayToken}
        </p>
      </div>

      {/* QR Code */}
      <div className="flex flex-col items-center mt-10 space-y-2">
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
      <div className="w-full max-w-md mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="mt-12 text-center flex flex-col items-center space-y-4">
        <button
          onClick={() => router.push('/get-started')}
          className="border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70 cursor-pointer"
        >
          Back
        </button>

        <section className="space-y-2 text-sm mt-6">
          <a
            href="https://discord.gg/RYNBKz7n9y"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white underline hover:text-white/70"
          >
            <img src="/images/discord.svg" alt="Discord" className="w-5 h-5" />
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
    </main>
  )
}
