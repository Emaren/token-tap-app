/* src/app/demo-wallet/demo-wallet-inner.tsx
   Interactive wallet shell – runs only on the client
*/
'use client';

import { useSearchParams } from 'next/navigation';
import BaseWallet from '@/components/BaseWallet';

export default function DemoWalletInner() {
  /* -------------------------------------------
     1.  Read ?token=<name> from the URL
  -------------------------------------------- */
  const searchParams = useSearchParams();
  const rawToken = searchParams.get('token') ?? 'demo'; // fallback

  /** normalise & guard */
  const token = rawToken.toLowerCase();

  /* -------------------------------------------
     2.  Map token → display brand / emoji
  -------------------------------------------- */
  const brandMap: Record<string, { brand: string; emoji?: string }> = {
    health:   { brand: 'Homesteader Health',   emoji: '🥕' },
    ducs:     { brand: 'Duc’s Delivery',       emoji: '🚚' },
    platinum: { brand: 'Platinum Hair Lounge', emoji: '💇‍♀️' },
    woof:     { brand: 'Partners Naturally',   emoji: '🐶' },
    demo:     { brand: 'Demo Wallet' },
  };

  const { brand, emoji } = brandMap[token] ?? brandMap.demo;

  /* -------------------------------------------
     3.  Render the wallet
  -------------------------------------------- */
  return (
    <BaseWallet
      token={token}
      brand={brand}
      emoji={emoji}
      balance={1_000}         // demo balance
    />
  );
}
