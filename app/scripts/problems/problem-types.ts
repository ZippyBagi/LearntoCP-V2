export interface ProblemsPageProblem{
    slug: string;
    title : string;
    number: string;
    topic : string;
    tags: string[];
    difficulty: string;
    solved : boolean;
    acceptance:number | null | undefined;
}

export const DIFFICULTIES = [
	"Super Easy",
	"Easy",
	"Medium",
	"Hard",
	"Super Hard",
] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

export interface AcceptanceStat {
	accepted: number;
	total: number;
	rate: number | null;
}

export interface Problem{
	title: string;
	timeLimit? : string;
	memoryLimit? : string;
	difficulty : Difficulty;
	number : number;
	tags: string[];
	inputSource? : string;
	outputSource? : string;
	note? : string;
}

export interface Testcase {
	name: string;
	input: string;
	expectedOutput: string;
}