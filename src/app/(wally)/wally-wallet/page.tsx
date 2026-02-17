'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function WallySprite() {
  const rafRef = useRef<number | null>(null)
  const t0Ref = useRef<number>(0)

  const [bob, setBob] = useState(0) // px
  const [blink, setBlink] = useState(0) // 0..1

  useEffect(() => {
    const tick = (ts: number) => {
      if (!t0Ref.current) t0Ref.current = ts
      const t = (ts - t0Ref.current) / 1000

      // gentle bob
      setBob(Math.sin(t * 2.1) * 10)

      // occasional blink: build a periodic “pulse”
      const p = (t * 0.6) % 1
      const pulse =
        p < 0.06 ? 1 - p / 0.06 : p < 0.12 ? (p - 0.06) / 0.06 : 0
      setBlink(clamp(pulse, 0, 1))

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const eyeScaleY = useMemo(() => 1 - blink * 0.92, [blink])

  return (
    <div
      className="relative select-none"
      style={{
        transform: `translateY(${bob}px)`,
        willChange: 'transform',
      }}
      aria-label="Wally"
    >
      {/* shadow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[190px] w-[180px] h-[24px] rounded-full bg-black/10 blur-[1px]" />

      {/* body */}
      <div className="relative w-[220px] h-[220px] rounded-[48px] border border-black/15 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
        {/* inner face area */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[36px] w-[170px] h-[140px] rounded-[40px] bg-black/5 border border-black/10" />

        {/* ears */}
        <div className="absolute -left-[10px] top-[22px] w-[64px] h-[74px] rounded-[26px] bg-white border border-black/15 shadow-sm rotate-[-12deg]" />
        <div className="absolute -right-[10px] top-[22px] w-[64px] h-[74px] rounded-[26px] bg-white border border-black/15 shadow-sm rotate-[12deg]" />

        {/* eyes */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[86px] flex gap-[34px]">
          <div className="w-[18px] h-[18px] rounded-full bg-black"
            style={{ transform: `scaleY(${eyeScaleY})`, transformOrigin: '50% 50%', willChange: 'transform' }}
          />
          <div className="w-[18px] h-[18px] rounded-full bg-black"
            style={{ transform: `scaleY(${eyeScaleY})`, transformOrigin: '50% 50%', willChange: 'transform' }}
          />
        </div>

        {/* mouth */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[132px] w-[46px] h-[22px] border-b-[3px] border-black/60 rounded-b-full" />

        {/* tiny badge */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[18px] text-[11px] text-black/50">
          WALLY v0
        </div>

        {/* tail */}
        <div className="absolute -right-[22px] top-[120px] w-[46px] h-[46px] rounded-[18px] bg-white border border-black/15 shadow-sm rotate-[18deg]" />
      </div>
    </div>
  )
}

export default function WallyWalletLabPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Wally Wallet</h1>
          <p className="text-black/60">
            White canvas. No TokenTap theme logic. Build animation + UI here.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/wally-wallet/send"
            className="px-4 py-2 rounded-xl border border-black/15 hover:bg-black/5"
          >
            Send
          </Link>
          <Link
            href="/wally-wallet/receive"
            className="px-4 py-2 rounded-xl border border-black/15 hover:bg-black/5"
          >
            Receive
          </Link>
          <Link
            href="/wally-wallet/request"
            className="px-4 py-2 rounded-xl border border-black/15 hover:bg-black/5"
          >
            Request
          </Link>
        </div>
      </div>

      {/* Wally Stage */}
      <section
        id="wally-stage"
        className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
      >
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-10">
            <WallySprite />
            <div className="mt-6 text-sm text-black/60">
              First animation: bob + blink (requestAnimationFrame).
            </div>
          </div>
        </div>
      </section>

      {/* notes */}
      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <div className="text-sm font-semibold mb-2">Next steps (Phase 2)</div>
        <ul className="text-sm text-black/70 list-disc pl-5 space-y-1">
          <li>Replace this div-based sprite with your real Wally art style.</li>
          <li>Add “wallet chrome” (balance, token chips) around the stage.</li>
          <li>Hook balances to a shared wallet engine (mock first).</li>
        </ul>
      </section>
    </div>
  )
}
