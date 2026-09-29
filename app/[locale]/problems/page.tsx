import { isAuthenticated } from "@/app/scripts/login/isAutheticated";
import { getProblemsPageProblems } from "@/app/scripts/problems/getProblems";
import ProblemExplorer from "@/app/ui/problems/problemExplorer";
import { getLocale } from "next-intl/server";

export default async function ProblemsPage() {

	const isAuthed = await isAuthenticated();

	const locale = await getLocale();

	const problems = getProblemsPageProblems(locale);

	return (
		<ProblemExplorer problems={problems} isAuthed={isAuthed}></ProblemExplorer>
	);
}
