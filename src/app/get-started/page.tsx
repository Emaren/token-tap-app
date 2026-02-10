"use client";

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CustomerCard from '@/components/CustomerCard'
import { customers } from '@/components/customers'

export default function GetStartedPage() {
  const [showAll, setShowAll] = useState(false)

  const demoTier = {
    name: "Demo",
    sub: "“Curious Explorer”",
    price: "$0",
    features: ["Basic demo access", "Try TokenTap free", "See & Send your token"],
    link: "/demo",
  }

  return (
    <main className="min-h-screen relative flex flex-col bg-black text-white px-4 pt-10 pb-6 max-w-md mx-auto">
      {/* 🔷 Top-Left Logo */}
      <Link href="/" className="absolute top-4 left-4 z-10">
        <Image
          src="/images/ttt-logo.png"
          alt="TokenTap Logo"
          width={40}
          height={40}
          priority
          className="w-10 h-10 object-contain"
        />
      </Link>

      {/* Top: Customers */}
      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-6">Featured Customers</h1>
        <div className="space-y-6">
          <CustomerCard {...customers[0]} />
          {showAll &&
            customers.slice(1).map((c, i) => (
              <CustomerCard key={i + 1} {...c} />
            ))}
          {customers?.length > 1 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-2 text-sm text-white hover:text-white/70"
            >
              {showAll ? 'Hide More Customers ⬆' : 'More Customers ⬇'}
            </button>
          )}
        </div>
      </section>

      {/* Demo Tile */}
      <section className="flex-1 flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-center mb-6">Loyalty Tokens</h2>
        <Link href={demoTier.link}>
          <div className="cursor-pointer border-2 border-white rounded-2xl p-6 text-center transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black">
            <h3 className="text-lg font-bold mb-1">{demoTier.name}</h3>
            <p className="text-white/70 text-sm mb-2">{demoTier.sub}</p>
            <p className="text-lg font-semibold mb-3">{demoTier.price}</p>
            <ul className="text-sm text-white/70 space-y-1">
              {demoTier.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </Link>
      </section>

      {/* Bottom Links */}
      <section className="mt-10 text-center space-y-2 text-sm">
        <Link
          href="/get-started/pricing"
          className="text-white underline hover:text-white/70 block cursor-pointer"
        >
          More Pricing
        </Link>
        <a
          href="https://discord.gg/RYNBKz7n9y"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white underline hover:text-white/70 cursor-pointer"
        >
          <Image src="/images/discord.svg" alt="Discord" width={20} height={20} className="w-5 h-5" />
          Join the TokenTap Discord
        </a>
        <a
          href="mailto:contact@tokentap.ca"
          className="text-white underline hover:text-white/70 block cursor-pointer"
        >
          Contact TokenTap
        </a>
      </section>
    </main>
  )
}
