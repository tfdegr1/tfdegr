import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. Always import Link from here.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
