/**
 * Seed Supabase from the repo's local data.
 * Reads keys from .env.local, forces local reads, upserts every board table.
 * Run: pnpm seed   (requires SUPABASE_SERVICE_ROLE_KEY in .env.local)
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// Load .env.local (KEY=VALUE) into process.env
try {
  const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // no .env.local — rely on ambient env
}

// Force local reads so we seed the repo data (never an empty DB).
process.env.NEXT_PUBLIC_DATA_SOURCE = "local";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}
const supa = createClient(url, serviceKey, { auth: { persistSession: false } });

const snakify = (obj: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase()),
      v,
    ]),
  );

async function seed(table: string, rows: unknown[], conflict = "slug") {
  const payload = (rows as Record<string, unknown>[]).map(snakify);
  const { error } = await supa.from(table).upsert(payload, { onConflict: conflict });
  if (error) {
    console.error(`✗ ${table}: ${error.message}`);
    process.exit(1);
  }
  console.log(`✓ ${table}: ${rows.length} rows`);
}

const data = await import("../src/lib/data/index");

await seed("weapons", await data.getWeapons());
await seed("maps", await data.getMaps());
await seed("history_events", await data.getHistoryEvents(), "id");
await seed("tournaments", await data.getTournaments());
await seed("players", await data.getPlayers());
await seed("kz_maps", await data.getKZMaps());
await seed("game_modes", await data.getModes());

console.log("\n✅ Supabase seed complete.");
