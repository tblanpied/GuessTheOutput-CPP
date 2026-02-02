import { getCppHighlighter } from "@/lib/shiki";

type CodeHighlightProps = {
  code: string;
};

export default async function CodeHighlight({ code }: CodeHighlightProps) {
  const highlighter = await getCppHighlighter();

  const html = highlighter.codeToHtml(code, {
    lang: "cpp",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div
      className="border-border overflow-hidden rounded-md border"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
