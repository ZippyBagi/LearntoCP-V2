import path from "path";
import fs from "fs";
import { stripOrderPrefix } from "@/app/scripts/sidebar/generateSidebarContainers";
import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import markdownToHTML from "@/app/scripts/markdown/mdToHTML"
import OptimizedContent from "@/app/scripts/markdown/optimizeContent";
import { Suspense } from "react";
import LessonSkeleton from "@/app/ui/Lessons/lessonSkeleton";
import { getLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/app/scripts/seo/seoUtils";
import { Metadata } from "next";


interface LessonPageProps{
    params : Promise<{folder: string, lesson: string}>
}

export default function LessonPage({params} : LessonPageProps){

    const locale = useLocale();

    return(
		<Suspense fallback={<LessonSkeleton></LessonSkeleton>}>
			<LessonContent params={params} locale={locale}></LessonContent>
		</Suspense>
	)
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

    const htmlContent = await markdownToHTML({markdown,fileName:actualFile,includeTitle:true});

    return(
    	<OptimizedContent htmlContent={htmlContent}></OptimizedContent>
    )

}

export async function generateMetadata({params, locale} : LessonContentProps) : Promise<Metadata> {

	const {folder, lesson} = await params;

	const lessonTitle = safeDecode(lesson);
  	const folderTitle = safeDecode(folder);

	const t = await getTranslations("Theory");

	return pageMetadata({
		locale,
		path:`Theory/${encodeURIComponent(folderTitle)}/${encodeURIComponent(lessonTitle)}`,
		title:`${lessonTitle} - ${folderTitle}`,
		description:t('description', {lesson:lessonTitle, folder:folderTitle}),
	});
}
