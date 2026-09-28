import "server-only"

import path from "path";
import { ProblemsPageProblem } from "./problem-types";
import { cache } from "react";
import fs from 'fs';
import { Difficulty, DIFFICULTIES } from "./problem-types";

const PROBLEMS_ROOT = path.join(process.cwd(), "content", "problems");

export const getProblemsPageProblems = cache((locale : string) : ProblemsPageProblem[] => {
   
    if(!fs.existsSync(PROBLEMS_ROOT)){
        return [];
    }

    let problemsPageProblems : ProblemsPageProblem[] = [];

    const problems = fs.readdirSync(PROBLEMS_ROOT, {withFileTypes:true}).filter((entry) => entry.isDirectory())
                                                                              .filter((entry) => (fs.existsSync(path.join(PROBLEMS_ROOT, entry.name, "problem.json"))))
                                                                              .map((entry) => entry.name)
                                                                              .sort();
                                                                             

    for(const problem of problems){

        const meta = JSON.parse(fs.readFileSync(path.join(PROBLEMS_ROOT, problem, "problem.json"),"utf-8"));

        const topic = meta.topic[locale];
        const title = meta.title[locale];

        const difficulty = meta.difficulty as Difficulty;
        
        if(!DIFFICULTIES.includes(difficulty)){
            console.error(`[getProblems] Problem ${PROBLEMS_ROOT + '/' + problem} doesn't have correct difficulty`);
        }
        
        problemsPageProblems.push({slug:problem, title:title, number:meta.number, topic:topic, tags:meta.tags, difficulty: difficulty});

    }
    
    problemsPageProblems.sort((a,b) => (parseInt(a.number) - parseInt(b.number)));

    return problemsPageProblems;
    
});