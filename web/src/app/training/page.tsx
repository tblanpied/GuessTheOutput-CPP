import problems from "#data/problems.generated.json";

import { ProblemData } from "@/lib/problems";

import CodeHighlight from "@/components/sections/problem/CodeHighlight";
import ProblemWorkspace, { ProblemsById } from "@/components/sections/problem/ProblemWorkspace";

function generateProblemsById(problems: ProblemData[]): ProblemsById {
  const map: ProblemsById = {};
  for (const problem of problems) {
    map[problem.id] = {
      ...problem,
      codeBlock: <CodeHighlight code={problem.code} />,
    };
  }
  return map;
}

export default function TrainingPage() {
  const problemsById = generateProblemsById(problems as ProblemData[]);

  return (
    <main
      className="flex min-h-[calc(100vh-48px)] flex-col items-center justify-start overflow-x-clip"
    >
      <ProblemWorkspace problemsById={problemsById} />
    </main>
  );
}
