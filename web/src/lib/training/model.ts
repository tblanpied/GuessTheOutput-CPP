import { TrainingConfig } from "@/lib/training/config";

import { SubmissionEvaluation } from "@/components/sections/problem/ProblemWorkspace";

export const TRAINING_CONFIG_VERSION = 1;

export type SessionStatus = "active" | "completed";

export type TrainingScore = {
  solved: number;
  failed: number; // problems failed due to give-up or max-attempts reached
  attemptsTotal: number; // total submissions across all problems
  correctOnFirstTry: number;
};

export type TrainingTimerState = {
  // Remaining seconds (optional because the config can disable timers)
  sessionSecondsRemaining: number | null;
  problemSecondsRemaining: number | null;

  // Timestamps (ms)
  sessionStartedAt?: number | null;
  problemStartedAt?: number | null;

  // Last tick bookkeeping
  lastTickAt?: number | null;
};

export type TrainingProgress = {
  currentIndex: number; // index in problemIds
  attemptsOnCurrent: number; // submissions on the current problem
  lastAnswer?: SubmissionEvaluation;

  score: TrainingScore;
  timers: TrainingTimerState;

  startedAt: number; // ms
  updatedAt: number; // ms
  finishedAt?: number; // ms
};

export type TrainingSessionMeta = {
  id: string;
  title: string; // shown on home page
  createdAt: number; // ms
  lastOpenedAt: number; // ms
  status: SessionStatus;
};

export type TrainingSession = {
  meta: TrainingSessionMeta;

  config: TrainingConfig;

  /**
   * The concrete subset this session will run through.
   * This is what makes sessions resumable even if the global problem set changes later.
   */
  problemIds: string[];

  progress: TrainingProgress;

  /**
   * Optional snapshot so the Home page can show what the session is about.
   * (Avoid storing huge data here.)
   */
  summary?: {
    difficultyMin: TrainingConfig["difficultyMin"];
    difficultyMax: TrainingConfig["difficultyMax"];
    concepts: string[];
    problemsPerSession: number | null;
  };
};

export type TrainingStore = {
  version: typeof TRAINING_CONFIG_VERSION;
  activeSessionId: string | null;
  sessionsById: Record<string, TrainingSession>;
};
