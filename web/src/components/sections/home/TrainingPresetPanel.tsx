"use client";

import { useState } from "react";

import { InfinityIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  PROBLEM_MAX_DIFFICULTY,
  PROBLEM_MIN_DIFFICULTY,
  ProblemOrder,
  ProblemTimer,
  SessionTimer,
  TrainingConfig,
  clampDifficulty,
  presets,
} from "@/lib/training/config";

import { Separator } from "@/components/ui/utils";
import {
  Badge,
  Label,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/data_display";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/surfaces/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/surfaces";
import {
  Button,
  MultiSelectCombobox,
  NumericStepper,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Switch,
} from "@/components/ui/inputs";

type TrainingPresetPanelProps = {
  availableConcepts?: string[];
  defaultConfig?: Partial<TrainingConfig>;
  onStart?: (config: TrainingConfig) => void;
};

export function TrainingPresetPanel({
  availableConcepts = [],
  defaultConfig,
  onStart,
}: TrainingPresetPanelProps) {
  // Core
  const [difficultyRange, setDifficultyRange] = useState<[number, number]>([
    defaultConfig?.difficultyMin ?? PROBLEM_MIN_DIFFICULTY,
    defaultConfig?.difficultyMax ?? PROBLEM_MAX_DIFFICULTY,
  ]);

  const [attemptsInfinite, setAttemptsInfinite] = useState(
    defaultConfig?.maxAttemptsPerProblem === null ? true : false
  );
  const [maxAttempts, setMaxAttempts] = useState<number>(defaultConfig?.maxAttemptsPerProblem ?? 1);

  const [concepts, setConcepts] = useState<string[]>(defaultConfig?.concepts ?? []);

  // Gameplay
  const [endless, setEndless] = useState(defaultConfig?.problemsPerSession === null ? true : false);
  const [problemsPerSession, setProblemsPerSession] = useState<number>(
    defaultConfig?.problemsPerSession ?? 10
  );

  const [problemTimer, setProblemTimer] = useState<ProblemTimer>(
    defaultConfig?.problemTimer ?? null
  );
  const [sessionTimer, setSessionTimer] = useState<SessionTimer>(
    defaultConfig?.sessionTimer ?? null
  );

  const [problemOrder, setProblemOrder] = useState<ProblemOrder>(
    defaultConfig?.problemOrder ?? "random"
  );
  const [showDiff, setShowDiff] = useState<boolean>(defaultConfig?.showOutputDifference ?? true);

  const difficultyMin = clampDifficulty(Math.min(difficultyRange[0], difficultyRange[1]));
  const difficultyMax = clampDifficulty(Math.max(difficultyRange[0], difficultyRange[1]));

  const applyDifficultyPreset = (preset: Partial<TrainingConfig>) => {
    const hasMin = preset.difficultyMin !== undefined;
    const hasMax = preset.difficultyMax !== undefined;
    if (!hasMin && !hasMax) return;

    setDifficultyRange([
      preset.difficultyMin ?? difficultyMin,
      preset.difficultyMax ?? difficultyMax,
    ]);
  };

  const applyAttemptsPreset = (preset: Partial<TrainingConfig>) => {
    if (preset.maxAttemptsPerProblem === undefined) return;

    setAttemptsInfinite(preset.maxAttemptsPerProblem === null);
    if (preset.maxAttemptsPerProblem !== null) setMaxAttempts(preset.maxAttemptsPerProblem);
  };

  const applyConceptsPreset = (preset: Partial<TrainingConfig>) => {
    if (preset.concepts !== undefined) setConcepts(preset.concepts);
  };

  const applySessionSizePreset = (preset: Partial<TrainingConfig>) => {
    if (preset.problemsPerSession === undefined) return;

    setEndless(preset.problemsPerSession === null);
    if (preset.problemsPerSession !== null) setProblemsPerSession(preset.problemsPerSession);
  };

  const applyTimersPreset = (preset: Partial<TrainingConfig>) => {
    if (preset.problemTimer !== undefined) {
      setProblemTimer(preset.problemTimer);
      if (preset.problemTimer !== null) setSessionTimer(null);
    }

    if (preset.sessionTimer !== undefined) {
      setSessionTimer(preset.sessionTimer);
      if (preset.sessionTimer !== null) setProblemTimer(null);
    }
  };

  const applyMiscPreset = (preset: Partial<TrainingConfig>) => {
    if (preset.problemOrder !== undefined) setProblemOrder(preset.problemOrder);
    if (preset.showOutputDifference !== undefined) setShowDiff(preset.showOutputDifference);
  };

  const applyPreset = (preset: Partial<TrainingConfig>) => {
    applyDifficultyPreset(preset);
    applyAttemptsPreset(preset);
    applyConceptsPreset(preset);
    applySessionSizePreset(preset);
    applyTimersPreset(preset);
    applyMiscPreset(preset);
  };

  const buildConfig = (): TrainingConfig => ({
    difficultyMin,
    difficultyMax,
    maxAttemptsPerProblem: attemptsInfinite ? null : maxAttempts,
    concepts,
    problemsPerSession: endless ? null : problemsPerSession,
    problemTimer,
    sessionTimer,
    problemOrder,
    showOutputDifference: showDiff,
  });

  const start = () => {
    const config = buildConfig();
    onStart?.(config);
  };

  return (
    <Card>
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">Training setup</CardTitle>

        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <Tooltip key={p.label}>
              <TooltipTrigger asChild>
                <Button
                  key={p.label}
                  type="button"
                  variant="secondary"
                  onClick={() => applyPreset(p.config)}
                  className="h-9"
                >
                  {p.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{p.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <p className="text-muted-foreground text-sm">
          Choose a quick preset or customize your session below.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic options */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-end justify-between gap-3">
              <Label>Difficulty range</Label>
              <span className="text-muted-foreground text-sm">
                {difficultyMin} → {difficultyMax}
              </span>
            </div>

            <Slider
              value={difficultyRange}
              onValueChange={(v) => setDifficultyRange([v[0] ?? 1, v[1] ?? 5])}
              min={1}
              max={5}
              step={1}
              minStepsBetweenThumbs={0}
            />

            <p className="text-muted-foreground text-xs">
              Tip: keep this narrow while you learn a concept, widen it when you want variety.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <Label>Problems per session</Label>
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground text-sm">Endless</Label>
                <Switch
                  checked={endless}
                  onCheckedChange={setEndless}
                />
              </div>
            </div>

            <NumericStepper
              value={problemsPerSession}
              onChange={setProblemsPerSession}
              min={1}
              max={200}
              step={1}
              disabled={endless}
              ariaLabel="Problems per session"
            />

            <p className="text-muted-foreground text-xs">
              Endless mode keeps generating problems until you stop.
            </p>
          </div>
        </div>

        <Separator />

        {/* Advanced section */}
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem
            value="advanced"
            className="border-b-0"
          >
            <AccordionTrigger className="hover:bg-muted px-2">Advanced</AccordionTrigger>
            <AccordionContent className="space-y-6 pt-2">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Max attempts */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <Label>Max attempts per problem</Label>
                    <div className="flex items-center gap-2">
                      <InfinityIcon
                        className={cn("h-4 w-4", attemptsInfinite ? "opacity-100" : "opacity-40")}
                      />
                      <Label className="text-muted-foreground text-sm">Infinite</Label>
                      <Switch
                        checked={attemptsInfinite}
                        onCheckedChange={(v) => setAttemptsInfinite(v)}
                      />
                    </div>
                  </div>

                  <NumericStepper
                    value={maxAttempts}
                    onChange={setMaxAttempts}
                    min={1}
                    max={20}
                    step={1}
                    disabled={attemptsInfinite}
                    ariaLabel="Max attempts per problem"
                  />

                  <p className="text-muted-foreground text-xs">
                    Fewer attempts increases challenge; infinite attempts is best for learning mode.
                  </p>
                </div>

                {/* Concepts */}
                <div className="space-y-2">
                  <Label>Concepts to train</Label>
                  <MultiSelectCombobox
                    selected={concepts}
                    options={availableConcepts}
                    onChange={setConcepts}
                    placeholder="All concepts (no filter)"
                  />
                  <p className="text-muted-foreground text-xs">Leave empty to mix everything.</p>
                </div>

                {/* Time controls */}
                {/* Problem timer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label>Problem timer</Label>
                    <Switch
                      checked={problemTimer !== null}
                      onCheckedChange={(checked) => {
                        setProblemTimer(checked ? 0 : null);
                        if (checked) {
                          setSessionTimer(null);
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <NumericStepper
                      value={problemTimer || 0}
                      onChange={(v) => setProblemTimer(v)}
                      min={0}
                      max={600}
                      step={10}
                      disabled={problemTimer === null}
                    />
                    <span className="text-muted-foreground text-sm">seconds</span>
                  </div>

                  <p className="text-muted-foreground text-xs">
                    When enabled, the whole-session timer is automatically turned off.
                  </p>
                </div>

                {/* Whole-session timer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label>Whole-session timer</Label>
                    <Switch
                      checked={sessionTimer !== null}
                      onCheckedChange={(checked) => {
                        setSessionTimer(checked ? 0 : null);
                        if (checked) {
                          setProblemTimer(null);
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <NumericStepper
                      value={sessionTimer || 0}
                      onChange={(v) => setSessionTimer(v)}
                      min={0}
                      max={3600}
                      step={30}
                      disabled={sessionTimer === null}
                    />
                    <span className="text-muted-foreground text-sm">seconds</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    When enabled, the problem timer is automatically turned off.
                  </p>
                </div>

                {/* Order */}
                <div className="space-y-2">
                  <Label>Problem order</Label>
                  <RadioGroup
                    value={problemOrder}
                    onValueChange={(v) => setProblemOrder(v as ProblemOrder)}
                    className="grid gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="random"
                        id="order-random"
                      />
                      <Label
                        htmlFor="order-random"
                        className="cursor-pointer"
                      >
                        Randomize problems
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="progressive"
                        id="order-progressive"
                      />
                      <Label
                        htmlFor="order-progressive"
                        className="cursor-pointer"
                      >
                        Progressive difficulty
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="text-muted-foreground text-xs">
                    Progressive mode ramps difficulty as you answer correctly.
                  </p>
                </div>

                {/* Output diff */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <Label>Show output difference</Label>
                    <Switch
                      checked={showDiff}
                      onCheckedChange={setShowDiff}
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Highlights incorrect characters (red/green) when your output is close.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-3">
        <div className="text-muted-foreground text-sm">
          Ready when you are.
          <span className="ml-2">
            <Badge variant="outline">
              Difficulty {difficultyMin}-{difficultyMax}
            </Badge>
          </span>
        </div>

        <Button
          type="button"
          onClick={start}
          className="w-full sm:w-auto"
        >
          Start training
        </Button>
      </CardFooter>
    </Card>
  );
}
