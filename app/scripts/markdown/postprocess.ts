const COPY_BTN_SCRIPT = `
    navigator.clipboard.writeText(this.closest('.code-block-wrapper').querySelector('pre code').textContent);
    this.textContent = 'Copied!';
    this.classList.add('copied');
    setTimeout(() => { this.textContent = 'Copy'; this.classList.remove('copied'); }, 1800);
`.replace(/\s+/g, " ").trim();

export function postProcessHtml(html: string) : string{

    let content = html;

    // Promote paragraph header before code block into title bar
    content = content.replace(
        /<p>((?:(?!<\/p>)[\s\S])+?)<\/p>\n(<div class="code-block-wrapper[^"]*">)/g,
        (_, title, wrapperOpen) => {

            const trimmed = title.trim().replace(/<br\s*\/?>\n?/gi, " ").replace(/\s{2,}/g, " ").trim();

            if (/~!\s*$/.test(trimmed)) {
                const cleaned = trimmed.replace(/\s*~!\s*$/, "").trim();
                return cleaned ? `<p>${cleaned}</p>\n${wrapperOpen}` : wrapperOpen;
            }

            const header = `<div class="code-block-header">`
                + `<span class="code-block-title">${trimmed}</span>`
                + `<button class="code-copy-btn" onclick="${COPY_BTN_SCRIPT}">Copy</button>`
                + `</div>`;
            
            return `${wrapperOpen}${header}`;
        }
    );

    // <br>
    content = content.replace(
        /(<div class="(?:callout-content|tip-content)">)([\s\S]*?)(<\/div><\/div>)/g,
        (_, open, body, close) => `${open}${body.replace(/<br\s*\/?>/gi, "")}${close}`
    );

    // Wrap tables for responsive scrolling
    content = content.replace(/<table>/g, '<div class="table-wrapper"><table>')
                     .replace(/<\/table>/g, "</table></div>");

    // Add target="_blank" to external links
    content = content.replace(
        /<a href="(https?:\/\/[^"]+)"/g,
        '<a href="$1" class="external-link" target="_blank" rel="noopener noreferrer"'
    );

    return content
}

export function restoreRawHtml(html: string, store: string[]): string {
    return html
           .replace(/<p>\s*(RAWHTMLTOKEN\d+ENDRAWHTML)\s*<\/p>/g, "$1")
           .replace(/RAWHTMLTOKEN(\d+)ENDRAWHTML/g, (_, i) => store[Number(i)] ?? "");
}

export function generateTitleHeader(fileName: string): string {
    const title = fileName.replace(/\.md$/i, "")
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;")
                          .replace(/^[0-9]+/, "")
                          .trim();

    return `<h2 class="title">${title}</h2>\n`;
}