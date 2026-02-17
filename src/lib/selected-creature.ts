// src/lib/selected-creature.ts

export type SelectedCreatureKind = "image" | "markup" | "creature";

export type StoredCreatureV1 = {
  id: string;
  name: string;
  title?: string;
  traits?: string[];
  rarity: "Common" | "Rare" | "Epic" | "Legend";

  hue: number;
  hue2: number;

  shape: "squircle" | "rounded" | "pill" | "soft";
  motion: "bob" | "breathe";
  eyes: "oval" | "sparkle" | "dot" | "sleepy";
  mouth: "smile" | "tiny" | "open" | "cat";
  blush: boolean;
  accessory: "none" | "bow" | "crown" | "halo";
};

export type StoredSelectedCreatureV1 = {
  v: 1;
  id: string;
  name: string;
  rarity?: string;

  kind: SelectedCreatureKind;

  // kind === "image"
  imageSrc?: string;

  // kind === "markup"
  markup?: string;

  // kind === "creature"
  creature?: StoredCreatureV1;

  selectedAt: number;
};

/**
 * V2: multi-select tiles (each selected creature is a tile)
 * Mirrors V1 shape + tileId + v=2.
 */
export type StoredSelectedCreatureTileV2 = {
  v: 2;
  tileId: string;

  id: string;
  name: string;
  rarity?: string;

  kind: SelectedCreatureKind;

  imageSrc?: string;
  markup?: string;
  creature?: StoredCreatureV1;

  selectedAt: number;
};

export type StoredSelectedCreatureTilesDocV2 = {
  v: 2;
  items: StoredSelectedCreatureTileV2[];
};

const STORAGE_KEY_V1 = "tokentap.selectedCreature.v1";
export const SELECTED_CREATURE_STORAGE_KEY = STORAGE_KEY_V1;

const STORAGE_KEY_V2 = "tokentap.selectedCreatures.v2";
export const SELECTED_CREATURES_STORAGE_KEY_V2 = STORAGE_KEY_V2;
// Back-compat alias (some pages may import this name)
export const SELECTED_CREATURES_STORAGE_KEY = STORAGE_KEY_V2;

// Same-tab change notifications
const LOCAL_EVENT_V1 = "tokentap:selectedCreature";
const LOCAL_EVENT_V2 = "tokentap:selectedCreatures";

const BC_NAME_V1 = "tokentap:selectedCreature:v1";
const BC_NAME_V2 = "tokentap:selectedCreatures:v2";

type Listener = () => void;

const RARITIES = ["Common", "Rare", "Epic", "Legend"] as const;
const SHAPES = ["squircle", "rounded", "pill", "soft"] as const;
const MOTIONS = ["bob", "breathe"] as const;
const EYES = ["oval", "sparkle", "dot", "sleepy"] as const;
const MOUTHS = ["smile", "tiny", "open", "cat"] as const;
const ACCESSORIES = ["none", "bow", "crown", "halo"] as const;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function isOneOf<T extends readonly string[]>(arr: T, v: unknown): v is T[number] {
  return typeof v === "string" && (arr as readonly string[]).includes(v);
}

function isValidCreatureKind(v: unknown): v is SelectedCreatureKind {
  return v === "image" || v === "markup" || v === "creature";
}

