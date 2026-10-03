import { isAuthenticated } from "@/app/scripts/login/isAutheticated";
import { getProblem, getProblemMd } from "@/app/scripts/problems/getProblems";
import { hasSolvedProblem } from "@/app/scripts/problems/getProgress";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

function safeDecode(s: string): string {
    try {
        return decodeURIComponent(s);
    } catch {
        return s;
    }
}

interface ProblemPageProps {
  params: Promise<{id: string}>;
}

export default async function ProblemPage({params} : ProblemPageProps){

    const {id} = await params;

    const locale = await getLocale();
    const isAuthed = await isAuthenticated();

    const slug = safeDecode(id);
    const problem = getProblem(slug,locale);

    if(!problem){
        notFound();
    }

    const {statementMd, solutionMd} = getProblemMd(slug,locale); 

    const statementHTML = statementMd ? await markdownToHtml(statementMd, problem.title, { includeTitle: false, locale }) : null;
    const solutionHTML = solutionMd ? await markdownToHtml(solutionMd, problem.title, { includeTitle: false, locale }) : null;

    const solved = isAuthed ? await hasSolvedProblem(slug) : false;

    return <h1>Hi</h1>
}

function markdownToHtml(statementMd: string, title: any, arg2: { includeTitle: boolean; locale: string; }) {
    throw new Error("Function not implemented.");
}
