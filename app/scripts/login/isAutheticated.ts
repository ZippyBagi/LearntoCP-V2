import { createClient } from "../supabase/server";
import { redirect } from "../i18n/navigation";

export async function requireAuth(locale: string, next: string) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    if (!data?.claims) {
        const params = new URLSearchParams({ next });
        redirect({
            href: `/login?${params.toString()}`,
            locale,
        });
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    return !!data?.claims;
}
