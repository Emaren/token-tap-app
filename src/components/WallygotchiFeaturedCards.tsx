"use client";

import Image from "next/image";
import { StoredSelectedCreatureV1 } from "@/lib/selected-creature";

type Props = {
  selectedId: string | null;
  onSelect: (c: StoredSelectedCreatureV1) => void;
};

const featured = [
  {
    id: "wally-pink",
    name: "Pink Wally",
    rarity: "Featured",
    imageSrc: "/images/wallygotchi/pink-wally.png",
    vibe: "Cosmic cuteness • flagship demo skin",
  },
  {
    id: "wally-blue",
    name: "Blue Wally",
    rarity: "Featured",
    imageSrc: "/images/wallygotchi/blue-wally.png",
    vibe: "Cool-toned fun • boy-friendly palette",
  },
] as const;

export default function WallygotchiFeaturedCards({ selectedId, onSelect }: Props) {
  return (
    <section className="mt-6">
      <div className="flex items-end justify-between gap-4 mb-3">
        <h2 className="text-lg font-semibold">Featured Wallygotchi</h2>
        <p className="text-xs text-white/60">Click to select for wallet preview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((f) => {
          const isSelected = selectedId === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() =>
                onSelect({
                  v: 1,
                  id: f.id,
                  name: f.name,
                  rarity: f.rarity,
                  kind: "image",
                  imageSrc: f.imageSrc,
                  selectedAt: Date.now(),
                })
              }
              className={[
                "text-left border rounded-3xl p-5 transition",
                "bg-white/5 border-white/10 hover:border-white/20",
                isSelected ? "ring-2 ring-white/50" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-bold">{f.name}</div>
                  <div className="text-xs text-white/60 mt-1">{f.vibe}</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border border-white/15 bg-black/30">
                  {isSelected ? "Selected" : f.rarity}
                </span>
              </div>

              <div className="mt-4 relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <Image
                  src={f.imageSrc}
                  alt={f.name}
                  fill
                  priority={f.id === "wally-pink"}
                  className="object-contain"
                />
              </div>

              <div className="mt-4 text-sm text-white/70">
                Tip: after selecting, open any wallet lab with <span className="font-mono">?selected=1</span>.
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
