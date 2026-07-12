/** Verify the Supabase READ path (anon key + RLS), same as production. */
import { readFileSync } from "node:fs";

function loadEnvLocal() {
  try {
    const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && process.env[m[1]] === undefined)
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}

async function main() {
  loadEnvLocal();
  process.env.NEXT_PUBLIC_DATA_SOURCE = "supabase"; // read via anon key
  const d = await import("../src/lib/data/index");

  const [w, maps, hist, tours, players, kz, modes] = await Promise.all([
    d.getWeapons(),
    d.getMaps(),
    d.getHistoryEvents(),
    d.getTournaments(),
    d.getPlayers(),
    d.getKZMaps(),
    d.getModes(),
  ]);
  console.log("counts:", {
    weapons: w.length, maps: maps.length, history: hist.length,
    tournaments: tours.length, players: players.length, kz: kz.length, modes: modes.length,
  });

  const ak = await d.getWeaponBySlug("ak-47");
  console.log("bySlug ak-47:", ak?.name, "| category:", ak?.category,
    "| fireRate(camel):", ak?.fireRate, "| art:", ak?.media?.art, "| variant:", ak?.media?.variant,
    "| zh:", ak?.description?.zh?.slice(0, 12));
  console.log("history sort:", hist[0]?.year, "->", hist[hist.length - 1]?.year, "(asc)");
  console.log("tournaments newest first:", tours[0]?.year, tours[0]?.name);
  const dust = maps.find((m) => m.slug === "de_dust2");
  console.log("dust2 overviewVideo:", dust?.overviewVideo?.videoId, "| bombsites:", JSON.stringify(dust?.bombsites));
  const mode = modes[0];
  console.log("mode name is localized obj:", JSON.stringify(mode?.name));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
