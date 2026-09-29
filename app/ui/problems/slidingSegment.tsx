'use client'

interface SlidingSegmentProps{ 

    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    className?: string;
}

export default function SlidingSegment({value, onChange, options, className = ""}: SlidingSegmentProps) {

    const activeIndex = Math.max(0, options.findIndex((o) => o.value === value));
    const activeValue = options[activeIndex]?.value;
    
    const n = options.length;

    return (
        <div
            className={`relative inline-grid items-center rounded-[10px] border border-border-subtle bg-bg-page p-[3px] ${className}`}
            style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
            role="tablist"
        >
            <span
                aria-hidden
                className="absolute bottom-[3px] left-[3px] top-[3px] rounded-[8px] border border-accent-border bg-bg-surface shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
                style={{
                    width: `calc((100% - 6px) / ${n})`,
                    transform: `translateX(${activeIndex * 100}%)`,
                    transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            />

            {options.map((o) => {
                const active = o.value === activeValue;
                return (
                    <button
                        key={o.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => onChange(o.value)}
                        className={`relative z-[1] cursor-pointer truncate rounded-[7px] px-1.5 py-2.5 text-center text-[12.5px] font-semibold leading-none transition-colors ${
                            active ? "text-accent" : "text-text-muted hover:text-text-heading"
                        }`}
                        >
                        {o.label}
                    </button>
                );
            })}
        </div>
    );
}