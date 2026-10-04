"use client"

interface SubmitPanelProps{
    slug : string;
    locale : string;
    time_limit : number;
    memory_limit : number;
    onSolved? : () => void; 
}

export default function SubmitPanel({slug,locale,time_limit,memory_limit,onSolved} : SubmitPanelProps){
    return <h1>Hi</h1>
}