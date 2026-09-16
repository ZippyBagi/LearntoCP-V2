import processImages from "./images";
import {markdownToHTMLProps} from "./mdToHTML";

function capitalize(str : string) : string{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function processObsidianSyntax(markdown : string, IMAGE_ROOT_FOLDER : string, stash : (html : string, block : boolean) => string) : string {

    let content = markdown;

    //Tip box (-g> ...)
    content = content.replace(/^-g>.*(?:\n-g>.*)*/gm, (block) => {
        const bodyContent = block.replace(/^-g> ?/gm, "").trim();
        return `<div class="tip-box tip-green"><div class="tip-content">\n\n${bodyContent}\n\n</div></div>\n\n`;
    });

    //Tip box (-r> ...)
    content = content.replace(/^-r>.*(?:\n-r>.*)*/gm, (block) => {
        const bodyContent = block.replace(/^-r> ?/gm, "").trim();
        return `<div class="tip-box tip-red"><div class="tip-content">\n\n${bodyContent}\n\n</div></div>\n\n`;
    });

    // Images
    content = processImages(markdown,IMAGE_ROOT_FOLDER,stash);

    //Note embeds, Wikilinks, tags, blocks
    content = content
        .replace(/!\[\[([^\]]+)\]\]/g, '<div class="note-embed" data-note="$1"><span class="note-embed-title">$1</span></div>')
        .replace(/\[\[([^\]]+)#\^([a-zA-Z0-9-]+)\]\]/g, '<a class="wikilink block-link">$1 ^$2</a>')
        .replace(/\[\[#([^\]]+)\]\]/g, '<a class="wikilink heading-link">$1</a>')
        .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<a class="wikilink">$2</a>')
        .replace(/\[\[([^\]]+)\]\]/g, '<a class="wikilink">$1</a>')
        .replace(/==([^=]+)==/g, "<mark>$1</mark>")
        .replace(/%%[\s\S]*?%%/g, "")
        .replace(/(^|\s)#([a-zA-Z][a-zA-Z0-9/_-]*)(?=\s|$)/gm, '$1<a class="tag">#$2</a>')
        .replace(/ \^([a-zA-Z0-9-]+)$/gm, ' <span class="block-ref" id="^$1"></span>');
    
    return content;
    
}