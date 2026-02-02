import * as React from "react";

import { cn } from "../../../lib/utils";

/**
 * How each character should be displayed in the overlay.
 * These symbols are common in editors:
 * - Space: middle dot
 * - Tab: right arrow (we keep the real tab width by also rendering "\t" when desired)
 * - Newline: show an explicit end-of-line marker
 */
const DISPLAY = {
  space: "·",
  tab: "⇥",
  eol: "↵",
} as const;

export type DiffCharStatus = "neutral" | "match" | "mismatch";

export type DiffCharToken = {
  char: string; // the original character (including whitespace)
  status: DiffCharStatus;
  isWhitespace: boolean;
};

export interface DiffTextProps {
  /** The text you want to render (e.g. user output, expected output, stdin). */
  text: string;

  /**
   * Optional reference text to diff against (e.g. expected output).
   * If provided, each character in `text` will be marked match/mismatch by index.
   */
  compareTo?: string;

  /**
   * If true, show whitespace markers (· ⇥ ↵).
   * Note: rendering uses CSS `whitespace-pre-wrap` so newlines/spaces stay meaningful.
   */
  showWhitespace?: boolean;

  className?: string;
}

/**
 * Build a per-character token list.
 * Uses Array.from to iterate code points (works better with unicode than `split("")`).
 */
export function tokenizeDiff(text: string, compareTo?: string): DiffCharToken[] {
  const source = Array.from(text);
  const target = compareTo != null ? Array.from(compareTo) : null;

  return source.map((char, index) => {
    const isWhitespace = char === " " || char === "\t" || char === "\n";

    let status: DiffCharStatus = "neutral";
    if (target) {
      status = index < target.length && char === target[index] ? "match" : "mismatch";
    }

    return { char, status, isWhitespace };
  });
}

function tokenClassName(token: DiffCharToken) {
  // Correctness has priority; otherwise whitespace is muted.
  if (token.status === "match") return "text-emerald-500";
  if (token.status === "mismatch") return "text-red-500";
  if (token.isWhitespace) return "text-muted-foreground/60";
  return "text-foreground/90";
}

function displayChar(char: string, showWhitespace: boolean) {
  if (!showWhitespace) return char;
  if (char === " ") return DISPLAY.space;
  if (char === "\t") return DISPLAY.tab;
  return char;
}

/**
 * Render tokens efficiently by grouping consecutive tokens with the same className.
 * This avoids creating one <span> per character in the common case.
 */
export function DiffText({ text, compareTo, showWhitespace = true, className }: DiffTextProps) {
  const tokens = React.useMemo(() => tokenizeDiff(text, compareTo), [text, compareTo]);

  const parts: React.ReactNode[] = [];
  let run = "";
  let runClass = "";
  let key = 0;

  const flush = () => {
    if (!run) return;
    parts.push(
      <span
        key={key++}
        className={runClass}
      >
        {run}
      </span>
    );
    run = "";
  };

  for (const token of tokens) {
    const cls = tokenClassName(token);

    // Newline: optionally render an EOL marker, then a real newline to keep layout.
    if (token.char === "\n") {
      flush();

      if (showWhitespace) {
        parts.push(
          <span
            key={key++}
            className={cls}
          >
            {DISPLAY.eol}
          </span>
        );
      }

      parts.push(<span key={key++}>{"\n"}</span>);
      runClass = "";
      continue;
    }

    const shown = displayChar(token.char, showWhitespace);

    if (!runClass) runClass = cls;
    if (cls !== runClass) {
      flush();
      runClass = cls;
    }

    run += shown;
  }

  flush();

  return (
    <pre
      className={cn(
        "font-mono text-sm leading-6 tracking-widest wrap-break-word whitespace-pre-wrap",
        className
      )}
    >
      {parts}
    </pre>
  );
}

/**
 * Backward-compatible convenience wrapper for your previous usage.
 * (Consider deleting once you migrate all call sites.)
 */
export function IO({ str, diffStr = "" }: { str: string; diffStr?: string }) {
  return (
    <DiffText
      text={str}
      compareTo={diffStr}
    />
  );
}
