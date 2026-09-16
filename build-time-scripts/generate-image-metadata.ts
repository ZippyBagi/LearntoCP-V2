import fs from "fs";
import path from "path";
import sizeOf from "image-size";

const imageDir = path.join(process.cwd(), "public", "lesson-images");
const outputPath = path.join(process.cwd(), "app", "scripts", "markdown", "imageDimensions.json");

const metadata: Record<string, { width: number; height: number }> = {};

for (const image of fs.readdirSync(imageDir)) {
    const imagePath = path.join(imageDir, image);

    if (!fs.statSync(imagePath).isFile()) {
        continue;
    }

    const dimensions = sizeOf(fs.readFileSync(imagePath));

    if (dimensions.width && dimensions.height) {
        metadata[image] = {
            width: dimensions.width,
            height: dimensions.height
        };
    }
}

fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));