import { TrainingConfig } from "@/lib/training/config";

import {
  SubmissionEvaluation,
  UserSubmission,
} from "@/components/sections/problem/ProblemWorkspace";

import { now } from "../utils";
import { TrainingSession, TrainingStore } from "./model";
import { loadStore, newId, updateStore } from "./storage";

function defaultScore() {
  return {
    solved: 0,
    failed: 0,
    attemptsTotal: 0,
    correctOnFirstTry: 0,
  };
}

function createProgress(problemCount: number) {
  const t = now();
  return {
    currentIndex: 0,
    attemptsOnCurrent: 0,
    score: defaultScore(),
    timers: {
      sessionSecondsRemaining: null,
      problemSecondsRemaining: null,
      sessionStartedAt: t,
      problemStartedAt: t,
      lastTickAt: t,
    },
    startedAt: t,
    updatedAt: t,
    ...(problemCount === 0 ? { finishedAt: t } : {}),
  };
}

function normalizeTitle(config: TrainingConfig) {
  const concepts = config.concepts?.length ? config.concepts.join(", ") : "Any concepts";
  return `Training (${config.difficultyMin}-${config.difficultyMax}) • ${concepts}`;
}

export function ensureSessionExists(store: TrainingStore, id: string): TrainingSession {
  const s = store.sessionsById[id as string];
  if (!s) throw new Error(`Training session not found: ${id}`);
  return s;
}

export function listTrainingSessions(): TrainingSession[] {
  const store = loadStore();
  return Object.values(store.sessionsById).sort(
    (a, b) => b.meta.lastOpenedAt - a.meta.lastOpenedAt
  );
}

export function getTrainingSession(id: string): TrainingSession | null {
  const store = loadStore();
  return store.sessionsById[id as string] ?? null;
}

export function getActiveTrainingSessionId(): string | null {
  return loadStore().activeSessionId;
}

export function getActiveTrainingSession(): TrainingSession | null {
  const store = loadStore();
  if (!store.activeSessionId) return null;
  return store.sessionsById[store.activeSessionId] ?? null;
}

export function setActiveTrainingSession(id: string | null): void {
  updateStore((store) => {
    if (id && !store.sessionsById[id as string]) {
      throw new Error(`Cannot activate unknown session: ${id}`);
    } else if (id && store.sessionsById[id as string].meta.status === "completed") {
      return store;
    }
    return { ...store, activeSessionId: id };
  });
}

export function createTrainingSession(params: {
  title?: string;
  config: TrainingConfig;
  problemIds: string[];
  activate?: boolean;
}): string {
  const id = newId("ts");
  const t = now();

  updateStore((store) => {
    const session: TrainingSession = {
      meta: {
        id,
        title: params.title?.trim() || normalizeTitle(params.config),
        createdAt: t,
        lastOpenedAt: t,
        status: "active",
      },
      config: params.config,
      problemIds: params.problemIds,
      progress: createProgress(params.problemIds.length),
      summary: {
        difficultyMin: params.config.difficultyMin,
        difficultyMax: params.config.difficultyMax,
        concepts: params.config.concepts ?? [],
        problemsPerSession: params.config.problemsPerSession,
      },
    };
    // Initialize timers
    session.progress.timers.problemSecondsRemaining = params.config.problemTimer;
    session.progress.timers.sessionSecondsRemaining = params.config.sessionTimer;

    return {
      ...store,
      activeSessionId: params.activate === false ? store.activeSessionId : id,
      sessionsById: { ...store.sessionsById, [id]: session },
    };
  });

  return id;
}

export function deleteTrainingSession(id: string): void {
  updateStore((store) => {
    if (!(id in store.sessionsById)) return store;

    const sessionsById = { ...store.sessionsById };
    delete sessionsById[id as string];

    return {
      ...store,
      activeSessionId: store.activeSessionId === id ? null : store.activeSessionId,
      sessionsById,
    };
  });
}

export function markSessionCompleted(id: string): void {
  updateStore((store) => {
    const s = ensureSessionExists(store, id);
    const t = now();

    const next: TrainingSession = {
      ...s,
      meta: { ...s.meta, status: "completed", lastOpenedAt: t },
      progress: { ...s.progress, updatedAt: t, finishedAt: s.progress.finishedAt ?? t },
    };

    return { ...store, sessionsById: { ...store.sessionsById, [id]: next } };
  });
}

export function resumeTrainingSession(id: string): void {
  updateStore((store) => {
    const s = ensureSessionExists(store, id);

    if (s.meta.status === "completed") return store;

    const t = now();

    const next: TrainingSession = {
      ...s,
      meta: { ...s.meta, status: "active", lastOpenedAt: t },
      progress: {
        ...s.progress,
        updatedAt: t,
        timers: {
          ...s.progress.timers,
          // prevent "catch-up" when the session was closed.
          lastTickAt: t,
        },
      },
    };

    return {
      ...store,
      activeSessionId: id,
      sessionsById: { ...store.sessionsById, [id]: next },
    };
  });
}

