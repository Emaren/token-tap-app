"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function WallyWalletEggPage() {
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const [bobY, setBobY] = useState(0);

  useEffect(() => {
    startRef.current = performance.now();

    const loop = (t: number) => {
      const dt = t - startRef.current;

      const y = Math.sin(dt / 520) * 6;
      setBobY(y);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
              <div className="absolute left-1/2 -translate-x-1/2 top-[278px] w-[220px] h-[28px] rounded-full bg-black/60 blur-[2px]" />
              <div className="relative w-[260px] h-[300px] md:w-[300px] md:h-[340px]">
                <Image
                  src="/images/Wallys/Wally%20t.png"
                  alt="Wally t"
                  fill
                  priority
                  sizes="(max-width: 768px) 260px, 300px"
                  className="object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
                />
              </div>
            </div>

            <div className="mt-6 text-sm text-white/60">
              Wally t image preview with bob animation.
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
