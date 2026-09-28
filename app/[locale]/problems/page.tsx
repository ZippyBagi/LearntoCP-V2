import { isAuthenticated } from "@/app/scripts/login/isAutheticated";
import { getProblemsPageProblems } from "@/app/scripts/problems/getProblems";
import ProblemExplorer from "@/app/ui/problems/problemExplorer";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ProblemsPage() {
  
    const t = await getTranslations('Problems');
	const isAuthed = await isAuthenticated();

	const locale = await getLocale();

	const problems = getProblemsPageProblems(locale);

	return (
		<ProblemExplorer problems={problems}></ProblemExplorer>
	);
}
