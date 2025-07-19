// src/app/demo-wallet/request/page.tsx
'use client'

import { Suspense } from 'react'
import RequestInner from './request-inner'

export default function RequestPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <RequestInner />
    </Suspense>
  )
}
