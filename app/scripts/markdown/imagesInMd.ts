import fs from "fs";
import { SITE_URL } from "../seo/seo-constants";


export default function ImagesInMd(filePath : string) : string[]{

    let source: string;
    try {
        source = fs.readFileSync(filePath, "utf8");
    } catch {
        return [];
    }

    const out: string[] = [];

    for(const match of source.matchAll(/^([ \t]*)!\[\[([^|\[\]]+)(?:\|([^\r\n]*?))?\]\]/gm)){

        const [fullMatch, indentation, imagePath, altText] = match;
        out.push(`${SITE_URL}/lesson-images/${imagePath}`);
    }

    return out;
}