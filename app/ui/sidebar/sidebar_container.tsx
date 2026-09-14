'use client'

import { usePathname } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SidebarContainerItem from "./sidebar_container_item"


interface SidebarContainerProps{

    name : string;
    hrefs: string[],
    names: string[],
}

export default function SidebarContainerNode({name, hrefs, names} : SidebarContainerProps){

    const pathname = usePathname();

    const hasActiveChild = hrefs.some((href) => pathname === href);

    const [open, setOpen] = useState(hasActiveChild);

    return (

        <div className="w-full overflow-hidden">

            <div onClick={() => setOpen(!open)} className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer select-none transition-all duration-150 hover:bg-highlite-subtle">

                <span className={`text-sm font-semibold transition-colors duration-150 ${open || hasActiveChild ? "text-accent" : "text-[rgba(200,218,240,0.85)]"} `}>
                    {name}
                </span>

                <ChevronDown
                    size={13}
                    className={`transition-transform duration-150 ${open ? "rotate-180" : "rotate-0"} ${ open || hasActiveChild ? "text-[var(--color-accent)]" : "text-[rgba(124,158,248,0.4)]"}`}
                />

            </div>

            <div
                className={`grid transition-all duration-150 ease-in-out ${ open && hrefs.length > 0 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0" }`}
            >
                <div className="overflow-hidden">
                    
                    <div className="border-t border-t-[rgba(124,158,248,0.1)]">

                        {hrefs.map((href, i) => (
                            <SidebarContainerItem key={href} name={names[i]} href={href} />
                        ))}
                    
                    </div>

                </div>
            
            </div>

        </div>

    )
}