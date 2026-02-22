import Link from "next/link";
import { toQueryString, type AppSearchParams } from "@/lib/search-params";

export default function EggReceivePage({
  searchParams,
}: {
  searchParams?: AppSearchParams;
}) {
  const backHref = `/wally-wallet-egg${toQueryString(searchParams)}`;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Receive (Egg/Furry Lab)</h1>
      <p className="text-white/70">Stub page. Build your receive UI here.</p>
      <Link className="underline hover:opacity-70" href={backHref}>
        ← Back to Egg/Furry Lab
      </Link>
    </div>
  );
}