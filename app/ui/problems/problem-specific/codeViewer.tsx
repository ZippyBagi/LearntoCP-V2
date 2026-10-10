"use client"

import { PublicSubmission } from "@/app/scripts/submit/judging-types"
import { useLocale, useTranslations } from "next-intl";
import { timeAgo } from "./submissionHistory";
import { verdictTone } from "./submitPanel";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import { getHighlighter } from "./codeEditor";

interface CodeViewerProps{

    submission : PublicSubmission;
    onClose : () => void;
}

export default function CodeViewer({submission, onClose} : CodeViewerProps){
    
    const t = useTranslations("CodeViewer");
    const type_t = useTranslations("SubmissionHistory");
    const locale = useLocale();

    const tone = submission.status === "judging" ? "pending" : verdictTone(submission.verdict);
    const label = submission.status === "judging" ? t('judging') : (submission.verdict ? type_t(submission.verdict.toString()) : "-");

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(submission.code ?? "");
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
        }
    };

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev};
    }, []);

    const [highlighted, setHighlighted] = useState<string | null>(null);

    useEffect(() => {
        
        let cancelled = false;
        setHighlighted(null);
        const code = submission.code ?? "";

        if (!code) return;
        
        (async () => {
            try {
                const hl = await getHighlighter();
                const html = highlightCpp(hl, code.replace(/\n$/, ""));
                if (!cancelled) setHighlighted(html);
            } catch {
                // Highlighter failed to load - keep the plain fallback.
            }
        })();

        return () => {
            cancelled = true;
        };

    }, [submission.code]);
    
    if (typeof document === "undefined") return null;

    return createPortal(

        <div onClick={onClose} className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[rgba(0,8,14,0.72)] backdrop-blur-[3px] animate-[codeModalFade_0.15s_ease]">

            <div onClick={(e) => e.stopPropagation()} className="pop flex max-h-[82vh] w-full max-w-[760px] flex-col overflow-hidden rounded-[14px] border border-accent-border bg-bg-page shadow-[0_24px_60px_rgba(0,0,0,0.55)]">

                <div className="flex items-center justify-between gap-4 border-b border-border-subtle bg-bg-code-header px-[1.1rem] py-[0.85rem]">
                
                    <div className="flex min-w-0 items-center gap-[0.6rem]">
                        <span className={`size-[9px] shrink-0 rounded-full ${tone === 'ok' ? "bg-success bg-success)" : tone === "bad" ? "bg-danger" : tone === "pending" ? "bg-warning bg-warning" : "bg-text-muted"}`} aria-hidden />

                        <span className={`text-[0.98rem] font-bold ${tone === 'ok' ? "text-success text-success)" : tone === "bad" ? "text-danger" : tone === "pending" ? "text-warning text-warning" : ""}`}>
                            {label}
                        </span>
                        
                        <span className="rounded-[5px] border border-accent-border bg-[rgba(124,158,248,0.1)] px-[0.5em] py-[0.1em] font-mono text-[0.7rem] font-semibold text-text-accent">
                            C++
                        </span>

                        <time className="flex-none text-text-muted text-[0.8rem] whitespace-nowrap" dateTime={submission.createdAt}>
                            {timeAgo(submission.createdAt, t, locale)}
                        </time>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button type="button" className={`code-copy-btn ${copied ? "copied" : ""}`}
                            onClick={handleCopy}
                        >
                            {copied ? t('copied') : t('copy')}
                        </button>
                        <button type="button" onClick={onClose} aria-label={t('close')} 
                                className="inline-flex size-8 items-center justify-center rounded-[7px] border border-transparent bg-transparent text-text-muted cursor-pointer transition-all duration-150 ease-in-out hover:bg-bg-surface hover:border-border-subtle hover:text-text-heading"
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-auto bg-bg-code">
                    {highlighted ? (
                        <div className="code-block-wrapper not-prose code-modal-codeblock" dangerouslySetInnerHTML={{ __html: highlighted }}/>
                    ) : (
                        <pre className="code-modal-pre">
                        <code>{submission.code}</code>
                        </pre>
                    )}
                </div>
                
            </div>
        </div>, document.body
    );
}

function highlightCpp( hl: import("shiki").Highlighter, code: string): string {
    return hl.codeToHtml(code, {
        lang: "cpp",
        theme: "dracula",
        transformers: [
        {
            pre(node) {
                const existing = (node.properties.class ?? "") as string;
                node.properties.class = `${existing} shiki-block`.trim();
                node.properties["data-shiki"] = "true";
            },
        },
        ],
    });
}