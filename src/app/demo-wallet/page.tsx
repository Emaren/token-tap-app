// src/app/demo-wallet/page.tsx
'use client'

import { Suspense } from 'react'
import WalletInner from './wallet-inner'

export default function DemoWalletPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading Wallet...</div>}>
      <WalletInner />
    </Suspense>
  )
}
