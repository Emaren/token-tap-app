'use client'

import { Suspense } from 'react'
import BaseWallet from '@/components/BaseWallet'

export default function DucsWalletPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
        <BaseWallet token="ducs" balance={1_000} brand="Duc's Delivery" emoji="🚚" />
    </Suspense>
  )
}