function uuid(): string {
  try {
    const cryptoApi = globalThis.crypto;
    if (cryptoApi?.randomUUID) return cryptoApi.randomUUID();
  } catch {
    // ignore
  }
  return `tt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* ======================================================
   Tile art (markup) generator (small inline SVG)
   ====================================================== */

function normHue(h: number): number {
  const x = h % 360;
  return x < 0 ? x + 360 : x;
}

function safeId(s: string): string {
  const cleaned = s.replace(/[^a-zA-Z0-9_-]/g, "");
  return cleaned.length ? cleaned : `id${Math.random().toString(16).slice(2)}`;
}

/**
 * Public export (handy in components if needed)
 */
export function renderCreatureTileMarkup(creature: StoredCreatureV1): string {
  const h1 = normHue(creature.hue);
  const h2 = normHue(creature.hue2);

  const rx =
    creature.shape === "pill" ? 40 :
    creature.shape === "rounded" ? 18 :
    creature.shape === "soft" ? 24 :
    28; // squircle-ish

  const gid = `g_${safeId(creature.id)}_${Math.floor(h1)}_${Math.floor(h2)}`;

  // eyes
  const eyes = (() => {
    const leftX = 38;
    const rightX = 62;
    const y = 44;

    if (creature.eyes === "dot") {
      return `
        <circle cx="${leftX}" cy="${y}" r="3.2" fill="rgba(0,0,0,0.55)" />
        <circle cx="${rightX}" cy="${y}" r="3.2" fill="rgba(0,0,0,0.55)" />
      `;
    }

    if (creature.eyes === "sleepy") {
      return `
        <path d="M${leftX - 6} ${y} Q ${leftX} ${y - 4} ${leftX + 6} ${y}" stroke="rgba(0,0,0,0.55)" stroke-width="2.6" stroke-linecap="round" fill="none" />
        <path d="M${rightX - 6} ${y} Q ${rightX} ${y - 4} ${rightX + 6} ${y}" stroke="rgba(0,0,0,0.55)" stroke-width="2.6" stroke-linecap="round" fill="none" />
      `;
    }

    if (creature.eyes === "sparkle") {
      // simple sparkle: pupil + tiny highlight
      return `
        <ellipse cx="${leftX}" cy="${y}" rx="4.6" ry="5.2" fill="rgba(0,0,0,0.55)" />
        <ellipse cx="${rightX}" cy="${y}" rx="4.6" ry="5.2" fill="rgba(0,0,0,0.55)" />
        <circle cx="${leftX - 1.6}" cy="${y - 1.8}" r="1.1" fill="rgba(255,255,255,0.85)" />
        <circle cx="${rightX - 1.6}" cy="${y - 1.8}" r="1.1" fill="rgba(255,255,255,0.85)" />
      `;
    }

    // oval
    return `
      <ellipse cx="${leftX}" cy="${y}" rx="4.8" ry="5.8" fill="rgba(0,0,0,0.55)" />
      <ellipse cx="${rightX}" cy="${y}" rx="4.8" ry="5.8" fill="rgba(0,0,0,0.55)" />
    `;
  })();

  // mouth
  const mouth = (() => {
    const cx = 50;
    const y = 62;

    if (creature.mouth === "tiny") {
      return `<path d="M${cx - 5} ${y} L ${cx + 5} ${y}" stroke="rgba(0,0,0,0.55)" stroke-width="2.6" stroke-linecap="round" />`;
    }

    if (creature.mouth === "open") {
      return `<ellipse cx="${cx}" cy="${y + 2}" rx="5.8" ry="4.8" fill="rgba(0,0,0,0.45)" />`;
    }

    if (creature.mouth === "cat") {
      return `
        <path d="M${cx - 10} ${y} Q ${cx - 4} ${y + 6} ${cx} ${y}" stroke="rgba(0,0,0,0.55)" stroke-width="2.6" stroke-linecap="round" fill="none" />
        <path d="M${cx} ${y} Q ${cx + 4} ${y + 6} ${cx + 10} ${y}" stroke="rgba(0,0,0,0.55)" stroke-width="2.6" stroke-linecap="round" fill="none" />
      `;
    }

    // smile
    return `<path d="M${cx - 12} ${y} Q ${cx} ${y + 10} ${cx + 12} ${y}" stroke="rgba(0,0,0,0.55)" stroke-width="2.6" stroke-linecap="round" fill="none" />`;
  })();

  const blush = creature.blush
    ? `
      <circle cx="30" cy="58" r="4.6" fill="rgba(255,120,150,0.28)" />
      <circle cx="70" cy="58" r="4.6" fill="rgba(255,120,150,0.28)" />
    `
    : "";

  const accessory = (() => {
    if (creature.accessory === "none") return "";

    if (creature.accessory === "halo") {
      return `
        <ellipse cx="50" cy="18" rx="18" ry="6" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.40)" stroke-width="2" />
      `;
    }

    if (creature.accessory === "crown") {
      return `
        <path d="M28 26 L36 16 L44 24 L50 14 L56 24 L64 16 L72 26 L72 30 L28 30 Z"
          fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.45)" stroke-width="2" />
      `;
    }

    // bow
    return `
      <path d="M28 28 C 22 22, 22 34, 28 28 Z" fill="rgba(255,255,255,0.20)" stroke="rgba(255,255,255,0.45)" stroke-width="2" />
      <path d="M72 28 C 78 22, 78 34, 72 28 Z" fill="rgba(255,255,255,0.20)" stroke="rgba(255,255,255,0.45)" stroke-width="2" />
      <circle cx="50" cy="28" r="4.2" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.45)" stroke-width="2" />
    `;
  })();

  // NOTE: keep markup compact; stage can scale it via container styles.
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="${creature.name}">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${h1} 82% 58%)"/>
      <stop offset="100%" stop-color="hsl(${h2} 82% 54%)"/>
    </linearGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.25)"/>
    </filter>
  </defs>

  <rect x="8" y="8" width="84" height="84" rx="${rx}" fill="url(#${gid})" filter="url(#s)" />
  <rect x="10.5" y="10.5" width="79" height="79" rx="${Math.max(10, rx - 6)}" fill="rgba(255,255,255,0.06)" />

  ${accessory}

  ${blush}

  ${eyes}
  ${mouth}

  <path d="M18 70 C 34 80, 66 80, 82 70" stroke="rgba(255,255,255,0.15)" stroke-width="3" stroke-linecap="round" fill="none"/>
</svg>
  `.trim();
}

