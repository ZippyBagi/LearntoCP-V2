import "server-only"

import { compilerOptionsFor, Judge0Error, MAX_BATCH_SIZE, SubmissionRequest, SubmissionResult } from "./judge0-types";
import { DEFAULT_LANGUAGE_ID } from "./judging-types";

const JUDGE0_URL = process.env.JUDGE0_URL!;
const RAPIDAPI_KEY = process.env.JUDGE0_RAPIDAPI_KEY!;
const RAPIDAPI_HOST = process.env.JUDGE0_RAPIDAPI_HOST!;

function toJudge0Payload(req: SubmissionRequest) {
    const languageId = req.languageId ?? DEFAULT_LANGUAGE_ID;
    return {
        language_id: languageId,
        compiler_options: compilerOptionsFor(languageId),
        source_code: req.sourceCode,
        stdin: req.stdin ?? "",
        expected_output: req.expectedOutput ?? null,
        cpu_time_limit: req.cpuTimeLimit ?? 2.0,
        memory_limit: req.memoryLimit ?? 262144,
    };
}

export async function submitBatch(submissions: SubmissionRequest[]): Promise<string[]> {

    const tokens: string[] = [];

    for (let i = 0; i < submissions.length; i += MAX_BATCH_SIZE) {

        const chunk = submissions.slice(i, i + MAX_BATCH_SIZE);

        const res = await fetch(`${JUDGE0_URL}/submissions/batch?base64_encoded=false`, { method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": RAPIDAPI_HOST
            }, body: JSON.stringify({ submissions: chunk.map(toJudge0Payload)}) }
        );
        
        if (!res.ok) {
            throw new Judge0Error(res.status, `Judge0 batch submit failed: ${res.status} ${await res.text()}`);
        }

        const data: { token: string }[] = await res.json();

        tokens.push(...data.map((d) => d.token));
    }

    return tokens;
}

export async function pollBatch(tokens: string[]): Promise<SubmissionResult[]> {

    const results: SubmissionResult[] = [];

    for (let i = 0; i < tokens.length; i += MAX_BATCH_SIZE) {

        const chunk = tokens.slice(i, i + MAX_BATCH_SIZE);
        
        const res = await fetch(`${JUDGE0_URL}/submissions/batch?tokens=${chunk.join(",")}&base64_encoded=false&fields=token,status,stdout,stderr,compile_output,time,memory,message`,
            { headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": RAPIDAPI_HOST
            }
        });

        if (!res.ok) {
            throw new Judge0Error(res.status, `Judge0 poll failed: ${res.status} ${await res.text()}`);
        }

        const data: { submissions: SubmissionResult[] } = await res.json();
        results.push(...data.submissions);
    }

    return results;
}