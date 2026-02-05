"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { Progress } from "@/components/ui/feedback";
import ScoreChip from "@/components/utils/ScoreChip";

import TimerChip from "../../utils/TimerChip";

type HudProps = {
  problemsSolved: number;
  problemsFailed: number;
  remainingProblems: number;
  progress: number;
  timer?: number;
  className?: string;

  onTimerTick?: () => void;
};

export function TrainingSessionHud({
  problemsSolved,
  problemsFailed,
  remainingProblems,
  progress,
  timer,
  className,
  onTimerTick,
}: HudProps) {
  React.useEffect(() => {
    if (!timer) return;

    const id = window.setInterval(() => {
      onTimerTick?.();
    }, 200);

    return () => window.clearInterval(id);
  }, [onTimerTick, timer]);

  return (
    <div
      className={cn(
        `border-border bg-secondary/50 overflow-hidden rounded-full border px-2 pt-2.5 shadow-sm
        backdrop-blur-xs`,
        className
      )}
      aria-label="Training HUD"
    >
      <div className="flex items-center gap-2">
        {/* Score */}
        <ScoreChip
          score={problemsSolved}
          total={problemsSolved + problemsFailed}
          title="Solved / (Solved + Failed)"
        />

        {/* Timer */}
        {timer && <TimerChip seconds={timer} />}
      </div>
      <div className="relative mt-1.5">
        <div
          className={cn(
            `absolute left-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/6 items-center
            justify-center px-1 text-[11px] font-bold text-zinc-50 dark:text-zinc-900`
          )}
        >
          {remainingProblems > 0 && <span>{`${remainingProblems} left`}</span>}
        </div>

        <Progress value={progress} />
      </div>
    </div>
  );
}
