
export interface ProblemsPageProblem{
    slug: string;
    title : string;
    number: string;
    topic : Record<string, string> | string;
    tags: string[];
}