import { isAuthenticated } from "@/app/scripts/login/isAutheticated";
import { getProblemsPageProblems } from "@/app/scripts/problems/getProblems";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ProblemsPage() {
  
    const t = await getTranslations('Problems');
	const isAuthed = await isAuthenticated();

	const locale = await getLocale();

	const problems = getProblemsPageProblems(locale);

	console.log(problems);

	return (
		<h1></h1>
	);
}
