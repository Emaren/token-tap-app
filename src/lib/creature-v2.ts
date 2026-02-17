// src/lib/creature-v2.ts
export type Rarity = "Common" | "Rare" | "Epic" | "Legend";
export type Shape = "squircle" | "rounded" | "pill" | "soft";
export type Motion = "bob" | "breathe";
export type EyeStyle = "oval" | "sparkle" | "dot" | "sleepy";
export type MouthStyle = "smile" | "tiny" | "open" | "cat";
export type Accessory = "none" | "bow" | "crown" | "halo";

export type CreatureV2 = {
  id: string;
  name: string;
  title: string;
  traits: string[];
  rarity: Rarity;

  hue: number;
  hue2: number;

  shape: Shape;
  motion: Motion;
  eyes: EyeStyle;
  mouth: MouthStyle;
  blush: boolean;
  accessory: Accessory;
};

export function rarityPillClass(r: Rarity) {
  switch (r) {
    case "Legend":
      return "border-yellow-400/40 text-yellow-200 bg-yellow-500/10";
    case "Epic":
      return "border-fuchsia-400/40 text-fuchsia-200 bg-fuchsia-500/10";
    case "Rare":
      return "border-sky-400/40 text-sky-200 bg-sky-500/10";
    default:
      return "border-white/20 text-white/70 bg-white/5";
  }
}

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rnd: () => number, arr: T[]) {
  return arr[Math.floor(rnd() * arr.length)];
}

function weightedPick<T>(rnd: () => number, items: Array<{ v: T; w: number }>) {
  const total = items.reduce((a, b) => a + b.w, 0);
  let r = rnd() * total;
  for (const it of items) {
    r -= it.w;
    if (r <= 0) return it.v;
  }
  return items[items.length - 1].v;
}

export function newCreatureSeed() {
  return `tt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function generateCreature(seedStr: string): CreatureV2 {
  const seed = xmur3(seedStr)();
  const rnd = mulberry32(seed);

  const namesA = ["Wally", "Nessie", "Bun", "Puff", "Otter", "Fox", "Manta", "Lynx", "Sprout", "Boop", "Peep", "Glow"];
  const namesB = ["bean", "bun", "puff", "peep", "sprout", "whisk", "glow", "mote", "drift", "charm", "bit", "bop"];
  const titles = ["Pocket Buddy", "Wallet Pal", "Token Friend", "Lucky Little", "Soft Guardian", "Happy Helper", "Tiny Hero", "Fun Magnet"];

  const traitPool = [
    "Big sparkle eyes",
    "Warm cheeks",
    "Gentle bob",
    "Soft aura",
    "Coin-sense",
    "Calm mode",
    "Good luck vibe",
    "Pocket guardian",
    "Happy bounce",
    "Friend magnet",
  ];

  const baseHues = [18, 32, 45, 160, 185, 205, 220, 255, 285, 315, 340];

  const rarities: Array<{ v: Rarity; w: number }> = [
    { v: "Common", w: 62 },
    { v: "Rare", w: 24 },
    { v: "Epic", w: 11 },
    { v: "Legend", w: 3 },
  ];

  const shapes: Array<{ v: Shape; w: number }> = [
    { v: "squircle", w: 46 },
    { v: "rounded", w: 30 },
    { v: "soft", w: 16 },
    { v: "pill", w: 8 },
  ];

  const motions: Array<{ v: Motion; w: number }> = [
    { v: "bob", w: 60 },
    { v: "breathe", w: 40 },
  ];

  const eyeStyles: Array<{ v: EyeStyle; w: number }> = [
    { v: "oval", w: 52 },
    { v: "sparkle", w: 34 },
    { v: "dot", w: 10 },
    { v: "sleepy", w: 4 },
  ];

  const mouthStyles: Array<{ v: MouthStyle; w: number }> = [
    { v: "smile", w: 56 },
    { v: "tiny", w: 18 },
    { v: "cat", w: 16 },
    { v: "open", w: 10 },
  ];

  const accessories: Array<{ v: Accessory; w: number }> = [
    { v: "none", w: 74 },
    { v: "halo", w: 10 },
    { v: "bow", w: 9 },
    { v: "crown", w: 7 },
  ];

  const rarity = weightedPick(rnd, rarities);
  const shape = weightedPick(rnd, shapes);
  const motion = weightedPick(rnd, motions);
  const eyes = weightedPick(rnd, eyeStyles);
  const mouth = weightedPick(rnd, mouthStyles);

  const a = pick(rnd, namesA);
  const b = pick(rnd, namesB);

  const traitCount = rarity === "Legend" ? 5 : rarity === "Epic" ? 4 : rarity === "Rare" ? 3 : 2;
  const traits = new Set<string>();
  while (traits.size < traitCount) traits.add(pick(rnd, traitPool));

  const hueBase = pick(rnd, baseHues);
  const hue = (hueBase + Math.floor((rnd() - 0.5) * 18) + 360) % 360;
  const hue2 = (hue + 40 + Math.floor(rnd() * 55)) % 360;

  const blush = rnd() < 0.82;
  const accessory = weightedPick(rnd, accessories);

  return {
    id: `${seedStr}-0`,
    name: `${a}${b}`,
    title: pick(rnd, titles),
    traits: [...traits],
    rarity,
    hue,
    hue2,
    shape,
    motion,
    eyes,
    mouth,
    blush,
    accessory,
  };
}
