import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Where data getters read from: repo seed ("local") or the database ("supabase"). */
export const DATA_SOURCE: "local" | "supabase" =
  process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase" ? "supabase" : "local";

let client: SupabaseClient | null = null;

/** Lazy anon client — created on first use so importing this module needs no env. */
export function getSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (set them to use DATA_SOURCE=supabase).",
    );
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

/** snake_case DB columns -> camelCase (top-level only; JSONB values pass through). */
function camelize<T>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    out[k.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase())] = v;
  }
  return out as T;
}

/** Fetch all rows from a table, mapped to the shared TS shape. */
export async function supaAll<T>(
  table: string,
  order?: { column: string; ascending?: boolean },
): Promise<T[]> {
  let query = getSupabase().from(table).select("*");
  if (order) query = query.order(order.column, { ascending: order.ascending ?? true });
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((r) => camelize<T>(r as Record<string, unknown>));
}

/** Fetch a single row by a column value, or null. */
export async function supaOne<T>(
  table: string,
  column: string,
  value: string,
): Promise<T | null> {
  const { data, error } = await getSupabase()
    .from(table)
    .select("*")
    .eq(column, value)
    .maybeSingle();
  if (error) throw error;
  return data ? camelize<T>(data as Record<string, unknown>) : null;
}
