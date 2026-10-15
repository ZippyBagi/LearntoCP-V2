import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css"
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import DefaultBG from "./ui/utils/defaultBG";

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


export default async function NotFound(){

    const t = await getTranslations("NotFound");

    return (
        <DefaultBG className={`antialiased font-sans bg-[#00131b] text-[#ededed] ${spaceGrotesk.variable} ${jetbrainsMono.variable} relative flex items-center justify-center min-h-screen overflow-hidden"`}>
        
            <div className="relative z-10 flex flex-col items-center text-center px-6">

                <p className="pop font-mono text-xs tracking-widest mb-6 text-[rgba(200,218,240,0.5)]">
                    {t('errorCode')}
                </p>

                <h1 className="pop [--pop-delay:60ms] font-mono font-bold leading-none mb-6 select-none" style={{
                    fontSize: "clamp(7rem, 20vw, 14rem)",
                    color: "transparent",
                    WebkitTextStroke: "2px rgba(124,158,248,0.2)",
                    letterSpacing: "-0.04em",
                }}>
                    404
                </h1>

                <h2 className="pop [--pop-delay:120ms] font-mono font-semibold text-[#e2eaff] text-2xl mb-3">
                    {t("heading")}
                </h2>

                <p className="pop [--pop-delay:180ms] font-mono text-sm text-[rgba(200,218,240,0.5)] mb-10 leading-relaxed">

                    {t('body1')}
                    <br />
                    {t('body2')}

                </p>

                <Link href="/" className="pop [--pop-delay:240ms] inline-flex items-center gap-2 rounded-2xl border-2 border-[rgba(124,158,248,0.18)] px-6 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-200 ease-out hover:border-[rgba(124,158,248,0.65)] hover:shadow-[0_0_0_1px_rgba(124,158,248,0.1),0_0_18px_rgba(124,158,248,0.18)] active:brightness-90"
                    style={{
                        background: "linear-gradient(135deg, #0d2137 0%, #0a1c2e 100%)",
                    }}
                >
                    <span className="font-mono text-sm font-semibold text-[#e2eaff]">
                        {t('returnHome')}
                    </span>

                    <span style={{ color: "rgba(124,158,248,0.4)" }}>↗</span>

                </Link>
            </div>
        </DefaultBG>
    )

}