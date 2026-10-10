import { CodeForcesIcon, GithubIcon } from "@/app/ui/utils/svgs";
import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const linkPillClass = "flex items-center gap-2.5 rounded-lg border border-accent-border bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-colors duration-150 hover:border-accent-border-hover hover:bg-accent/[0.18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export default async function Page() {
  
    const t = await getTranslations('AboutUs');

	const goalTitles = [t('goal1'), t('goal2'), t('goal3'), t('goal4')];
	const goalDescriptions = [t('goalDescription1'), t('goalDescription2'), t('goalDescription3'), t('goalDescription4')]

	const goals = goalTitles.map((title, index) => ({
		title,
		description: goalDescriptions[index]
	}));

    return (
		
		<main className="mx-auto max-w-6xl px-10 pb-[88px] pt-[72px]">

			<div className="pop text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
				{t("eyebrow")}
			</div>

			<h1 className="pop [--pop-delay:60ms] mt-2.5 text-[40px] font-extrabold tracking-[-0.02em] text-text-heading">
				{t("title")}
			</h1>

			<p className="pop [--pop-delay:120ms] mt-[18px] text-lg leading-[1.8]">
				{t('lede')}
			</p>

			<div className="pop [--pop-delay:180ms] text-xs font-semibold uppercase tracking-[0.18em] text-text-muted mt-12">
				{t("goalLabel")}
			</div>

			<section className="pop [--pop-delay:240ms] mt-5 flex flex-col gap-[22px]">

				{goals.map((goal) => (
					<div key={goal.title} className="flex items-start gap-3.5">

						<span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-success/45 bg-success/10 font-mono text-xs text-success">
							✓
						</span>

						<div>
							<h2 className="text-base font-bold text-text-heading">
								{goal.title}
							</h2>
							<p className="mt-[3px] text-[14.5px] leading-[1.6] text-text-muted">
								{goal.description}
							</p>
						</div>
					</div>
				))}

			</section>

			<hr className="pop [--pop-delay:300ms] my-11 border-0 border-t border-border-subtle"/>

			<div className="pop [--pop-delay:300ms] text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
				{t("developerLabel")}
			</div>

			<div className="pop [--pop-delay:360ms] mt-5 flex items-center gap-4">

				<span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent-border-hover bg-accent/10 text-[19px] font-bold text-accent">
					DK
				</span>

				<div>
					<div className="text-lg font-bold text-text-heading">
						{t('developerName')}
					</div>

					<div className="mt-0.5 font-mono text-[13px] text-text-muted">
						{t('developerHandle')}
					</div>
				</div>

			</div>

			<p className="pop [--pop-delay:420ms] mt-4 text-[15.5px] leading-[1.75]">
				{t('developerNote')}
			</p>
			
			<nav className="pop [--pop-delay:480ms] mt-6 flex flex-wrap gap-3" aria-label="Developer links">
				<Link href="https://github.com/ZippyBagi" target="_blank" rel="noopener noreferrer" className={linkPillClass}>
					<GithubIcon></GithubIcon>
					GitHub
				</Link>

				<Link href="https://codeforces.com/profile/dusankovacevic.329" target="_blank" rel="noopener noreferrer" className={linkPillClass}>
					<CodeForcesIcon></CodeForcesIcon>
					Codeforces
				</Link>
				
				<Link href="mailto:dusankovacevic.329@gmail.com" target="_blank" rel="noopener noreferrer" className={linkPillClass}>
					<Mail size={16} strokeWidth={2} ></Mail>
					dusankovacevic.329@gmail.com
				</Link>

			</nav>
		</main>
    );
}
