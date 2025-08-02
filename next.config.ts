// next.config.ts
import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

// ───────────────────────────────────────────────────────────
// 1) Runtime-caching rules  (typed locally to avoid TS errors)
// ───────────────────────────────────────────────────────────
type RuntimeCaching = {
  urlPattern: string | RegExp
  handler: 'CacheFirst' | 'NetworkFirst' | 'StaleWhileRevalidate'
  options?: {
    cacheName?: string
    expiration?: { maxEntries?: number; maxAgeSeconds?: number }
    [key: string]: unknown
  }
}

const runtimeCaching: RuntimeCaching[] = [
  {
    // Next build assets → stale-while-revalidate
    urlPattern: /^\/_next\/static\/.*/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-resources',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      }
    }
  }
]

// ───────────────────────────────────────────────────────────
// 2) Wrap with next-pwa – but *only* when it’s enabled
// ───────────────────────────────────────────────────────────
const pwaDisabled =
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_DISABLE_PWA === '1'

const withPWAFunc = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cleanupOutdatedCaches: true,
  disable: pwaDisabled,
  // runtimeCaching blows-up when the plugin is disabled,
  // so attach it conditionally.
  ...(pwaDisabled ? {} : { runtimeCaching })
})

// ───────────────────────────────────────────────────────────
// 3) Base Next.js config
// ───────────────────────────────────────────────────────────
const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },

  /** silence the ngrok warning */
  allowedDevOrigins: [
    'https://c1b8bdd0eaf9.ngrok-free.app', // ✅ current
    'https://926e2fdc7fde.ngrok-free.app'  // optional fallback
  ],  

  experimental: { serverActions: {} }
}

// ───────────────────────────────────────────────────────────
// 4) Export
// ───────────────────────────────────────────────────────────
export default withPWAFunc(nextConfig)
