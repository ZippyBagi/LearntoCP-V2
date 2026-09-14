'use client'

import { Menu } from "lucide-react";

interface ToggleSidebarButtonProps {
    setSidebarActiveFunction : () => void;
}

export default function ToggleSidebarButton({setSidebarActiveFunction} : ToggleSidebarButtonProps){

    return(<button

        onClick={setSidebarActiveFunction}
        
        className="group flex h-[52px] w-[52px] cursor-pointer items-center justify-center transition-colors duration-150 text-text-muted
            hover:bg-highlite-subtle hover:text-[var(--color-accent)]"
        aria-label="Toggle sidebar"
        >
            
        <Menu size={18} strokeWidth={2} />

    </button>)

}