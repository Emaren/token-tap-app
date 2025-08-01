'use client'

import { Suspense } from 'react'
import WalletInner from '../../demo-wallet/wallet-inner'

export default function HomesteaderDemoPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading Homesteader Wallet...</div>}>
      <WalletInner />
    </Suspense>
  )
}
