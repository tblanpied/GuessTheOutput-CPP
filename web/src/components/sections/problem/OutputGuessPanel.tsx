"use client";

import * as React from "react";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Keyboard,
  Terminal,
  Wrench,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ErrorType } from "@/lib/problems";

import { DiffText } from "@/components/sections/problem/DiffText";
import { Button, RadioGroup, RadioGroupItem, Textarea } from "@/components/ui/inputs";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/data_display";

import { SubmissionEvaluation } from "./ProblemInterface";

type AttemptState = {
  used: number; // number of submitted attempts (wrong or right)
  max: number;
};

type ValidationResult = {
  ok: boolean;
  reasons: string[];
  // Useful booleans for UI decisions
  errorTypeMatches: boolean;
  outputMatches: boolean;
};

type OutputGuessPanelProps = {
  onResult: (evaluation: SubmissionEvaluation) => void;

  className?: string;
  maxAttempts?: number;

  stdin?: string;
  expectedErrorType?: ErrorType;
  expectedStdout?: string;
};

const ERROR_TYPE_META: Record<
  ErrorType,
  {
    label: string;
    description: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  "no-error": {
    label: "No error",
    description: "The program runs successfully; you must provide the exact stdout.",
    Icon: Terminal,
  },
  "compilation-error": {
    label: "Compilation error",
    description: "The program fails to compile (syntax, type errors, missing includes, etc.).",
    Icon: Wrench,
  },
  "runtime-error": {
    label: "Runtime error",
    description: "The program compiles but fails at runtime (crash, abort, exception, etc.).",
    Icon: AlertTriangle,
  },
  "undefined-behavior": {
    label: "Undefined behavior",
    description: "The standard does not specify the result; output may vary by compiler/run.",
    Icon: AlertTriangle,
  },
};

function validateGuess(params: {
  selectedErrorType: ErrorType;
  typedStdout: string;
  expectedErrorType: ErrorType;
  expectedStdout: string;
}): ValidationResult {
  const { selectedErrorType, typedStdout, expectedErrorType, expectedStdout } = params;

  const errorTypeMatches = selectedErrorType === expectedErrorType;
  const outputIsRelevant = expectedErrorType === "no-error";
  const outputMatches = !outputIsRelevant || typedStdout === expectedStdout;

  const reasons: string[] = [];

  if (!errorTypeMatches) {
    const expectedLabel = ERROR_TYPE_META[expectedErrorType]?.label ?? expectedErrorType;
    const gotLabel = ERROR_TYPE_META[selectedErrorType]?.label ?? selectedErrorType;
    reasons.push(`Wrong outcome: you selected "${gotLabel}", which is incorrect.`);
  }

  if (errorTypeMatches && expectedErrorType === "no-error" && !outputMatches) {
    reasons.push("Stdout mismatch: output must match exactly (including spaces and newlines).");
  }

  if (errorTypeMatches && expectedErrorType !== "no-error") {
    reasons.push("Outcome matches: no stdout is expected for this problem.");
  }

  const ok = errorTypeMatches && outputMatches;
  if (ok && expectedErrorType === "no-error") {
    reasons.unshift("Perfect match: error type and stdout are correct.");
  }

  return { ok, reasons, errorTypeMatches, outputMatches };
}

function _AttemptBadge({ attempt }: { attempt: AttemptState }) {
  const remaining = Math.max(0, attempt.max - attempt.used);
  const isLast = remaining <= 1;

  return (
    <div
      className={cn(
        `border-border bg-background/60 text-muted-foreground inline-flex items-center gap-2
        rounded-full border px-3 py-1 text-xs`,
        isLast && "text-amber-600 dark:text-amber-400"
      )}
    >
      <span className="font-medium">Attempt</span>
      <span className="tabular-nums">
        {attempt.used + 1}/{attempt.max}
      </span>
      <span className="text-muted-foreground/70">(left: {remaining})</span>
    </div>
  );
}

function _InlineFeedback({
  kind,
  title,
  message,
}: {
  kind: "success" | "error" | "info";
  title: string;
  message: string;
}) {
  const styles =
    kind === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : kind === "error"
        ? "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
        : "border-border bg-background/60 text-foreground/90";

  const Icon = kind === "success" ? CheckCircle2 : kind === "error" ? XCircle : AlertTriangle;

  return (
    <div
      className={cn("flex items-start gap-2 rounded-md border p-3 text-sm", styles)}
      role="status"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0">
        <div className="leading-5 font-semibold">{title}</div>
        <div className="opacity-90">{message}</div>
      </div>
    </div>
  );
}

