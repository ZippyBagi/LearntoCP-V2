"use client";

import { useEffect } from "react";
import { RoadmapNode } from "@/app/scripts/roadmap/roadmap-types";

interface RoadmapModalProps {
    node: RoadmapNode;
    checked: boolean[];
    onToggle: (itemIndex: number) => void;
    onClose: () => void;
}

const checkboxCheckedStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "1px solid rgba(80,250,123,0.6)",
    boxShadow: "0 0 6px rgba(34,197,94,0.3)",
};

const checkboxUncheckedStyle: React.CSSProperties = {
    background: "rgba(13,33,55,0.8)",
    border: "1px solid rgba(124,158,248,0.25)",
};

function CheckIcon() {
    return (
        <svg
            className="block"
            width={9}
            height={7}
            viewBox="0 0 9 7"
            fill="none"
        >
            <path
                d="M1 3.5L3.5 6L8 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ProblemCircle({ solved }: { solved: boolean }) {
    return solved ? (
        <span
            aria-hidden
            className="flex size-[18px] shrink-0 items-center justify-center rounded-full"
            style={checkboxCheckedStyle}
        >
            <CheckIcon />
        </span>
    ) : (
        <span
            aria-hidden
            className="block size-[18px] shrink-0 rounded-full"
            style={checkboxUncheckedStyle}
        />
    );
}

function ModalItem({
    item,
    checked,
    onToggle,
}: {
    item: RoadmapNode["items"][number];
    checked: boolean;
    onToggle: () => void;
}) {
    const isProblem = item.isProblem;

    return (
        <li
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-150 sm:py-2.5 ${
                checked
                    ? "bg-[rgba(80,250,123,0.04)]"
                    : "hover:bg-[rgba(124,158,248,0.06)]"
            }`}
        >
            {isProblem ? (
                <span
                    role="img"
                    aria-label={`Problem "${item.label}" — ${checked ? "solved" : "unsolved"}`}
                >
                    <ProblemCircle solved={checked} />
                </span>
            ) : (
                <button
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    aria-label={`Mark "${item.label}" as ${checked ? "incomplete" : "complete"}`}
                    onClick={onToggle}
                    className="relative z-10 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-[4px] transition-all duration-150 before:absolute before:-inset-2.5 before:content-['']"
                    style={checked ? checkboxCheckedStyle : checkboxUncheckedStyle}
                >
                    {checked && <CheckIcon />}
                </button>
            )}

            <a
                href={item.href}
                className={`relative flex min-w-0 flex-1 text-sm transition-colors duration-150 before:absolute before:-inset-y-3 before:-left-3 before:-right-3 before:content-[''] sm:before:-inset-y-2.5 ${
                    checked
                        ? "text-[rgba(80,250,123,0.4)] line-through decoration-[rgba(80,250,123,0.25)]"
                        : "text-[var(--color-text-heading)]"
                }`}
            >
                {item.label}
            </a>
        </li>
    );
}

export function RoadmapModal({ node, checked, onToggle, onClose}: RoadmapModalProps) {

    const completedCount = checked.filter(Boolean).length;
    const total = node.items.length;
    const pct = total > 0 ? (completedCount / total) * 100 : 0;
    const isAllDone = total > 0 && completedCount === total;

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKey);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={node.title.replace(/^[0-9]+/, "")}
            className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                aria-hidden
                className="absolute inset-0 bg-[rgba(0,10,20,0.80)] backdrop-blur-[6px]"
            />

            <div
                className="relative z-10 flex w-full max-w-md animate-[roadmap-modal-in_180ms_cubic-bezier\(0.16\,1\,0.3\,1\)_both] flex-col overflow-hidden rounded-2xl"
                style={{
                    background: isAllDone
                        ? "linear-gradient(160deg, #0d2137 0%, #0b2a1a 100%)"
                        : "linear-gradient(160deg, #0d2137 0%, #091826 100%)",
                    border: isAllDone
                        ? "2px solid rgba(80,250,123,0.45)"
                        : "2px solid rgba(124,158,248,0.22)",
                    boxShadow: isAllDone
                        ? "0 0 0 1px rgba(80,250,123,0.08), 0 24px 60px rgba(0,0,0,0.7), 0 0 80px rgba(80,250,123,0.06)"
                        : "0 0 0 1px rgba(124,158,248,0.06), 0 24px 60px rgba(0,0,0,0.7), 0 0 80px rgba(50,100,200,0.08)",
                    maxHeight: "min(85dvh, 42rem)",
                    transition: "border-color 300ms ease, box-shadow 300ms ease",
                }}
            >
                <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[rgba(124,158,248,0.12)] px-5 py-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                        {isAllDone && (
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[rgba(80,250,123,0.3)] bg-[rgba(80,250,123,0.15)] text-[9px] font-bold text-[var(--color-success)]">
                                ✓
                            </span>
                        )}

                        <h2
                            className={`truncate text-sm font-semibold uppercase tracking-wider ${
                                isAllDone
                                    ? "text-[var(--color-success)]"
                                    : "text-[var(--color-text-heading)]"
                            }`}
                        >
                            {node.title.replace(/^[0-9]+/, "")}
                        </h2>
                    </div>

                    <button
                        autoFocus
                        onClick={onClose}
                        aria-label="Close modal"
                        className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-sm leading-none text-[var(--color-text-muted)] transition-all duration-150 hover:bg-[rgba(124,158,248,0.1)] hover:text-[var(--color-text-heading)]"
                    >
                        ✕
                    </button>
                </div>

                <ul
                    className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor:
                            "rgba(124,158,248,0.2) transparent",
                    }}
                >
                    {node.items.map((item, i) => (
                        <ModalItem
                            key={item.id}
                            item={item}
                            checked={checked[i] ?? false}
                            onToggle={() => onToggle(i)}
                        />
                    ))}
                </ul>

                <div className="shrink-0 border-t border-[rgba(124,158,248,0.12)] px-5 py-4">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
                            Progress
                        </span>

                        <span
                            className={`font-mono text-xs font-semibold ${
                                isAllDone
                                    ? "text-[var(--color-success)]"
                                    : "text-[var(--color-accent)]"
                            }`}
                        >
                            {completedCount} / {total}
                            {isAllDone && " ✓"}
                        </span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(124,158,248,0.08)]">
                        <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: `${pct}%`,
                                background: isAllDone
                                    ? "linear-gradient(90deg, #16a34a, #50fa7b)"
                                    : "linear-gradient(90deg, #4a7ff7, #7c9ef8)",
                                boxShadow: isAllDone
                                    ? "0 0 8px rgba(80,250,123,0.4)"
                                    : "0 0 8px rgba(124,158,248,0.3)",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}