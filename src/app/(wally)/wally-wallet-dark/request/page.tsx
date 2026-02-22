import Link from "next/link";
import { toQueryString, type AppSearchParamsPromise } from "@/lib/search-params";

export default async function DarkRequestPage({
  searchParams,
}: {
  searchParams?: AppSearchParamsPromise;
}) {
  const sp = await searchParams;
  const backHref = `/wally-wallet-dark${toQueryString(sp)}`;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Request (Dark Lab)</h1>
      <p className="text-white/70">Stub page. Build your request UI here.</p>
      <Link className="underline hover:opacity-70" href={backHref}>
        ← Back to Dark Lab
      </Link>
    </div>
  );
}