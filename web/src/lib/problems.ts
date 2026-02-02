import path from "path";
import { promises as fs } from "fs";

export type ErrorType = "no-error" | "runtime-error" | "compilation-error" | "undefined-behavior";

export type ErrorMessageColor = "default" | "red" | "yellow" | "cyan" | "green";

export type ErrorMessageStyle = "normal" | "bold" | "italic";

type ErrorMessagePart = {
  color: ErrorMessageColor;
  style: ErrorMessageStyle;
  text: string;
};

export type ErrorMessage = ErrorMessagePart[];

export type ProblemResult = {
  errorType: ErrorType;
  stdout?: string;
  errorMessage?: ErrorMessage;
};

export type ProblemDifficulty = 1 | 2 | 3 | 4 | 5;

export type ProblemData = {
  id: string;
  code: string;
  title: string;
  difficulty: ProblemDifficulty;
  concepts: string[];
  explanation: string;
  stdin?: string;
  result: ProblemResult;
};

export async function loadProblems(): Promise<ProblemData[]> {
  const filePath = path.join(process.cwd(), "..", "data", "problems.generated.json");
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as ProblemData[];
}

let problemsByIdPromise: Promise<Map<string, ProblemData>> | null = null;

export function loadProblemsById() {
  if (!problemsByIdPromise) {
    problemsByIdPromise = loadProblems().then((arr) => new Map(arr.map((p) => [p.id, p])));
  }
  return problemsByIdPromise;
}

export async function getProblem(id: string) {
  const map = await loadProblemsById();
  return map.get(id);
}
