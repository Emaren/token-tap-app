/* Generic “Demo” entry – server-only redirect */
import { redirect } from 'next/navigation';

export default function DemoRedirect() {
  redirect('/demo-wallet?token=demo');
}
