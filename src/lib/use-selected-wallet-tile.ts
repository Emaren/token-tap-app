"use client";

import { useEffect, useState } from "react";
import {
  loadSelectedCreatureTiles,
  subscribeSelectedCreatureTiles,
  type StoredSelectedCreatureTileV2,
} from "@/lib/selected-creature";

function pickTile(
  tiles: StoredSelectedCreatureTileV2[],
  requestedTileId: string | null
): StoredSelectedCreatureTileV2 | null {
  if (!tiles.length) return null;
  if (!requestedTileId) return tiles[0] ?? null;
  return tiles.find((t) => t.tileId === requestedTileId) ?? null;
}

export function useSelectedWalletTile(enabled: boolean, requestedTileId: string | null) {
  const [tile, setTile] = useState<StoredSelectedCreatureTileV2 | null>(null);

  useEffect(() => {
    if (!enabled) {
      setTile(null);
      return;
    }

    const update = () => {
      const tiles = loadSelectedCreatureTiles();
      setTile(pickTile(tiles, requestedTileId));
    };

    update();

    const unsub = subscribeSelectedCreatureTiles(update);
    const onFocus = () => update();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      unsub?.();
    };
  }, [enabled, requestedTileId]);

  return tile;
}
