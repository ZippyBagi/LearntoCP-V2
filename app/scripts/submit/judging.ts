import "server-only"
import { createAdminClient } from "@/app/scripts/supabase/admin";

import { JUDGING_TIMEOUT_MS, Verdict, TestResult, SubmissionRow, PublicSubmission } from "./judging-types";
import { STATUS, SubmissionResult } from "./judge0-types";
import { pollBatch } from "./judge0";

export function isFinal(statusId: number) {
    return statusId >= STATUS.ACCEPTED;
}

export function isAccepted(statusId: number) {
    return statusId === STATUS.ACCEPTED;
}

export function countPassed(results: TestResult[]): number {
  return results.filter((r) => isAccepted(r.statusId)).length;
}

export function allFinal(results: TestResult[]): boolean {
  return results.every((r) => isFinal(r.statusId));
}

export function deriveVerdict(results: TestResult[]): Verdict {

    if (results.every((r) => isAccepted(r.statusId))){
        return "AC";
    }
    
    if (results.some((r) => r.statusId === STATUS.COMPILATION_ERROR)){
        return "CE";
    }

    const firstFail = results.find((r) => isFinal(r.statusId) && !isAccepted(r.statusId))!;

    switch (firstFail.statusId) {
        case STATUS.WRONG_ANSWER:
            return "WA";
        case STATUS.TIME_LIMIT_EXCEEDED:
            return "TLE";
        case 13: // Internal Error
        case 14: // Exec Format Error
            return "IE";
        default:
            return "RE"; // 7–12: runtime errors
    }
}

export function mergePollWithResults(stored: TestResult[], polled: SubmissionResult[]) : { results: TestResult[]; compileOutput: string | null } {

    const byToken = new Map(polled.map((p) => [p.token, p]));

    let compileOutput: string | null = null;

    const results = stored.map((r) => {
        
        const fresh = byToken.get(r.token);

        if (!fresh || !isFinal(fresh.status.id)) return r;

        if (fresh.status.id === STATUS.COMPILATION_ERROR && fresh.compile_output) {
            compileOutput = fresh.compile_output;
        }

        return {
            ...r,
            statusId: fresh.status.id,
            time: fresh.time !== null ? parseFloat(fresh.time) : null,
            memory: fresh.memory ?? null,
        };
    });

    return { results, compileOutput };
}

export async function reconcileSubmission(row: SubmissionRow): Promise<SubmissionRow> {

    if (row.status !== "judging") return row;

    const pending = row.results.filter((r) => !isFinal(r.statusId));

    let results = row.results;
    let compileOutput: string | null = null;

    if (pending.length > 0) {
        try {
            const polled = await pollBatch(pending.map((r) => r.token));

            ({ results, compileOutput } = mergePollWithResults(row.results, polled));

        } catch (e) {
            console.error("reconcile: Judge0 poll failed", e);
        }
    }

    const done = results.length > 0 && allFinal(results);

    const timedOut = !done && Date.now() - new Date(row.created_at).getTime() > JUDGING_TIMEOUT_MS;

    const changed = JSON.stringify(results) !== JSON.stringify(row.results);

    if (!changed && !timedOut) return row;

    const updated: Partial<SubmissionRow> = {
        results,
        passed_count: countPassed(results),
        ...(compileOutput !== null && { compile_output: compileOutput }),
        ...(done && { status: "done" as const, verdict: deriveVerdict(results) }),
        ...(timedOut && { status: "error" as const, verdict: "IE" as const }),
    };

    const admin = createAdminClient();

    const { error } = await admin.from("submissions").update(updated).eq("id", row.id);
    
    if (error) {
        console.error("reconcile: verdict update failed", error);
    }

    return { ...row, ...updated };
}

export function toPublicSubmission(row: SubmissionRow): PublicSubmission {
    return {
        submissionId: row.id,
        problemId: row.problem_slug,
        done: row.status !== "judging",
        status: row.status,
        verdict: row.verdict,
        passed: row.passed_count,
        total: row.total_count,
        compileOutput: row.verdict === "CE" ? row.compile_output : null,
        createdAt: row.created_at,
    };
}
