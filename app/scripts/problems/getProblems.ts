import "server-only"

import path from "path";
import { AcceptanceStat, Problem, ProblemsPageProblem, Difficulty, DIFFICULTIES, Testcase } from "./problem-types";
import { cache } from "react";
import fs from 'fs';

const PROBLEMS_ROOT = path.join(process.cwd(), "content", "problems");

const DEFAULT_TIME_LIMIT_S = 2.0;
const DEFAULT_MEMORY_LIMIT_KB = 262144;

export function getProblemSlugs() : string[] {

    const problems = fs.readdirSync(PROBLEMS_ROOT, {withFileTypes:true}).filter((entry) => entry.isDirectory())
                                                                              .filter((entry) => (fs.existsSync(path.join(PROBLEMS_ROOT, entry.name, "problem.json"))))
                                                                              .map((entry) => entry.name)
                                                                              .sort();

    return problems;
}

export const getProblemsPageProblems = cache((locale : string, solved : Set<string>, problems : string[], acceptance : Map<string,AcceptanceStat>) : ProblemsPageProblem[] => {
   
    if(!fs.existsSync(PROBLEMS_ROOT)){
        return [];
    }

    let problemsPageProblems : ProblemsPageProblem[] = [];                                                                             

    for(const problem of problems){

        const meta = JSON.parse(fs.readFileSync(path.join(PROBLEMS_ROOT, problem, "problem.json"),"utf-8"));

        const topic = meta.topic[locale];
        const title = meta.title[locale];

        const difficulty = meta.difficulty as Difficulty;
        
        if(!DIFFICULTIES.includes(difficulty)){
            console.error(`[getProblems] Problem ${PROBLEMS_ROOT + '/' + problem} doesn't have correct difficulty`);
        }

        const rate = acceptance.get(problem)?.rate;
        problemsPageProblems.push({slug:problem, title:title, number:meta.number, topic:topic, tags:meta.tags, difficulty: difficulty, solved:solved.has(problem), acceptance:rate});

    }
    
    problemsPageProblems.sort((a,b) => (parseInt(a.number) - parseInt(b.number)));

    return problemsPageProblems;
    
});

function formatTime(seconds: number): string {
  return `${parseFloat(String(seconds))} s`;
}

function formatMemory(kb: number): string {
  const mb = kb / 1024;
  return `${Number.isInteger(mb) ? mb : mb.toFixed(0)} MB`;
}

export function getProblem(slug : string, locale : string) : Problem | null{

    if(!fs.existsSync(path.join(PROBLEMS_ROOT, slug))){
        return null;
    }

    const meta = JSON.parse(fs.readFileSync(path.join(PROBLEMS_ROOT, slug, "problem.json"),"utf-8"));

    const title = meta.title[locale];
    const timeLimit = formatTime(meta.timeLimit) ?? formatTime(DEFAULT_TIME_LIMIT_S);
    const memoryLimit = formatMemory(meta.memoryLimit) ?? formatMemory(DEFAULT_MEMORY_LIMIT_KB);
    const difficulty = meta.difficulty;
    const number = meta.number;
    const tags = meta.tags;
    const inputSource = meta.inputSource;
    const outputSource = meta.outputSource;
    const note = meta.note[locale];
    
    return {title,timeLimit,memoryLimit,difficulty,number,tags,inputSource,outputSource,note};
}

export function getProblemMd(slug : string, locale : string) : {statementMd : string | null, solutionMd : string | null}{

    const statementPath = path.join(PROBLEMS_ROOT, slug, `description-${locale}.md`);
    const solutionPath = path.join(PROBLEMS_ROOT, slug, `solution-${locale}.md`);

    let statement = null;
    let solution = null;

    if(fs.existsSync(statementPath)){
        statement = fs.readFileSync(statementPath, "utf-8");
    }

    if(fs.existsSync(solutionPath)){
        solution = fs.readFileSync(solutionPath, "utf-8");
    }

    return {statementMd : statement, solutionMd : solution};
}

function isValidSlug(slug: string): boolean {
    return /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(slug) && !slug.includes("..");
}

export function getTestcases(slug : string) : Testcase[]{    

    if(!isValidSlug(slug)){
        return [];
    }

    const testsDir = path.join(PROBLEMS_ROOT, slug, "tests");
    
    if(!fs.existsSync(testsDir)){
        return [];
    }

    return fs.readdirSync(testsDir).filter((f) => f.endsWith(".in")).map((f) => f.slice(0, -".in".length)).filter((name) => fs.existsSync(path.join(testsDir, `${name}.out`))).sort()
        .map((name) => ({
            name : name, input : fs.readFileSync(path.join(testsDir, `${name}.in`), "utf-8"), 
            expectedOutput: fs.readFileSync(path.join(testsDir, `${name}.out`), "utf-8")
        })
    );
}

export function getProblemLimits(problem : Problem) : {timeLimit : number, memoryLimit : number}{
    return {
        timeLimit: problem.timeLimit ? parseFloat(problem.timeLimit) : DEFAULT_TIME_LIMIT_S,
        memoryLimit: problem.memoryLimit ? parseFloat(problem.memoryLimit) : DEFAULT_MEMORY_LIMIT_KB,
    };
}