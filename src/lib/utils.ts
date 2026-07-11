import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CSSProperties } from "react";

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build an inline style that sets the `--accent` CSS custom property. */
export function accentVar(
  hex: string,
  extra?: CSSProperties,
): CSSProperties {
  return { "--accent": hex, ...extra } as CSSProperties;
}
