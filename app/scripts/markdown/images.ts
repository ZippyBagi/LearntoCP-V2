import imageDimensionsData from "./imageDimensions.json" 

const imageDimensions: Record<string, { width: number; height: number }> = imageDimensionsData;

export default function processImages(html : string, IMAGE_ROOT_FOLDER : string, stash: (html: string, block: boolean) => string) : string{
   
    html = html.replace(/^([ \t]*)!\[\[([^|\[\]]+)(?:\|([^\r\n]*?))?\]\]/gm,
        (_ : string, whitespace : string, image : string, alt : string) =>
            {   

                const dimensions = imageDimensions[image];

                if (!dimensions) {
                    return `${whitespace}![[${image}|${alt}]]`;
                }

                const {width, height} = dimensions;
                return stash(`${whitespace}<img src="${IMAGE_ROOT_FOLDER}/${image}" alt="${alt}" width="${width}" height="${height}">`, true);
            
            }
    );

    return html;

}