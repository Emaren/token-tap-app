// next.config.ts
import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // ✅ must be an object
  },
};

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disable PWA in dev
  register: true,
  skipWaiting: true,
  // Optionally: add custom fallback if offline
  // fallbacks: {
  //   document: '/offline.html',
  // },
};

export default withPWA(pwaConfig)(nextConfig);

