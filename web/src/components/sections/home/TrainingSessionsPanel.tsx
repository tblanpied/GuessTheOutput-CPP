"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock,
  Gauge,
  Play,
  Tags,
  Trash,
  XCircle,
} from "lucide-react";

import { cn, formatDateTime } from "@/lib/utils";
import type { TrainingSession } from "@/lib/training";
import {
  deleteTrainingSession,
  getActiveTrainingSessionId,
  getConcepts,
  getDifficultyRange,
  getSessionCounts,
  listTrainingSessions,
  resumeTrainingSession,
  setActiveTrainingSession,
  subscribeStore,
} from "@/lib/training";

import { Button } from "@/components/ui/inputs";
import { Card } from "@/components/ui/surfaces";
import { Badge } from "@/components/ui/data_display";
import ScoreChip from "@/components/utils/ScoreChip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Progress,
} from "@/components/ui/feedback";

import TimerChip from "../../utils/TimerChip";

export function TrainingSessionsPanel({
  className,
  title = "Your sessions",
}: {
  className?: string;
  title?: string;
}) {
  const router = useRouter();

  const [sessions, setSessions] = React.useState<TrainingSession[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const refresh = React.useCallback(() => {
    setSessions(listTrainingSessions());
    setActiveId(getActiveTrainingSessionId());
  }, []);

  React.useEffect(() => {
    refresh();
    return subscribeStore(refresh);
  }, [refresh]);

  const continueSession = React.useCallback(
    (id: string) => {
      resumeTrainingSession(id);
      setActiveTrainingSession(id);

      router.push(`/training`);
    },
    [router]
  );

  const removeSession = React.useCallback((id: string) => {
    deleteTrainingSession(id);
    // subscribeStore(refresh) will update the list automatically
  }, []);

  if (sessions.length === 0) return null;

  return (
    <Card
      className={cn("w-full px-6 shadow-sm", className)}
      aria-label="Training sessions"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-foreground text-sm font-semibold">{title}</h2>
        <div className="text-muted-foreground text-xs">
          {activeId ? "1 active" : "No active session"}
        </div>
      </div>

      <div className="space-y-2">
        {sessions.map((s) => {
          const isActive = s.meta.id === activeId;
          const { total, current, remaining } = getSessionCounts(s);

          const solved = s.progress.score.solved;
          const failed = s.progress.score.failed;

          const progressValue = (Math.min(total, current) * 100) / Math.max(1, total);

          const concepts = getConcepts(s);
          const difficulty = getDifficultyRange(s);

          const showTimer =
            (s.progress.timers.problemSecondsRemaining !== null ||
              s.progress.timers.sessionSecondsRemaining !== null) &&
            s.meta.status !== "completed";

          return (
            <div
              key={s.meta.id}
              className={cn(
                "group border-border bg-background/60 rounded-lg border p-3",
                "hover:bg-background/80 transition-colors",
                isActive && "ring-2 ring-emerald-500/30"
              )}
            >
              {/* Row header */}
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => continueSession(s.meta.id)}
                  className="min-w-0 text-left"
                  title="Continue session"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          isActive ? "bg-emerald-500" : "bg-muted-foreground/40"
                        )}
                        aria-hidden="true"
                      />
                      <div className="text-foreground truncate text-sm font-semibold">
                        {s.meta.title}
                      </div>
                    </div>
                    {showTimer && (
                      <TimerChip
                        className="ml-2"
                        seconds={
                          s.progress.timers.problemSecondsRemaining ||
                          s.progress.timers.sessionSecondsRemaining ||
                          0
                        }
                      />
                    )}
                    <ScoreChip
                      score={solved}
                      total={solved + failed}
                      title="Solved / (Solved + Failed)"
                      className="ml-2"
                    />
                  </div>

                  <div
                    className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 text-xs"
                  >
                    {concepts.length > 0 ? (
                      <>
                        <span className="truncate">{concepts.slice(0, 3).join(" • ")}</span>
                        {concepts.length > 3 ? <span>…</span> : null}
                      </>
                    ) : null}
                  </div>
                </button>

                <div className="flex shrink-0 items-center gap-2">
                  {s.meta.status !== "completed" && (
                    <Button
                      onClick={() => continueSession(s.meta.id)}
                      variant="outline"
                      title="Continue"
                    >
                      <Play className="h-4 w-4" />
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  {s.meta.status === "completed" && (
                    <Badge
                      className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                    >
                      Completed
                    </Badge>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="transition-colors hover:text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="overflow-hidden p-0">
                      <AlertDialogHeader className="p-4">
                        <AlertDialogTitle>Delete this training session?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this training
                          session from your browser.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="bg-muted/40 p-4">
                        <AlertDialogCancel
                          size="default"
                          variant="secondary"
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeSession(s.meta.id)}
                          size="default"
                          variant="default"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-emerald-700 dark:text-emerald-300"
                    title="Solved problems"
                  >
                    <CheckCircle2 />
                    {solved}
                  </Badge>

                  <Badge
                    variant="outline"
                    className={cn("text-red-700 dark:text-red-300")}
                    title="Failed problems"
                  >
                    <XCircle />
                    {failed}
                  </Badge>

                  <Badge
                    variant="outline"
                    title="Difficulty range"
                  >
                    <Gauge />
                    {difficulty}
                  </Badge>

                  <Badge
                    variant="outline"
                    title="Concept count"
                  >
                    <Tags />
                    {concepts.length}
                  </Badge>
                </div>

                <div className="flex flex-col gap-1">
                  <div
                    className={cn(
                      `text-muted-foreground flex flex-wrap items-center justify-between gap-2
                      text-xs`
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5" />
                      created {formatDateTime(s.meta.createdAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      used {formatDateTime(s.meta.lastOpenedAt)}
                    </span>
                  </div>

                  {s.meta.status !== "completed" && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-muted-foreground text-xs">{remaining} left</span>
                      <Progress value={progressValue} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
