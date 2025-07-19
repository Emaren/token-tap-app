'use client'

import { Suspense } from 'react'
import SendInner from './send-inner'

export default function SendPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading Wallet...</div>}>
      <SendInner />
    </Suspense>
  )
}