export function recordAttempt(
  sessionId: string,
  evaluation: SubmissionEvaluation,
  submission?: UserSubmission
): {
  finishedProblem: boolean;
  finishedSession: boolean;
} {
  let finishedProblem = false;
  let finishedSession = false;

  updateStore((store) => {
    const s = ensureSessionExists(store, sessionId);
    const t = now();

    const currentIndex = s.progress.currentIndex;
    const atLastProblem = currentIndex >= s.problemIds.length - 1;

    const attemptsOnCurrent = s.progress.attemptsOnCurrent + 1;
    const attemptsTotal = s.progress.score.attemptsTotal + 1;

    const score = { ...s.progress.score, attemptsTotal };

    if (evaluation.success) {
      finishedProblem = true;
      score.solved += 1;
      if (attemptsOnCurrent === 1) score.correctOnFirstTry += 1;
    } else if (
      attemptsOnCurrent >= (s.config.maxAttemptsPerProblem || Infinity) ||
      evaluation.giveUp
    ) {
      finishedProblem = true;
      score.failed += 1;
    }

    const progress = {
      ...s.progress,
      updatedAt: t,
      attemptsOnCurrent,
      score,
      lastAnswer: {
        ...evaluation,
        submission: submission ?? evaluation.submission,
      },
      timers: {
        ...s.progress.timers,
        problemSecondsRemaining: s.config.problemTimer,
        lastTickAt: null,
      },
    };

    // If solved, auto-advance (parent can still decide navigation).
    let nextSession: TrainingSession = { ...s, progress };

    if (finishedProblem) {
      if (atLastProblem) {
        finishedSession = true;
        nextSession = {
          ...nextSession,
          meta: { ...nextSession.meta, status: "completed", lastOpenedAt: t },
          progress: { ...nextSession.progress, finishedAt: t, currentIndex: s.problemIds.length },
        };
      } else {
        nextSession = {
          ...nextSession,
          meta: { ...nextSession.meta, lastOpenedAt: t },
          progress: {
            ...nextSession.progress,
            currentIndex: currentIndex + 1,
            attemptsOnCurrent: 0,
          },
        };
      }
    }

    return {
      ...store,
      sessionsById: { ...store.sessionsById, [sessionId]: nextSession },
    };
  });

  return { finishedProblem, finishedSession };
}

export function retryLastProblem(sessionId: string): string | null {
  let targetProblemId: string | null = null;

  updateStore((store) => {
    const s = ensureSessionExists(store, sessionId);
    const t = now();

    const currentIndex = s.progress.currentIndex;
    if (currentIndex <= 0) return store;

    const lastSuccess = s.progress.lastAnswer?.success ?? false;

    // Rewind by one
    const nextIndex = currentIndex - 1;

    // Undo the last completion accounting (best-effort, clamped)
    const prevSolved = s.progress.score.solved;
    const prevFailed = s.progress.score.failed;

    const solved = Math.max(0, prevSolved - (lastSuccess ? 1 : 0));
    const failed = Math.max(0, prevFailed - (lastSuccess ? 0 : 1));

    const nextSession: TrainingSession = {
      ...s,
      meta: { ...s.meta, status: "active", lastOpenedAt: t },
      progress: {
        ...s.progress,
        updatedAt: t,
        currentIndex: nextIndex,
        attemptsOnCurrent: 0,
        lastAnswer: undefined,
        score: {
          ...s.progress.score,
          solved,
          failed,
        },
        timers: {
          ...s.progress.timers,
          problemSecondsRemaining: s.config.problemTimer,
          lastTickAt: null,
        },
      },
    };

    if (nextIndex >= 0 && nextIndex < nextSession.problemIds.length) {
      targetProblemId = nextSession.problemIds[nextIndex as number];
    }

    return {
      ...store,
      sessionsById: { ...store.sessionsById, [sessionId]: nextSession },
    };
  });

  return targetProblemId;
}

/* READ-ONLY FUNCTIONS */

export type SessionSource = string | TrainingSession | null;

function resolveSession(source: SessionSource): TrainingSession | null {
  return typeof source === "string" ? getTrainingSession(source) : source;
}

export function getCurrentProblemId(source: SessionSource): string | null {
  const s = resolveSession(source);
  if (!s || (s && s.meta.status === "completed")) return null;
  return s.problemIds[s.progress.currentIndex] ?? null;
}

export function getNextProblemId(source: SessionSource): string | null {
  const s = resolveSession(source);
  if (!s) return null;

  const nextIndex = s.progress.currentIndex + 1;
  if (nextIndex >= s.problemIds.length) return null;

  return s.problemIds[nextIndex as number] ?? null;
}

export function getSessionCounts(source: SessionSource) {
  const s = resolveSession(source);
  if (!s) return { total: 0, index: 0, current: 0, remaining: 0 };

  const total = s.problemIds.length;
  const index = s.progress.currentIndex;
  const current = total === 0 ? 0 : Math.min(total, index + 1);
  const remaining = Math.max(0, total - index);
  return { total, index, current, remaining };
}

export function getDifficultyRange(source: SessionSource): string {
  const s = resolveSession(source);
  if (!s) return "—";

  const min = s.summary?.difficultyMin ?? s.config.difficultyMin;
  const max = s.summary?.difficultyMax ?? s.config.difficultyMax;
  return `${min}-${max}`;
}

export function getConcepts(source: SessionSource): string[] {
  const s = resolveSession(source);
  if (!s) return [];
  return s.summary?.concepts ?? s.config.concepts ?? [];
}