function ensureV1HasCreatureMarkup(v1: StoredSelectedCreatureV1): StoredSelectedCreatureV1 {
  if (v1.kind !== "creature") return v1;
  if (isNonEmptyString(v1.markup)) return v1;
  if (!v1.creature) return v1;
  return { ...v1, markup: renderCreatureTileMarkup(v1.creature) };
}

function ensureTileHasCreatureMarkup(t: StoredSelectedCreatureTileV2): StoredSelectedCreatureTileV2 {
  if (t.kind !== "creature") return t;
  if (isNonEmptyString(t.markup)) return t;
  if (!t.creature) return t;
  return { ...t, markup: renderCreatureTileMarkup(t.creature) };
}

/* ====================================================== */

function sanitizeCreature(v: unknown): StoredCreatureV1 | null {
  if (!v || typeof v !== "object") return null;
  const c = v as Partial<StoredCreatureV1>;

  if (!isNonEmptyString(c.id)) return null;
  if (!isNonEmptyString(c.name)) return null;
  if (!isOneOf(RARITIES, c.rarity)) return null;

  if (!isFiniteNumber(c.hue)) return null;
  if (!isFiniteNumber(c.hue2)) return null;

  if (!isOneOf(SHAPES, c.shape)) return null;
  if (!isOneOf(MOTIONS, c.motion)) return null;
  if (!isOneOf(EYES, c.eyes)) return null;
  if (!isOneOf(MOUTHS, c.mouth)) return null;
  if (typeof c.blush !== "boolean") return null;
  if (!isOneOf(ACCESSORIES, c.accessory)) return null;

  return {
    id: c.id,
    name: c.name,
    title: isNonEmptyString(c.title) ? c.title : undefined,
    traits: Array.isArray(c.traits) ? c.traits.filter(isNonEmptyString) : undefined,
    rarity: c.rarity,
    hue: c.hue,
    hue2: c.hue2,
    shape: c.shape,
    motion: c.motion,
    eyes: c.eyes,
    mouth: c.mouth,
    blush: c.blush,
    accessory: c.accessory,
  };
}

