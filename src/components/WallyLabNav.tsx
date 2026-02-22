"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export type WallyNavItem = {
  href: string;
  label: string;
  preserveQuery?: boolean; // default: true
};

function withQuery(href: string, qs: string) {
  if (!qs) return href;
  return href.includes("?") ? `${href}&${qs}` : `${href}?${qs}`;
}

export default function WallyLabNav({ items }: { items: WallyNavItem[] }) {
  const sp = useSearchParams();
  const qs = sp.toString();

  return (
    <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {items.map((it) => {
        const href =
          it.preserveQuery === false ? it.href : withQuery(it.href, qs);

        return (
          <Link
            key={it.href}
            className="underline hover:opacity-70"
            href={href}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}