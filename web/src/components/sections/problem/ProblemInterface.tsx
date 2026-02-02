"use client";

import * as React from "react";

import { CheckSquare, Code2, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ErrorType, ProblemData } from "@/lib/problems";

import CodeBlockPanel from "./CodeBlockPanel";
import { OutputGuessPanel } from "./OutputGuessPanel";
import ProblemResultPanel from "./ProblemResultPanel";

type ProblemPhase = "answering" | "reviewing";

/** What the user submitted. */
export type UserSubmission = {
  errorType: ErrorType;
  stdout?: string; // only meaningful when errorType === "no-error"
};

/** How the validator evaluated the submission (why success/failure). */
export type SubmissionEvaluation = {
  success: boolean;
  summary: string; // short, shown in the banner
  details?: string[]; // optional extra reasons
  submission?: UserSubmission; // to show the user answer
};

export interface ProblemWorkspaceProps {
  /** Server-rendered slot for highlighted code (Shiki) */
  code: React.ReactNode;

  problem: ProblemData;

  /** Optional: parent decides how to move to the next problem (training session, routing, etc.) */
  onNext?: () => void;

  /** Optional: allow parent to override attempts */
  maxAttempts?: number;

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
  onNext,
  maxAttempts = 3,
  className,
}: ProblemWorkspaceProps) {
  const [phase, setPhase] = React.useState<ProblemPhase>("answering");
  const [evaluation, setEvaluation] = React.useState<SubmissionEvaluation>({
    success: false,
    summary: "",
  });

  const revealMeta = phase === "reviewing";

  const handleSubmit = React.useCallback((nextEvaluation: SubmissionEvaluation) => {
    setEvaluation(nextEvaluation);
    setPhase("reviewing");
  }, []);

  const handleRetry = React.useCallback(() => {
    setPhase("answering");
    setEvaluation({ success: false, summary: "" });
  }, []);

  return (
    <section
      className={cn(
        "border-border bg-secondary flex w-full flex-1 flex-col overflow-hidden border",
        "shadow-sm",
        className
      )}
      aria-label="Problem workspace"
    >
      {/* Top bar shared by both sides */}
      <WorkspaceHeader phase={phase} />

      {/* Unified content area with an internal divider */}
      <div
        className="border-border grid flex-1 divide-y border-t md:grid-cols-2 md:divide-x
          md:divide-y-0"
      >
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
              maxAttempts={maxAttempts}
              stdin={problem.stdin}
              expectedStdout={problem.result.stdout}
              expectedErrorType={problem.result.errorType}
              onResult={handleSubmit}
            />
          ) : (
            <ProblemResultPanel
              className="h-full border-0 bg-transparent p-0"
              explanationMarkdown={problem.explanation}
              evaluation={evaluation}
              stdin={problem.stdin}
              expectedResult={problem.result}
              onRetry={handleRetry}
              onNext={onNext}
            />
          )}
        </div>
      </div>
    </section>
  );
}
