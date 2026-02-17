import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

// Keep these tight — only accept the price IDs you actually sell.
const ALLOWED_PRICE_IDS = new Set([
  'price_1RgzBgHvc4wl41HLVnLSplws', // One-Time
  'price_1RgzD0Hvc4wl41HLPxdBZ4Q3', // Starter Monthly
  'price_1RgzDvHvc4wl41HL2jwWo3Zm', // Pro Monthly
  'price_1RgzEMHvc4wl41HLlW6dE2iV', // Growth
  'price_1RgzFdHvc4wl41HLdH8hCwJp', // Enterprise
])

// Any non-recurring “one-time” prices go here:
const ONE_TIME_PRICE_IDS = new Set([
  'price_1RgzBgHvc4wl41HLVnLSplws', // One-Time
])

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY missing on server')

  // ✅ Don’t hardcode apiVersion — your installed Stripe SDK pins its own.
  // ✅ Only construct Stripe when the handler runs (avoids build-time crash).
  return new Stripe(key)
}

function errorMessage(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback
}

export async function POST(req: NextRequest) {
  try {
    const parsedBody: unknown = await req.json().catch(() => null)
    const body =
      parsedBody && typeof parsedBody === 'object'
        ? (parsedBody as Record<string, unknown>)
        : {}
    const price_id =
      typeof body.price_id === 'string' ? body.price_id : undefined
    const uid = typeof body.uid === 'string' ? body.uid : null

    if (!price_id || typeof price_id !== 'string') {
      return NextResponse.json({ error: 'price_id required' }, { status: 400 })
    }

    if (!ALLOWED_PRICE_IDS.has(price_id)) {
      return NextResponse.json(
        { error: 'price_id not allowed' },
        { status: 400 }
      )
    }

    const stripe = getStripe()
    const origin = new URL(req.url).origin

    const mode: Stripe.Checkout.SessionCreateParams.Mode =
      ONE_TIME_PRICE_IDS.has(price_id) ? 'payment' : 'subscription'

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: price_id, quantity: 1 }],
      success_url: `${origin}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        ...(uid ? { uid } : {}),
        price_id,
      },
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: errorMessage(err, 'create-checkout-session failed') },
      { status: 500 }
    )
  }
}
