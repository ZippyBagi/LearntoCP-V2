export const SUBMIT_COOLDOWN_S = 30;
export const DAILY_SUBMISSION_LIMIT = 30;

export const MAX_CODE_LENGTH = 50_000;

export const JUDGING_TIMEOUT_MS = 5 * 60 * 1000;

export interface TestResult {
    name: string;
    token: string;
    /** Judge0 status id (1 queue, 2 running, 3 AC, 4 WA, 5 TLE, 6 CE, 7+ RE/IE) */
    statusId: number;
    time: number | null; // seconds
    memory: number | null; // KB
}

export type Verdict = "AC" | "WA" | "TLE" | "RE" | "CE" | "IE";

export interface SubmissionRow {
    id: string;
    user_id: string;
    problem_slug: string;
    language_id: number;
    code: string;
    status: "judging" | "done" | "error";
    verdict: Verdict | null;
    passed_count: number;
    total_count: number;
    results: TestResult[];
    compile_output: string | null;
    created_at: string;
}

export interface PublicSubmission {
    submissionId: string;
    problemId: string;
    done: boolean;
    status: SubmissionRow["status"];
    verdict: Verdict | null;
    passed: number;
    total: number;
    compileOutput: string | null;
    createdAt: string;
    runtime?: number | null;
    memory?: number | null;
    code?: string;
}

export interface CppLanguage {
  id: number;
  label: string;
  std: string;
}

export const CPP_LANGUAGES: readonly CppLanguage[] = [
  { id: 105, label: "C++ (GCC 14.1.0)",  std: "c++20" },
  { id: 54,  label: "C++ (GCC 9.2.0)",   std: "c++2a" },
  { id: 53,  label: "C++ (GCC 8.3.0)",   std: "c++17" },
  { id: 52,  label: "C++ (GCC 7.4.0)",   std: "c++17" },
  { id: 76,  label: "C++ (Clang 7.0.1)", std: "c++17" },
] as const;

export const DEFAULT_LANGUAGE_ID = 105;

export function isSupportedLanguageId(id: number): boolean {
  return CPP_LANGUAGES.some((l) => l.id === id);
}