"use client";

import * as React from "react";

import type { TrainingSession } from "@/lib/training/model";
import { loadStore, subscribeStore } from "@/lib/training/storage";

export function useTrainingSession(sessionId: string | null) {
  const [session, setSession] = React.useState<TrainingSession | null>(() => {
    if (!sessionId) return null;
    return loadStore().sessionsById[sessionId as string] ?? null;
  });

  React.useEffect(() => {
    if (!sessionId) {
      setSession(null);
      return;
    }

    const update = () => {
      const s = loadStore().sessionsById[sessionId as string] ?? null;
      setSession(s);
    };

    update();
    return subscribeStore(update);
  }, [sessionId]);

  return session;
}
