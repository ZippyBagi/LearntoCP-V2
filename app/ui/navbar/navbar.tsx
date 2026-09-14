'use client';

import '@/app/globals.css'
import ToggleSidebarButton from './toggle_sidebar_button'
import Image from 'next/image';
import LanguageSelector from './languageSelector';
import AuthButton from './authButton';

interface NavbarProps{
    setSidebarActiveFunction: () => void;
}

export default function Navbar({setSidebarActiveFunction} : NavbarProps){

    return(<nav className="flex items-center w-full justify-between shrink-0 bg-bg-navbar
                            backdrop-blur-[12px] border-b border-b-border-subtle shadow-[0_1px_0_rgba(124,158,248,0.08)] h-[52px]">
        
        <div className="flex items-center gap-1">

            <ToggleSidebarButton setSidebarActiveFunction={setSidebarActiveFunction}></ToggleSidebarButton>

            <Image src="/no_bg_icon_logo.svg" alt="" width={40} height={40} draggable={false} className="select-none" loading='eager'/>

            <span className="text-sm font-bold tracking-wide select-none px-1 bg-[linear-gradient(90deg,#7c9ef8_0%,#a5b8fc_100%)] bg-clip-text text-transparent">LearnToCP</span>

        </div>

        <div className="flex items-center gap-3 pr-4">
            <LanguageSelector></LanguageSelector>
            <AuthButton></AuthButton>
        </div>
        
    </nav>)
}