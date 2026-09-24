export default function Loading() {
  return (
    <main className="min-h-fill px-1 py-1 md:px-4 md:py-4" style={{ background: "var(--color-bg-page)" }}>
      <section
        aria-label="Roadmap loading"
        className="w-full h-[calc(100dvh-5.5rem)] md:h-[calc(100dvh-7rem)]"
      >
        <div className="-m-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]">
          <div
            className="relative h-full w-full rounded-xl overflow-hidden"
            style={{
              border: "1px solid var(--color-accent-border)",
              background: "var(--color-bg-page)",
              boxShadow: "inset 0 0 80px rgba(124,158,248,0.03)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                aria-label="Loading roadmap"
                role="status"
                className="h-12 w-12 rounded-full border-[3px] border-transparent animate-spin"
                style={{
                  borderTopColor: "rgba(124, 158, 248, 0.45)",
                  borderRightColor: "rgba(124, 158, 248, 0.25)",
                  animationDuration: "0.75s",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
