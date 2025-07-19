// src/app/demo-wallet/request/request-inner.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipient || !amount) return
    alert(`Requesting ${amount} ${displayToken} from ${recipient}`)
    router.push(`/demo-wallet?token=${rawToken}`)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Request {displayToken}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
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
            className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
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
              className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
            >
              Stop Scanning
            </button>
            <div className="w-full">
              <video ref={videoRef} className="w-full rounded mt-4" />
            </div>
          </>
        )}

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

        <button
          type="submit"
          className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
        >
          Request
        </button>
      </form>

      <button
        onClick={() => router.push(`/demo-wallet?token=${rawToken}`)}
        className="mt-10 border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
      >
        Back to Wallet
      </button>
    </main>
  )
}
