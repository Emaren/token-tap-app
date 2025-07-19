'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import QRCode from 'react-qr-code'

export default function ReceiveInner() {
  const params = useSearchParams()
  const router = useRouter()
  const rawToken = params.get('token') || 'demo'
  const displayToken = `$${rawToken.toUpperCase()}`
  const tokenAddress = `${rawToken.toLowerCase()}_user123`

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Receive {displayToken}</h1>

      <p className="text-white/70 mb-4">Your wallet address:</p>
      <p className="text-lg font-mono mb-6">{tokenAddress}</p>

      <div className="bg-white p-4 rounded">
        <QRCode value={tokenAddress} bgColor="#000000" fgColor="#FFFFFF" size={200} />
      </div>

      <button
        onClick={() => router.push(`/demo-wallet?token=${rawToken}`)}
        className="mt-10 border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
      >
        Back to Wallet
      </button>
    </main>
  )
}
