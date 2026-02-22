import Link from "next/link";
import { toQueryString, type AppSearchParams } from "@/lib/search-params";

export default function DarkRequestPage({
  searchParams,
}: {
  searchParams?: AppSearchParams;
}) {
  const backHref = `/wally-wallet-dark${toQueryString(searchParams)}`;

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