'use client';

interface SectionLabelProps{

    name : string
}

export default function SectionLabel({name} : SectionLabelProps){
    return (
        <div className="px-3.5 pt-3 pb-1.5 text-xs font-bold tracking-widest uppercase select-none text-[rgba(124,158,248,0.4)]">
            <h1>{name}</h1>
        </div>
    );
}