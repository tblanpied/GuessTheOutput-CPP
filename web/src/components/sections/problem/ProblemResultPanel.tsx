"use client";

import * as React from "react";

import {
  AlertTriangle,
  ArrowRight,
  CircleCheck,
  CircleX,
  Info,
  Keyboard,
  RotateCcw,
  Terminal,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ErrorType, ProblemResult } from "@/lib/problems";

import { Button } from "@/components/ui/inputs";
import { DiffText } from "@/components/sections/problem/DiffText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/feedback";

import { ErrorMessageView } from "./ErrorMessageView";
import { SubmissionEvaluation } from "./ProblemWorkspace";
import { ExplanationMarkdown } from "./ExplanationMarkdown";

export interface ProblemResultPanelProps {
  className?: string;

  explanationMarkdown: string;

  /** Evaluation of the user's answer. */
  evaluation: SubmissionEvaluation;

  stdin?: string;

  expectedResult: ProblemResult;

  /** Optional actions (parent handles navigation). */
  onRetry?: () => void;
  onNext?: () => void;
}

function _SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4" />
      <div className="min-w-0">
        <div className="text-foreground text-sm leading-5 font-semibold">{title}</div>
        {subtitle ? (
          <div className="text-muted-foreground text-xs leading-5">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

function _OutcomeLabel({ errorType }: { errorType: ErrorType }) {
  if (errorType === "no-error") return "No error (stdout)";
  if (errorType === "compilation-error") return "Compilation error";
  if (errorType === "runtime-error") return "Runtime error";
  return String(errorType);
}

function actualOutputTitle(errorType: ErrorType) {
  if (errorType === "no-error") return "Program output (stdout)";
  if (errorType === "runtime-error") return "Runtime error";
  return "Compilation error";
}

export default function ProblemResultPanel({
  className,
  explanationMarkdown,
  evaluation,
  stdin,
  expectedResult,
  onRetry,
  onNext,
}: ProblemResultPanelProps) {
  const ok = evaluation.success;

  const BannerIcon = ok ? CircleCheck : CircleX;
  const bannerClass = ok
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
    : "border-red-500/30 bg-red-500/10 text-red-500";

  const user = evaluation.submission;

  const showUserStdoutDiff =
    !ok &&
    user?.errorType === "no-error" &&
    expectedResult.errorType === "no-error" &&
    typeof user.stdout === "string" &&
    typeof expectedResult.stdout === "string";

  const showUserOutcomeMismatch = !ok && user && user.errorType !== expectedResult.errorType;

  return (
    <section
      className={cn(
        "bg-secondary border-border flex h-full flex-col gap-4 rounded-md border p-4",
        className
      )}
      aria-label="Result"
    >
      {/* Header + status banner */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-foreground text-lg font-bold">Result</h2>
      </div>

      <Alert className={cn(bannerClass)}>
        <BannerIcon />
        <AlertTitle>{ok ? "Correct" : "Failed"}</AlertTitle>
        <AlertDescription>{evaluation.summary}</AlertDescription>
      </Alert>

      {/* When failed: show what user answered */}
      {(showUserOutcomeMismatch || showUserStdoutDiff) && (
        <div className="flex flex-col gap-3">
          <_SectionHeader
            icon={Info}
            title="Your answer"
            subtitle="Shown only after submitting, to help you spot the mismatch."
          />

          {showUserOutcomeMismatch && (
            <div className="bg-background/60 grid gap-3 rounded-md border p-3 md:grid-cols-2">
              <div className="min-w-0">
                <div className="text-muted-foreground text-xs font-medium">Expected outcome</div>
                <div className="text-foreground mt-1 text-sm font-semibold">
                  <_OutcomeLabel errorType={expectedResult.errorType} />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-muted-foreground text-xs font-medium">
                  Your selected outcome
                </div>
                <div className="mt-1 text-sm font-semibold text-red-600 dark:text-red-400">
                  <_OutcomeLabel errorType={user!.errorType} />
                </div>
              </div>
            </div>
          )}

          {showUserStdoutDiff && (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="min-w-0">
                <div className="text-muted-foreground mb-2 text-xs font-medium">
                  Expected stdout
                </div>
                <div
                  className="border-border bg-background/60 overflow-auto rounded-md border px-3
                    py-2"
                >
                  <DiffText text={expectedResult.stdout ?? ""} />
                </div>
              </div>

              <div className="min-w-0">
                <div className="text-muted-foreground mb-2 text-xs font-medium">
                  Your stdout (diff)
                </div>
                <div
                  className={cn(
                    "border-border bg-background/60 overflow-auto rounded-md border px-3 py-2"
                  )}
                >
                  <DiffText
                    text={user?.stdout ?? ""}
                    compareTo={expectedResult.stdout ?? ""}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actual stdin/stdout/error */}
      <div className="flex flex-col gap-3">
        <_SectionHeader
          icon={Keyboard}
          title="Input (stdin)"
        />

        {typeof stdin === "string" ? (
          <div className="border-border bg-background/60 overflow-auto rounded-md border px-3 py-2">
            <DiffText text={stdin} />
          </div>
        ) : (
          <div className="text-muted-foreground text-sm italic">No stdin for this problem.</div>
        )}

        <_SectionHeader
          icon={Terminal}
          title={actualOutputTitle(expectedResult.errorType)}
          subtitle={
            expectedResult.errorType === "no-error"
              ? "This is the ground truth output."
              : "This is the ground truth failure (not stdout)."
          }
        />

        <div className="border-border bg-background/60 overflow-auto rounded-md border px-3 py-2">
          {expectedResult.errorType === "no-error" ? (
            <DiffText text={expectedResult.stdout ?? ""} />
          ) : (
            <ErrorMessageView
              className="max-h-60"
              message={expectedResult.errorMessage}
            />
          )}
        </div>

        {expectedResult.errorType !== "no-error" && (
          <div className="text-muted-foreground flex items-start gap-2 text-xs leading-5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              For error problems, your answer should match the outcome type, not the exact message
              formatting.
            </span>
          </div>
        )}
      </div>

      {/* Explanation (markdown) */}
      <div className="flex flex-col gap-2">
        <_SectionHeader
          icon={Info}
          title="Explanation"
        />
        <ExplanationMarkdown markdown={explanationMarkdown} />
      </div>

      {/* Actions */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Button
          className={cn("group flex w-full items-center justify-center gap-2")}
          onClick={onRetry}
          disabled={!onRetry}
          title={onRetry ? "Try this problem again" : "Retry is not available"}
        >
          <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-12" />
          Retry
        </Button>

        <Button
          className="group flex w-full items-center justify-center gap-2"
          onClick={onNext}
          disabled={!onNext}
          title={onNext ? "Go to the next problem" : "Next is handled by the parent"}
        >
          Next problem
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
}
