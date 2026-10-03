import "server-only"

import { createClient } from "../supabase/server";
import { AcceptanceStat } from "./problem-types";
import { createAdminClient } from "../supabase/admin";

export async function getSolvedProblemSlugs() : Promise<Set<string>>{

    const supabase = await createClient();
    const { data, error } = await supabase.from("submissions").select("problem_slug").eq("verdict", "AC");

    if (error || !data) return new Set();

    return new Set(data.map((r: { problem_slug: string }) => r.problem_slug));

}

export async function getAcceptanceRate(slugs : string[]) : Promise<Map<string, AcceptanceStat>> {

    const stats : Map<string, AcceptanceStat> = new Map(slugs.map((s) => [s, {accepted:0, total:0, rate:null}]));

    if(slugs.length === 0) return stats;

    try{
        const supabase = createAdminClient();

        const { data, error } = await supabase.rpc("get_acceptance_stats", { slugs });
        
        if (error || !data) return stats;

        for (const row of data as {problem_slug: string; accepted: number; total: number}[]) {

            const stat = stats.get(row.problem_slug);
            if (!stat) continue;
            
            stat.accepted = Number(row.accepted);
            stat.total = Number(row.total);
            stat.rate = stat.total > 0 ? stat.accepted / stat.total : null;
        }
    }catch{
        return stats;
    }
    return stats;

}

export async function hasSolvedProblem(slug : string){

    const supabase = await createClient();
    const { count, error } = await supabase.from("submissions").select("id", { count: "exact", head: true }).eq("problem_slug", slug).eq("verdict", "AC");

    return !error && (count ?? 0) > 0;
    
}