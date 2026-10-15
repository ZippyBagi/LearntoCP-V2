import { MetadataRoute } from "next";
import { locales } from "./scripts/i18n/routing";
import { DEFAULT_LOCALE, SITE_URL } from "./scripts/seo/seo-constants";
import { localizedPath } from "./scripts/seo/seoUtils";
import path from "path";
import fs from 'fs';
import { stripOrderPrefix } from "./scripts/sidebar/generateSidebarContainers";
import { getProblemSlugs } from "./scripts/problems/getProblems";
import ImagesInMd from "./scripts/seo/imagesInMd";

const abs = (p: string) => `${SITE_URL}${p}`;

function languagesFor(routePath: string): Record<string, string> {

    const languages: Record<string, string> = {};

    for (const l of locales){
        languages[l] = abs(localizedPath(l, routePath));
    } 

    languages["x-default"] = abs(localizedPath(DEFAULT_LOCALE, routePath));

    return languages;

}

function staticEntries(): MetadataRoute.Sitemap {
    
    const routes: Array<{ path: string; priority: number }> = [
        { path: "", priority: 1.0 },
        { path: "Problems", priority: 0.9 },
        { path: "roadmap", priority: 0.8 },
        { path: "about-us", priority: 0.5 },
    ];

    return routes.flatMap(({ path: routePath, priority }) =>
        locales.map((locale) => ({
            url: abs(localizedPath(locale, routePath)),
            changeFrequency: "weekly" as const,
            priority,
            alternates: { languages: languagesFor(routePath) },
        })),
    );
}

function lessonEntries(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {

        const root = path.join(process.cwd(), 'content', locale);
        
        if (!fs.existsSync(root)) continue;

        const folders = fs.readdirSync(root, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith("."));

        for (const folderEntry of folders) {
            
            const folderPath = path.join(root, folderEntry.name);
            const displayFolder = stripOrderPrefix(folderEntry.name);

            const files = fs.readdirSync(folderPath, { withFileTypes: true }).filter((e) => e.isFile() && e.name.endsWith(".md"));

            for (const file of files) {

                const displayLesson = stripOrderPrefix(path.basename(file.name, ".md"));
                const routePath = `Theory/${encodeURIComponent(displayFolder)}/${encodeURIComponent(displayLesson)}`;
                const filePath = path.join(folderPath, file.name);

                let lastModified: Date | undefined;
                try {
                    lastModified = fs.statSync(filePath).mtime;
                } catch {
                    //omit when doesn't exist
                }

                const images = ImagesInMd(filePath);

                entries.push({
                    url: abs(localizedPath(locale, routePath)),
                    ...(lastModified ? { lastModified } : {}),
                    changeFrequency: "monthly",
                    priority: 0.7,
                    images:images
                });
            }
        }
    }

    return entries;
}

function problemEntries(): MetadataRoute.Sitemap {

    return getProblemSlugs().flatMap((problem) => {

        const routePath = `Problems/${encodeURIComponent(problem)}`;

        return locales.map((locale) => ({
            url: abs(localizedPath(locale, routePath)),
            changeFrequency: "monthly" as const,
            priority: 0.6,
            alternates: { languages: languagesFor(routePath) },
        }));
    });

}

export default function sitemap(): MetadataRoute.Sitemap {
    return [...staticEntries(), ...lessonEntries(), ...problemEntries()];
}
