'use client'

import { useCallback, useEffect, useMemo, useState } from "react"
import Navbar from "../ui/navbar/navbar"
import Sidebar from "../ui/sidebar/sidebar"
import { SidebarContainer } from "../scripts/sidebar/generateSidebarContainers"
import { usePathname } from "../scripts/i18n/navigation"
import { NavigationContext } from "../scripts/sidebar/navigationContext"
import LessonSkeleton from "../ui/Lessons/lessonSkeleton"


function isLessonHref(href: string): boolean {
  return href.includes('/Theory/');
}

interface LayoutShellProps{

    children: React.ReactNode,
    containers : SidebarContainer[],
}

export default function LayoutShell({children,containers} : LayoutShellProps){

    const [sidebarActive, setSidebarActive] = useState(true);

    const pathname = usePathname();
    const [pendingHref, setPendingHref] = useState<string | null>(null);
    
    useEffect(() => {
        setPendingHref(null);
    }, [pathname]);
    
    const startNavigation = useCallback(
        (href: string) => {
            
            if (!isLessonHref(href)) return;
            if (href === pathname) return;
            
            setPendingHref(href);
        },[pathname]
    );

    const contextValue = useMemo(
        () => ({ pendingHref, startNavigation }),
        [pendingHref, startNavigation],
    );
    
    const showingLessonSkeleton = pendingHref !== null;

    return(
        <NavigationContext.Provider value={contextValue}>
            <div className="flex h-dvh w-screen flex-col overflow-hidden">
            
                <Navbar setSidebarActiveFunction={() => {setSidebarActive(!sidebarActive)}}></Navbar>
                
                <div className="relative flex min-h-0 flex-1">
                    
                    <Sidebar containers={containers} toggled={sidebarActive}></Sidebar>

                    <div className="min-w-0 flex-1 overflow-auto overscroll-contain p-3">
                        {showingLessonSkeleton ? <LessonSkeleton></LessonSkeleton> : children}
                    </div>    
                    
                </div>
                
            </div>
        </NavigationContext.Provider>
    )
}