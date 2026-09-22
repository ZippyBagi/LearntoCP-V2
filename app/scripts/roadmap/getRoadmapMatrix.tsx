import "server-only"
import { RoadmapItem, RoadmapMatrix } from "./roadmap-types"
import path from "path";
import fs, { readFileSync } from 'fs';
import { stripOrderPrefix } from "../sidebar/generateSidebarContainers";
import { cache } from "react";
import { getSmartRedirect } from "../smartRedirect/smartRedirect";


function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

function readNodeMeta(nodePath : string, dirName : string, locale : string) : { id: string; title: string } {

    const fallbackTitle = stripOrderPrefix(dirName);
   
    const meta = JSON.parse(fs.readFileSync(path.join(nodePath, "meta.json"),"utf-8"));
    const id =  typeof meta.id === "string" && meta.id;
    const localized =  meta[`${locale}-name`];
    const title = typeof localized === "string" && localized ? localized : fallbackTitle;
    if (!(typeof meta.id === "string" && meta.id)) {
        console.warn(`[getRoadmapMatrix] No meta.json id for node "${dirName}"`);
    }
    return {id, title};
    
}

function readItemFile(raw : string) : Record <string, string> {
    const parsed : Record<string, string> = {};
    for (const line of raw.trim().split("\n")){
        const m = line.trim().match(/^([\w-]+):\s*(.+)$/);
        if(m) parsed[m[1]] = m[2].trim();
    }
    return parsed;
}   

function localeHref(rawHref : string, locale : string) : string{
    
    if(locale == 'en'){
        return rawHref;
    }

    return getSmartRedirect(rawHref, 'en', locale);
}

export const getRoadmapMatrix = cache((locale : string) : RoadmapMatrix => {

    const ROOT_DIR =  path.join(process.cwd(), "content", "roadmap_data");

    if(!fs.existsSync(ROOT_DIR)){
        console.warn(`directory not found ${ROOT_DIR}`);
    }

    const layerDirs = fs.readdirSync(ROOT_DIR, {withFileTypes : true}).filter((entry) => entry.isDirectory())
                                                                      .filter((entry) => /^L\d+$/.test(entry.name)) //Tests if it follows L1, L2, Lx..
                                                                      .sort((a,b) => {return  parseInt(a.name.slice(1),10) - parseInt(b.name.slice(1), 10)});
    
    return layerDirs.map((layerDir) => {

        const layerPath = path.join(ROOT_DIR, layerDir.name);

        const nodeDirs = fs.readdirSync(layerPath, {withFileTypes : true}).filter((entry) => entry.isDirectory())
                                                                          .sort((a,b) => a.name.localeCompare(b.name));
        
        return nodeDirs.map((nodeDir) => {

            const nodePath = path.join(layerPath, nodeDir.name);
            const {id : nodeId, title} = readNodeMeta(nodePath,nodeDir.name, locale); 

            const items = fs.readdirSync(nodePath, {withFileTypes : true}).filter((entry) => entry.isFile())
                .filter((entry) => entry.name.endsWith(".md") || entry.name.endsWith(".txt"))
                .sort((a,b) => a.name.localeCompare(b.name))
                .map((file) => 
                {
                    const parsed = readItemFile(fs.readFileSync(path.join(nodePath, file.name), "utf-8"));
                    const fileBase = file.name.replace(/\.txt$/, "").replace(/\.md$/, "");   
                    
                    if (!parsed.id) {
                        console.warn(`[getRoadmapMatrix] No id in "${nodeDir.name}/${file.name}"`);
                    }
                    const label = parsed[`${locale}-name`] ?? stripOrderPrefix(fileBase);

                    const isProblem : RoadmapItem["isProblem"] = parsed.type === "problem";
                    
                    const rawHref = parsed.href ?? "#";

                    const slug = isProblem ? safeDecode(rawHref.split("/").filter(Boolean).pop() ?? "") : undefined;
                    
                    return {id: parsed.id, label, href: localeHref(rawHref, locale), isProblem, slug};
                    
                });
            
            return { id: nodeId, title : title, items : items };
        });
    });
});
