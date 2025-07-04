'use client'

import Link from "next/link"
import { stripePromise } from "@/lib/stripe"

async function handleCheckout(priceId: string, uid: string) {
  const res = await fetch("http://localhost:8000/create-checkout-session/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ price_id: priceId, uid }),
  })

  const data = await res.json()
  if (data?.url) {
    window.location.href = data.url
  } else {
    console.error("❌ Stripe Checkout URL missing", data)
  }
}

export default function PricingPage() {
  const userId = "test_user_123" // Replace with actual UID

  const tiers = [
    {
      name: "Demo",
      sub: "“Curious Explorer”",
      price: "$0",
      features: ["Basic demo access", "Try TokenTap free", "See & Send your token"],
      link: "/demo",
    },
    {
      name: "One-Time",
      sub: "“The Creator”",
      price: "$9",
      priceId: "price_1RgzBgHvc4wl41HLVnLSplws",
      features: ["Single token creation", "TokenTap wallet support", "Block explorer support"],
    },
    {
      name: "Starter Monthly",
      sub: "“Stay Connected to Your Coin”",
      price: "$9/mo",
      priceId: "price_1RgzD0Hvc4wl41HLPxdBZ4Q3",
      features: ["TokenTap basic dashboard", "Token logo", "Full 24/7 support"],
    },
    {
      name: "Pro Monthly",
      sub: "“Your Coin Inside Your App”",
      price: "$49/mo",
      priceId: "price_1RgzDvHvc4wl41HL2jwWo3Zm",
      features: ["TokenTap pro dashboard", "Token integration", "Full 24/7 support"],
    },
    {
      name: "Growth",
      sub: "“Manage It Yourself”",
      price: "$99/mo",
      priceId: "price_1RgzEMHvc4wl41HLlW6dE2iV",
      features: ["Advanced analytics", "Team access", "Full 24/7 support"],
    },
    {
      name: "Enterprise",
      sub: "“We Run It For You”",
      price: "$149/mo",
      priceId: "price_1RgzFdHvc4wl41HLdH8hCwJp",
      features: ["Unlimited access", "DEX listing", "Dedicated support"],
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white pt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4">Pricing</h1>
      <h2 className="text-white/70 text-center mb-10 text-lg">Loyalty Tokens</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiers.map((tier, index) => {
          const TileContent = (
            <div
              className="border-2 border-white rounded-2xl p-6 text-center transition duration-200 hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
              onClick={() =>
                tier.priceId ? handleCheckout(tier.priceId, userId) : null
              }
            >
              <h2 className="text-xl font-semibold mb-1">{tier.name}</h2>
              <p className="text-white/70 text-sm mb-2">{tier.sub}</p>
              <p className="text-lg font-bold mb-4">{tier.price}</p>
              <ul className="space-y-1 text-sm text-white/70">
                {tier.features.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )

          return tier.link ? (
            <Link key={index} href={tier.link}>
              {TileContent}
            </Link>
          ) : (
            <div key={index}>{TileContent}</div>
          )
        })}
      </div>
    </main>
  )
}

