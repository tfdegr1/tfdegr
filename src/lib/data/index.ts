// Data layer facade. Pages import getters from "@/lib/data".
// Local seed backend for now; a Supabase backend can be added later behind
// the same async getters, switched via NEXT_PUBLIC_DATA_SOURCE.

export * from "./weapons";
export * from "./maps";
export * from "./history";
export * from "./tournaments";
export * from "./players";
export * from "./kz";
export * from "./modes";

export const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "local";
