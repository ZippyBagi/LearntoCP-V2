import { CPP_LANGUAGES } from "./judging-types";

export const MAX_BATCH_SIZE = 20;

export interface SubmissionRequest {
    sourceCode: string;
    languageId?: number;
    stdin?: string;
    expectedOutput?: string;
    cpuTimeLimit?: number;   // seconds
    memoryLimit?: number;    // KB,  262144 = 256 MB
}

export interface SubmissionResult {
    token: string;
    status: { id: number; description: string };
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    time: string | null;    // seconds
    memory: number | null;  // KB
    message: string | null;
}

export const STATUS = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
} as const;

export class Judge0Error extends Error {
    constructor(
        public readonly httpStatus: number,
        message: string,
    ) {
        super(message);
        this.name = "Judge0Error";
    }
}

export function compilerOptionsFor(languageId: number): string {
    const std = CPP_LANGUAGES.find((l) => l.id === languageId)?.std ?? "c++20";
    
    return `-O2 -std=${std}`;
}
