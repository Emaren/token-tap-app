import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'

// ✅ Don’t create Stripe at import-time (build step may not have env vars)
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY missing on server')
  return new Stripe(key) // ✅ don’t hardcode apiVersion; SDK pins its own
}

function errorMessage(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback
}

type Ctx = { params: Promise<{ sessionId: string }> }

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { sessionId } = await ctx.params

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId missing' }, { status: 400 })
    }

    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      id: session.id,
      status: session.status ?? null,
      customer_email: session.customer_details?.email ?? null,
      payment_status: session.payment_status ?? null,
    })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: errorMessage(err, 'stripe-session lookup failed') },
      { status: 500 }
    )
  }
}
