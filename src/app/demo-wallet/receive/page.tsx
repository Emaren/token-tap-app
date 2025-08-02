// src/app/demo-wallet/receive/page.tsx

import { Suspense } from 'react'
import ReceiveInner from './receive-inner'

export default function ReceivePage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading Wallet...</div>}>
      <ReceiveInner />
    </Suspense>
  )
}
