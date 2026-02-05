import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMMSS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${String(ss).padStart(2, "0")}`;
}

export function intersects(a: string[], b: string[]) {
  if (a.length === 0) return true;
  const setB = new Set(b);
  return a.some((x) => setB.has(x));
}

export function formatDateTime(ts: number) {
  // Uses user's locale by default.
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

export function now() {
  return Date.now();
}

export function clampNonNegative(n: number) {
  return n < 0 ? 0 : n;
}

export function safeParse(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}