function sanitizeV1(c: Partial<StoredSelectedCreatureV1> | null): StoredSelectedCreatureV1 | null {
  if (!c || c.v !== 1) return null;
  if (!isNonEmptyString(c.id)) return null;
  if (!isNonEmptyString(c.name)) return null;
  if (!isValidCreatureKind(c.kind)) return null;

  const selectedAt = isFiniteNumber(c.selectedAt) ? c.selectedAt : Date.now();

  if (c.kind === "image") {
    if (!isNonEmptyString(c.imageSrc)) return null;
    return {
      v: 1,
      id: c.id,
      name: c.name,
      rarity: isNonEmptyString(c.rarity) ? c.rarity : undefined,
      kind: "image",
      imageSrc: c.imageSrc,
      selectedAt,
    };
  }

  if (c.kind === "markup") {
    if (!isNonEmptyString(c.markup)) return null;
    return {
      v: 1,
      id: c.id,
      name: c.name,
      rarity: isNonEmptyString(c.rarity) ? c.rarity : undefined,
      kind: "markup",
      markup: c.markup,
      selectedAt,
    };
  }

  // creature
  const creature = sanitizeCreature(c.creature);
  if (!creature) return null;

  return {
    v: 1,
    id: c.id,
    name: c.name,
    rarity: isNonEmptyString(c.rarity) ? c.rarity : creature.rarity,
    kind: "creature",
    creature,
    // allow optional markup alongside creature (handy for caching rendered sprite)
    markup: isNonEmptyString(c.markup) ? c.markup : undefined,
    selectedAt,
  };
}

function sanitizeTileV2(t: Partial<StoredSelectedCreatureTileV2> | null): StoredSelectedCreatureTileV2 | null {
  if (!t || t.v !== 2) return null;
  if (!isNonEmptyString(t.tileId)) return null;

  const v1 = sanitizeV1({
    v: 1,
    id: t.id,
    name: t.name,
    rarity: t.rarity,
    kind: t.kind as SelectedCreatureKind,
    imageSrc: t.imageSrc,
    markup: t.markup,
    creature: t.creature,
    selectedAt: t.selectedAt,
  });

  if (!v1) return null;

  return {
    v: 2,
    tileId: t.tileId,
    id: v1.id,
    name: v1.name,
    rarity: v1.rarity,
    kind: v1.kind,
    imageSrc: v1.imageSrc,
    markup: v1.markup,
    creature: v1.creature,
    selectedAt: v1.selectedAt,
  };
}

function sanitizeTilesDocV2(doc: unknown): StoredSelectedCreatureTilesDocV2 | null {
  if (!doc || typeof doc !== "object") return null;
  const d = doc as Partial<StoredSelectedCreatureTilesDocV2>;
  if (d.v !== 2) return null;

  const rawItems = Array.isArray(d.items) ? d.items : [];
  const items: StoredSelectedCreatureTileV2[] = [];
  for (const raw of rawItems) {
    const clean = sanitizeTileV2(raw);
    if (clean) items.push(clean);
  }

  return { v: 2, items };
}

function emitLocal(name: string) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent(name));
  } catch {
    // ignore
  }
}

function getBroadcastChannel(name: string): BroadcastChannel | null {
  if (typeof window === "undefined") return null;
  if (typeof window.BroadcastChannel === "undefined") return null;
  try {
    return new window.BroadcastChannel(name);
  } catch {
    return null;
  }
}

function readV1Only(): StoredSelectedCreatureV1 | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_V1);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredSelectedCreatureV1> | null;
    const clean = sanitizeV1(parsed);
    return clean ? ensureV1HasCreatureMarkup(clean) : null;
  } catch {
    return null;
  }
}

