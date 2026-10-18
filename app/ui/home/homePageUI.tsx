"use client"

import { useTranslations } from "next-intl";
import DefaultBG from "../utils/defaultBG";
import { ArrowUpRight, CodeIcon, MapIcon } from "../utils/svgs";
import { Link } from "@/app/scripts/i18n/navigation";
import CodeWindow from "./codeWindow";

export default function HomePageUI() {

    const t = useTranslations('HomePage');

	const cards = [
		{
			href: `/roadmap`,
			icon: <MapIcon />,
			label: t('mapLabel'),
			title: t('mapTitle'),
			description: t('mapDescription'),
		},
		{
			href: `/Problems`,
			icon: <CodeIcon />,
			label: t('solveLabel'),
			title: t('solveTitle'),
			description: t('solveDescription'),
		}
	];

	const tags = ["#100%", "#FREE"];

    return (
		<DefaultBG className="relative -m-3 flex min-h-[calc(100%+1.5rem)] overflow-hidden">
			<div className="relative z-2 m-auto grid w-full max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20 ">
				<div>

					<div className="pop mb-6 flex gap-3 text-lg">
							{tags.map((tag) => (
							<span key={tag} className="tag font-mono font-semibold" style={{ padding: "0.3em 0.8em" }}>
								{tag}
							</span>
						))}
					</div>

					<h1 className="pop [--pop-delay:60ms] select-none text-7xl font-extrabold leading-none tracking-tight sm:text-8xl xl:text-9xl">
						<span style={{
								background:
								"linear-gradient(92deg, var(--color-accent) 0%, #a5b8fc 100%)",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								WebkitTextFillColor: "transparent",
								color: "transparent",
							}}
						>
							LearnToCP
						</span>
					</h1>

					<p className="pop [--pop-delay:120ms] mt-5 font-mono text-lg sm:text-xl">
						<span style={{ color: "var(--color-success)" }}>//</span>{" "}
						<span style={{ color: "var(--color-text-muted)" }}>{t('tagline')}</span>
					</p>

					<div className="mt-12 flex flex-col gap-6">
						{cards.map((card, i) => (
							<Link key={card.href} href={card.href}
								className={`pop [--pop-delay:${180 + i * 60}ms] group block rounded-2xl border-2 border-[rgba(124,158,248,0.18)] p-7 shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-200 ease-out hover:border-[rgba(124,158,248,0.65)] hover:shadow-[0_0_0_1px_rgba(124,158,248,0.1),0_0_18px_rgba(124,158,248,0.18)] active:brightness-90`}
								style={{
									background:"linear-gradient(135deg, #0d2137 0%, #0a1c2e 100%)",
								}}
							>
									<div className="mb-4 flex items-center gap-3.5">
										<span className="flex h-11 w-11 items-center justify-center rounded-xl"
											style={{
												background: "rgba(124,158,248,0.1)",
												color: "var(--color-accent)",
												border: "1px solid var(--color-accent-border)",
											}}
										>
											{card.icon}
										</span>

										<span className="font-mono text-xs font-semibold uppercase tracking-[0.3em]"
											style={{ color: "var(--color-text-muted)" }}
										>
											{card.label}
										</span>
									</div>

									<h2 className="mb-2 flex items-center gap-2 text-2xl font-bold" style={{ color: "var(--color-text-heading)" }}>

										{card.title}
									
										<span style={{ color: "rgba(124,158,248,0.4)" }}>
											<ArrowUpRight />
										</span>
									
									</h2>

									<p className="text-base" style={{ color: "var(--color-text-muted)" }}>
										{card.description}
									</p>
							
							</Link>
						))}
					</div>
				</div>

				<CodeWindow></CodeWindow>
				
			</div>
		</DefaultBG>
	);

}