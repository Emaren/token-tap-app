'use client'

import { Suspense } from 'react'
import BaseWallet from '@/components/BaseWallet'

export default function PlatinumWalletPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
        <BaseWallet token="platinum" balance={1_000} brand="Platinum Hair Lounge" emoji="💇‍♀️" />
            </Suspense>
  )
}
