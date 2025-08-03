// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },

  experimental: { serverActions: {} },

  headers: async () => [
    { source: '/_next/webpack-hmr', headers: cors('*') },
    { source: '/_next/:path*',      headers: cors('*') },
  ],
}

export default nextConfig

function cors(origin: string) {
  return [
    { key: 'Access-Control-Allow-Origin',  value: origin },
    { key: 'Access-Control-Allow-Headers', value: '*'    },
    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' },
  ]
}
