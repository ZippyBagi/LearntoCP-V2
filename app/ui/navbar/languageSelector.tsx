'use client'
import { getSmartRedirect } from '@/app/scripts/smartRedirect/smartRedirect';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Menu, MenuButton, MenuItem, MenuItems, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSelector(){

    const router = useRouter();
    const pathname = usePathname();

    const locale = useLocale();

    const t = useTranslations('Navbar')

    function changeLanguage(newLocale : string){

        const newPathname = getSmartRedirect(pathname,locale,newLocale);
        router.replace(newPathname, {locale: newLocale});
    }

    return (

        <Menu as="div" className="relative inline-block">

            <MenuButton className=" inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border-blue bg-bg-page px-3 py-2 text-sm font-semibold text-text-primary transition-colors duration-150
                                        hover:bg-bg-surface hover:inset-ring-accent-border-hover focus:outline-none cursor-pointer"
            >
                {t('language_select_button')}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-text-muted" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className=" w-40 overflow-hidden rounded-md border border-border-blue bg-bg-page shadow-[0_8px_32px_rgba(0,0,0,0.5)]
                                transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 focus:outline-none [--anchor-gap:8px]
                "
            >

                <MenuItem key='en'>
                    
                    <button
                        onClick={() => changeLanguage('en')}
                        className={`relative block w-full text-left px-4 py-2.5 text-sm text-text-primary bg-bg-page cursor-pointer transition-colors duration-100 border-l-2 focus:outline-none
                        ${locale === 'en' ? 'border-accent text-text-accent bg-bg-surface' : 'border-transparent hover:border-accent-border-hover hover:bg-bg-surface-hover hover:text-text-heading'}`}
                    >
                        English
                    </button>
                    
                </MenuItem>

                <MenuItem key='sr'>
                   
                    <button
                        onClick={() => changeLanguage('sr')}
                        className={`relative block w-full text-left px-4 py-2.5 text-sm text-text-primary bg-bg-page cursor-pointer transition-colors duration-100 border-l-2 focus:outline-none
                        ${locale === 'sr' ? 'border-accent text-text-accent bg-bg-surface' : 'border-transparent hover:border-accent-border-hover hover:bg-bg-surface-hover hover:text-text-heading'}`}
                    >
                        Srpski
                    </button>
            
                </MenuItem>
                
            </MenuItems>

        </Menu>

    )
}