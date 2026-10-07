import { CPP_LANGUAGES } from "@/app/scripts/submit/judging-types";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface VersionSelectProps{
    value : number;
    onChange: (languageId : number) => void;
    disabled : boolean;
}

export default function VersionSelect({value, onChange, disabled=false} : VersionSelectProps){
    const current = CPP_LANGUAGES.find((l) => l.id === value) ?? CPP_LANGUAGES[0];

    return(
        <Menu as="div" className="relative inline-block">
            <MenuButton disabled={disabled} className=" inline-flex w-full items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold
                bg-bg-page text-text-primary border border-border-blue transition-colors duration-150 hover:bg-bg-surface hover:inset-ring-accent-border-hover
                focus:outline-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {current.label}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-text-muted" />
            </MenuButton>

            <MenuItems transition anchor="bottom end" className="w-48 rounded-md bg-bg-page overflow-hidden border border-border-blue shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 focus:outline-none [--anchor-gap:8px]"
            >
                {CPP_LANGUAGES.map((lang) => (
                    <MenuItem key={lang.id}>
                        <button onClick={() => onChange(lang.id)} className={` relative block w-full text-left px-4 py-2.5 text-sm text-text-primary bg-bg-page cursor-pointer
                                transition-colors duration-100 border-l-2 focus:outline-none ${lang.id === value ? 'border-accent text-text-accent bg-bg-surface' : 'border-transparent hover:border-accent-border-hover hover:bg-bg-surface-hover hover:text-text-heading'}`}
                        >
                            {lang.label}
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}