import Link from "next/link";

export default function WallySendPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Send (White Lab)</h1>
      <p className="text-black/60">Wally send flow placeholder.</p>
      <Link className="underline hover:opacity-70" href="/wally-wallet">
        ← Back to White Lab
      </Link>
    </main>
  )
}
