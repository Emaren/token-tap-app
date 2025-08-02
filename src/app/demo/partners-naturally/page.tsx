import { redirect } from 'next/navigation';

export default function PartnersNaturallyRedirect() {
  redirect('/demo-wallet?token=woof');
}
