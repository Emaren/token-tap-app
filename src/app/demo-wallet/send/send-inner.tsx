'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import BaseWalletLayout from '@/components/BaseWalletLayout'

type QrScannerInstance = {
  start: () => Promise<void>
  stop: () => void
  destroy?: () => void
}

export default function SendInner() {
  const params = useSearchParams()
  const router = useRouter()
  const rawToken = params.get('token') || 'demo'
  const displayToken = `$${rawToken.toUpperCase()}`
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [scanning, setScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scannerRef = useRef<QrScannerInstance | null>(null)

  const brandMap: Record<string, { brand: string; emoji?: string }> = {
    health: { brand: 'Homesteader Health', emoji: '🥕' },
    ducs: { brand: 'Duc’s Delivery', emoji: '🚚' },
    platinum: { brand: 'Platinum Hair Lounge', emoji: '💇‍♀️' },
    woof: { brand: 'Partners Naturally', emoji: '🐶' },
    demo: { brand: 'Demo Wallet' },
  }

  const { brand, emoji } = brandMap[rawToken?.toLowerCase?.() || 'demo'] || brandMap['demo']

  const stopScanner = useCallback(() => {
    scannerRef.current?.stop()
    scannerRef.current?.destroy?.()
    scannerRef.current = null

    const videoElement = videoRef.current
    const tracks = (videoElement?.srcObject as MediaStream | null)?.getTracks?.()
    tracks?.forEach((track) => track.stop())
    if (videoElement) videoElement.srcObject = null
  }, [])

  useEffect(() => {
    if (!scanning) return
    const videoElement = videoRef.current
    if (!videoElement) return

    let cancelled = false

    const startScanner = async () => {
      try {
        const { default: QrScanner } = await import('qr-scanner')
        if (cancelled) return

        const scanner = new QrScanner(
          videoElement,
          (result) => {
            if (cancelled) return
            setRecipient(result.data)
            setScanning(false)
            stopScanner()
          },
          {
            highlightScanRegion: true,
            maxScansPerSecond: 1,
          }
        )

        scannerRef.current = scanner as QrScannerInstance
        await scanner.start()
      } catch (error) {
        if (cancelled) return
        console.error('QR scanner failed to start', error)
        setScanning(false)
        stopScanner()
      }
    }

    void startScanner()

    return () => {
      cancelled = true
      stopScanner()
    }
  }, [scanning, stopScanner])

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
                stopScanner()
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
