// next.config.ts
import type { NextConfig } from 'next'

/**
 * Minimal, prod-safe config.
 * – No PWA plugin (next-pwa removed from node_modules)
 * – No non-standard keys that break Next’s public-file manifest
 * – Keeps the CORS headers you need for HMR and chunk loading
 * – Server Actions DISABLED (you aren't using them and they can trigger hashing/build/runtime weirdness)
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },

  // ✅ Disable Server Actions (remove this entire experimental block)
  // experimental: { serverActions: {} },

  headers: async () => [
    { source: '/_next/webpack-hmr', headers: cors('*') },
    { source: '/_next/:path*', headers: cors('*') },
  ],
}

export default nextConfig

function cors(origin: string) {
  return [
    { key: 'Access-Control-Allow-Origin', value: origin },
    { key: 'Access-Control-Allow-Headers', value: '*' },
    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
  ]
}
