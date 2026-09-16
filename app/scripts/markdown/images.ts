import path from 'path';
import sizeOf from 'image-size';
import * as fs from 'fs';

export default function processImages(html : string, IMAGE_ROOT_FOLDER : string, stash: (html: string, block: boolean) => string) : string{

    html = html.replace(/^([ \t]*)!\[\[([^|\]]+)\|([^\]]+)\]\]/gm,
        (_, whitespace, image, alt) =>
            {   

                const imagePath = path.join(process.cwd(), 'public', IMAGE_ROOT_FOLDER, image);
                
                if (!fs.existsSync(imagePath)) {
                    return `${whitespace}![[${image}|${alt}]]`;
                }

                const imgBuffer = fs.readFileSync(imagePath);

                const dimensions = sizeOf(imgBuffer);

                const width = dimensions.width;
                const height = dimensions.height;

                return stash(`${whitespace}<img src="${IMAGE_ROOT_FOLDER}/${image}" alt="${alt}" width="${width}" height="${height}">`, true);
            
            }
    );

    return html;

}