import { createClient } from "../supabase/server";


export default async function getRoadmapProgress() : Promise<string[]>{
    
    const supabase = await createClient();
    const {data, error} = await supabase.from('roadmap_progress').select("item_id");

    if(error){
        console.error("[getRoadmapProgress] failed to load progress:");
        return [];
    }

    return data.map((row) => row.item_id);
    
}