'use client'

import { useState } from "react"
import Navbar from "../ui/navbar/navbar"

interface LayoutShellProps{

    children: React.ReactNode
}

export default function LayoutShell({children} : LayoutShellProps){

    const [sidebarActive, setSidebarActive] = useState(false);
    
    return(
        <div className="flex h-dvh w-screen flex-col overflow-hidden">
            
            <Navbar setSidebarActiveFunction={() => {setSidebarActive(!sidebarActive)}}></Navbar>

            <div className="min-w-0 flex-1 overflow-auto overscroll-contain p-3">
                    {children}
            </div>
    </div>
    )

}