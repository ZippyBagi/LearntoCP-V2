import { pageMetadata } from "@/app/scripts/seo/seoUtils";
import AboutUsPageUI from "@/app/ui/about-us/aboutUsPageUI";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";


export default function Page() {
  
	return <AboutUsPageUI></AboutUsPageUI>
}

export async function generateMetadata() : Promise<Metadata> {

	const locale = await getLocale();
	const t = await getTranslations("AboutUs")

	return pageMetadata({
		locale,
		path:"about-us",
		title:t('title_seo'),
		description:t('lede')
	});
}