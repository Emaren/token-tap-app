// src/app/demo-wallet/wallet-inner.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function WalletInner() {
  const router = useRouter()
  const params = useSearchParams()
  const rawToken = params.get('token') || 'demo'
  const displayToken = `$${rawToken.toUpperCase()}`

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-32 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">{displayToken} Wallet</h1>
      <p className="text-white/70 mb-2">You’ve been given 1,000 {displayToken} tokens.</p>
      <p className="text-white font-mono text-lg mb-8">Balance: 1,000.00 {displayToken}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md mb-10">
        <button
          onClick={() => router.push(`/demo-wallet/send?token=${rawToken}`)}
          className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
        >
          Send
        </button>
        <button
          onClick={() => router.push(`/demo-wallet/receive?token=${rawToken}`)}
          className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
        >
          Receive
        </button>
        <button
          onClick={() => router.push(`/demo-wallet/request?token=${rawToken}`)}
          className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
        >
          Request
        </button>
      </div>

      <button
        onClick={() => router.push('/pricing')}
        className="border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
      >
        Back to Pricing
      </button>
    </main>
  )
}
