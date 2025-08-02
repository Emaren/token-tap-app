/* src/app/pricing/page.tsx
   Server wrapper — no browser-only APIs here
*/

import { Suspense } from 'react';
import PricingInner from './pricing-inner';

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading Pricing…</div>}>
      <PricingInner />
    </Suspense>
  );
}
