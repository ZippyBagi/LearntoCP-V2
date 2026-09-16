import "server-only";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { processMathBlocks } from "./math";
import { processObsidianSyntax } from "./obsidian";
import {stripBreaksInCodeBlocks,transformExampleFences,highlightCodeBlocks} from "./code";
import {postProcessHtml, restoreRawHtml,generateTitleHeader} from "./postprocess";

export interface markdownToHTMLProps {
    markdown : string;
    fileName : string;
    includeTitle? : boolean;
    locale? : string;
}

const IMAGE_ROOT_FOLDER = 'lesson-images';

export default async function markdownToHTML({markdown, fileName, includeTitle, locale} : markdownToHTMLProps){

    const rawHtml: string[] = [];

    const stash = (html: string, block: boolean): string => {
        const token = `RAWHTMLTOKEN${rawHtml.length}ENDRAWHTML`;
        rawHtml.push(html);
        return block ? `\n\n${token}\n\n` : token;
    };

    let content = markdown;

    //1. pre-process non-standard syntaxes & protect code blocks
    const placeholders: string[] = [];

    content = content.replace(/(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`)/g, (match) => {
        const token = `CODE_PLACEHOLDER_${placeholders.length}`;
        placeholders.push(match);
        return token;
    });

    content = processObsidianSyntax(content, IMAGE_ROOT_FOLDER, stash);
    content = processMathBlocks(content, stash);

    //return the code blocks
    content = content.replace(/CODE_PLACEHOLDER_(\d+)/g, (_, i) => placeholders[Number(i)]);
    

    //3. Remark
    const processed = await remark().use(remarkGfm)
                                    .use(remarkBreaks)
                                    .use(html, { sanitize: false })
                                    .process(content);

    content = processed.toString();

    //4. Post processing
    content = restoreRawHtml(content, rawHtml);
    content = stripBreaksInCodeBlocks(content);
    content = transformExampleFences(content);
    content = await highlightCodeBlocks(content);
    content = postProcessHtml(content);

    if (includeTitle) {
        content = generateTitleHeader(fileName) + content;
    }

    return content;
}