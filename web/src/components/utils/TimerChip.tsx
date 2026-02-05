import { Timer } from "lucide-react";

import { cn, formatMMSS } from "@/lib/utils";

function timerTone(seconds: number) {
  if (seconds <= 10) return "text-red-600 dark:text-red-400";
  if (seconds <= 30) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}

interface TimerChipProps {
  seconds: number;
  className?: string;
}

const TimerChip = ({ seconds, className }: TimerChipProps) => {
  return (
    <div
      className={cn(
        "border-border bg-background/60",
        "flex items-center gap-2 rounded-full border px-3 py-1.5",
        "hover:bg-background transition-colors",
        className
      )}
    >
      <Timer className="text-muted-foreground h-4 w-4" />
      <span className={cn("text-xs font-semibold tabular-nums", timerTone(seconds))}>
        {formatMMSS(seconds)}
      </span>
    </div>
  );
};

export default TimerChip;
