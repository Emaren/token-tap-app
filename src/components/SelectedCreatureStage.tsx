"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CreatureSprite from "@/components/CreatureSprite";
import {
  loadSelectedCreature,
  subscribeSelectedCreature,
  type StoredSelectedCreatureV1,
} from "@/lib/selected-creature";

type Props = {
  className?: string;
  scale?: number; // user “preference” scale; we’ll still auto-fit into the available box
};

const BASE_SIZE = 240; // CreatureSprite outer box is 240x240

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function SelectedCreatureStage({ className, scale = 1 }: Props) {
  const [sel, setSel] = useState<StoredSelectedCreatureV1 | null>(null);

  // measure available space so we can scale the 240x240 sprite to fit inside tiles
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setSel(loadSelectedCreature());
    update();
    const unsub = subscribeSelectedCreature(update);
    return () => unsub();
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const read = () => {
      const r = el.getBoundingClientRect();
      setBox({ w: r.width, h: r.height });
    };

    read();

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => read());
      ro.observe(el);
      return () => ro.disconnect();
    }

    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const fit = (() => {
    const w = box.w;
    const h = box.h;

    // only auto-DOWNSCALE to fit (don’t auto-upscale unless caller passes scale > 1)
    if (w > 0 && h > 0) return Math.min(1, w / BASE_SIZE, h / BASE_SIZE);
    if (w > 0) return Math.min(1, w / BASE_SIZE);
    return 1;
  })();

  const finalScale = clamp(fit * scale, 0.1, 3);

  const Scaled240 = ({ children }: { children: React.ReactNode }) => (
    <div ref={boxRef} className="w-full h-full relative overflow-hidden flex items-center justify-center">
      {/* Outer box reserves *scaled* space so we don’t clip/overlap other content */}
      <div className="relative" style={{ width: BASE_SIZE * finalScale, height: BASE_SIZE * finalScale }}>
        {/* Inner box is the canonical 240x240 sprite, scaled down to fit */}
        <div
          className="absolute inset-0"
          style={{
            width: BASE_SIZE,
            height: BASE_SIZE,
            transform: `scale(${finalScale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className={["w-full h-full", className ?? ""].join(" ")}>
      {/* ensure animations exist on ANY page where we render stored markup */}
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

      {!sel ? (
        <div ref={boxRef} className="w-full h-full flex flex-col items-center justify-center text-center px-6">
          <div className="text-sm text-white/70">No creature selected yet.</div>
          <Link
            href="/creatures"
            className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/15 hover:border-white/30 text-sm"
          >
            Pick one in Creatures →
          </Link>
        </div>
      ) : sel.kind === "image" && sel.imageSrc ? (
        <div ref={boxRef} className="w-full h-full relative overflow-hidden">
          <Image src={sel.imageSrc} alt={sel.name} fill className="object-contain" />
        </div>
      ) : sel.kind === "creature" && sel.creature ? (
        <Scaled240>
          <CreatureSprite c={sel.creature} />
        </Scaled240>
      ) : sel.kind === "markup" && sel.markup ? (
        <Scaled240>
          <div dangerouslySetInnerHTML={{ __html: sel.markup }} />
        </Scaled240>
      ) : null}
    </div>
  );
}
