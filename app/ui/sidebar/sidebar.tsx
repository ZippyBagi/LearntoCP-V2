import SectionLabel from "./section_lable";
import { useTranslations } from "next-intl";
import SidebarButton from "./sidebar_button";
import Divider from "./divider";


export default function Sidebar(){

    const t = useTranslations("Sidebar");

    return <nav className="fixed top-[52px] bottom-0 left-0 z-40 w-56 md:static md:top-auto md:bottom-auto md:z-auto md:h-full flex flex-col shrink-0 overflow-hidden md:translate-x-0
                            bg-bg-sidebar border-r border-r-border-subtle">


        <div className="overflow-y-auto overscroll-contain flex-1 min-h-0 w-full">
            <div className="flex flex-col w-full py-2">

                <SectionLabel name={t("navigation")}></SectionLabel>

                <SidebarButton name={t('home')} href="/"></SidebarButton>
                <SidebarButton name={t("roadmap")} href="/roadmap"></SidebarButton>
                <SidebarButton name={t('problems')} href="/problems"></SidebarButton>
                <SidebarButton name={t("about_us")} href="/about-us"></SidebarButton>

                <Divider></Divider>

                <SectionLabel name={t("theory")}></SectionLabel>

            </div>
        </div>



    </nav>
}