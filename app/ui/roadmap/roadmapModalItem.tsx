"use client"

import { RoadmapNode } from "@/app/scripts/roadmap/roadmap-types";
import { useNavigation } from "@/app/scripts/sidebar/navigationContext";
import { CheckIcon } from "../utils/svgs";
import { Link } from "@/app/scripts/i18n/navigation";

const checkboxCheckedStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "1px solid rgba(80,250,123,0.6)",
    boxShadow: "0 0 6px rgba(34,197,94,0.3)",
};

const checkboxUncheckedStyle: React.CSSProperties = {
    background: "rgba(13,33,55,0.8)",
    border: "1px solid rgba(124,158,248,0.25)",
};

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

export default function ModalItem({item, checked,onToggle }: { item: RoadmapNode["items"][number]; checked: boolean; onToggle: () => void}) {
    
    const isProblem = item.isProblem;
    const { startNavigation } = useNavigation();

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

            <Link
                href={item.href}
                prefetch={true}
                onClick={() => startNavigation(item.href)}
                className={`relative flex min-w-0 flex-1 text-sm transition-colors duration-150 before:absolute before:-inset-y-3 before:-left-3 before:-right-3 before:content-[''] sm:before:-inset-y-2.5 ${
                    checked
                        ? "text-[rgba(80,250,123,0.4)] line-through decoration-[rgba(80,250,123,0.25)]"
                        : "text-[var(--color-text-heading)]"
                }`}
            >
                {item.label}
            </Link>
        </li>
    );
}