export function OutputGuessPanel({
  onResult,
  maxAttempts = 3,
  className,
  stdin,
  expectedErrorType = "no-error",
  expectedStdout = "",
}: OutputGuessPanelProps) {
  const [typedStdout, setTypedStdout] = React.useState("");
  const [selectedErrorType, setSelectedErrorType] = React.useState<ErrorType>("no-error");

  const [attempt, setAttempt] = React.useState<AttemptState>({ used: 0, max: maxAttempts });
  const [lastValidation, setLastValidation] = React.useState<ValidationResult | null>(null);

  const taRef = React.useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  const attemptsRemaining = attempt.max - attempt.used;

  const canTypeStdout = selectedErrorType === "no-error";
  const shouldDiffStdout =
    lastValidation != null && selectedErrorType === "no-error" && expectedErrorType === "no-error";

  const syncScroll = React.useCallback(() => {
    const ta = taRef.current;
    const overlay = overlayRef.current;
    if (!ta || !overlay) return;
    overlay.scrollTop = ta.scrollTop;
    overlay.scrollLeft = ta.scrollLeft;
  }, []);

  const resetFeedback = React.useCallback(() => {
    setLastValidation(null);
  }, []);

  const handleStdoutChange = React.useCallback(
    (v: string) => {
      setTypedStdout(v);
      resetFeedback();
    },
    [resetFeedback]
  );

  const handleErrorTypeChange = React.useCallback(
    (v: ErrorType) => {
      setSelectedErrorType(v);
      resetFeedback();
    },
    [resetFeedback]
  );

  const submitAttempt = React.useCallback(() => {
    const result = validateGuess({
      selectedErrorType,
      typedStdout,
      expectedErrorType,
      expectedStdout,
    });

    setLastValidation(result);

    const nextUsed = attempt.used + 1;
    const isLastAttempt = nextUsed >= attempt.max;

    if (result.ok || isLastAttempt) {
      // Parent will switch to ResultPanel; no need to keep local state.
      onResult({
        success: result.ok,
        summary: result.reasons[0],
        submission: {
          errorType: selectedErrorType,
          stdout: typedStdout,
        },
      });
      return;
    }

    setAttempt((a) => ({ ...a, used: a.used + 1 }));
  }, [
    attempt.max,
    attempt.used,
    expectedErrorType,
    expectedStdout,
    onResult,
    selectedErrorType,
    typedStdout,
  ]);

  const giveUp = React.useCallback(() => {
    onResult({
      success: false,
      summary: "You gave up :(",
    });
  }, [onResult]);

  React.useEffect(() => {
    // keep attempt.max in sync if prop changes
    setAttempt((a) => ({ ...a, max: maxAttempts }));
  }, [maxAttempts]);

  const hintText = React.useMemo(() => {
    if (selectedErrorType !== "no-error") {
      return "Stdout input is disabled because you selected an error outcome.";
    }
    return "Type the exact stdout (spaces and line breaks matter). Tip: Ctrl/⌘ + Enter to submit.";
  }, [selectedErrorType]);

  const feedback = React.useMemo(() => {
    if (!lastValidation) return null;

    if (lastValidation.ok) {
      return (
        <_InlineFeedback
          kind="success"
          title="Correct"
          message={lastValidation.reasons[0] ?? "Your answer matches exactly."}
        />
      );
    }

    // Wrong but not finished yet: helpful, actionable feedback
    const remaining = Math.max(0, attempt.max - attempt.used);
    const primaryReason = lastValidation.reasons[0] ?? "Your answer does not match.";
    return (
      <_InlineFeedback
        kind="error"
        title="Not quite"
        message={
          remaining > 0
            ? `${primaryReason} Try again (${remaining} attempt(s) left).`
            : primaryReason
        }
      />
    );
  }, [attempt.max, attempt.used, lastValidation]);

  return (
    <aside
      className={cn(
        "bg-secondary border-border flex flex-col gap-4 rounded-md border p-4",
        className
      )}
      aria-label="Answer panel"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-foreground text-lg font-bold">Your answer</h2>
          <p className="text-muted-foreground text-sm">{hintText}</p>
        </div>
        <_AttemptBadge attempt={attempt} />
      </div>

      {/* Stdin section */}
      <section className="flex flex-col gap-2">
        <div className="text-foreground flex items-center gap-2 text-sm font-semibold">
          <Keyboard className="h-4 w-4" />
          <span>Input (stdin)</span>
        </div>

        {typeof stdin === "string" ? (
          <div className="bg-background/60 border-border rounded-md border px-3 py-2">
            <DiffText text={stdin} />
          </div>
        ) : (
          <div className="text-muted-foreground text-sm italic">No stdin for this problem.</div>
        )}
      </section>

      {/* Outcome selection */}
      <section className="flex flex-col gap-2">
        <div className="text-foreground flex items-center gap-2 text-sm font-semibold">
          <Terminal className="h-4 w-4" />
          <span>Program outcome</span>
        </div>

        <RadioGroup
          value={selectedErrorType}
          className="w-full gap-2"
          onValueChange={(v) => handleErrorTypeChange(v as ErrorType)}
        >
          {(Object.keys(ERROR_TYPE_META) as ErrorType[]).map((key, idx) => {
            const meta = ERROR_TYPE_META[key];
            const invalid =
              lastValidation != null && selectedErrorType === key && expectedErrorType !== key;

            return (
              <FieldLabel
                key={key}
                htmlFor={key}
                className={cn(idx > 0 && "mt-2")}
                aria-invalid={invalid}
              >
                <Field orientation="horizontal">
                  <div
                    className="text-muted-foreground bg-background/60 mt-0.5 flex h-9 w-9
                      items-center justify-center rounded-md border"
                  >
                    <meta.Icon className="h-4 w-4" />
                  </div>

                  <FieldContent>
                    <FieldTitle>{meta.label}</FieldTitle>
                    <FieldDescription>{meta.description}</FieldDescription>
                  </FieldContent>

                  <RadioGroupItem
                    value={key}
                    id={key}
                    aria-invalid={invalid}
                  />
                </Field>
              </FieldLabel>
            );
          })}
        </RadioGroup>
      </section>

      {/* Stdout entry (overlay + textarea) */}
      <section className="flex flex-col gap-2">
        <div className="text-foreground flex items-center gap-2 text-sm font-semibold">
          <ChevronRight className="h-4 w-4" />
          <span>Output (stdout)</span>
        </div>

        <div className="relative w-full">
          {/* Overlay (visual layer) */}
          <div
            ref={overlayRef}
            aria-hidden="true"
            className={cn(
              `bg-background text-foreground/90 pointer-events-none absolute inset-0 overflow-auto
              rounded-md border px-3 py-2`,
              !canTypeStdout && "opacity-60"
            )}
          >
            <DiffText
              text={typedStdout}
              compareTo={shouldDiffStdout ? expectedStdout : undefined}
            />
          </div>

          {/* Textarea (editing layer) */}
          <Textarea
            ref={taRef}
            value={typedStdout}
            placeholder={canTypeStdout ? "Type the exact stdout here…" : "Stdout not applicable."}
            title={canTypeStdout ? "Type the exact stdout here…" : "Stdout not applicable."}
            onChange={(e) => handleStdoutChange(e.target.value)}
            onScroll={syncScroll}
            onKeyDown={(e) => {
              const isSubmit = (e.ctrlKey || e.metaKey) && e.key === "Enter";
              if (isSubmit) {
                e.preventDefault();
                submitAttempt();
              }
            }}
            spellCheck={false}
            disabled={!canTypeStdout}
            aria-disabled={!canTypeStdout}
            aria-invalid={
              lastValidation != null &&
              selectedErrorType === "no-error" &&
              expectedErrorType === "no-error" &&
              typedStdout !== expectedStdout
            }
            className={cn(
              "relative z-10 block min-h-20 w-full resize-y rounded-md border px-3 py-2",
              "font-mono text-sm leading-6",
              "caret-foreground selection:bg-primary/25 text-transparent",
              "tracking-widest"
            )}
          />
        </div>

        {/* Feedback / reasons */}
        {feedback}
      </section>

      {/* Actions */}
      <div className="mt-1 flex items-center gap-3">
        <Button
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-400
            hover:dark:bg-emerald-500"
          onClick={submitAttempt}
          disabled={attemptsRemaining <= 0}
        >
          Submit
        </Button>

        <Button
          className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-400 hover:dark:bg-red-400/80"
          onClick={giveUp}
        >
          Give up
        </Button>
      </div>
    </aside>
  );
}
