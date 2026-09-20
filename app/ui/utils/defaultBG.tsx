interface DefaultBGProps {
  children: React.ReactNode;         
}

export default function DefaultBG( {children} : DefaultBGProps){

    return (
        <div className="relative -m-3 h-[calc(100%+1.5rem)] overflow-hidden">
            <div aria-hidden className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(12,36,56,0.55) 0%, transparent 60%), radial-gradient(ellipse 80% 55% at 50% 110%, rgba(12,36,56,0.55) 0%, transparent 60%), var(--color-bg-page)",
                }}
            />
            <div aria-hidden className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(124,158,248,0.35)_1px,transparent_1.5px)]
                                                                        [background-size:24px_24px]
                                                                        [-webkit-mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_0%,transparent_90%)]
                                                                        [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_0%,transparent_90%)]"></div>
            {children}
		</div>
        
    )

}