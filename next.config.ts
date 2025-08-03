import withPWA from 'next-pwa'
import type { NextConfig } from 'next/types'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },

  allowedDevOrigins: [
    'https://d9a6154fcdb4.ngrok-free.app',
    'https://926e2fdc7fde.ngrok-free.app'
  ],

  experimental: { serverActions: {} },

  headers: async () => [
    {
      source: '/_next/webpack-hmr',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Headers', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' }
      ]
    },
    {
      source: '/_next/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Headers', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS' }
      ]
    }
  ]
}
