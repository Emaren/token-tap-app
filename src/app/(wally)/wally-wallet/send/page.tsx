import Link from "next/link";
import { toQueryString, type AppSearchParams } from "@/lib/search-params";

export default function WallySendPage({
  searchParams,
}: {
  searchParams?: AppSearchParams;
}) {
  const backHref = `/wally-wallet${toQueryString(searchParams)}`;

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Send (White Lab)</h1>
      <p className="text-black/60">Wally send flow placeholder.</p>
      <Link className="underline hover:opacity-70" href={backHref}>
        ← Back to White Lab
      </Link>
    </main>
  );
}