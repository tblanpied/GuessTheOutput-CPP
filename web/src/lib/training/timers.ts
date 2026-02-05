import { updateStore } from "./storage";
import type { TrainingSession } from "./model";
import { clampNonNegative, now } from "../utils";
import { ensureSessionExists } from "./sessions";

export type TimerKind = "session" | "problem";

export type UpdateTimersResult = {
  session: TrainingSession | null;
  expired: boolean;
  expiredKind: TimerKind | null;
};

/**
 * Decreases the active timer (session or problem) based on elapsed real time since lastTickAt.
 * Returns whether a timer reached 0 during this call.
 */
export function updateTrainingSessionTimers(sessionId: string): UpdateTimersResult {
  const result: UpdateTimersResult = { session: null, expired: false, expiredKind: null };

  updateStore((store) => {
    const session = ensureSessionExists(store, sessionId);

    // Do not tick finished sessions.
    if (session.meta.status === "completed") {
      result.session = session;
      return store;
    }

    const t = now();
    const prevLast = session.progress.timers.lastTickAt ?? t;

    const deltaMs = t - prevLast;
    const deltaSeconds = Math.floor(deltaMs / 1000);

    // If < 1 second passed, don't touch lastTickAt (keep remainder accumulating).
    if (deltaSeconds <= 0 && session.progress.timers.lastTickAt) {
      result.session = session;
      return store;
    }

    // Consume only the full seconds, keep the leftover ms by not snapping to `t`.
    let nextTimers = {
      ...session.progress.timers,
      lastTickAt: prevLast + deltaSeconds * 1000,
    };

    const hasSessionTimer = typeof nextTimers.sessionSecondsRemaining === "number";
    const hasProblemTimer = typeof nextTimers.problemSecondsRemaining === "number";

    // Mutually exclusive in your config, but we guard anyway.
    if (hasSessionTimer) {
      const next = clampNonNegative((nextTimers.sessionSecondsRemaining as number) - deltaSeconds);
      if (nextTimers.sessionSecondsRemaining !== next) {
        nextTimers = { ...nextTimers, sessionSecondsRemaining: next };
      }
      if (next === 0) {
        result.expired = true;
        result.expiredKind = "session";
      }
    } else if (hasProblemTimer) {
      const next = clampNonNegative((nextTimers.problemSecondsRemaining as number) - deltaSeconds);
      if (nextTimers.problemSecondsRemaining !== next) {
        nextTimers = { ...nextTimers, problemSecondsRemaining: next };
      }
      if (next === 0) {
        result.expired = true;
        result.expiredKind = "problem";
      }
    }

    const nextSession: TrainingSession = {
      ...session,
      meta: { ...session.meta, lastOpenedAt: t },
      progress: { ...session.progress, updatedAt: t, timers: nextTimers },
    };

    result.session = nextSession;

    return {
      ...store,
      sessionsById: { ...store.sessionsById, [sessionId]: nextSession },
    };
  });

  return result;
}
