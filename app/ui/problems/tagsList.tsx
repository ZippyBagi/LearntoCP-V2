"use client"

import { Problem } from "@/app/scripts/problems/problem-types";
import { useRef, useState, useEffect } from "react";

interface TagsListProps {
    problem: Problem;
}

export function TagsList({ problem }: TagsListProps) {
    const windowRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    
    const [scrollAmount, setScrollAmount] = useState<number>(0);

    useEffect(() => {
        const windowEl = windowRef.current;
        const trackEl = trackRef.current;
        if (!windowEl || !trackEl) return;

            const checkOverflow = () => {
            const windowWidth = windowEl.getBoundingClientRect().width;
            const trackWidth = trackEl.getBoundingClientRect().width;
            
            const overflow = trackWidth - windowWidth;

            setScrollAmount(overflow > 0.5 ? overflow : 0);
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);

    }, [problem.tags]);

    return (
        <div className="hidden max-w-full overflow-hidden sm:flex" ref={windowRef}>
            <div className={`flex shrink-0 w-max min-w-full gap-1.5 ${scrollAmount <=0.5 ? "justify-center" : ""}`} ref={trackRef}
                style={{
                    "--scroll-amount": `-${scrollAmount}px`,
                    animation: scrollAmount > 0 ? "tags-scroll-js 8s ease-in-out infinite" : "none"
                } as React.CSSProperties}
            >
                {problem.tags.map((tag) => (
                    <span key={tag} className="tag whitespace-nowrap font-mono">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
