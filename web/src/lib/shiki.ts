import { type Highlighter, createHighlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getCppHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      langs: ["cpp"],
      themes: ["github-dark", "github-light"],
    });
  }
  return highlighterPromise;
}
