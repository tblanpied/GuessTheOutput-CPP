export const PROBLEM_MIN_DIFFICULTY = 1;
export const PROBLEM_MAX_DIFFICULTY = 5;
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export function clampDifficulty(n: number): Difficulty {
  const v = Math.min(5, Math.max(1, Math.round(n)));
  return v as Difficulty;
}

export type ProblemTimer = number | null;
export type SessionTimer = number | null;
export type ProblemOrder = "random" | "progressive";

export type TrainingConfig = {
  difficultyMin: Difficulty;
  difficultyMax: Difficulty;

  maxAttemptsPerProblem: number | null; // null = infinite
  concepts: string[];

  problemsPerSession: number | null; // null = endless

  problemTimer: ProblemTimer; // mutually exclusive with sessionTimer
  sessionTimer: SessionTimer;

  problemOrder: ProblemOrder;
  showOutputDifference: boolean;
};

export const defaultTrainingConfig: TrainingConfig = {
  difficultyMin: 1,
  difficultyMax: 5,
  maxAttemptsPerProblem: 3,
  concepts: [],
  problemsPerSession: null,
  problemTimer: null,
  sessionTimer: null,
  problemOrder: "random",
  showOutputDifference: true,
};

export const presets: Array<{
  label: string;
  description: string;
  config: Partial<TrainingConfig>;
}> = [
  {
    label: "Default",
    description: "Balanced mix for steady progress.",
    config: defaultTrainingConfig,
  },
  {
    label: "Warm-up",
    description: "Short, forgiving session.",
    config: {
      difficultyMin: 1,
      difficultyMax: 3,
      problemsPerSession: 10,
      maxAttemptsPerProblem: 3,
      problemTimer: null,
      sessionTimer: null,
      problemOrder: "random",
      showOutputDifference: true,
      concepts: [],
    },
  },
  {
    label: "Timed Sprint",
    description: "Fast decisions, sharp feedback.",
    config: {
      difficultyMin: 2,
      difficultyMax: 4,
      problemsPerSession: 15,
      maxAttemptsPerProblem: 1,
      problemTimer: 60,
      sessionTimer: null,
      problemOrder: "random",
      showOutputDifference: true,
    },
  },
  {
    label: "Progressive",
    description: "Ramps difficulty as you succeed.",
    config: {
      difficultyMin: 1,
      difficultyMax: 5,
      problemsPerSession: 20,
      maxAttemptsPerProblem: 2,
      problemTimer: null,
      sessionTimer: null,
      problemOrder: "progressive",
      showOutputDifference: true,
    },
  },
  {
    label: "Endless",
    description: "Keep going until you stop.",
    config: {
      problemsPerSession: null,
      maxAttemptsPerProblem: null,
      problemTimer: null,
      sessionTimer: null,
      problemOrder: "random",
      showOutputDifference: true,
    },
  },
];
