"use client";

import { useEffect, useMemo, useState } from "react";
import CreatureSprite from "@/components/CreatureSprite";
import {
  loadSelectedCreatureTiles,
  subscribeSelectedCreatureTiles,
  type StoredSelectedCreatureTileV2,
} from "@/lib/selected-creature";

type Props = {
  className?: string;
  maxTiles?: number;
};

function AnimKeyframes() {
  return (
    <style jsx global>{`
      @keyframes blink {
        0%,
        92%,
        100% {
          transform: scaleY(1);
        }
        94%,
        96% {
          transform: scaleY(0.1);
        }
      }
      @keyframes pupil {
        0%,
        100% {
          transform: translate(0px, 0px);
        }
        50% {
          transform: translate(2px, 1px);
        }
      }
      @keyframes bob {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      @keyframes breathe {
        0%,
        100% {
          transform: translateY(0px) scale(1);
        }
        50% {
          transform: translateY(-4px) scale(1.02);
        }
      }
    `}</style>
  );
}

function TileThumb({ tile }: { tile: StoredSelectedCreatureTileV2 }) {
  // Conservative scale: stored markup tends to be “big”
  const markupScale = 0.22;

  const content = (() => {
    if (tile.kind === "image" && tile.imageSrc) {
      // Use <img> to avoid next/image remote config edge cases
      return (
        <div className="absolute inset-0 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tile.imageSrc}
            alt={tile.name ?? "Creature"}
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
      );
    }

    if (tile.kind === "markup" && tile.markup) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{ transform: `scale(${markupScale})`, transformOrigin: "center" }}
            dangerouslySetInnerHTML={{ __html: tile.markup }}
          />
        </div>
      );
    }

    if (tile.kind === "creature" && tile.creature) {
      // Render the actual creature (no dependency on stored markup)
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="scale-[0.78] origin-center">
            <CreatureSprite c={tile.creature} />
          </div>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 flex items-center justify-center text-[11px] text-white/55 px-2 text-center">
        {tile.name ?? "Selected"}
      </div>
    );
  })();

  return (
    <div className="relative aspect-square rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      {content}

      {/* Name strip (subtle) */}
      {tile.name ? (
        <div className="absolute inset-x-0 bottom-0 px-2 py-1 bg-black/35 backdrop-blur-[2px]">
          <div className="text-[10px] text-white/70 truncate">{tile.name}</div>
        </div>
      ) : null}
    </div>
  );
}

export default function SelectedCreatureTilesStage({ className, maxTiles = 6 }: Props) {
  const [tiles, setTiles] = useState<StoredSelectedCreatureTileV2[]>([]);

  useEffect(() => {
    const update = () => setTiles(loadSelectedCreatureTiles());
    update();
    const unsub = subscribeSelectedCreatureTiles(update);
    return () => unsub();
  }, []);

  const view = useMemo(() => {
    const list = tiles ?? [];
    const shown = list.slice(0, maxTiles);
    const extra = Math.max(0, list.length - shown.length);
    return { shown, extra, total: list.length };
  }, [tiles, maxTiles]);

  // Always render a fixed-size grid so the wallet stage layout stays stable.
  const slots = useMemo(() => {
    return Array.from({ length: maxTiles }, (_, i) => view.shown[i] ?? null);
  }, [view.shown, maxTiles]);

  if (view.total === 0) {
    return (
      <div className={["w-full", className ?? ""].join(" ")}>
        <AnimKeyframes />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: maxTiles }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl border border-white/10 bg-white/[0.02]" />
          ))}
        </div>
        <div className="mt-3 text-sm text-white/60 text-center">No selected creatures yet.</div>
      </div>
    );
  }

  return (
    <div className={["w-full", className ?? ""].join(" ")}>
      <AnimKeyframes />

      <div className="grid grid-cols-3 gap-3">
        {slots.map((t, i) =>
          t ? (
            <TileThumb key={t.tileId} tile={t} />
          ) : (
            <div key={`empty-${i}`} className="aspect-square rounded-xl border border-white/10 bg-white/[0.02]" />
          )
        )}
      </div>

      {view.extra > 0 && <div className="mt-3 text-xs text-white/50 text-center">+{view.extra} more selected</div>}
    </div>
  );
}
