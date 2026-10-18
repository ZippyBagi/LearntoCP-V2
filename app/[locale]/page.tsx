import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates, ogLocale, pageMetadata } from "../scripts/seo/seoUtils";
import { SITE_NAME, SITE_URL } from "../scripts/seo/seo-constants";
import HomePageUI from "../ui/home/homePageUI";

export default function Home() {

	return <HomePageUI></HomePageUI>
}

interface PageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations("MetaData");

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: "LearnToCP - Learn To Competitively Programm",
            template: "%s · LearnToCP"
        },
        description: t('description'),
        applicationName: SITE_NAME,
        keywords: [
            "competitive programming",
            "algorithms",
            "data structures",
            "C++",
            "coding problems",
            "programming roadmap",
            "LearnToCP",
        ],
        authors: [{ name: SITE_NAME }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        category: "education",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        alternates: buildAlternates(locale, ""),
        openGraph: {
            type: "website",
            siteName: SITE_NAME,
            locale: ogLocale(locale),
            url: `/${locale}`,
            title: "LearnToCP",
            description: t("description"),
            images: [
                {
                    url: new URL("/opengraph-image.png", SITE_URL).toString(),
                    width: 1200,
                    height: 630,
                    alt: "LearnToCP",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "LearnToCP",
            description: t("description"),
            images: [new URL("/opengraph-image.png", SITE_URL).toString()],
        },
        formatDetection: { telephone: false, email: false, address: false }
    };
}