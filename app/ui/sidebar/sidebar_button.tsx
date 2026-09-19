'use client';

import { Link, usePathname } from "@/app/scripts/i18n/navigation"

interface SidebarButtonProps{
    name : string,
    href : string
}

export default function SidebarButton({name, href} : SidebarButtonProps){

    const pathname = usePathname();

    const isActive = (href == pathname || (href !== "/" && pathname.startsWith(`${href}/`)));

    return (

        <Link href={href} prefetch={true} 
        className={`flex w-full items-center gap-2.5 py-2.5 pr-3.5 text-sm font-medium select-none transition-all duration-150 
                        ${isActive ? 'text-accent' : 'text-text-muted'} ${isActive ? 'bg-highlite-subtle' : 'bg-transparent'}
                        border-l-[3px] ${isActive ? "border-l-accent" : "border-l-transparent"} pl-[calc(0.875rem-3px)] 
                        ${isActive ? "text-[var(--color-text-heading)]" : "text-[rgba(200,218,240,0.7)] hover:text-[var(--color-text-heading)] hover:bg-[rgba(124,158,248,0.07)]"}
                        `}>
            <span>{name}</span>
        </Link>
    )
}