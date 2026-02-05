"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { cn, intersects } from "@/lib/utils";
import type { ProblemDifficulty } from "@/lib/problems";
import { createTrainingSession, getCurrentProblemId } from "@/lib/training";
import { type TrainingConfig, defaultTrainingConfig } from "@/lib/training/config";

import { TrainingPresetPanel } from "./TrainingPresetPanel";
import { TrainingSessionsPanel } from "./TrainingSessionsPanel";

export type ProblemIndexEntry = {
  id: string;
  difficulty: ProblemDifficulty;
  concepts: string[];
};

interface HomeSectionProps {
  /**
   * Build-time data: small index of problems used to create subsets fast.
   * Provided by importing a generated JSON.
   */
  problemIndex: ProblemIndexEntry[];
}

function buildSubsetIds(index: ProblemIndexEntry[], config: TrainingConfig): string[] {
  const filtered = index.filter((p) => {
    const diffOk = p.difficulty >= config.difficultyMin && p.difficulty <= config.difficultyMax;
    const conceptOk = intersects(config.concepts ?? [], p.concepts ?? []);
    return diffOk && conceptOk;
  });

  // eslint-disable-next-line sonarjs/pseudo-random
  filtered.sort(() => Math.random() - 0.5);

  // Limit size
  const limit = config.problemsPerSession ?? null;
  let sliced = filtered;
  if (limit != null) sliced = filtered.slice(0, Math.max(0, limit));

  if (config.problemOrder === "random") {
    // eslint-disable-next-line sonarjs/pseudo-random
    sliced.sort(() => Math.random() - 0.5);
  } else if (config.problemOrder === "progressive") {
    sliced.sort((a, b) => a.difficulty - b.difficulty);
  }

  return sliced.map((p) => p.id);
}

export default function HomeSection({ problemIndex }: HomeSectionProps) {
  const router = useRouter();

  const concepts = Array.from(
    new Set(
      problemIndex.reduce((prev, curr) => {
        return { concepts: [...prev.concepts, ...curr.concepts] } as ProblemIndexEntry;
      }).concepts
    )
  );

  const startNewSession = React.useCallback(
    (config: TrainingConfig) => {
      const subsetIds = buildSubsetIds(problemIndex, config);

      if (subsetIds.length === 0) return;

      const sessionId = createTrainingSession({
        config,
        problemIds: subsetIds,
        activate: true,
        title: "Training session",
      });

      const firstId = getCurrentProblemId(sessionId);

      if (firstId) router.push(`/problems/${firstId}`);
    },
    [problemIndex, router]
  );

  return (
    <section
      className={
        "home-section flex min-h-[calc(100vh-48px)] flex-col items-center justify-center py-10"
      }
    >
      <h1
        className={cn(
          `font-title mb-8 bg-linear-to-r from-blue-500 via-emerald-500 to-amber-500 bg-clip-text
          text-center text-3xl font-bold text-transparent sm:text-4xl md:text-5xl`
        )}
      >
        Guess the Output C++
      </h1>

      <p className="text-muted-foreground mb-8 max-w-xl text-justify text-sm sm:text-lg md:text-xl">
        Practice C++ the practical way: guess the output, spot errors, and build intuition for
        tricky language rules.
      </p>

      <div className="w-full max-w-3xl space-y-6">
        <TrainingPresetPanel
          defaultConfig={defaultTrainingConfig}
          availableConcepts={concepts}
          onStart={startNewSession}
        />

        <TrainingSessionsPanel />
      </div>
    </section>
  );
}
