'use client'

import { Link, usePathname, useRouter } from "@/app/scripts/i18n/navigation"
import { useNavigation } from "@/app/scripts/sidebar/navigationContext";

interface SidebarContainerItemProps{

    name: string,
    href: string,

}

export default function SidebarContainerItem({name, href} : SidebarContainerItemProps){

    const pathname = usePathname();
    const isActive = pathname === href;
    const { startNavigation } = useNavigation();

    return (

        <Link href={href} prefetch={true} onClick={() => startNavigation(href)} className={`flex items-center gap-2.5 py-2 text-sm select-none transition-all duration-150 border-l-[3px] py-? pr-3.5 pl-[calc(0.875rem-3px)]
                                                         transition-colors ${ isActive ? 
                                                        "border-l-[var(--color-accent)] bg-[rgba(124,158,248,0.08)] text-[var(--color-accent)]" 
                                                        : "border-l-transparent bg-transparent text-[rgba(200,218,240,0.6)] hover:bg-[rgba(124,158,248,0.06)] hover:text-[var(--color-text-heading)]"
        }`}>
        
        <span
            className={`w-1 h-1 rounded-full shrink-0 transition-all duration-150 bg-[var(--color-accent)] ${isActive ? "opacity-100" : "opacity-40"}`}
        />

        <span>{name}</span>
        
        </Link>
    )

}