import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import LayoutShell from "./layoutShell";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

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

export const metadata: Metadata = {
  title: "LearnToCP",
  description: "A 100% free website for learning competitive programming",
};

interface LayoutProps {

  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children,params }: LayoutProps) {

  const {locale} = await params;
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><NextIntlClientProvider messages={messages}><LayoutShell children={children}></LayoutShell></NextIntlClientProvider></body>
    </html>
  );
}
