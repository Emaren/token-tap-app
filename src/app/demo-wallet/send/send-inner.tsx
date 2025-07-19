'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Html5Qrcode } from 'html5-qrcode'

export default function SendInner() {
  const params = useSearchParams()
  const router = useRouter()
  const rawToken = params.get('token') || 'demo'
  const displayToken = `$${rawToken.toUpperCase()}`
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [scanning, setScanning] = useState(false)
  const qrRegionId = 'qr-reader'
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    if (scanning) {
      const qr = new Html5Qrcode(qrRegionId)
      scannerRef.current = qr
      qr.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setRecipient(decodedText)
          qr.stop().then(() => setScanning(false))
        },
        console.error
      )
    } else {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current = null
        })
      }
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop()
      }
    }
  }, [scanning])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipient || !amount) return
    alert(`Sent ${amount} ${displayToken} to ${recipient}`)
    router.push(`/demo-wallet?token=${rawToken}`)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Send {displayToken}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
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

        <button
          type="button"
          onClick={() => setScanning((prev) => !prev)}
          className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
        >
          {scanning ? 'Stop Scanning' : 'Scan QR Code'}
        </button>

        {scanning && (
          <div id={qrRegionId} className="mt-4 rounded border border-white p-2 w-full" />
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
          Send
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
