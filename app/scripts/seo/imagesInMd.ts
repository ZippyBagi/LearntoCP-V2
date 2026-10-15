import fs from "fs";
import { SITE_URL } from "../seo/seo-constants";
import imageDimensionsData from "@/app/scripts/markdown/imageDimensions.json"

const imageDimensions: Record<string, { width: number; height: number }> = imageDimensionsData;

interface imageObject{
    url : string;
    width: number;
    height : number;
    alt : string;
}

export default function ImagesInMd(filePath : string) : imageObject[]{

    let source: string;
    try {
        source = fs.readFileSync(filePath, "utf8");
    } catch {
        return [];
    }

    const out: imageObject[] = [];

    for(const match of source.matchAll(/^([ \t]*)!\[\[([^|\[\]]+)(?:\|([^\r\n]*?))?\]\]/gm)){

        const [fullMatch, indentation, imagePath, altText] = match;

        const dimensions = imageDimensions[imagePath];

        if (!dimensions) {
            console.warn(
                `[sitemap] Missing image dimensions for "${imagePath}" in ${filePath}`
            );
            continue;
        }

        const {width, height} = dimensions;

        out.push({
            url: `${SITE_URL}/lesson-images/${imagePath}`,
            width: width,
            height : height,
            alt : altText,
        });
    }

    return out;
}