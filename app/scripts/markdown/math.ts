import katex from "katex"

export function renderMath(expr : string, displayMode : boolean) : string{
    
    try{
        return katex.renderToString(expr, {displayMode, throwOnError: false, output: "html"});
    } catch{
        return expr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
       
}

export function processMathBlocks( markdown : string, stash : (html : string, block : boolean) => string) : string{

    //block math inside ($$ ... $$)
    let processed = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => stash(`<div class="math math-block">${renderMath(expr.trim(), true)}</div>`, true));

    // inline math ($ ... $)
    return processed.replace(/\$([^\n$]+?)\$/g, (_, expr) => stash(`<span class="math math-inline">${renderMath(expr.trim(), false)}</span>`, false));

}


