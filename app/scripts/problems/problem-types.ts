
export interface ProblemsPageProblem{
    slug: string;
    title : string;
    number: string;
    topic : string;
    tags: string[];
    difficulty: string;
    solved : boolean;
    acceptance:number;
}

export const DIFFICULTIES = [
  "Super Easy",
  "Easy",
  "Medium",
  "Hard",
  "Super Hard",
] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];