function readV2Only(): StoredSelectedCreatureTileV2[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY_V2);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    const clean = sanitizeTilesDocV2(parsed);
    const items = clean?.items ?? [];
    return items.map(ensureTileHasCreatureMarkup);
  } catch {
    return [];
  }
}

function setV1FromLastTile(tiles: StoredSelectedCreatureTileV2[]) {
  const last = tiles[tiles.length - 1];
  if (!last) {
    writeV1(null);
    return;
  }
  writeV1({
    v: 1,
    id: last.id,
    name: last.name,
    rarity: last.rarity,
    kind: last.kind,
    imageSrc: last.imageSrc,
    markup: last.markup,
    creature: last.creature,
    selectedAt: last.selectedAt,
  });
}

function writeV1(clean: StoredSelectedCreatureV1 | null) {
  if (typeof window === "undefined") return;

  try {
    if (!clean) localStorage.removeItem(STORAGE_KEY_V1);
    else localStorage.setItem(STORAGE_KEY_V1, JSON.stringify(clean));
  } catch {
    // ignore
  }

  emitLocal(LOCAL_EVENT_V1);

  const bc = getBroadcastChannel(BC_NAME_V1);
  try {
    bc?.postMessage({ t: clean ? "set" : "clear" });
  } catch {
    // ignore
  } finally {
    try {
      bc?.close();
    } catch {
      // ignore
    }
  }
}

function writeV2(items: StoredSelectedCreatureTileV2[]) {
  if (typeof window === "undefined") return;

  try {
    if (!items.length) {
      localStorage.removeItem(STORAGE_KEY_V2);
    } else {
      const doc: StoredSelectedCreatureTilesDocV2 = { v: 2, items };
      localStorage.setItem(STORAGE_KEY_V2, JSON.stringify(doc));
    }
  } catch {
    // ignore
  }

  emitLocal(LOCAL_EVENT_V2);

  const bc = getBroadcastChannel(BC_NAME_V2);
  try {
    bc?.postMessage({ t: "set" });
  } catch {
    // ignore
  } finally {
    try {
      bc?.close();
    } catch {
      // ignore
    }
  }
}

/* =========================
   V1: Single selection (compat)
   ========================= */

export function saveSelectedCreature(creature: StoredSelectedCreatureV1) {
  const clean0 = sanitizeV1(creature);
  if (!clean0) return;
  const clean = ensureV1HasCreatureMarkup(clean0);
  writeV1(clean);
}

/**
 * V1: load single selected creature (compat).
 * If V1 is empty but V2 has tiles, returns the most-recent tile as V1.
 */
export function loadSelectedCreature(): StoredSelectedCreatureV1 | null {
  if (typeof window === "undefined") return null;

  const v1 = readV1Only();
  if (v1) return v1;

  const tiles = readV2Only();
  const last = tiles[tiles.length - 1];
  if (!last) return null;

  return ensureV1HasCreatureMarkup({
    v: 1,
    id: last.id,
    name: last.name,
    rarity: last.rarity,
    kind: last.kind,
    imageSrc: last.imageSrc,
    markup: last.markup,
    creature: last.creature,
    selectedAt: last.selectedAt,
  });
}

export function clearSelectedCreature() {
  writeV1(null);
}

export function subscribeSelectedCreature(listener: Listener): () => void {
  if (typeof window === "undefined") return () => {};

  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY_V1) return;
    listener();
  };

  const onLocal = () => listener();

  const bc = getBroadcastChannel(BC_NAME_V1);
  const onBC = () => listener();

  try {
    window.addEventListener("storage", onStorage);
    window.addEventListener(LOCAL_EVENT_V1, onLocal as EventListener);
    bc?.addEventListener("message", onBC as EventListener);
  } catch {
    // ignore
  }

  return () => {
    try {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(LOCAL_EVENT_V1, onLocal as EventListener);
      bc?.removeEventListener("message", onBC as EventListener);
      bc?.close();
    } catch {
      // ignore
    }
  };
}

