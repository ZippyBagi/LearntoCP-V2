'use client';

import { usePathname } from "@/app/i18n/navigation";
import { createClient } from "@/app/scripts/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import signOut from "@/app/scripts/login/signOut";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default function AuthButton(){

    const locale = useLocale();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);

    const t = useTranslations('AuthButton');

    useEffect(() => {
        const supabase = createClient();

        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user ?? null);
            setLoaded(true);
        });

        const { data : {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setLoaded(true);
        })

        return () => subscription.unsubscribe();
    }, []);

    if(!user){

        const isOnLoginPage = pathname?.split("/")[2]?.toLowerCase() === "login";
        const loginHref = pathname && isOnLoginPage ? '/login' : `/login?next=${encodeURIComponent(pathname)}&src=nav`; //src=nav is for login panel message

        return <Link href={loginHref} className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold
                                                    bg-bg-page text-text-primary border border-border-blue transition-colors duration-150
                                                    hover:bg-bg-surface hover:inset-ring-accent-border-hover focus:outline-none"
                >{t("sign_in")}</Link>
    }

    const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
    const displayName = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "User";

    return (

        <Menu as="div" className="focus:outline-none relative inline-block">
            <MenuButton className="focus:outline-none flex cursor-pointer items-center rounded-full transition-all duration-150 border-2 border-border-blue">
                
                {avatarUrl ? (<Image src={avatarUrl} alt={displayName} width={30} height={30} className="rounded-full focus:outline-none"></Image>) : 
                (<span className="focus:outline-none flex h-[30px] w-[30px] items-center justify-center rounded-full text-sm font-bold select-none bg-accent-border text-accent">
                    {displayName.charAt(0).toUpperCase()}</span>)}
            
            </MenuButton>

            <MenuItems transition anchor="bottom end" className="w-56 rounded-md bg-bg-page overflow-hidden border border-border-blue
                                                                    shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition duration-100 ease-out
                                                                    data-[closed]:scale-95 data-[closed]:opacity-0 focus:outline-none [--anchor-gap:8px]
            ">
            
                <div className="border-b border-border-blue px-4 py-2.5 select-none">
                    <p className="truncate text-sm font-semibold text-text-heading">{displayName}</p>
                    <p className="truncate text-xs text-text-muted">{user.email}</p>
                </div>

                <MenuItem>{({focus}) => (

                    <button onClick={signOut} className={`relative flex w-full items-center gap-2 text-left px-4 py-2.5 text-sm text-text-primary bg-bg-page cursor-pointer
                                                transition-colors duration-100 border-l-2 border-transparent focus:outline-none 
                                                ${focus? "border-accent-border-hover bg-bg-surface-hover text-text-heading" 
                                                : 'hover:border-accent-border-hover hover:bg-bg-surface-hover hover:text-text-heading'}
                    `}>
                        
                        <LogOut size={15} strokeWidth={2}  className="text-text-muted"></LogOut>
                        {t('sign_out')}
                    
                    </button>

                )}</MenuItem>
            
            </MenuItems>

        </Menu>
    )

}