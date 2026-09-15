import { createHighlighter, Highlighter } from "shiki";

const CODE_THEME = "dracula";

const LANG_ALIASES: Record<string, string> = {
  "c++": "cpp"
};

const EXAMPLE_KIND: Record<string, "input" | "output"> = {
  input: "input",
  output: "output",
  ulaz: "input",
  izlaz: "output",
};

//Singleton highliter
const highlighterPromise = createHighlighter({
    themes: [CODE_THEME],
    langs: ["cpp"],
});

function decodeHtmlEntities(encoded: string): string {
    return encoded.replace(/&(amp|lt|gt|quot|#x26|#x3c|#x3e);/gi, (match) => {
        const map: Record<string, string> = {
            "&amp;": "&", "&#x26;": "&",
            "&lt;": "<", "&#x3c;": "<",
            "&gt;": ">", "&#x3e;": ">",
            "&quot;": '"',
        };
        return map[match.toLowerCase()] ?? match;
    });
}

export function stripBreaksInCodeBlocks(html: string): string {

    return html.replace(/(<pre[^>]*>[\s\S]*?<\/pre>)/g, (block) => block.replace(/<br\s*\/?>/gi, "\n"));
}

export function transformExampleFences(html: string): string {

    const regex = /<pre><code class="language-([\w+#-]+)[^"]*">([\s\S]*?)<\/code><\/pre>/g;

    return html.replace(regex, (full, lang: string, code: string) => {

        const kind = EXAMPLE_KIND[lang.toLowerCase()];
        if (!kind) return full;

        const body = code.replace(/\n$/, "");
        const label = lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase();

        let boxClass = `example-box example-${kind}`;
        
        if (kind === "output") {
            const plain = body.trim();

            if (/^true$/i.test(plain)) boxClass += " example-true";
            else if (/^false$/i.test(plain)) boxClass += " example-false";
        }

        return `<div class="example-io"><span class="example-label">${label}</span><pre class="${boxClass}">${body}</pre></div>`;
    });
}

export async function highlightCodeBlocks(html: string): Promise<string> {
    
    const highlighter = await highlighterPromise;
    const regex = /<pre><code class="language-([\w+#-]+)([^"]*)">([\s\S]*?)<\/code><\/pre>/g;
    const matches = [...html.matchAll(regex)];

    let resultHtml = html;

    for (const match of matches) {

        const [fullMatch, lang, , code] = match;
        const decodedCode = decodeHtmlEntities(code).replace(/\n$/, "");
        const normalizedLang = LANG_ALIASES[lang.toLowerCase()] ?? lang.toLowerCase();

        try {
            const highlighted = highlighter.codeToHtml(decodedCode, { lang: normalizedLang, theme: CODE_THEME, transformers:
                [{
                    pre(node) {
                        const existing = (node.properties.class ?? "") as string;
                        node.properties.class = `${existing} shiki-block`.trim();
                        node.properties["data-shiki"] = "true";
                    },
                },],
            });

            const wrapped = `<div class="code-block-wrapper not-prose">${highlighted}</div>`;
            
            resultHtml = resultHtml.replace(fullMatch, wrapped);

        } catch {
            // Unknown language - retain plain html
        }
    }

    return resultHtml;
}