export default function Loading() {
    return (
        <div className="flex min-h-full items-center justify-center" style={{ background: "var(--color-bg-page)" }}>

        <div
            aria-label="Loading"
            role="status"
            className="h-10 w-10 rounded-full border-[3px] border-transparent animate-spin"
            style={{
                borderTopColor: "rgba(124, 158, 248, 0.45)",
                borderRightColor: "rgba(124, 158, 248, 0.25)",
                animationDuration: "0.75s",
            }}
        />
        </div>
    );
}
