"use client"

import { LightBulbIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createPortal } from "react-dom";


export default function RevealSolutionDialog({ onConfirm, onCancel}: {onConfirm: () => void; onCancel: () => void;}) {
  
    useEffect(() => {

        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel()};

        window.addEventListener("keydown", onKey);

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
        
    }, [onCancel]);

    if (typeof document === "undefined") return null;

    const t = useTranslations('RevealSolution')

    return createPortal(
        <div role="dialog" aria-modal="true" aria-labelledby="reveal-solution-title" onClick={onCancel}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[rgba(0,8,14,0.72)] backdrop-blur-[3px]"
        >
            <div className="w-full max-w-[420px] flex flex-col items-center text-center pt-7 px-[1.6rem] pb-6 bg-bg-page border border-accent-border rounded-[14px] shadow-[0_24px_60px_rgba(0,0,0,0.55)] pop"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="inline-flex items-center justify-center size-12 mb-4 rounded-full text-warning bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.4)]">
                    <ExclamationTriangleIcon className="size-6" />
                </div>

                <h2 id="reveal-solution-title" className="text-[1.2rem] font-bold text-text-heading">
                    {t('revealTitle')}
                </h2>
                
                <p className="mt-[0.55rem] text-[0.9rem] leading-[1.55] text-text-muted">
                    {t('revealBody')}
                </p>

                <div className="flex w-full gap-[0.6rem] mt-6">
                    <button type="button" className="inline-flex flex-1 items-center justify-center gap-[0.4rem] px-4 py-[0.6rem] rounded-[9px] text-[0.9rem] font-semibold cursor-pointer
                        text-text-heading bg-bg-surface border border-border-subtle hover:bg-bg-surface-hover hover:border-accent-border-hover" onClick={onCancel}autoFocus
                    >
                        {t('keepTrying')}
                    </button>

                    <button type="button" className="inline-flex flex-1 items-center justify-center gap-[0.4rem] px-4 py-[0.6rem] rounded-[9px] text-[0.9rem] font-semibold cursor-pointer
                        text-warning bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.4)] shadow-[0_0_0_1px_rgba(245,158,11,0.08)] hover:bg-[rgba(245,158,11,0.18)] hover:border-[rgba(245,158,11,0.7)] hover:shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_0_8px_rgba(245,158,11,0.14)]"
                        onClick={onConfirm}
                    >
                        <LightBulbIcon className="size-4" />
                        {t('revealConfirm')}
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
}