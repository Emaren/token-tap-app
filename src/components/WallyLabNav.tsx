"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type NavItem = { href: string; label: string };

function withQuery(href: string, qs: string) {
  if (!qs) return href;
  return href.includes("?") ? `${href}&${qs}` : `${href}?${qs}`;
}

export default function WallyLabNav({ items }: { items: NavItem[] }) {
  const sp = useSearchParams();
  const qs = sp.toString();

  return (
    <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {items.map((it) => (
        <Link
          key={it.href}
          className="underline hover:opacity-70"
          href={withQuery(it.href, qs)}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}