import { notFound } from "next/navigation";

import { getProblem, loadProblemsById } from "@/lib/problems";

import CodeHighlight from "@/components/sections/problem/CodeHighlight";
import ProblemInterface from "@/components/sections/problem/ProblemInterface";

export const dynamicParams = false; // only the IDs we generate exist

export async function generateStaticParams() {
  const problems = await loadProblemsById();
  return Array.from(problems.keys()).map((id) => ({ id }));
}

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const problem = await getProblem(id);

  if (!problem) notFound();

  return (
    <main
      className="flex min-h-[calc(100vh-48px)] flex-col items-center justify-start overflow-x-clip"
    >
      <ProblemInterface
        code={<CodeHighlight code={problem.code} />}
        problem={problem}
      />
    </main>
  );
}
