'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const [tokenName, setTokenName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenName.trim()) return;
    router.push(`/demo-wallet?token=${encodeURIComponent(tokenName.trim())}`);
  };

  return (
    <main className="min-h-[100dvh] text-white px-0 sm:px-4 py-0 sm:py-4 [--tt-shell-max:920px]">
      <div className="mx-auto w-full max-w-[var(--tt-shell-max)] min-h-[100dvh] sm:min-h-0 bg-[var(--tt-page-dark-bg)] px-4 sm:px-8 py-10 sm:py-12 sm:rounded-[28px] sm:shadow-[0_22px_70px_rgba(0,0,0,0.45)]">
        <div className="mx-auto w-full max-w-xl flex flex-col items-center gap-6 sm:gap-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center leading-tight">Create Your Token Demo</h1>
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 w-full">
            <div>
              <label className="block text-sm mb-1">Token Name</label>
              <input
                type="text"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="$TOKEN"
                className="w-full px-4 py-2 rounded border border-white bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Logo Upload</label>
              <input
                type="file"
                disabled
                className="w-full px-4 py-2 rounded border border-white bg-black text-white opacity-30 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Max Supply</label>
              <input
                type="text"
                value="1,000,000"
                disabled
                className="w-full px-4 py-2 rounded border border-white bg-black text-white opacity-30 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="w-full border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
            >
              Create Your Real Token
            </button>
          </form>
          <div className="w-full flex flex-col items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.push('/pricing')}
              className="w-full sm:w-auto min-w-[180px] border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
            >
              Pricing
            </button>
            <button
              onClick={() => router.push('/get-started')}
              className="w-full sm:w-auto min-w-[180px] border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
