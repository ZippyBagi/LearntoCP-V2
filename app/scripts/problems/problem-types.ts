
export interface ProblemsPageProblem{
    slug: string;
    title : string;
    number: string;
    topic : Record<string, string> | string;
    tags: string[];
    difficulty: string;
}

export const DIFFICULTIES = [
  "Super Easy",
  "Easy",
  "Medium",
  "Hard",
  "Super Hard",
] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];