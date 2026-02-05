"use client";

import { Flag } from "lucide-react";

import { cn } from "@/lib/utils";

function getScoreColor(score: number, total: number) {
  const pct = score / (total ? total : 1);
  if (total === 0) {
    return "text-muted-foreground";
  } else if (pct < 0.3) {
    return "text-red-600 dark:text-red-300";
  } else if (pct < 0.6) {
    return "text-orange-600 dark:text-orange-300";
  } else {
    return "text-emerald-600 dark:text-emerald-300";
  }
}

interface ScoreChipProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  total: number;
  className?: string;
}

const ScoreChip = ({ score, total, className, ...props }: ScoreChipProps) => {
  return (
    <div
      className={cn(
        "border-border bg-background/60",
        "flex items-center gap-2 rounded-full border px-3 py-1.5",
        "hover:bg-background transition-colors",
        getScoreColor(score, total),
        className
      )}
      {...props}
    >
      <Flag className="h-4 w-4" />
      <span className="text-xs font-semibold tabular-nums">{score}</span>
      <span className="text-xs">/</span>
      <span className="text-xs font-semibold tabular-nums">{total}</span>
    </div>
  );
};

export default ScoreChip;
