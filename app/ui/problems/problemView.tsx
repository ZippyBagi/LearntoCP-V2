"use client"

import { Link } from "@/app/scripts/i18n/navigation";
import { Problem } from "@/app/scripts/problems/problem-types"
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RevealSolutionDialog from "./revealSolutionDialogue";
import SubmitPanel from "./submitPanel";
import { TagsList } from "./tagsList";

interface ProblemViewProps{
    problem : Problem;
    statement : string | null;
    solution : string | null;
    solved : boolean;
    isAuthed : boolean;
    slug : string;
    locale : string;
}

type Tab = "statement" | "solution";

export default function ProblemView({problem, statement, solution, solved, isAuthed, slug, locale} : ProblemViewProps){

    const t = useTranslations("Problem");
    
    const [tab, setTab] = useState<Tab>("statement");
    const [solutionUnlocked, setSolutionUnlocked] = useState(solved);
    const [confirmingReveal, setConfirmingReveal] = useState(false);

    const handleSolutionClick = () => {
        if (solutionUnlocked) {
        setTab("solution");
        } else {
        setConfirmingReveal(true);
        }
    };

    const confirmReveal = () => {
        setSolutionUnlocked(true);
        setConfirmingReveal(false);
        setTab("solution");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            
            <div className="flex justify-center mb-8">
                <div className="relative inline-grid grid-cols-2 gap-0 p-[0.3rem] rounded-[12px] bg-[rgba(0,0,0,0.35)] border border-(--color-border-subtle)">
                    <span className="absolute top-[0.3rem] bottom-[0.3rem] left-[0.3rem] w-[calc(50%-0.3rem)] rounded-[9px] bg-(--color-bg-surface) border
                        border-(--color-accent-border) shadow-[0_2px_10px_rgba(0,0,0,0.35)] translate-x-0 transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
                        z-0 pointer-events-none data-[tab=solution]:translate-x-full"
                        data-tab={tab} aria-hidden="true" />

                    <button type="button" className={`relative z-1 w-full inline-flex items-center justify-center gap-[0.45rem] py-[0.5rem] px-[1.1rem] rounded-[9px] 
                        text-[0.9rem] font-semibold whitespace-nowrap text-(--color-text-muted) bg-transparent border border-transparent cursor-pointer transition-colors 
                        duration-150 ease-in hover:text-(--color-text-heading) ${tab === "statement" ? "text-text-heading" : ""}`}
                        onClick={() => setTab("statement")}
                    >
                        <DocumentTextIcon className="size-4" />
                        {t('tabStatement')}
                    </button>

                    <button type="button" className={`relative z-1 w-full inline-flex items-center justify-center gap-[0.45rem] py-[0.5rem] px-[1.1rem] rounded-[9px] 
                        text-[0.9rem] font-semibold whitespace-nowrap text-(--color-text-muted) bg-transparent border border-transparent cursor-pointer transition-colors 
                        duration-150 ease-in hover:text-(--color-text-heading) ${tab === "solution" ? "text-text-heading" : ""}`}
                        onClick={handleSolutionClick}
                    >
                        <LightBulbIcon className="size-4" />
                        {t('tabSolution')}
                    </button>
                    

                </div>
            </div>

            {confirmingReveal && (
                <RevealSolutionDialog onConfirm={confirmReveal} onCancel={() => setConfirmingReveal(false)}/>
            )}

            {tab === "statement" ? (
                <>
                    <header className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-text-heading tracking-tight">
                            {problem.title}
                        </h1>

                        {(problem.difficulty || problem.number != null) && (
                            <div className="mt-3 flex items-center justify-center gap-3 text-sm">
                                {problem.difficulty && (
                                    <span className={`difficulty-badge ${problem.difficulty.replace(" ", "") ?? ""}`}>
                                        {problem.difficulty}
                                    </span>
                                )}

                                {problem.number != null && (
                                    <span className="font-mono text-text-muted">
                                        {t('problemNumber', {number:problem.number})}
                                    </span>
                                )}

                            </div>
                        )}

                    </header>

                    <table className="w-full border-separate border-spacing-0 my-7 mb-8 border border-border-subtle rounded-[10px] overflow-hidden font-mono">
                        <thead>
                            <tr>
                                <th className="px-4 py-[0.85rem] text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-text-muted bg-bg-code-header text-center border-b border-border-subtle border-r border-border-subtle">
                                    {t('thTime')}
                                </th>
                                
                                <th className="px-4 py-[0.85rem] text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-text-muted bg-bg-code-header text-center border-b border-border-subtle border-r border-border-subtle">
                                    {t('thMemory')}
                                </th>
                                
                                <th className="px-4 py-[0.85rem] text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-text-muted bg-bg-code-header text-center border-b border-border-subtle border-r border-border-subtle">
                                    {t('thInput')}
                                </th>

                                <th className="px-4 py-[0.85rem] text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-text-muted bg-bg-code-header text-center border-b border-border-subtle border-r border-border-subtle">
                                    {t('thOutput')}
                                </th>

                                <th className="px-4 py-[0.85rem] text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-text-muted bg-bg-code-header text-center border-b border-border-subtle">
                                    {t('tags')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 text-center text-text-heading text-[0.95rem] border-r border-border-subtle">{problem.timeLimit}</td>
                                <td className="p-4 text-center text-text-heading text-[0.95rem] border-r border-border-subtle">{problem.memoryLimit}</td>
                                <td className="p-4 text-center text-text-heading text-[0.95rem] border-r border-border-subtle">{problem.inputSource}</td>
                                <td className="p-4 text-center text-text-heading text-[0.95rem] border-r border-border-subtle">{problem.outputSource}</td>
                                <td className="p-4 text-center text-text-heading text-[0.95rem] max-w-30 min-w-30">
                                    {problem.tags != null && (
                                        <TagsList problem={problem}></TagsList>
                                    )} 
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {problem.note && <p className="italic text-text-muted mb-8 leading-[1.6]">{problem.note}</p>}

                    {statement ? (
                        <article
                            className="prose prose-slate dark:prose-invert max-w-none problem-article"
                            dangerouslySetInnerHTML={{ __html: statement }}
                        />
                    ) : (
                        <p className="text-text-muted">{t('noStatement')}</p>
                    )}

                    {isAuthed ? (
                        <SubmitPanel slug={slug} locale={locale} time_limit={parseFloat(problem.timeLimit ?? '0')} memory_limit={parseInt(problem.memoryLimit ?? '0')} onSolved={() => setSolutionUnlocked(true)}/>
                    ) : (
                        <section className="mt-12">
                            
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-text-heading">{t('submitTitle')}</h2>
                            </div>

                            <div className="flex flex-col items-center text-center gap-4 p-12 px-4 border border-dashed border-border-subtle rounded-xl bg-[rgba(255,255,255,0.015)]">
                                <ArrowRightEndOnRectangleIcon className="size-8 text-text-muted" />
                                <p className="text-[0.95rem] text-text-muted max-w-[34rem]">{t('signInPrompt')}</p>

                                <Link href={`/login?next=${encodeURIComponent(`/Problems/${encodeURIComponent(slug)}`)}`} className="inline-flex items-center gap-2 px-[1.4rem] py-[0.6rem] rounded-[9px] text-[0.95rem] font-bold text-accent bg-[rgba(124,158,248,0.1)] border border-[rgba(124,158,248,0.4)] shadow-[0_0_0_1px_rgba(124,158,248,0.08)] cursor-pointer transition-[box-shadow,border-color,background] duration-200 ease-in-out hover:bg-[rgba(124,158,248,0.18)] hover:border-[rgba(124,158,248,0.7)] hover:shadow-[0_0_0_1px_rgba(124,158,248,0.12),0_0_8px_rgba(124,158,248,0.14)]">
                                    {t('signInAction')}
                                </Link>
                            </div>
                        </section>
                    )}
                </>
            ) : (
                <section>
                    <h1 className="text-4xl font-extrabold text-text-heading text-center tracking-tight mb-8">
                        {t('editorialTitle', {title:problem.title})}
                    </h1>

                    {solution ? (
                        <article
                            className="prose prose-slate dark:prose-invert max-w-none problem-article"
                            dangerouslySetInnerHTML={{ __html: solution }}
                        />
                    ) : (
                        <div className="flex flex-col items-center text-center p-12 px-4 border border-dashed border-border-subtle rounded-xl bg-[rgba(255,255,255,0.015)]">
                            <LightBulbIcon className="size-8 text-text-muted mb-3" />
                            <p className="font-medium text-text-heading">
                                {t('noSolutionTitle')}
                            </p>
                            <p className="text-sm text-text-muted mt-1">
                                {t('noSolutionBody')}
                            </p>
                        </div>
                    )}
                </section>
            )}

            
        </div>

    )

}