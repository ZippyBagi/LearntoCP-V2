import fs, { readdirSync } from "fs";
import path from "path";

const rootPath = path.join(process.cwd(), 'content');

const outputPathMatchSection = path.join(process.cwd(), "app", "scripts", "smartRedirect", "matchSection.json");
const outputPathMatchFile = path.join(process.cwd(), "app", "scripts", "smartRedirect", "matchFile.json");

const outputPathMatchSectionNumber = path.join(process.cwd(), "app", "scripts", "smartRedirect", "matchSectionNumber.json");
const outputPathMatchFileNumber = path.join(process.cwd(), "app", "scripts", "smartRedirect", "matchFileNumber.json");

const languages = ['en', 'sr'];

const matchSection : Record<string, Record<string, string>> = {};
const matchFile : Record<string, Record<string, string>> = {};
const matchFileNumber: Record<string, Record<string, Record<string, string>>> = {};
const matchSectionNumber : Record<string, Record<string, string>> = {};

function stripOrderPrefix(name : string) : string{
    return name.replace(/^\d+\s+/, "");
}

function getOrderValue(name : string) : number {
    const match = name.match(/^(\d+)\s+/);
    return match ? parseInt(match[1], 10) : Infinity;
}

function hasOrderPrefix(name : string) : boolean { 
    const pattern : RegExp = /^\d+\s+/;
    return pattern.test(name);
}

for (const locale of languages){

    matchFileNumber[locale] = {};
    matchSectionNumber[locale] = {};
    matchSection[locale] = {};
    matchFile[locale] = {}

    const pathToSection = path.join(rootPath, locale);

    const sections = readdirSync(pathToSection, {withFileTypes : true}).filter((entry) => entry.isDirectory())
                                                                       .filter((entry) => !entry.name.startsWith('.'))
                                                                       .filter((entry) => !(entry.name == "Hidden"))
                                                                       .map((entry) => entry.name)
                                                                       .sort((a, b) => getOrderValue(a) - getOrderValue(b));

    for(const section of sections){

        const pathToFiles = path.join(pathToSection, section);

        const files = readdirSync(pathToFiles, {withFileTypes : true}).filter((entry) => entry.isFile())
                                                                      .map((entry) => entry.name)
                                                                      .filter((entry) => entry.endsWith(".md"))
                                                                      .filter((entry) => hasOrderPrefix(entry));
        

        const sectionOrder = getOrderValue(section).toString();
        
        matchFileNumber[locale][sectionOrder] = {};

        matchSectionNumber[locale][getOrderValue(section).toString()] = encodeURIComponent(stripOrderPrefix(section))
        matchSection[locale][encodeURIComponent(stripOrderPrefix(section))] = getOrderValue(section).toString(); 
        
        for(const file of files){
            matchFileNumber[locale][getOrderValue(section).toString()][getOrderValue(file).toString()] = encodeURIComponent(stripOrderPrefix(path.basename(file, ".md"))); 
            matchFile[locale][encodeURIComponent(stripOrderPrefix(path.basename(file, ".md")))] = getOrderValue(file).toString();
        }

    }

}

fs.writeFileSync(outputPathMatchFileNumber, JSON.stringify(matchFileNumber, null, 2));
fs.writeFileSync(outputPathMatchSection, JSON.stringify(matchSection, null, 2));
fs.writeFileSync(outputPathMatchFile, JSON.stringify(matchFile, null, 2));
fs.writeFileSync(outputPathMatchSectionNumber, JSON.stringify(matchSectionNumber, null, 2));
