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
      <div className="w-full max-w-md mx-auto text-center space-y-6">
        <h2 className="text-xl font-bold">Receive {displayToken}</h2>

        {/* Wallet Address */}
        <div>
          <p className="text-white/70 mb-1 text-sm">Your Wallet Address</p>
          <p className="text-white font-mono text-lg">{token}</p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-full max-w-[120px] aspect-square p-2 rounded">
            <QRCode
              value={token}
              className="w-full h-full"
              bgColor="#000000"
              fgColor="#ffffff"
            />
          </div>
          <p className="text-sm text-white/60 break-all">{token}</p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push(`/demo-wallet?token=${token}`)}
          className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70"
        >
          Back to Wallet
        </button>
      </div>
    </BaseWalletLayout>
  )
}
