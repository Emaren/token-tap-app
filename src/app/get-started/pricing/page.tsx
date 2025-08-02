'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const userId = "test_user_123"

const tiers = [
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

async function handleCheckout(priceId: string, uid: string) {
    const res = await fetch("http://localhost:8000/create-checkout-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price_id: priceId, uid }),
    })
  
    const data = await res.json()
    if (data?.url && data?.id) {
      window.location.href = data.url
    } else {
      console.error("❌ Stripe Checkout response missing", data)
    }
  }  

export default function MorePricingPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white px-4 pt-10 pb-10 max-w-md mx-auto flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">Subscription Options</h1>

      <div className="space-y-6 flex-grow">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className="border-2 border-white rounded-2xl p-6 text-center transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
            onClick={() => handleCheckout(tier.priceId!, userId)}
          >
            <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
            <p className="text-white/70 text-sm mb-2">{tier.sub}</p>
            <p className="text-lg font-semibold mb-3">{tier.price}</p>
            <ul className="text-sm text-white/70 space-y-1">
              {tier.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.back()}
        className="mt-10 text-sm text-white underline hover:text-white/70 cursor-pointer"
      >
        ← Back
      </button>
            {/* Bottom Links */}
            <section className="mt-10 text-center space-y-2 text-sm">
        <a
          href="https://discord.gg/RYNBKz7n9y"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white underline hover:text-white/70 cursor-pointer"
        >
          <img src="/images/discord.svg" alt="Discord" className="w-5 h-5" />
          Join the TokenTap Discord
        </a>
        <a
          href="mailto:contact@tokentap.ca"
          className="text-white underline hover:text-white/70 cursor-pointer block"
        >
          Contact TokenTap
        </a>
        </section> {/* Bottom Links */}
    </main>
  )
}
