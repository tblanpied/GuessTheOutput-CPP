import problemIndex from "#data/problems.index.json";

import { cn } from "@/lib/utils";

import HomeSection, { ProblemIndexEntry } from "@/components/sections/home/HomeSection";

export default function Home() {
  return (
    <div
      className={cn(
        "flex min-h-[calc(100vh-48px)] flex-col items-center justify-center overflow-x-clip px-4"
      )}
    >
      <HomeSection problemIndex={problemIndex as ProblemIndexEntry[]} />
    </div>
  );
}
