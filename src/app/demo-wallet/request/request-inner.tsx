'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import BaseWalletLayout from '@/components/BaseWalletLayout'

export default function RequestInner() {
  const params = useSearchParams()
  const router = useRouter()
  const rawToken = params.get('token') || 'demo'
  const displayToken = `$${rawToken.toUpperCase()}`
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [scanning, setScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScanner | null>(null)

  const brandMap: Record<string, { brand: string; emoji?: string }> = {
    health: { brand: 'Homesteader Health', emoji: '🥕' },
    ducs: { brand: 'Duc’s Delivery', emoji: '🚚' },
    platinum: { brand: 'Platinum Hair Lounge', emoji: '💇‍♀️' },
    woof: { brand: 'Partners Naturally', emoji: '🐶' },
    demo: { brand: 'Demo Wallet' },
  }

  const { brand, emoji } = brandMap[rawToken.toLowerCase()] || brandMap['demo']

  useEffect(() => {
    if (!scanning || !videoRef.current) return

    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        setRecipient(result.data)
        setScanning(false)
        scannerRef.current?.stop()
      },
      {
        highlightScanRegion: true,
        maxScansPerSecond: 1,
      }
    )

    scannerRef.current.start()

    return () => {
      scannerRef.current?.stop()
    }
  }, [scanning])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!recipient || !amount) return
    alert(`Requesting ${amount} ${displayToken} from ${recipient}`)
    router.push(`/demo-wallet?token=${rawToken}`)
  }

  return (
    <BaseWalletLayout brand={brand} emoji={emoji}>
      {/* Title & Recipient */}
      <div className="pt-[1vh] w-full px-6 text-center">
        <h2 className="text-xl font-bold mb-6">Request {displayToken}</h2>

        <form className="space-y-6 max-w-md mx-auto text-left">
          <div>
            <label className="block text-sm mb-1">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={`${rawToken}123...`}
              className="w-full px-4 py-2 rounded border border-white bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {!scanning ? (
            <button
              type="button"
              onClick={() => setScanning(true)}
              className="w-full cursor-pointer border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring hover:ring-white/70"
            >
              Scan QR Code
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setScanning(false)
                  scannerRef.current?.stop()
                }}
                className="w-full cursor-pointer border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring hover:ring-white/70"
              >
                Stop Scanning
              </button>
              <div className="w-full">
                <video ref={videoRef} className="w-full rounded mt-4" />
              </div>
            </>
          )}
        </form>
      </div>

      {/* Amount input at 64% */}
      <div className="absolute top-[64%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
        <label className="block text-sm mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          className="w-full px-4 py-2 rounded border border-white bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Request button pinned at 70% */}
      <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
        <button
          onClick={handleSubmit}
          className="w-full cursor-pointer border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70"
        >
          Request
        </button>
      </div>

      {/* Back button pinned to bottom */}
      <div className="absolute bottom-22 left-0 right-0 z-10 flex flex-col items-center text-center space-y-3 mt-4">
        <button
          onClick={() => router.push(`/demo-wallet?token=${rawToken}`)}
          className="cursor-pointer border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70"
        >
          Back to Wallet
        </button>
      </div>
    </BaseWalletLayout>
  )
}
