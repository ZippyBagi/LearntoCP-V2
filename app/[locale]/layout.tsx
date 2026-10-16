import type { Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import LayoutShell from "./layoutShell";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import {routing} from '@/app/scripts/i18n/routing';
import { generateSidebarContainers } from "../scripts/sidebar/generateSidebarContainers";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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

export const viewport: Viewport = {
	colorScheme: "dark",
	themeColor: "#00131b",
	width: "device-width",
	initialScale: 1,
};

interface LayoutProps {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children,params }: LayoutProps) {
	const {locale} = await params;
	const messages = await getMessages();

	const sidebarContainers = generateSidebarContainers(locale);

	return (
		<html lang={locale} className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">

				<Analytics />
        		<SpeedInsights/>

				<NextIntlClientProvider messages={messages}>
					<LayoutShell children={children} containers={sidebarContainers}></LayoutShell>
				</NextIntlClientProvider>

			</body>
		</html>
	);
}