import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {

    return {
        name: "LearnToCP",
        short_name: "LearnToCP",
        description: "Structured competitive-programming lectures, problem sets, and an interactive roadmap - from fundamentals to mastery.",
        start_url: "/en",
        scope: "/",
        display: "standalone",
        background_color: "#00131b",
        theme_color: "#00131b",
        lang: "en",
        categories: ["education", "productivity"],
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "any",
            },
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}
