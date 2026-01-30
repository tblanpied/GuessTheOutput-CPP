export type Difficulty = 1 | 2 | 3 | 4 | 5;

export function clampDifficulty(n: number): Difficulty {
  const v = Math.min(5, Math.max(1, Math.round(n)));
  return v as Difficulty;
}

export type ProblemTimer = "off" | "30s" | "60s" | "120s";
export type SessionTimer = "off" | "10m" | "20m";
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
  problemTimer: "off",
  sessionTimer: "off",
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
      problemTimer: "off",
      sessionTimer: "off",
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
      problemTimer: "60s",
      sessionTimer: "off",
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
      problemTimer: "off",
      sessionTimer: "off",
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
      problemTimer: "off",
      sessionTimer: "off",
      problemOrder: "random",
      showOutputDifference: true,
    },
  },
];
