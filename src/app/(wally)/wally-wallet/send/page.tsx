import Link from "next/link";
import { toQueryString, type AppSearchParamsPromise } from "@/lib/search-params";

export default async function WallySendPage({
  searchParams,
}: {
  searchParams?: AppSearchParamsPromise;
}) {
  const sp = await searchParams;
  const backHref = `/wally-wallet${toQueryString(sp)}`;

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