import { redirect } from 'next/navigation';

export default function PlatinumRedirect() {
  redirect('/demo-wallet?token=platinum');
}
