"use client";

import * as React from "react";

import {
  AlertCircleIcon,
  AlertTriangle,
  ChevronRight,
  Keyboard,
  Terminal,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ErrorType } from "@/lib/problems";

import { DiffText } from "@/components/sections/problem/DiffText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/feedback";
import { Button, RadioGroup, RadioGroupItem, Textarea } from "@/components/ui/inputs";
import {
  Badge,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/data_display";

import { SubmissionEvaluation } from "./ProblemWorkspace";

type ValidationResult = {
  ok: boolean;
  reasons: string[];
  // Useful booleans for UI decisions
  errorTypeMatches: boolean;
  outputMatches: boolean;
};

type OutputGuessPanelProps = {
  onSubmit: (evaluation: SubmissionEvaluation) => void;

  className?: string;
  maxAttempts: number | null;
  currentAttempts: number;
  showOutputHints?: boolean;

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
    const gotLabel = ERROR_TYPE_META[selectedErrorType as ErrorType].label ?? selectedErrorType;
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

export function OutputGuessPanel({
  onSubmit,
  maxAttempts,
  currentAttempts,
  showOutputHints = true,
  className,
  stdin,
  expectedErrorType = "no-error",
  expectedStdout = "",
}: OutputGuessPanelProps) {
  const [typedStdout, setTypedStdout] = React.useState("");
  const [selectedErrorType, setSelectedErrorType] = React.useState<ErrorType>("no-error");
  const [lastValidation, setLastValidation] = React.useState<ValidationResult | null>(null);

  const taRef = React.useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  const canTypeStdout = selectedErrorType === "no-error";
  const shouldDiffStdout =
    showOutputHints &&
    lastValidation != null &&
    selectedErrorType === "no-error" &&
    expectedErrorType === "no-error";

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

    onSubmit({
      success: result.ok,
      summary: result.reasons[0],
      submission: {
        errorType: selectedErrorType,
        stdout: typedStdout,
      },
    });
  }, [expectedErrorType, expectedStdout, onSubmit, selectedErrorType, typedStdout]);

  const giveUp = React.useCallback(() => {
    onSubmit({
      success: false,
      giveUp: true,
      summary: "You gave up :(",
    });
  }, [onSubmit]);

  const hintText = React.useMemo(() => {
    if (selectedErrorType !== "no-error") {
      return "Stdout input is disabled because you selected an error outcome.";
    }
    return "Type the exact stdout (spaces and line breaks matter). Tip: Ctrl/⌘ + Enter to submit.";
  }, [selectedErrorType]);

  const attemptsRemaining = React.useMemo(
    () => Math.max(0, (maxAttempts || 0) - currentAttempts),
    [maxAttempts, currentAttempts]
  );

  const feedback = React.useMemo(() => {
    if (!lastValidation || lastValidation.ok) return null;

    const primaryReason = lastValidation.reasons[0] ?? "Your answer does not match.";
    return {
      title: "Not quite",
      message:
        attemptsRemaining > 0
          ? `${primaryReason} Try again (${attemptsRemaining} attempt(s) left).`
          : primaryReason,
    };
  }, [attemptsRemaining, lastValidation]);

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
        {/* Attempt number */}
        {maxAttempts && maxAttempts > 1 && (
          <Badge className={cn(attemptsRemaining <= 1 && "text-amber-400 dark:text-amber-700")}>
            Attempt {(currentAttempts || 0) + 1}/{maxAttempts}
            <span className="text-muted-foreground">(left: {attemptsRemaining})</span>
          </Badge>
        )}
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
            const meta = ERROR_TYPE_META[key as ErrorType];
            const invalid =
              lastValidation != null &&
              selectedErrorType === (key as ErrorType) &&
              expectedErrorType !== (key as ErrorType);

            return (
              <FieldLabel
                key={key}
                htmlFor={key}
                className={cn(idx > 0 && "mt-2")}
                aria-invalid={invalid}
              >
                <Field orientation="horizontal">
                  <div
                    className={cn(
                      `text-muted-foreground bg-background/60 mt-0.5 flex h-9 w-9 items-center
                      justify-center rounded-md border`
                    )}
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
        {feedback && showOutputHints && (
          <Alert
            variant="destructive"
            className="border-red-500/30 bg-red-500/10"
          >
            <AlertCircleIcon />
            <AlertTitle>{feedback.title}</AlertTitle>
            <AlertDescription>{feedback.message}</AlertDescription>
          </Alert>
        )}
      </section>

      {/* Actions */}
      <div className="mt-1 flex items-center gap-3">
        <Button
          className={cn(
            `flex-1 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-400
            hover:dark:bg-emerald-500`
          )}
          onClick={submitAttempt}
          disabled={maxAttempts !== null && attemptsRemaining <= 0}
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
