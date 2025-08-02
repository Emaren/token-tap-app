// 'use client'

// import { useRouter, useSearchParams } from 'next/navigation'
// import BaseWalletLayout from '@/components/BaseWalletLayout'

// export default function WalletInner() {
//   const router = useRouter()
//   const params = useSearchParams()
//   const rawToken = params.get('token') || 'health'
//   const displayToken = `$${rawToken.toUpperCase()}`

//   const brandMap: Record<string, { brand: string; emoji?: string }> = {
//     health: { brand: 'Homesteader Health', emoji: '🥕' },
//     ducs: { brand: 'Duc’s Delivery', emoji: '🚚' },
//     platinum: { brand: 'Platinum Hair Lounge', emoji: '💇‍♀️' },
//     demo: { brand: 'Demo Wallet' },
//   }

//   const { brand, emoji } = brandMap[rawToken.toLowerCase()] || brandMap['demo']

//   return (
//     <BaseWalletLayout brand={brand} emoji={emoji}>
//       <p className="text-white/70 mb-2">
//         You’ve been given 1,000 {displayToken} tokens.
//       </p>
//       <p className="text-white font-mono text-lg mb-8">
//         Balance: 1,000.00 {displayToken}
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md mb-10">
//         <button
//           onClick={() => router.push(`/demo-wallet/send?token=${rawToken}`)}
//           className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
//         >
//           Send
//         </button>
//         <button
//           onClick={() => router.push(`/demo-wallet/receive?token=${rawToken}`)}
//           className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
//         >
//           Receive
//         </button>
//         <button
//           onClick={() => router.push(`/demo-wallet/request?token=${rawToken}`)}
//           className="border-2 border-white rounded-full py-3 px-6 text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
//         >
//           Request
//         </button>
//       </div>

//       <button
//         onClick={() => router.push('/get-started')}
//         className="border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
//       >
//         Back
//       </button>
//     </BaseWalletLayout>
//   )
// }
