'use client'

import { Suspense } from 'react'
import BaseWallet from '@/components/BaseWallet'

export default function PartnersNaturallyWalletPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <BaseWallet token="woof" balance={1_000} brand="Partners Naturally" emoji="🐶" />
    </Suspense>
  )
}
