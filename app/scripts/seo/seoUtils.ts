import { Metadata } from "next";
import {OG_LOCALE, DEFAULT_LOCALE, SITE_NAME} from "./seo-constants"
import { locales } from "../i18n/routing";

export function ogLocale(locale : string) : string {
    return OG_LOCALE[locale] ?? OG_LOCALE[DEFAULT_LOCALE];
}

export function localizedPath(locale: string, path = ""): string {

    const clean = path.replace(/^\/+/, "").replace(/\/+$/, ""); //remove trailing dahses
    
    return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * Build an expected configuration for Google seo
 * 
 * `locale` needs to be in the form of `en`
 * 
 * `path` needs to be in the form of `example/example/...` without locale
 */
export function buildAlternates( locale: string, path = ""): NonNullable<Metadata["alternates"]> {
    const languages: Record<string, string> = {};
    
    for (const l of locales) {
        languages[l] = localizedPath(locale);
    }

    languages["x-default"] = localizedPath(DEFAULT_LOCALE,path);

    return { canonical: localizedPath(locale,path), languages };
}

interface PageMetaOptions{
    locale: string;
    path?: string;
    title: string;
    description: string;
    ogTitle?: string;
    noindex?: boolean;
};

export function pageMetadata({ locale, path = "", title, description, ogTitle, noindex }: PageMetaOptions): Metadata {

    const url = localizedPath(locale, path);
    const shareTitle = ogTitle ?? title;

    return {
            title,
            description,
            ...(noindex ? { robots: { index: false, follow: false } } : {}),
            alternates: buildAlternates(locale, path),
            openGraph: {
            title: shareTitle,
            description,
            url,
            siteName: SITE_NAME,
            type: "website",
            locale: ogLocale(locale),
        },
        twitter: {
            card: "summary_large_image",
            title: shareTitle,
            description,
        },
    };
}