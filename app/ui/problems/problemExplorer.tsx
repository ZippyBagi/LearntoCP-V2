'use client'

import { Link } from "@/app/scripts/i18n/navigation";
import { DIFFICULTIES, Difficulty, ProblemsPageProblem } from "@/app/scripts/problems/problem-types"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import SlidingSegment from "./slidingSegment";
import { useMemo, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ProblemExplorerProps{
    problems : ProblemsPageProblem[];
    isAuthed : boolean;
}

export default function ProblemExplorer({problems, isAuthed} : ProblemExplorerProps){
    
    const t = useTranslations('Problems');

    const problemCount = problems.length;
    const solvedCount = 3;

    const [difficulty, setDifficulty] = useState('all');
    const [status, setStatus] = useState('All');

    const difficultyOptions = [{value : 'All', label:t('difficultyAll')}, ...DIFFICULTIES.map((e) => {return {value:e, label:e}})];
    const anyFilter = true;

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
                    value={""}
                    readOnly
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
                        onClick={() => {}}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-text-muted transition-colors hover:text-accent"
                    >
                        <XMarkIcon className="size-4" />
                        {t('clear')}
                    </button>
                )}

            </div>

        </div>

    );
}