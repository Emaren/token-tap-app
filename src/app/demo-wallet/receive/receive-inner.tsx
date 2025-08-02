'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import QRCode from 'react-qr-code'
import BaseWalletLayout from '@/components/BaseWalletLayout'

export default function ReceiveInner() {
  const params = useSearchParams()
  const router = useRouter()
  const rawToken = params.get('token') || 'demo'
  const token = rawToken.toLowerCase()
  const displayToken = `$${rawToken.toUpperCase()}`

  const brandMap: Record<string, { brand: string; emoji?: string }> = {
    health: { brand: 'Homesteader Health', emoji: '🥕' },
    ducs: { brand: 'Duc’s Delivery', emoji: '🚚' },
    platinum: { brand: 'Platinum Hair Lounge', emoji: '💇‍♀️' },
    woof: { brand: 'Partners Naturally', emoji: '🐶' },
    demo: { brand: 'Demo Wallet' },
  }

  const { brand, emoji } = brandMap[token] || brandMap['demo']

  return (
    <BaseWalletLayout brand={brand} emoji={emoji}>
      {/* Title & Wallet Address */}
      <div className="pt-[2.1vh] w-full px-6 text-center">
        <h2 className="text-xl font-bold mb-6">Receive {displayToken}</h2>
        <p className="text-white/70 mb-1 text-sm">Your Wallet Address</p>
        <p className="text-white font-mono text-lg">{token}</p>
      </div>

      {/* QR Code at 45% */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 flex flex-col items-center">
        <div className="w-full max-w-[300px] aspect-square p-2 rounded">
          <QRCode
            value={token}
            className="w-full h-full"
            bgColor="#000000"
            fgColor="#ffffff"
          />
        </div>
        <p className="mt-2 text-sm text-white/60 break-all">{token}</p>
      </div>

      {/* Back button pinned at 70% */}
      <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
        <button
          onClick={() => router.push(`/demo-wallet?token=${token}`)}
          className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70 cursor-pointer"
        >
          Back to Wallet
        </button>
      </div>
    </BaseWalletLayout>
  )
}
