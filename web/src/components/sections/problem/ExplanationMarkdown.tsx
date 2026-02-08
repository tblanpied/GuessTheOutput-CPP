import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

type ExplanationMarkdownProps = {
  markdown: string;
  className?: string;
};

export function ExplanationMarkdown({ markdown, className }: ExplanationMarkdownProps) {
  return (
    <div className={cn("prose prose-zinc dark:prose-invert max-w-none text-sm", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: (props) => (
            <p
              className="text-muted-foreground my-2 leading-6"
              {...props}
            />
          ),

          a: ({ className, ...props }) => (
            <a
              className={cn(
                `text-foreground decoration-muted-foreground/40 hover:decoration-muted-foreground
                underline underline-offset-4`,
                className
              )}
              target={props.href?.startsWith("#") ? undefined : "_blank"}
              rel={props.href?.startsWith("#") ? undefined : "noreferrer"}
              {...props}
            />
          ),

          h1: (props) => (
            <h1
              className="text-foreground mt-5 mb-2 text-xl"
              {...props}
            />
          ),
          h2: (props) => (
            <h2
              className="text-foreground mt-5 mb-2 text-lg"
              {...props}
            />
          ),
          h3: (props) => (
            <h3
              className="text-foreground mt-4 mb-2 text-base"
              {...props}
            />
          ),
          h4: (props) => (
            <h4
              className="text-foreground mt-4 mb-2 text-sm"
              {...props}
            />
          ),

          ul: (props) => (
            <ul
              className="text-muted-foreground my-2 list-disc pl-5"
              {...props}
            />
          ),
          ol: (props) => (
            <ol
              className="text-muted-foreground my-2 list-decimal pl-5"
              {...props}
            />
          ),
          li: ({ className, ...props }) => (
            <li
              className={cn("my-1 pl-0 [&>p]:my-1", className)}
              {...props}
            />
          ),

          // GFM task lists
          input: ({ className, ...props }) => (
            <input
              className={cn("accent-foreground mr-2 translate-y-px", className)}
              {...props}
            />
          ),

          blockquote: (props) => (
            <blockquote
              className="border-border text-muted-foreground my-3 border-l-2 pl-3 [&>p]:my-1"
              {...props}
            />
          ),

          hr: (props) => (
            <hr
              className="border-border my-4"
              {...props}
            />
          ),

          // Inline vs block code
          code: ({ className, children, ...props }) => (
            <code
              className={cn("bg-card rounded px-1.5 py-0.5 font-mono text-[0.9em]", className)}
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ className, ...props }) => (
            <pre
              className={cn(
                `border-border bg-background/60 my-3 overflow-auto rounded-md border p-3 font-mono
                text-sm leading-6`,
                className
              )}
              {...props}
            />
          ),

          // Tables (GFM)
          table: (props) => (
            <div className="my-3 overflow-x-auto">
              {/* eslint-disable-next-line sonarjs/table-header */}
              <table
                className="text-muted-foreground w-full border-collapse text-sm"
                {...props}
              />
            </div>
          ),
          thead: (props) => (
            <thead
              className="bg-muted/40"
              {...props}
            />
          ),
          th: (props) => (
            <th
              className="border-border border px-2 py-1 text-left font-semibold"
              {...props}
            />
          ),
          td: (props) => (
            <td
              className="border-border border px-2 py-1 align-top"
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
