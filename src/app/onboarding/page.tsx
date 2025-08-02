// src/app/onboarding/page.tsx

import { Suspense } from 'react'
import OnboardingInner from './onboarding-inner'

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading&nbsp;Onboarding…</div>}>
      <OnboardingInner />
    </Suspense>
  )
}
