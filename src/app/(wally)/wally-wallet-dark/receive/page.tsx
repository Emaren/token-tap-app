import Link from "next/link";

export default function EggReceivePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Receive (Egg/Furry Lab)</h1>
      <p className="text-white/70">Stub page. Build your receive UI here.</p>
      <Link className="underline hover:opacity-70" href="/wally-wallet-egg">
        ← Back to Egg/Furry Lab
      </Link>
    </div>
  );
}
