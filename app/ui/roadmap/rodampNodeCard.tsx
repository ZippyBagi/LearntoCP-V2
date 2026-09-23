'use clinet'

interface RoadmapNodeCardProps{
    title: string;
    progress : number;
    isComplete: boolean;
    onClick : () => void;
}

export function RoadmapNodeCard({title, progress, isComplete, onClick} : RoadmapNodeCardProps){

    const hasProgress = !isComplete && progress > 0;
    const pct = isComplete ? 100 : Math.round(progress * 100);
    const showPct = isComplete || hasProgress;

    const borderColor = isComplete ? "rgba(80,250,123,0.45)" : hasProgress ? "rgba(124,158,248,0.5)" : "rgba(124,158,248,0.18)";
    const glowColor = isComplete ? "rgba(80,250,123,0.08)" : hasProgress ? "rgba(124,158,248,0.06)" : "transparent";

    return(
        <div className="group relative w-full">
            <button onClick={onClick} aria-label={`Open ${title}`} className={[ "relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl text-left",
                                                                                    "border-2",
                                                                                    "bg-[linear-gradient(135deg,#0d2137_0%,#0a1c2e_100%)]",
                                                                                    isComplete && "bg-[linear-gradient(135deg,#0d2137_0%,#0b2a1a_100%)]",
                                                                                    "border-[var(--border-color)]",
                                                                                    "shadow-[0_0_0_1px_var(--glow-color),0_2px_12px_rgba(0,0,0,0.4)]",
                                                                                    "transition-[box-shadow,border-color] duration-200 ease-out",
                                                                                    "hover:border-[rgba(124,158,248,0.65)]",
                                                                                    "hover:shadow-[0_0_0_1px_rgba(124,158,248,0.1),0_0_18px_rgba(124,158,248,0.18)]",
                                                                                    isComplete &&
                                                                                    "hover:border-[rgba(80,250,123,0.75)] hover:shadow-[0_0_0_1px_rgba(80,250,123,0.12),0_0_18px_rgba(80,250,123,0.18)]",
                                                                                    "active:brightness-90",
                                                                                    "focus-visible:outline-none focus-visible:ring-2",
                                                                                    "focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
                                                                                    "focus-visible:ring-offset-[var(--color-bg-page)]",
                                                                                ].filter(Boolean).join(" ")}
                style={{ "--border-color": borderColor, "--glow-color": glowColor} as React.CSSProperties}
            >
                <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"/>

                <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
                    {isComplete && (
                        <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-[rgba(80,250,123,0.3)] bg-[rgba(80,250,123,0.15)] text-[9px] font-bold text-[var(--color-success)]">
                        ✓
                        </span>
                    )}

                    <span className={`flex-1 text-sm font-semibold leading-snug tracking-tight ${ isComplete ? "text-[var(--color-success)]" : "text-[var(--color-text-heading)]"}`}>
                        {title}
                    </span>

                    {showPct && (
                        <span className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums ${isComplete
                            ? "bg-[rgba(80,250,123,0.1)] text-[var(--color-success)]"
                            : "bg-[rgba(124,158,248,0.1)] text-[var(--color-accent)]"
                        }`}>
                            {pct}%
                        </span>
                    )}

                </div>

                <div className="h-[3px] w-full bg-[rgba(255,255,255,0.05)]">
                    {showPct && (
                        <div className={`h-full transition-all duration-500 ease-out ${ isComplete ? "bg-[linear-gradient(90deg,#22c55e,#50fa7b)]" : "bg-[linear-gradient(90deg,#4a7ff7,#7c9ef8)]"}`} style={{ width: `${pct}%` }}/>
                    )}
                </div>
            </button>
        </div>
    );

}