'use client'

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoogleG, Info, Lock} from "../utils/svgs";
import { createClient } from "@/app/scripts/supabase/client";

function sanitizeNext(raw: string | null): string | null {
    if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
    
    return null;
}

export default function LoginPanel({}){

    const t = useTranslations("Login");
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(searchParams.get("error"));
    
    const next = sanitizeNext(searchParams.get("next"));

    const noticePage = (() => {
        if (!next) return null;
        const src = searchParams.get("src");
        if (src === "nav") return null; //from navbar - no need to show
        if (src === "roadmap") return t('page_roadmap');
        if (src === "problems") return t('page_problems');
        return t('page_generic');
    })();

    async function signInWithGoogle() {
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const origin = location.origin;

        const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', 
            options: {
                redirectTo: `${origin}/auth/callback?next=${next}`
            }
        });

        if (error) {
            setError(t('errorStart'));
            setLoading(false);
        }
        
    }    

    return (

        <div className="relative w-[min(440px,100%)] scale-[1.1]">

            {noticePage && (
                <div role="status" className="absolute bottom-[calc(100%+14px)] left-0 right-0 flex items-start gap-[10px] px-4 py-3 rounded-xl text-sm leading-[1.55] text-[var(--color-text-muted)] bg-[#0a1c2e] border border-[rgba(124,158,248,0.30)] shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
                    <Info></Info>
                    <span>{t('signInRequired', {page : noticePage})}</span>
                </div>
            )}

            <div className="pt-9 px-9 pb-[30px] rounded-2xl bg-[linear-gradient(135deg,var(--color-bg-surface)_0%,#0a1c2e_100%)] border border-[var(--color-accent-border)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                
                <div className="select-none inline-flex items-center gap-2 [font-family:var(--font-mono)] text-[11px] tracking-[0.15em] uppercase text-[rgba(200,218,240,0.30)] mb-[18px]">
                    <span className="size-[7px] rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"></span>
                    {t('eyebrow')}
                </div>

                <h1 className="mb-3 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--color-text-heading)]">
                    {t('welcomePrefix')} 
                    <span className=" font-bold select-none px-1 bg-[linear-gradient(90deg,#7c9ef8_0%,#a5b8fc_100%)] bg-clip-text text-transparent">LearnToCP</span>

                </h1>

                <p className="mb-7 text-[15.5px] leading-[1.65] text-[var(--color-text-muted)] max-w-[34ch] text-pretty">
                    {t('description')}
                </p>

                <button type="button" onClick={signInWithGoogle} disabled={loading} 
                                                                                className={`w-full inline-flex items-center justify-center gap-3 px-5 py-[15px] font-[var(--font-sans)]
                                                                                    text-base font-semibold leading-none text-[var(--color-text-heading)] bg-[linear-gradient(135deg,rgba(124,158,248,0.12),rgba(124,158,248,0.06))]
                                                                                    border rounded-[10px] transition-[box-shadow,border-color] duration-200
                                                                                    border-[var(--color-border-blue)] shadow-[0_0_0_1px_transparent,0_2px_12px_rgba(0,0,0,0.4)]
                                                                                    ${!loading ? "hover:border-[rgba(124,158,248,0.65)] hover:shadow-[0_0_0_1px_rgba(124,158,248,0.1),0_0_18px_rgba(124,158,248,0.18)] cursor-pointer" : "cursor-default"}`}>

                    {loading ? <span className="size-[18px] rounded-full border-2 border-[rgba(124,158,248,0.3)] border-t-[var(--color-accent)] animate-[ltcp-spin_0.7s_linear_infinite]"></span> : <GoogleG></GoogleG>}
                    <span>{loading ? t('connecting') : t('continueGoogle')}</span>
                </button>
                
                {error && (
                    <p className="mt-4 text-sm" style={{ color: "var(--color-danger)" }}>
                        {error}
                    </p>
                )}

                <div className="h-px mt-[26px] mb-[16px] bg-[rgba(124,158,248,0.10)]"></div>
                    
                <p className="m-0 flex gap-[9px] text-[13px] leading-[1.55] text-[rgba(200,218,240,0.30)]">
                    <Lock></Lock>
                    {t("privacy")}
                </p>

            </div>
            
            
        </div>
    );
}