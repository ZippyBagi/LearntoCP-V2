export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://learntocp.com").replace(/\/+$/, "");

export const SITE_NAME = "LearnToCP";

export const DEFAULT_LOCALE = 'en';

//open graph needs this
export const OG_LOCALE: Record<string, string> = {
    en: "en_US",
    sr: "sr_RS",
};
