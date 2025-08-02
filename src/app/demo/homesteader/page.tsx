import { redirect } from 'next/navigation';

export default function HomesteaderRedirect() {
  redirect('/demo-wallet?token=health');   // old brand = health
}
