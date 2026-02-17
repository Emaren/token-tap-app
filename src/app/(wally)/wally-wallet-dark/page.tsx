"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function WallyWalletEggPage() {
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const [bobY, setBobY] = useState(0);
  const [blink, setBlink] = useState(false);

  // small random-ish blink timing
  const nextBlinkAt = useMemo(() => ({ t: 0 }), []);

  useEffect(() => {
    startRef.current = performance.now();
    nextBlinkAt.t = startRef.current + 1200;

    const loop = (t: number) => {
      const dt = t - startRef.current;

      // Bob
      const y = Math.sin(dt / 520) * 6;
      setBobY(y);

      // Blink (brief)
      if (t > nextBlinkAt.t) {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 90);
        nextBlinkAt.t = t + 1400 + Math.random() * 2200;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [nextBlinkAt]);

  const eyeScaleY = blink ? 0.12 : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Egg/Furry Wally Wallet</h1>
          <p className="text-white/60">
            Dark canvas. Separate from the white lab. Build your 3D egg + pixel-fur vibe here.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5"
            href="/wally-wallet-egg/send"
          >
            Send
          </Link>
          <Link
            className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5"
            href="/wally-wallet-egg/receive"
          >
            Receive
          </Link>
          <Link
            className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5"
            href="/wally-wallet-egg/request"
          >
            Request
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center justify-center py-10">
            <div
              className="relative select-none"
              style={{ transform: `translateY(${clamp(bobY, -10, 10)}px)`, willChange: "transform" }}
              aria-label="Egg/Furry Wally"
            >
              {/* shadow */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[280px] w-[210px] h-[26px] rounded-full bg-black/60 blur-[2px]" />

              {/* egg body */}
              <div className="relative w-[240px] h-[300px] rounded-[999px] border border-white/15 bg-white/5 shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* highlight */}
                <div className="absolute -left-10 top-8 w-40 h-56 rounded-[999px] bg-white/10 blur-[2px]" />
                {/* “fur ring” placeholder */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[92px] w-[210px] h-[140px] rounded-[999px] border border-white/10 bg-white/5" />

                {/* eyes */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[140px] flex gap-[46px]">
                  <div
                    className="w-[18px] h-[18px] rounded-full bg-white"
                    style={{ transform: `scaleY(${eyeScaleY})`, transformOrigin: "50% 50%", willChange: "transform" }}
                  />
                  <div
                    className="w-[18px] h-[18px] rounded-full bg-white"
                    style={{ transform: `scaleY(${eyeScaleY})`, transformOrigin: "50% 50%", willChange: "transform" }}
                  />
                </div>

                {/* mouth */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[184px] w-[54px] h-[22px] border-b-[3px] border-white/60 rounded-b-full" />

                <div className="absolute left-1/2 -translate-x-1/2 bottom-[18px] text-[11px] text-white/50">
                  EGG WALLY v0
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-white/60">
              First animation: bob + blink (requestAnimationFrame).
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-black p-5">
        <div className="text-sm font-semibold mb-2">Next steps (Egg/Furry Lab)</div>
        <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
          <li>Swap this egg placeholder for your “egg + fur + pixel” art direction.</li>
          <li>Wrap it in wallet chrome (balance, token chips, recent activity).</li>
          <li>Later: share the same wallet core so all skins stay consistent.</li>
        </ul>
      </section>
    </div>
  );
}
