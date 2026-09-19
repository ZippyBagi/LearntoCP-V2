'use server'

import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server"
import { headers } from "next/headers"
import { redirect as nextRedirect} from "next/navigation";

export async function signInWithGoogle(){

    const supabase = await createClient();
    const origin = (await headers()).get('origin');

    const locale = await getLocale();

    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', 
        options: {
            redirectTo: `${origin}/auth/callback`
        }
    });

    if(error) {
        console.error(error);
        nextRedirect("/login?error=auth-failed");
    }

    if(data.url){
        nextRedirect(data.url);
    }

}