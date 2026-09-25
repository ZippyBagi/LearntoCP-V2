
export default function LessonSkeleton() {
    const textBlock = "rounded bg-[#0a1e2e]";
    const codeLine = "rounded bg-[#122a42]";

    return (
        <div className="max-w-none animate-pulse" aria-label="Loading lesson" role="status">
            <div className="flex flex-col items-center pb-3 mb-8 border-b border-[rgba(124,158,248,0.15)]">
                <div className={`h-11 w-[45%] ${textBlock}`} />
            </div>

            <div
                className="mb-8 rounded-r-md py-4 px-4 border-l-[3px] border-[#4b5563]"
                style={{ background: "rgba(255,255,255,0.03)" }}
            >
                <div className={`h-4 w-[92%] ${textBlock} mb-2.5`} />
                <div className={`h-4 w-[74%] ${textBlock}`} />
            </div>

            <div className="mb-6 space-y-2.5">
                <div className={`h-4 w-full ${textBlock}`} />
                <div className={`h-4 w-[72%] ${textBlock}`} />
            </div>

            <div className="mb-8 rounded-md overflow-hidden border border-[rgba(124,158,248,0.12)]">

                <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "var(--color-bg-code-header)" }}>
                    <div className={`h-3.5 w-28 ${codeLine}`} />
                    <div className={`h-6 w-12 ${codeLine}`} />
                </div>

                <div className="px-4 py-4 space-y-2.5" style={{ background: "var(--color-bg-code)" }}>
                    <div className={`h-3 w-[85%] ${codeLine}`} />
                    <div className={`h-3 w-[68%] ${codeLine}`} />
                    <div className={`h-3 w-[78%] ${codeLine}`} />
                    <div className={`h-3 w-[55%] ${codeLine}`} />
                    <div className={`h-3 w-[64%] ${codeLine}`} />
                    <div className={`h-3 w-[42%] ${codeLine}`} />
                    <div className={`h-3 w-[36%] ${codeLine}`} />
                    <div className={`h-3 w-[22%] ${codeLine}`} />
                </div>
            </div>

            <div className="mb-10 space-y-2.5">
                <div className={`h-4 w-full ${textBlock}`} />
                <div className={`h-4 w-[58%] ${textBlock}`} />
            </div>

            <div className={`h-9 w-[30%] ${textBlock} mb-5`} />

            <div className="mb-6 space-y-2.5">
                <div className={`h-4 w-[70%] ${textBlock}`} />
            </div>

            <ul className="space-y-3 pl-6">
                {["55%", "65%", "48%", "38%"].map((w, i) => (
                <li key={i} className="flex items-center gap-3">
                    <span
                    aria-hidden
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "rgba(124,158,248,0.5)" }}
                    />
                    <span className={`h-4 block ${textBlock}`} style={{ width: w }} />
                </li>
                ))}
            </ul>
        </div>
    );
}
