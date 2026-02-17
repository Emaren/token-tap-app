"use client";

import Image from "next/image";
import CreatureSprite from "@/components/CreatureSprite";
import type { StoredSelectedCreatureTileV2 } from "@/lib/selected-creature";

type Props = {
  tile: StoredSelectedCreatureTileV2;
};

export default function SelectedWalletTileArt({ tile }: Props) {
  if (tile.kind === "creature" && tile.creature) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CreatureSprite c={tile.creature} scale={1.2} />
      </div>
    );
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
          className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px]"
          style={{ transform: "scale(1.05)", transformOrigin: "center" }}
          dangerouslySetInnerHTML={{ __html: tile.markup }}
        />
      </div>
    );
  }

  return <div className="px-4 text-center text-sm opacity-70">{tile.name || "Selected Creature"}</div>;
}
