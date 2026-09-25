import matchFileData from './matchFile.json';
import matchSectionData from './matchSection.json';
import matchFileNumberData from './matchFileNumber.json';
import matchSectionNumberData from './matchSectionNumber.json';

const matchFile : Record<string, Record<string, string>> = matchFileData;
const matchSection : Record<string, Record<string, string>> = matchSectionData;

const matchFileNumber : Record<string, Record<string, Record<string, string>>> = matchFileNumberData;
const matchSectionNumber : Record<string, Record<string, string>> = matchSectionNumberData;

/**
 * `url` must be in the form of /Theory/ENCODED(section)/ENCODED(lesson) for the system to work
 */
export function getSmartRedirect(url : string, oldLocale : string, newLocale : string){

    if (!url.includes("/Theory/")) {
        return url;
    }

    const [sectionName, fileName] = url.split("/").slice(-2);

    const section = matchSection[oldLocale][sectionName];
    const file = matchFile[oldLocale][fileName];

    const newPath = url.split("/").slice(0, -2).concat([matchSectionNumber[newLocale][section], matchFileNumber[newLocale][section][file]]).join("/");

    return newPath;

}