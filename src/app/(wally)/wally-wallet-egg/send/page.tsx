import Link from "next/link";

export default function EggSendPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Send (Egg/Furry Lab)</h1>
      <p className="text-white/70">Stub page. Build your send UI here.</p>
      <Link className="underline hover:opacity-70" href="/wally-wallet-egg">
        ← Back to Egg/Furry Lab
      </Link>
    </div>
  );
}
