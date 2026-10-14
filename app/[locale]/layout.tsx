import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import LayoutShell from "./layoutShell";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import {routing} from '@/app/scripts/i18n/routing';
import { generateSidebarContainers } from "../scripts/sidebar/generateSidebarContainers";
import "katex/dist/katex.min.css";
import { SITE_NAME, SITE_URL } from "../scripts/seo/seo-constants";
import { buildAlternates, ogLocale } from "../scripts/seo/seoUtils";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

interface LayoutProps {

  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children,params }: LayoutProps) {
	const {locale} = await params;
	const messages = await getMessages();

	const sidebarContainers = generateSidebarContainers(locale);

	return (
		<html
		lang={locale}
		className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
		>
		<body className="min-h-full flex flex-col"><NextIntlClientProvider messages={messages}><LayoutShell children={children} containers={sidebarContainers}></LayoutShell></NextIntlClientProvider></body>
		</html>
	);
}

export async function generateMetadata() : Promise<Metadata>{

	const locale = await getLocale();
	const t = await getTranslations("MetaData");

	return {
		metadataBase: new URL(SITE_URL),
		title:{
			default: "LearnToCP",
			template: "%s · LearnToCP"
		},
		description:t('description'),
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
			description:t('description'),
		},
		twitter: {
			card: "summary_large_image",
			title: "LearnToCP",
			description:t('description'),
		},
		formatDetection: { telephone: false, email: false, address: false }
	};
}