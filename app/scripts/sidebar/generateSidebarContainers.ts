import { cache } from "react";
import "server-only"
import fs from "fs";
import path from "path";

interface SidebarContainer {
    name: string;
    hrefs : string[];
    names: string[];
}

export type {SidebarContainer};

export function stripOrderPrefix(name : string) : string{
    return name.replace(/^\d+\s+/, "");
}

function getOrderValue(name : string) : number {
    const match = name.match(/^(\d+)\s+/);
    return match ? parseInt(match[1], 10) : Infinity;
}

export const generateSidebarContainers = cache((locale : string) : SidebarContainer[] => {

    const root =  path.join(process.cwd(), 'content', locale);

    if(!fs.existsSync(root)){
        console.warn(`[generateSidebarContainers] Directory not found: ${root}`);
        return [];
    }
    
    const folders = fs.readdirSync(root, {withFileTypes: true})
                    .filter((entry) => entry.isDirectory())
                    .filter((entry) => !entry.name.startsWith("."))
                    .filter((entry) => !(entry.name == "Hidden"))
                    .map((entry) => entry.name)
                    .sort((a, b) => getOrderValue(a) - getOrderValue(b));

    return folders.map((folderName) : SidebarContainer => {

        const folderPath = path.join(root, folderName);
        const displayFolderName = stripOrderPrefix(folderName);

        const mdFiles = fs.readdirSync(folderPath, {withFileTypes : true})
                        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
                        .map((entry) => entry.name)
                        .sort((a, b) => getOrderValue(a) - getOrderValue(b));
        
        const names = mdFiles.map((file) => stripOrderPrefix(path.basename(file, ".md")));

        const hrefs = names.map((name) => `/Theory/${encodeURIComponent(displayFolderName)}/${encodeURIComponent(name)}`);

        return {name : displayFolderName, hrefs : hrefs, names: names};

    });

});