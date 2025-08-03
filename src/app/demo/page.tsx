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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-32 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Create Your Token Demo</h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
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
        <br />
        <button
        onClick={() => router.push('/pricing')}
        className="border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
        >
        Pricing
      </button>
      <br />
        <button
        onClick={() => router.push('/get-started')}
        className="border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
        >
        Back
      </button>
    </main>
  );
}
