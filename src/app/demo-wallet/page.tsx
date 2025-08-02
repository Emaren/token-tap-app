'use client'

import { Suspense } from 'react'
import DemoWalletInner from './demo-wallet-inner'

export default function DemoWalletPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading wallet…</div>}>
      <DemoWalletInner />
    </Suspense>
  )
}
