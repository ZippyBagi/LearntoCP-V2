"use client"

import { useTranslations } from "next-intl";
import VersionSelect from "./versionSelect";
import { useCallback, useRef, useState } from "react";
import { DEFAULT_LANGUAGE_ID, PublicSubmission } from "@/app/scripts/submit/judging-types";
import CodeEditor from "./codeEditor";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import SubmissionHistory from "./submissionHistory";

const POLL_INTERVAL_MS = 1500;

interface SubmitPanelProps{
    slug : string;
    locale : string;
    time_limit : number;
    memory_limit : number;
    onSolved? : () => void; 
}

export default function SubmitPanel({slug,locale,time_limit,memory_limit,onSolved} : SubmitPanelProps){

    const t = useTranslations("SubmitPanel");

    const [languageId, setLanguageId] = useState<number>(DEFAULT_LANGUAGE_ID);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<PublicSubmission | null>(null);
    const [history, setHistory] = useState<PublicSubmission[]>([]);
    
    const [code, setCode] = useState("");
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    

    const stopPolling = useCallback(() => {
        if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
        }
    }, []);

    const loadHistory = useCallback(async () => {
        try {
            const res = await fetch(
                `/api/submissions?problemId=${encodeURIComponent(slug)}`,
            );

            if (!res.ok) return;
            
            const data = await res.json();
            setHistory(data.submissions ?? []);
        } catch {
            // history is best-effort
        }
    }, [slug]);

    const startPolling = useCallback(
        (submissionId: string) => {
            stopPolling();
            const poll = async () => {
                try {
                    const res = await fetch(`/api/submissions/${submissionId}`);

                    if (!res.ok) return; //keep pooling
                   
                    const data: PublicSubmission = await res.json();
                    setResult(data);

                    if (data.done) {
                        stopPolling();
                        setSubmitting(false);
                        loadHistory();
                        if (data.verdict === "AC") onSolved?.();
                    }
                } catch {
                    //keep polling
                }
            };
            poll();
            pollRef.current = setInterval(poll, POLL_INTERVAL_MS);
        }, [loadHistory, onSolved, stopPolling]
    );

    const handleSubmit = async () => {

        setError(null);
        setResult(null);
        setSubmitting(true);

        try {
            const res = await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ problemId:slug, code, languageId })});
            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                // 429 - human-readable cooldown / daily-limit message

                setError(data.error ?? t('submissionFailed'));
                setSubmitting(false);
                return;
            }

            startPolling(data.submissionId);
        } catch {
            setError(t('networkError'));
            setSubmitting(false);
        }
    };

    return (
        <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
                
                <h2 className="text-2xl font-bold text-text-heading">{t("submitTitle")}</h2>
            
                <VersionSelect value={languageId} onChange={setLanguageId} disabled={submitting}></VersionSelect>
            
            </div>
        
            <CodeEditor code={code} setCode={setCode}></CodeEditor>

            <div className="flex items-center justify-between gap-4 mt-4">
                <div className="text-sm text-text-muted">

                    {error ? <span className="text-danger">{error}</span> : result && !result.done ? (
                        
                        <span>
                            {t('judgingProgress', {passed : result.passed, total : result.total})}
                        </span>

                    ) : result && result.done ? (

                        <span className={verdictTone(result.verdict) === "ok" ? "text-success" : "text-danger"}>
                            {t('verdictResult', {label: result.verdict ? t(result.verdict.toString()) : "-", passed : result.passed, total : result.total})}
                        </span>

                    ) : (
                        <span>{t('verdictPlaceholder')}</span>
                    )}
                
                </div>
                
                <button onClick={handleSubmit} disabled={submitting || !code.trim()} className="submit-button">
                    <PaperAirplaneIcon className="size-4" />

                    {submitting ? t("judging") : t("submit")}
                </button>
            </div>

            {result?.done && result.verdict === "CE" && result.compileOutput && 
                (
                    <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-[8px] border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.06)] px-4 py-[0.9rem] font-mono text-[0.8rem] leading-[1.5] text-text-primary">
                        {result.compileOutput}
                    </pre>
                )
            }

            <SubmissionHistory></SubmissionHistory>

        </section>
    )
}

function verdictTone(verdict: string | null): "ok" | "bad" | "pending" {
    if (!verdict) return "pending";

    return verdict === "AC" ? "ok" : "bad";
}