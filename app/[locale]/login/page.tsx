import { redirect } from '@/app/scripts/i18n/navigation';
import { createClient } from '@/app/scripts/supabase/server';
import DefaultBG from '@/app/ui/utils/defaultBG';
import { getLocale } from 'next-intl/server';
import LoginPanel from '@/app/ui/login/loginPane';

export default async function LoginPage({searchParams} : { searchParams: Promise<{ next?: string }>; }) {

	const { next = "/" } = await searchParams;

	const supabase = await createClient();
	const { data } = await supabase.auth.getClaims();

	const locale = await getLocale();

	if(data?.claims){
		const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : `/`;
		redirect({href: safeNext, locale:locale});
	} 

	return (
		<DefaultBG>
			<div className="absolute left-1/2 top-1/2 w-[min(440px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2">
				<LoginPanel></LoginPanel>
			</div>
		</DefaultBG>
	)
}