/* =========================
   V2: Tiles API (canonical)
   ========================= */

/**
 * Load V2 tiles.
 * If V2 missing but V1 exists, best-effort migrate into a single tile.
 * Also backfills missing creature markup and persists it.
 */
export function loadSelectedCreatureTiles(): StoredSelectedCreatureTileV2[] {
  if (typeof window === "undefined") return [];

  const tiles0 = readV2Only();
  if (tiles0.length) {
    // Backfill + persist if any tiles missing markup
    const tiles = tiles0.map(ensureTileHasCreatureMarkup);
    const changed = tiles.some((t, i) => t.markup !== tiles0[i]?.markup);
    if (changed) writeV2(tiles);
    return tiles;
  }

  const v1 = readV1Only();
  if (!v1) return [];

  const tile0: StoredSelectedCreatureTileV2 = {
    v: 2,
    tileId: uuid(),
    id: v1.id,
    name: v1.name,
    rarity: v1.rarity,
    kind: v1.kind,
    imageSrc: v1.imageSrc,
    markup: v1.markup,
    creature: v1.creature,
    selectedAt: v1.selectedAt,
  };

  const tile = ensureTileHasCreatureMarkup(tile0);

  writeV2([tile]);
  return [tile];
}

/**
 * Add a tile from a V1 selection (sanitized).
 * Also sets V1 to the just-added selection (legacy pages show “last selected”).
 */
export function addSelectedCreatureTile(selection: StoredSelectedCreatureV1): StoredSelectedCreatureTileV2 | null {
  const clean0 = sanitizeV1(selection);
  if (!clean0) return null;
  const clean = ensureV1HasCreatureMarkup(clean0);

  const items = loadSelectedCreatureTiles();

  const tile0: StoredSelectedCreatureTileV2 = {
    v: 2,
    tileId: uuid(),
    id: clean.id,
    name: clean.name,
    rarity: clean.rarity,
    kind: clean.kind,
    imageSrc: clean.imageSrc,
    markup: clean.markup,
    creature: clean.creature,
    selectedAt: clean.selectedAt,
  };

  const tile = ensureTileHasCreatureMarkup(tile0);

  items.push(tile);
  writeV2(items);
  writeV1(clean);

  return tile;
}

/**
 * Convenience: add a tile directly from a StoredCreatureV1.
 * Optionally attach markup as a cached render (still stored on the tile).
 */
export function addSelectedCreatureTileFromCreature(input: { creature: StoredCreatureV1; markup?: string }): StoredSelectedCreatureTileV2 | null {
  const creature = sanitizeCreature(input.creature);
  if (!creature) return null;

  const v1: StoredSelectedCreatureV1 = ensureV1HasCreatureMarkup({
    v: 1,
    id: creature.id,
    name: creature.name,
    rarity: creature.rarity,
    kind: "creature",
    creature,
    markup: isNonEmptyString(input.markup) ? input.markup : undefined,
    selectedAt: Date.now(),
  });

  return addSelectedCreatureTile(v1);
}

/**
 * Delete a tile by tileId.
 * If deleted tile matches current V1 selection, V1 becomes most-recent tile (or clears).
 */
export function deleteSelectedCreatureTile(tileId: string) {
  if (!isNonEmptyString(tileId)) return;

  const before = loadSelectedCreatureTiles();
  const removed = before.find((t) => t.tileId === tileId) || null;
  const after = before.filter((t) => t.tileId !== tileId);

  writeV2(after);

  if (!removed) return;

  const v1 = readV1Only();
  const v1MatchesRemoved =
    !!v1 &&
    v1.id === removed.id &&
    v1.kind === removed.kind &&
    (v1.kind !== "image" || v1.imageSrc === removed.imageSrc) &&
    (v1.kind !== "markup" || v1.markup === removed.markup);

  if (v1MatchesRemoved) setV1FromLastTile(after);
}

