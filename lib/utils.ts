import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard Shadcn UI class-merging helper. Used by every primitive in
 * `components/ui` per 04-component-library.md §1 (Shadcn primitives are
 * composed, never edited in place).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
