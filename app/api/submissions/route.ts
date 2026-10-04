import { reconcileSubmission, toPublicSubmission } from "@/app/scripts/submit/judging";
import { SubmissionRow } from "@/app/scripts/submit/judging-types";
import { createClient } from "@/app/scripts/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const HISTORY_PAGE_SIZE = 50;

export async function GET(req: NextRequest) {

    const supabase = await createClient();
    const { data: auth } = await supabase.auth.getClaims();
    
    if (!auth?.claims?.sub) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const problemId = req.nextUrl.searchParams.get("problemId");
    
    if (!problemId) {
        return NextResponse.json({ error: "Missing problemId" }, { status: 400 });
    }

    const { data: rows, error } = await supabase.from("submissions").select("id, user_id, problem_slug, language_id, code, status, verdict, passed_count, total_count, results, compile_output, created_at")
        .eq("problem_slug", problemId)
        .order("created_at", { ascending: false })
        .limit(HISTORY_PAGE_SIZE);

    if (error) {
        console.error("submissions: history fetch failed", error);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }

    const reconciled = await Promise.all((rows as SubmissionRow[]).map((row) => reconcileSubmission(row)));

    return NextResponse.json({
        submissions: reconciled.map((row) => ({
            ...toPublicSubmission(row),
            code: row.code,
            runtime : row.results.some(r => r.time == null) ? null: Math.max(...row.results.map(r => r.time ?? -1)),
            memory : row.results.some(r => r.memory == null) ? null: Math.max(...row.results.map(r => r.memory ?? -1)),
        })),
    });
}