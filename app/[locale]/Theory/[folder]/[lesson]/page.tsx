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
import { localizedPath, pageMetadata } from "@/app/scripts/seo/seoUtils";
import { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/app/scripts/seo/seo-constants";
import ImagesInMd from "@/app/scripts/seo/imagesInMd";
import JsonLd from "@/app/scripts/seo/JsonD";


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

    const jsonLd = await getJsonLd(locale, folderDecoded, lessonDecoded, filePath);

    return(
        <>
            <JsonLd data={jsonLd} />
            <OptimizedContent htmlContent={htmlContent}></OptimizedContent>
        </>
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

async function getJsonLd(locale : string, folderDecoded : string, lessonDecoded : string, filePath : string){

    const t = await getTranslations("Theory")

    const lessonUrl = `${SITE_URL}${localizedPath(locale, `Theory/${encodeURIComponent(folderDecoded)}/${encodeURIComponent(lessonDecoded)}`)}`;

    let dateModified: string | undefined;
    try {
        dateModified = fs.statSync(filePath).mtime.toISOString();
    } catch {
        
    }

    const organization = {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon.svg`,
    };

    const images = ImagesInMd(filePath).map((figure) => ({
        "@type": "ImageObject",
        url: figure.url,
        contentUrl: figure.url,
        ...(figure.width ? { width: figure.width } : {}),
        ...(figure.height ? { height: figure.height } : {}),
        ...(figure.alt ? { description: figure.alt } : {}),
        ...({}),
    }));

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
            "@type": ["TechArticle", "LearningResource"],
            "@id": `${lessonUrl}#article`,
            name: `${lessonDecoded} - ${folderDecoded}`,
            headline: lessonDecoded,
            description:t('description', {lesson:lessonDecoded, folder:folderDecoded}),
            url: lessonUrl,
            mainEntityOfPage: lessonUrl,
            inLanguage: locale,
            learningResourceType: "Lecture",
            about: folderDecoded,
            isAccessibleForFree: true,
            ...(images.length > 0 ? { image: images } : {}),
            ...(dateModified ? { dateModified } : {}),
            author: organization,
            publisher: organization,
            provider: organization,
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${lessonUrl}#breadcrumb`,
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: SITE_NAME,
                        item: `${SITE_URL}${localizedPath(locale)}`,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: `${folderDecoded}: ${lessonDecoded}`,
                    },
                ],
            },
        ],
    };
}