export function clearSelectedCreatureTiles() {
  writeV2([]);
  writeV1(null);
}

export function subscribeSelectedCreatureTiles(listener: Listener): () => void {
  if (typeof window === "undefined") return () => {};

  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY_V2) return;
    listener();
  };

  const onLocal = () => listener();

  const bc = getBroadcastChannel(BC_NAME_V2);
  const onBC = () => listener();

  try {
    window.addEventListener("storage", onStorage);
    window.addEventListener(LOCAL_EVENT_V2, onLocal as EventListener);
    bc?.addEventListener("message", onBC as EventListener);
  } catch {
    // ignore
  }

  return () => {
    try {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(LOCAL_EVENT_V2, onLocal as EventListener);
      bc?.removeEventListener("message", onBC as EventListener);
      bc?.close();
    } catch {
      // ignore
    }
  };
}

/* ======================================================
   Back-compat exports expected by /creatures/page.tsx
   (list-style API)
   ====================================================== */

/**
 * List-style load: returns creatures from tiles (kind === "creature").
 */
export function loadSelectedCreatures(): StoredCreatureV1[] {
  const tiles = loadSelectedCreatureTiles();
  return tiles.map((t) => t.creature).filter((c): c is StoredCreatureV1 => !!c);
}

/**
 * List-style add: ensures a single tile per creature id (dedupe),
 * adds it as the newest tile, and updates V1 to this creature.
 */
export function addSelectedCreature(creature: StoredCreatureV1): StoredCreatureV1[] {
  const cleanCreature = sanitizeCreature(creature);
  if (!cleanCreature) return loadSelectedCreatures();

  const tiles = loadSelectedCreatureTiles();
  const kept = tiles.filter((t) => !(t.kind === "creature" && t.id === cleanCreature.id));

  const tile0: StoredSelectedCreatureTileV2 = {
    v: 2,
    tileId: uuid(),
    id: cleanCreature.id,
    name: cleanCreature.name,
    rarity: cleanCreature.rarity,
    kind: "creature",
    creature: cleanCreature,
    // IMPORTANT: attach markup so /get-started can render tile art
    markup: renderCreatureTileMarkup(cleanCreature),
    selectedAt: Date.now(),
  };

  const tile = ensureTileHasCreatureMarkup(tile0);

  const nextTiles = [...kept, tile];
  writeV2(nextTiles);

  writeV1(
    ensureV1HasCreatureMarkup({
      v: 1,
      id: cleanCreature.id,
      name: cleanCreature.name,
      rarity: cleanCreature.rarity,
      kind: "creature",
      creature: cleanCreature,
      markup: tile.markup,
      selectedAt: tile.selectedAt,
    }),
  );

  return nextTiles.map((t) => t.creature).filter((c): c is StoredCreatureV1 => !!c);
}

/**
 * List-style remove: removes ALL tiles whose creature id matches.
 * If V1 points at that creature, V1 becomes most-recent remaining (or clears).
 */
export function removeSelectedCreature(creatureId: string): StoredCreatureV1[] {
  if (!isNonEmptyString(creatureId)) return loadSelectedCreatures();

  const before = loadSelectedCreatureTiles();
  const after = before.filter((t) => !(t.kind === "creature" && t.id === creatureId));

  writeV2(after);

  const v1 = readV1Only();
  if (v1?.kind === "creature" && v1.id === creatureId) {
    setV1FromLastTile(after);
  }

  return after.map((t) => t.creature).filter((c): c is StoredCreatureV1 => !!c);
}

export function clearSelectedCreatures(): void {
  clearSelectedCreatureTiles();
}

export function subscribeSelectedCreatures(listener: Listener): () => void {
  return subscribeSelectedCreatureTiles(listener);
}
