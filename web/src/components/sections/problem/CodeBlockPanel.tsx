import * as React from "react";

import { Gauge, Tags } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProblemDifficulty } from "@/lib/problems";

import { Badge } from "@/components/ui/data_display";

/**
 * Left panel shell for the problem statement + highlighted code.
 * - Always shows difficulty.
 * - Optionally reveals title + concept tags once the user has answered.
 *
 * `children` should be the highlighted code block (e.g. the server-rendered Shiki HTML).
 */
export interface ProblemCodePanelProps extends React.ComponentProps<"section"> {
  difficulty: ProblemDifficulty;

  /**
   * Shown only after the result is known (so it don't spoil too much up-front).
   * If omitted, the header remains minimal.
   */
  revealMeta?: boolean;
  title?: string;
  concepts?: string[];

  /** Optional small helper text below "Program". */
  description?: string;
}

export default function ProblemCodePanel({
  className,
  children,
  difficulty,
  revealMeta = false,
  title,
  concepts,
  description = "Read the C++ code carefully and predict the exact result (spaces and line breaks matter).",
  ...props
}: ProblemCodePanelProps) {
  const hasMeta = revealMeta && (title || (concepts && concepts.length > 0));

  const difficultyColor = React.useMemo(() => {
    if (difficulty <= 2) {
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
    } else if (difficulty === 3) {
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";
    } else {
      return "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300";
    }
  }, [difficulty]);

  return (
    <section
      className={cn(
        "bg-secondary border-border flex flex-col gap-4 rounded-md border p-4",
        className
      )}
      aria-label="Problem code"
      {...props}
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-foreground text-lg leading-6 font-bold">Program</h2>
          <p className="text-muted-foreground mt-1 text-sm leading-6">{description}</p>
        </div>

        <Badge className={difficultyColor}>
          <Gauge /> Difficulty {difficulty}/5
        </Badge>
      </header>

      {/* Revealed metadata */}
      {hasMeta ? (
        <div className="border-border bg-background/40 flex flex-col gap-3 rounded-md border p-3">
          {title ? (
            <div className="min-w-0">
              <div className="text-muted-foreground text-xs font-medium">Title</div>
              <div className="text-foreground mt-1 truncate text-sm font-semibold">{title}</div>
            </div>
          ) : null}

          {concepts && concepts.length > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium">
                <Tags
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                <span>Concepts</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {concepts.map((c) => (
                  <Badge
                    variant="outline"
                    key={c}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Code area */}
      <div className="border-border overflow-hidden rounded-md border">{children}</div>
    </section>
  );
}
