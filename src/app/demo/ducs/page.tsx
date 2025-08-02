import { redirect } from 'next/navigation';

export default function DucsRedirect() {
  redirect('/demo-wallet?token=ducs');
}
