"use client";

import Image from "next/image";
import CreatureSprite from "@/components/CreatureSprite";
import type { StoredSelectedCreatureTileV2 } from "@/lib/selected-creature";

type Props = {
  tile: StoredSelectedCreatureTileV2;
};

export default function SelectedWalletTileArt({ tile }: Props) {
  if (tile.kind === "creature" && tile.creature) {
    return <CreatureSprite c={tile.creature} />;
  }

  if (tile.kind === "image" && tile.imageSrc) {
    return (
      <Image
        src={tile.imageSrc}
        alt={tile.name || "Selected Creature"}
        fill
        sizes="(max-width: 768px) 240px, 320px"
        unoptimized
        loader={({ src }) => src}
        className="object-contain p-2"
      />
    );
  }

  if (tile.kind === "markup" && tile.markup) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-[240px] h-[240px]"
          style={{ transform: "scale(0.95)", transformOrigin: "center" }}
          dangerouslySetInnerHTML={{ __html: tile.markup }}
        />
      </div>
    );
  }

  return <div className="px-4 text-center text-sm opacity-70">{tile.name || "Selected Creature"}</div>;
}
