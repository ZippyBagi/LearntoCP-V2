"use client"

import { Link } from "@/app/scripts/i18n/navigation";
import { DIFFICULTIES, ProblemsPageProblem } from "@/app/scripts/problems/problem-types";
import { CheckIcon } from "@heroicons/react/24/outline";

const MAX_VISIBLE_TAGS = 3;


interface ProblemRowProps{
    problem: ProblemsPageProblem;
    index: number;
    last: boolean;
    acceptanceTooltip: string;
    noAttemptsTooltip: string;
    solvedTooltip: string;
    unsolvedTooltip: string;
    showStatus: boolean;
}

export default function ProblemRow({problem, index, last, acceptanceTooltip, noAttemptsTooltip, solvedTooltip, unsolvedTooltip, showStatus} : ProblemRowProps){
    
    const shownTags = problem.tags.slice(0, MAX_VISIBLE_TAGS);
    const extra = problem.tags.length - shownTags.length;
    const displayNumber = problem.number ?? index + 1;
    
    
    return (
        <Link href={`/Problems/${encodeURIComponent(problem.slug)}`} className={`group cursor-pointer py-[18px] transition-colors hover:bg-bg-surface-hover
            ${ last ? "" : "border-b border-border-subtle"} grid items-center gap-7 px-5 grid-cols-[24px_36px_minmax(0,1fr)_110px_56px] sm:grid-cols-[24px_36px_minmax(0,1fr)_210px_110px_56px]
            min-h-22 max-h-22`}
        >

            <span className="justify-self-start">
                {!showStatus ? null : problem.solved ? (
                    <span
                        title={solvedTooltip}
                        className="flex size-6 items-center justify-center rounded-full border border-[rgba(80,250,123,0.4)] bg-[rgba(80,250,123,0.15)] text-success"
                    >
                        <CheckIcon className="size-3.5 [stroke-width:3]" />
                    </span>
                    ) : (
                    <span
                        title={unsolvedTooltip}
                        className="block size-6 rounded-full border border-accent-border"
                    />
                )}
            </span>

            <span className="justify-self-center font-mono text-sm font-semibold text-text-muted tabular-nums">
                {String(displayNumber).padStart(2, "0")}
            </span>

            <div className="min-w-0">
                <div className={`truncate text-base font-semibold transition-colors group-hover:text-accent ${
                        problem.solved ? "text-success" : "text-text-heading"}`}
                >
                    {problem.title}
                </div>

                {problem.topic && (
                    <div className="mt-0.5 truncate text-[13px] text-text-muted">
                        {problem.topic}
                    </div>
                )}
            </div>

            <div className="hidden min-w-0 max-w-full flex-nowrap items-center justify-center justify-self-center gap-1.5 overflow-hidden sm:flex">
                {shownTags.map((tag) => (
                    <span key={tag} className="tag max-w-full truncate whitespace-nowrap font-mono" title={shownTags.slice().join(", ")}>
                        #{tag}
                    </span>
                ))}

                {extra > 0 && (
                    <span className="shrink-0 font-mono text-xs text-text-muted" title={shownTags.slice().join(", ")}>
                        +{extra}
                    </span>
                )}
            </div>

            <div className="justify-self-center">
                {problem.difficulty && (
                    <span className={`difficulty-badge ${problem.difficulty.replace(" ", "")}`}>
                        {problem.difficulty}
                    </span>
                )}
            </div>

            <span
                title={problem.acceptance === null ? noAttemptsTooltip : acceptanceTooltip}
                className="justify-self-center text-center font-mono text-sm text-text-muted tabular-nums"
            >
                {problem.acceptance === null ? "—" : `${Math.round((problem.acceptance ?? 0) * 100)}%`}
            </span>

        </Link>
    )
}