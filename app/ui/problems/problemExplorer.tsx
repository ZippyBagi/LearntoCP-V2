'use client'

import { Link } from "@/app/scripts/i18n/navigation";
import { DIFFICULTIES, Difficulty, ProblemsPageProblem } from "@/app/scripts/problems/problem-types"
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import SlidingSegment from "./slidingSegment";
import { useEffect, useMemo, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProblemRow from "./problemRow";
import PageButton from "./pageButton";

const PAGE_SIZE = 5;


interface ProblemExplorerProps{
    problems : ProblemsPageProblem[];
    isAuthed : boolean;
}

export default function ProblemExplorer({problems, isAuthed} : ProblemExplorerProps){
    
    const t = useTranslations('Problems');

    const problemCount = problems.length;
    const solvedCount = 3;

    const [query, setQuery] = useState(""); 
    const [difficulty, setDifficulty] = useState('all');
    const [status, setStatus] = useState('all');
    const [page, setPage] = useState(0);

    const difficultyOptions = [{value : 'all', label:t('difficultyAll')}, ...DIFFICULTIES.map((e) => {return {value:e, label:e}})];

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase().replace("#","");

        return problems.filter((p) => {
            if(q){
                const haystack = p.title.toLowerCase() + " " + (p.topic?.toLowerCase() ?? "") + " " + p.tags.join(" ").toLowerCase();

                if(!haystack.includes(q)) return false;
            }

            if(difficulty !== "all" && p.difficulty !== difficulty) return false;
            if (status === "solved" && !p.solved) return false;
            if (status === "unsolved" && p.solved) return false;
            return true;
        })
    }, [problems, query, difficulty, status])

    useEffect(() => {
        setPage(0);
    }, [query, difficulty, status]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            
            setPage(0);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, pageCount - 1);
    const start = safePage * PAGE_SIZE;
    const rows = filtered.slice(start, start + PAGE_SIZE);
    
    const anyFilter = query !== "" || difficulty !== "all" || status !== "all";

    const clearFilters = () => {
        setQuery("");
        setDifficulty("all");
        setStatus("all");
    };

    return (

        <div className="mx-auto max-w-6xl px-4 py-10">

            <header className="pop [--pop-delay:30ms] mb-7">
                <h1 className="text-[2rem] font-bold tracking-tight text-text-heading">
                    {t('title')}
                </h1>
                <p className="mt-2 text-[15px] text-text-muted">
                    {t('subtitle', {problemCount:problemCount})}
                    {" · "}
                    {isAuthed ? (
                        <span className="font-mono text-success">
                        {solvedCount} {t('solvedSuffix')}
                        </span>
                    ) : (
                        <Link
                            href={`/login?next=${encodeURIComponent('/Problems')}&src=nav`}
                            className="font-semibold text-accent hover:underline"
                            >
                            {t('signInToTrack')}
                        </Link>
                        )
                    }
                </p>
            </header>
            
            <label className="pop [--pop-delay:60ms] mb-4 flex cursor-text items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-page px-4 py-3 transition-colors focus-within:border-accent-border-hover">
                <MagnifyingGlassIcon className="size-5 shrink-0 text-text-muted" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    aria-label={t('searchPlaceholder')}
                    className="w-full bg-transparent text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none"
                />
            </label>

            <div className="pop [--pop-delay:120ms] mb-5 flex flex-wrap items-center gap-3">
                
                <SlidingSegment value={difficulty} onChange={(v) => setDifficulty(v as "all" | Difficulty)} options={difficultyOptions}></SlidingSegment>
                
                {isAuthed && (
                    <SlidingSegment
                        value={status}
                        onChange={setStatus}
                        options={[
                            { value: "all", label: t('statusAny') },
                            { value: "solved", label: t('statusSolved') },
                            { value: "unsolved", label: t('statusUnsolved')},
                        ]}
                    />
                )}

                {anyFilter && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-text-muted transition-colors hover:text-accent"
                    >
                        <XMarkIcon className="size-4" />
                        {t('clear')}
                    </button>
                )}

            </div>

            {problems.length === 0 ? (
                <h1>Empty</h1>
            ) : (
                <div className="pop [--pop-delay:180ms] overflow-hidden rounded-xl border border-border-subtle bg-bg-surface min-h-120 max-h-120">
                    
                    <div className="border-b border-border-subtle py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted
                                    grid items-center gap-7 px-5 grid-cols-[24px_36px_minmax(0,1fr)_110px_56px] sm:grid-cols-[24px_36px_minmax(0,1fr)_210px_110px_56px]
                                    min-h-11 max-h-11"
                    >
                        <span />
                        <span className="justify-self-center">#</span>
                        <span>{t('colProblem')}</span>
                        <span className="hidden justify-self-center text-center sm:block">{t('colTags')}</span>
                        <span className="justify-self-center text-center">{t('colLevel')}</span>
                        <span className="justify-self-center text-center">{t('colAc')}</span>
                    
                    </div>

                    {rows.map((p, i) => (
                        <ProblemRow
                            key={p.slug}
                            problem={p}
                            index={start + i}
                            last={rows.length < PAGE_SIZE ? (i === rows.length) : (i === rows.length - 1)}
                            acceptanceTooltip={t('acceptanceTooltip')}
                            noAttemptsTooltip={t('noAttemptsTooltip')}
                            solvedTooltip={t("solvedTooltip")}
                            unsolvedTooltip={t("unsolvedTooltip")}
                            showStatus={isAuthed}
                        />
                    ))}
                </div>
            )}

            {filtered.length > 0 && (
                <div className="pop [--pop-delay:220ms] mt-5 flex items-center justify-between">
                    <span className="font-mono text-[13px] text-text-muted tabular-nums">
                        {t('range', {start:start+1, end:Math.min(start + PAGE_SIZE, filtered.length), total:filtered.length})}
                    </span>

                    <div className="flex items-center gap-2.5">
                        <PageButton
                            disabled={safePage === 0}
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                        >       
                            <ChevronLeftIcon className="size-4" />
                            {t('prev')}
                            
                        </PageButton>

                        <span className="min-w-[80px] text-center font-mono text-[13px] text-text-muted tabular-nums">
                            {t('pageOf', {current:safePage + 1, total:pageCount})}
                        </span>
                        
                        <PageButton
                            disabled={safePage >= pageCount - 1}
                            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                        >
                            {t("next")}
                            <ChevronRightIcon className="size-4" />
                        </PageButton>
                    </div>
                </div>
            )}

        </div>

    );
}