"use client"

import { PublicSubmission } from "@/app/scripts/submit/judging-types";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useState } from "react";
import { verdictTone } from "./submitPanel";

interface SubmissionHistoryProps{
    history : PublicSubmission[];
    time_limit : number;
    memory_limit : number; 
    locale : string;
    setViewing : Dispatch<SetStateAction<PublicSubmission | null>>;
}

export default function SubmissionHistory({history, time_limit, memory_limit, locale, setViewing} : SubmissionHistoryProps){

    const t = useTranslations("SubmissionHistory")

    return (

        <div className="mt-10">
            
            <h3 className="text-[1.4rem] font-bold text-text-heading mb-4">

                {t('submissionsTitle')}{" "}

                <span className="ml-[0.35rem] text-sm font-medium text-text-muted">
                    {t('attemptsCount', {count:history.length})}
                </span>
            </h3>

            {history.length === 0 ? ( <p className="text-text-muted text-sm">{t('noSubmissions')}</p>) : 
                (
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">

                        {history.map((s) => {

                            const tone = s.status === "judging" ? "pending" : verdictTone(s.verdict);

                            const label = s.status === "judging" ? t('judging') : (s.verdict ? t(s.verdict.toString()) : "-");

                            return (

                                <li key={s.submissionId} className={`flex items-center gap-4 rounded-[10px] border border-border-subtle bg-bg-surface px-[1.1rem] py-[0.9rem] `}>

                                <span className={`size-[9px] shrink-0 rounded-full ${tone === 'ok' ? "bg-success bg-success)" : tone === "bad" ? "bg-danger" : tone === "pending" ? "bg-warning bg-warning" : "bg-text-muted"}`} aria-hidden />

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center gap-[0.6rem]">

                                        <span className={`text-[0.98rem] font-bold ${tone === 'ok' ? "text-success text-success)" : tone === "bad" ? "text-danger" : tone === "pending" ? "text-warning text-warning" : ""}`}>
                                            {label}
                                        </span>

                                        <span className="rounded-[5px] border border-accent-border bg-[rgba(124,158,248,0.1)] px-[0.5em] py-[0.1em] font-mono text-[0.7rem] font-semibold text-text-accent">
                                            C++
                                        </span>
                                    
                                    </div>

                                    <div className="mt-1 text-[0.85rem] text-text-muted">
                                        {t('testcasesPassed', {passed:s.passed, total:s.total})}
                                    </div>
                                
                                </div>

                                <div className="flex flex-col items-end gap-[0.15rem] whitespace-nowrap font-mono text-[0.78rem] text-text-muted max-sm:hidden">
                                    <span>{t('runtimeLabel')} {formatRuntime(s.runtime,time_limit)}</span>
                                    <span>{t('memoryLabel')} {formatMemory(s.memory,memory_limit)}</span>
                                </div>

                                <time className="flex-none text-text-muted text-[0.8rem] whitespace-nowrap" dateTime={s.createdAt}>
                                    {timeAgo(s.createdAt, t, locale)}
                                </time>

                                {s.code && (
                                    <button
                                        type="button"
                                        className="flex-none inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-[0.82rem] font-semibold text-text-muted
                                            bg-transparent border border-transparent cursor-pointer transition-[color,background-color,border-color] duration-150 ease-in-out
                                            hover:text-text-accent hover:bg-[rgba(124,158,248,0.1)] hover:border-accent-border focus-visible:outline-none focus-visible:text-text-accent
                                            focus-visible:border-accent-border-hover max-[560px]:p-1.5"
                                        onClick={() => setViewing(s)}
                                        title={t('viewCodeTitle')}
                                        >
                                        <CodeBracketIcon className="size-4" />
                                    <span className="max-[560px]:hidden">{t('codeLabel')}</span>
                                    </button>
                                )}
                                </li>
                            );
                        })}
                    </ul>
                )
            }
        
        </div>
    )
}


function formatRuntime(time: number | null | undefined, time_limit? : number | null | undefined): string {
    if(time == null) return "-"
    if(time_limit == null) return `${time}s`
    if(time > time_limit) return `>=${time_limit}s`
    return `${time}s`
}

function formatMemory(kb: number | null | undefined, memory_limit? : number | null | undefined): string {
    if (kb == null) return "-";
    if(memory_limit == null) return `${(kb / 1024).toFixed(1)} MB`;
    if(kb/1024 > memory_limit) return `>=${memory_limit} MB`
    return `${(kb / 1024).toFixed(1)} MB`;
}

export const timeAgo = (iso: string, t : any, locale : string) => {


    locale = locale === "sr" ? "sr-Latn" : locale;

    const then = new Date(iso).getTime();
    if (Number.isNaN(then)) return '';

    const diff = Math.max(0, Date.now() - then);
    const minutes = Math.floor(diff / 60000);

    const rtf = new Intl.RelativeTimeFormat(locale, {
        numeric: 'always',
    });

    if (minutes < 1) {
        return t('justNow');
    }

    if (minutes < 60) {
        return rtf.format(-minutes, 'minute');
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return rtf.format(-hours, 'hour');
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
        return rtf.format(-days, 'day');
    }

    return new Date(iso).toLocaleDateString(locale);
}
