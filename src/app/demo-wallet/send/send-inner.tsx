'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import QrScanner from 'qr-scanner'
import BaseWalletLayout from '@/components/BaseWalletLayout'

export default function SendInner() {
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

  const { brand, emoji } = brandMap[rawToken?.toLowerCase?.() || 'demo'] || brandMap['demo']

  useEffect(() => {
    if (!scanning || !videoRef.current) return

    scannerRef.current = new QrScanner(
      videoRef.current,
      (result) => {
        setRecipient(result.data)
        setScanning(false)
        scannerRef.current?.stop()
        const tracks = (videoRef.current!.srcObject as MediaStream)?.getTracks?.()
        tracks?.forEach((track) => track.stop())
      },
      {
        highlightScanRegion: true,
        maxScansPerSecond: 1,
      }
    )

    scannerRef.current.start()

    return () => {
      scannerRef.current?.stop()
      const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks?.()
      tracks?.forEach((track) => track.stop())
    }
  }, [scanning])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!recipient || !amount) return
    alert(`Sent ${amount} ${displayToken} to ${recipient}`)
    router.push(`/demo-wallet?token=${rawToken}`)
  }

  return (
    <BaseWalletLayout brand={brand} emoji={emoji}>
      <div className="w-full max-w-md mx-auto text-left space-y-6">
        <h2 className="text-xl font-bold text-center">Send {displayToken}</h2>

        {/* Recipient Address */}
        <div>
          <label className="block text-sm mb-1">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={`${rawToken.toLowerCase()}123...`}
            className="w-full px-4 py-2 rounded border border-white bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Scan QR Code or Stop */}
        {!scanning ? (
          <button
            type="button"
            onClick={() => setScanning(true)}
            className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70"
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
              className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70"
            >
              Stop Scanning
            </button>
            <div className="w-full">
              <video ref={videoRef} className="w-full rounded mt-4" />
            </div>
          </>
        )}

        {/* Amount */}
        <div>
          <label className="block text-sm mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            className="w-full px-4 py-2 rounded border border-white bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70"
        >
          Send
        </button>

        {/* Back Button */}
        <button
          onClick={() => router.push(`/demo-wallet?token=${rawToken}`)}
          className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring hover:ring-white/70"
        >
          Back to Wallet
        </button>
      </div>
    </BaseWalletLayout>
  )
}
