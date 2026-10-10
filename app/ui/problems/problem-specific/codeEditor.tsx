"use client"

import { ClipboardIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react"

let highlighterPromise: Promise<import("shiki").Highlighter> | null = null;

export function getHighlighter() {
    if (!highlighterPromise) {
        highlighterPromise = import("shiki").then((shiki) =>
            shiki.createHighlighter({ themes: ["dracula"], langs: ["cpp"] })
        );
    }

    return highlighterPromise;
}

interface CodeEditorProps{
    code : string;
    setCode : Dispatch<SetStateAction<string>>;
}
export default function CodeEditor({code, setCode} : CodeEditorProps){

    const t = useTranslations("CodeEditor")

    const [hl, setHl] = useState<import("shiki").Highlighter | null>(null);

    const editorRef = useRef<HTMLTextAreaElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);
    const gutterRef = useRef<HTMLDivElement>(null);

    const lineCount = useMemo(
        () => Math.max(1, code.split("\n").length),
        [code],
    );

    useEffect(() => {
        let active = true;

        getHighlighter().then((h) => {
            if (active){
                setHl(h);
            }
        });

        return () => { active = false};
    }, []);

    const inputHtml = useMemo(() => {
        if (!hl || !code) return null;

        try {
            const html = hl.codeToHtml(code, {lang: "cpp", theme: "dracula",
                transformers: [
                {
                    pre(node) {
                    delete node.properties.tabindex;
                    },
                },
                ]
            });
            return html.replace(/\n(<span class="line")/g, "$1"); //replace the newlines from shiki
        } catch {
            return null;
        }
    }, [hl, code]);

    const syncScroll = () => {

        const ta = editorRef.current;

        if (!ta) return;

        if (highlightRef.current) {
            highlightRef.current.scrollTop = ta.scrollTop;
            highlightRef.current.scrollLeft = ta.scrollLeft;
        }

        if (gutterRef.current) {
            gutterRef.current.scrollTop = ta.scrollTop;
        }
    };

    const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== "Tab") return;

        e.preventDefault();

        const ta = e.currentTarget;
        const { selectionStart, selectionEnd } = ta;
        const next = code.slice(0, selectionStart) + "  " + code.slice(selectionEnd);

        setCode(next);
        requestAnimationFrame(() => {
            ta.selectionStart = ta.selectionEnd = selectionStart + 2;
        });
    };

    return (

        <div className="overflow-hidden rounded-[10px] border border-border-subtle bg-bg-code">

            <div className="flex items-center gap-2 border-b border-border-subtle bg-bg-code-header px-4 py-[0.65rem] text-[0.85rem] text-text-muted">
                <ClipboardIcon className="size-4" />
                <span>{t("pasteLabel")}</span>
            </div>

            <div className="relative h-[22rem] bg-bg-code" style={{
                "--ce-pad-y": "1rem",
                "--ce-pad-x": "1rem",
                "--ce-gutter": "3.25rem",
                "--ce-font-size": "0.875rem",
                "--ce-line": "1.6",
            } as React.CSSProperties}>

                <div ref={gutterRef} aria-hidden className="absolute inset-0 right-auto w-[var(--ce-gutter)] overflow-hidden bg-bg-code py-[var(--ce-pad-y)] pr-[0.7rem] text-right text-[rgba(124,158,248,0.35)] pointer-events-none z-[1] code-input-gutter">
                    {Array.from({ length: lineCount }, (_, i) => (
                        <span key={i} className="block min-h-[calc(var(--ce-font-size)*var(--ce-line))]">
                            {i + 1}
                        </span>
                    ))}
                </div>

                {inputHtml && (<div ref={highlightRef} aria-hidden dangerouslySetInnerHTML={{ __html: inputHtml }} className="code-input-highlight"/>)}

                <textarea ref={editorRef} className={`code-input-area ${inputHtml ? "is-highlighted" : ""}`} placeholder={t('editorPlaceholder')}
                    value={code} onChange={(e) => setCode(e.target.value)} onScroll={syncScroll} onKeyDown={handleEditorKeyDown} wrap="off" spellCheck={false}
                />

            </div>


        </div>
    );
}