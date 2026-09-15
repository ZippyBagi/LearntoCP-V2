import path from "path";
import fs from "fs";
import { stripOrderPrefix } from "@/app/scripts/sidebar/generateSidebarContainers";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { locale } from "next/root-params";


interface LessonPageProps{
    params : Promise<{folder: string, lesson: string}>
}

export default function LessonPage({params} : LessonPageProps){

    const locale = useLocale();

    return(<LessonContent params={params} locale={locale}></LessonContent>)

}

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

interface LessonContentProps{

    params : Promise<{folder: string, lesson: string}>;
    locale : string;

}

async function LessonContent({params, locale} : LessonContentProps){

    const {folder, lesson} = await params;
    
    const folderDecoded = safeDecode(folder);
    const lessonDecoded = safeDecode(lesson);
    
    const lessonRoot = path.join(process.cwd(), 'content', locale);

    const allFolders = fs.readdirSync(lessonRoot, {withFileTypes : true})
                         .filter((e) => e.isDirectory() && !e.name.startsWith("."))
                         .map((e) => e.name);

    const folderPath = path.join(lessonRoot, (allFolders.find((f) => stripOrderPrefix(f) === folderDecoded) ?? folderDecoded) );

    const allFiles = fs.existsSync(folderPath) ? fs.readdirSync(folderPath, {withFileTypes : true})
                                                   .filter((e) => e.isFile() && e.name.endsWith(".md"))
                                                   .map((e) => e.name) : [];

    const actualFile = allFiles.find((e) => stripOrderPrefix(path.basename(e,".md")) === lessonDecoded);
    
    if(!actualFile) notFound();

    const filePath = path.join(folderPath, actualFile);

    const markdown = fs.readFileSync(filePath, "utf8");

    return (<h1>{markdown}</h1>);


}