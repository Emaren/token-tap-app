'use client'

import { useSearchParams } from 'next/navigation'
import BaseWallet from '@/components/BaseWallet'

export default function DemoWalletPage() {
  const params = useSearchParams()
  const token = params.get('token') || 'health'

  const brandMap: Record<string, { brand: string; emoji?: string }> = {
    health: { brand: 'Homesteader Health', emoji: '🥕' },
    ducs: { brand: 'Duc’s Delivery', emoji: '🚚' },
    platinum: { brand: 'Platinum Hair Lounge', emoji: '💇‍♀️' },
    woof: { brand: 'Partners Naturally', emoji: '🐶' },
    demo: { brand: 'Demo Wallet' },
  }

  const { brand, emoji } = brandMap[token.toLowerCase()] || brandMap['demo']
  const balance = 1000

  return (
    <BaseWallet token={token} balance={balance} brand={brand} emoji={emoji} />
  )
}
