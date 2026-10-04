import { isAuthenticated } from "@/app/scripts/login/isAutheticated";
import { getProblemSlugs, getProblemsPageProblems } from "@/app/scripts/problems/getProblems";
import { getAcceptanceRate, getSolvedProblemSlugs } from "@/app/scripts/problems/getProgress";
import ProblemExplorer from "@/app/ui/problems/problems-page/problemExplorer";
import { getLocale } from "next-intl/server";

export default async function ProblemsPage() {

	const isAuthed = await isAuthenticated();
	const locale = await getLocale();
	

	const slugs = getProblemSlugs();

	const solved = await getSolvedProblemSlugs();
	const acceptanceRate = await getAcceptanceRate(slugs);
	const problems = getProblemsPageProblems(locale,solved,slugs,acceptanceRate);
	
	return (
		<ProblemExplorer problems={problems} isAuthed={isAuthed} solved={solved}></ProblemExplorer>
	);
}
