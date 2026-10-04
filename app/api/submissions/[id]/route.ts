import { reconcileSubmission, toPublicSubmission } from "@/app/scripts/submit/judging";
import { SubmissionRow } from "@/app/scripts/submit/judging-types";
import { createClient } from "@/app/scripts/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET( _req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getClaims();
    
    if (!auth?.claims?.sub) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: row, error } = await supabase.from("submissions").select("id, user_id, problem_slug, language_id, code, status, verdict, passed_count, total_count, results, compile_output, created_at").eq("id", id).maybeSingle<SubmissionRow>();
    
    if (error) {
        console.error("submissions/[id]: fetch failed", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }

    if (!row) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(toPublicSubmission(await reconcileSubmission(row)));
}