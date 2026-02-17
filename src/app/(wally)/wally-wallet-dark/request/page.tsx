import Link from "next/link";

export default function DarkRequestPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Request (Dark Lab)</h1>
      <p className="text-white/70">Stub page. Build your request UI here.</p>
      <Link className="underline hover:opacity-70" href="/wally-wallet-dark">
        ← Back to Dark Lab
      </Link>
    </div>
  );
}
