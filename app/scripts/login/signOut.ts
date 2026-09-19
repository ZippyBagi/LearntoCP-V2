import { createClient } from "../supabase/client";

export default async function signOut(){

    const supabase = createClient();
    await supabase.auth.signOut();
    
    window.location.reload();
}