'use client'

import { useState } from "react"
import Navbar from "../ui/navbar/navbar"
import Sidebar from "../ui/sidebar/sidebar"
import { SidebarContainer } from "../scripts/sidebar/generateSidebarContainers"


interface LayoutShellProps{

    children: React.ReactNode,
    containers : SidebarContainer[],
}

export default function LayoutShell({children,containers} : LayoutShellProps){

    const [sidebarActive, setSidebarActive] = useState(false);
    
    return(
        <div className="flex h-dvh w-screen flex-col overflow-hidden">
            
            <Navbar setSidebarActiveFunction={() => {setSidebarActive(!sidebarActive)}}></Navbar>
            
            <div className="relative flex min-h-0 flex-1">
                
                <Sidebar containers={containers}></Sidebar>

                <div className="min-w-0 flex-1 overflow-auto overscroll-contain p-3">
                    {children}
                </div>    
                
            </div>
            
    </div>
    )

}