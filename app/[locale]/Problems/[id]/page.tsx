import { isAuthenticated } from "@/app/scripts/login/isAutheticated";
import markdownToHTML from "@/app/scripts/markdown/mdToHTML";
import { getProblem, getProblemMd } from "@/app/scripts/problems/getProblems";
import { hasSolvedProblem } from "@/app/scripts/problems/getProgress";
import { pageMetadata } from "@/app/scripts/seo/seoUtils";
import ProblemView from "@/app/ui/problems/problem-specific/problemView";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import "shiki"

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

    const statementHTML = statementMd ? await markdownToHTML({markdown : statementMd, fileName : problem.title, includeTitle : false}) : null;
    const solutionHTML = solutionMd ? await markdownToHTML({markdown : solutionMd, fileName : problem.title, includeTitle : false}) : null;

    const solved = isAuthed ? await hasSolvedProblem(slug) : false;

    return <ProblemView problem={problem} statement={statementHTML} solution={solutionHTML} solved={solved} isAuthed={isAuthed} slug={slug} locale={locale}></ProblemView>
}

export async function generateMetadata({params} : {params: Promise<{id:string}>}) : Promise<Metadata> {

    const {id} = await params;
	const locale = await getLocale();
	const t = await getTranslations("Problem");

    const slug = safeDecode(id);
    const problem = getProblem(slug,locale);

    if (!problem) return { title: "Not Found"};

    const description = t('description', {title:problem.title, descriptor:[problem.difficulty, problem.topic].filter(Boolean).join(" · ")});

	return pageMetadata({
		locale,
		path:`Problems/${encodeURIComponent(slug)}`,
		title:problem.title + " · LearnToCP",
		description: description
	});
}