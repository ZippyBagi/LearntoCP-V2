import { getLocale } from "next-intl/server";
import { getRoadmapMatrix } from "@/app/scripts/roadmap/getRoadmapMatrix";
import { RoadmapCanvas } from "@/app/ui/roadmap/roadmapCanvas";
import '@xyflow/react/dist/style.css'
import { isAuthenticated } from "@/app/scripts/login/isAutheticated";
import getRoadmapProgress from "@/app/scripts/roadmap/getRoadmapProgress";
import { ReactFlowProvider } from "@xyflow/react";

export default async function Home() {
  
	const locale = await getLocale();
	const matrix = getRoadmapMatrix(locale);

	const isAuthed = await isAuthenticated();

	const [completedIds, solvedSlugs] = isAuthed ? await Promise.all([getRoadmapProgress(), []]) : [[], []]; //TODO GETSOLVEDPROBLEMS()!!!
	
	return (
		<main className="min-h-fill bg-[var(--color-bg-page)] px-1 py-1 md:px-4 md:py-4">
			<section aria-label="Roadmap diagram" className="w-full h-[calc(100dvh-5.5rem)] md:h-[calc(100dvh-7rem)]">
				<ReactFlowProvider>
					<RoadmapCanvas matrix={matrix} initialCompleted={completedIds} solvedSlugs={solvedSlugs} loginUrl={isAuthed ? null : `/login?next=${encodeURIComponent(`/roadmap`)}`}></RoadmapCanvas>
				</ReactFlowProvider>
			</section>
		</main>
		
	);
}

//TODO : FIX HOVER EFFECT WRONG COLOR,FIX CHECKMARK, REFACTOR ROADMAPMODAL