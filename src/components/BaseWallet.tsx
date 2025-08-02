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
    <main className="relative h-screen bg-black text-white px-6 overflow-hidden">
      {/* Top: Title + Balance */}
      <div className="pt-[12vh] text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">
          {emoji && `${emoji} `}{brand} Wallet
        </h1>
  
        <p className="text-white/70 mb-4 mt-5">
          You’ve been given {balance.toLocaleString()} {displayToken} tokens.
        </p>
  
        <p className="text-white font-mono text-3xl font-semibold mt-5">
          Balance: {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {displayToken}
        </p>
      </div>  
  

      {/* QR Code halfway between title and buttons */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 flex flex-col items-center">
        <div className="w-full max-w-[300px] aspect-square p-2 rounded">
          <QRCode
            value={walletAddress}
            className="w-full h-full"
            bgColor="#000000"
            fgColor="#ffffff"
          />
        </div>
        <p className="mt-2 text-sm text-white/60 break-all">{walletAddress}</p>
      </div>

      {/* Buttons at ~70% height */}
      <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
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

      {/* Footer Links */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-center">
        <button
          onClick={() => router.push('/get-started')}
          className="mb-4 border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70 cursor-pointer"
        >
          Back
        </button>

        <section className="space-y-2 text-sm">
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
