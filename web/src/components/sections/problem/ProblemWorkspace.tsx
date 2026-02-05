"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { CheckSquare, Code2, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ErrorType, ProblemData } from "@/lib/problems";
import { updateTrainingSessionTimers } from "@/lib/training/timers";
import {
  getActiveTrainingSessionId,
  getCurrentProblemId,
  getNextProblemId,
  getSessionCounts,
  markSessionCompleted,
  recordAttempt,
  retryLastProblem,
} from "@/lib/training";

import { useTrainingSession } from "@/hooks/useTrainingSession";

import CodeBlockPanel from "./CodeBlockPanel";
import { OutputGuessPanel } from "./OutputGuessPanel";
import ProblemResultPanel from "./ProblemResultPanel";
import { TrainingSessionHud } from "./TrainingSessionHud";

type ProblemPhase = "answering" | "reviewing";

/** What the user submitted. */
export type UserSubmission = {
  errorType: ErrorType;
  stdout?: string; // only meaningful when errorType === "no-error"
};

/** How the validator evaluated the submission (why success/failure). */
export type SubmissionEvaluation = {
  success: boolean;
  giveUp?: boolean;
  summary: string; // short, shown in the banner
  submission?: UserSubmission; // to show the user answer
};

export interface ProblemWorkspaceProps {
  /** Server-rendered slot for highlighted code (Shiki) */
  code: React.ReactNode;

  problem: ProblemData;

  /** Optional: parent can override what happens at end-of-session */
  onSessionComplete?: () => void;

  className?: string;
}

function WorkspaceHeader({ phase }: { phase: ProblemPhase }) {
  const isReviewing = phase === "reviewing";
  const Icon = isReviewing ? CheckSquare : HelpCircle;

  return (
    <div className="flex items-start justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <div className="text-foreground flex items-center gap-2 text-sm font-semibold">
          <Icon className="h-4 w-4" />
          <span>{isReviewing ? "Review" : "Solve"}</span>
        </div>
        <div className="text-muted-foreground text-xs leading-5">
          {isReviewing
            ? "Compare your answer with the expected result and read the explanation."
            : "Pick the correct outcome and provide the exact stdout (whitespace matters)."}
        </div>
      </div>

      <div className="text-muted-foreground flex items-center gap-2 text-xs">
        <Code2 className="h-4 w-4" />
        <span className="hidden sm:inline">C++</span>
      </div>
    </div>
  );
}

export default function ProblemWorkspace({
  code,
  problem,
  className,
  onSessionComplete,
}: ProblemWorkspaceProps) {
  const router = useRouter();
  const [phase, setPhase] = React.useState<ProblemPhase>("answering");
  const [evaluation, setEvaluation] = React.useState<SubmissionEvaluation>({
    success: false,
    summary: "",
  });
  // Read active session id only on the client.
  const session = useTrainingSession(getActiveTrainingSessionId());

  const revealMeta = phase === "reviewing";

  const { total, index, remaining } = getSessionCounts(session);
  const progress = total > 0 ? Math.round((index / total) * 100) : 0;

  React.useEffect(() => {
    if (!session) return;

    if (phase !== "answering") return;

    const currentProblemId = getCurrentProblemId(session);
    if (!currentProblemId) return;

    if (problem.id !== currentProblemId) {
      router.replace(`/problems/${currentProblemId}`);
    }
  }, [router, session, problem.id, phase]);

  const handleSubmit = React.useCallback(
    (nextEval: SubmissionEvaluation) => {
      setEvaluation(nextEval);

      if (!session) {
        router.push("/");
        return;
      }

      const { finishedProblem } = recordAttempt(session.meta.id, nextEval);

      if (finishedProblem) {
        setPhase("reviewing");

        // prefetch the next problem for snappier transitions.
        const nextId = getNextProblemId(session);
        if (nextId && nextId !== problem.id) {
          router.prefetch(`/problems/${nextId}`);
        }
      }
    },
    [session, problem.id, router]
  );

  const handleRetry = React.useCallback(() => {
    setPhase("answering");
    setEvaluation({ success: false, summary: "" });
    if (!session) return;
    const nextProblemId = retryLastProblem(session.meta.id);
    if (nextProblemId) {
      router.replace(`/problems/${nextProblemId}`);
    } else {
      router.push("/");
    }
  }, [session, router]);

  const handleNext = React.useCallback(() => {
    if (!session) {
      router.push("/");
      return;
    }

    const nextId = getCurrentProblemId(session);

    // Session finished (or invalid): go home or to a summary.
    if (!nextId) {
      onSessionComplete?.();
      router.push("/");
      return;
    }

    // Safety: avoid pushing the same route.
    if (nextId === problem.id) return;

    router.replace(`/problems/${nextId}`);
  }, [session, onSessionComplete, problem.id, router]);

  const handeTimerUpdate = React.useCallback(() => {
    if (!session || phase !== "answering") return;
    const { expired, expiredKind } = updateTrainingSessionTimers(session.meta.id);
    if (expired) {
      if (expiredKind === "problem") {
        const message = `${expiredKind} timer expired !`;
        handleSubmit({
          success: false,
          giveUp: true,
          summary: message.charAt(0).toUpperCase() + message.slice(1),
        });
      } else if (expiredKind === "session") {
        markSessionCompleted(session.meta.id);
        onSessionComplete?.();
        router.push("/");
      }
    }
  }, [session, phase, handleSubmit, onSessionComplete, router]);

  return (
    <section
      className={cn(
        "border-border bg-secondary flex w-full flex-1 flex-col overflow-hidden border shadow-sm",
        className
      )}
      aria-label="Problem workspace"
    >
      {/* Top bar shared by both sides */}
      <WorkspaceHeader phase={phase} />

      {/* Unified content area with an internal divider */}
      <div
        className={cn(
          "border-border grid flex-1 divide-y border-t md:grid-cols-2 md:divide-x md:divide-y-0"
        )}
      >
        <TrainingSessionHud
          className="fixed top-5 left-1/2 z-50 -translate-x-1/2"
          problemsSolved={session?.progress.score.solved || 0}
          problemsFailed={session?.progress.score.failed || 0}
          timer={
            session?.progress.timers.problemSecondsRemaining ||
            session?.progress.timers.sessionSecondsRemaining ||
            undefined
          }
          remainingProblems={remaining}
          progress={progress}
          onTimerTick={handeTimerUpdate}
        />
        {/* Left: Code */}
        <div className="min-w-0 p-4">
          <CodeBlockPanel
            className="border-0 bg-transparent p-0"
            title={problem.title}
            concepts={problem.concepts}
            difficulty={problem.difficulty}
            revealMeta={revealMeta}
          >
            {code}
          </CodeBlockPanel>
        </div>

        {/* Right: Answer or Result */}
        <div className="min-w-0 p-4">
          {phase === "answering" ? (
            <OutputGuessPanel
              className="h-full border-0 bg-transparent p-0"
              maxAttempts={session?.config.maxAttemptsPerProblem || null}
              currentAttempts={session?.progress.attemptsOnCurrent || 0}
              showOutputHints={session?.config.showOutputDifference}
              stdin={problem.stdin}
              expectedStdout={problem.result.stdout}
              expectedErrorType={problem.result.errorType}
              onSubmit={handleSubmit}
            />
          ) : (
            <ProblemResultPanel
              className="h-full border-0 bg-transparent p-0"
              explanationMarkdown={problem.explanation}
              evaluation={evaluation}
              stdin={problem.stdin}
              expectedResult={problem.result}
              onRetry={handleRetry}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </section>
  );
}
