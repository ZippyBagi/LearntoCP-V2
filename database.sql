
-- For Submissions

create table if not exists public.submissions (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references auth.users (id) on delete cascade,
	problem_slug text not null,
	language_id int  not null,
	code text not null,
	status text not null default 'judging' check (status in ('judging', 'done', 'error')),
	verdict text check (verdict in ('AC', 'WA', 'TLE', 'RE', 'CE', 'IE')),
	passed_count int not null default 0,
	total_count int not null,
	results	jsonb not null default '[]'::jsonb,
	compile_output text,
	created_at   timestamptz not null default now()
);
 
create index if not exists submissions_user_created_idx on public.submissions (user_id, created_at desc);
 
create index if not exists submissions_user_problem_idx on public.submissions (user_id, problem_slug, created_at desc);
 
alter table public.submissions enable row level security;

create policy "Users can read own submissions"
	on public.submissions
	for select
	to authenticated
	using ((select auth.uid()) = user_id);


-- For Roadmap Progress

create table if not exists public.roadmap_progress (
	user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
	item_id text not null,
	completed_at timestamptz not null default now(),
	primary key (user_id, item_id),
	constraint item_id_format check (char_length(item_id) <= 200)
);

alter table public.roadmap_progress enable row level security;

create policy "Users can read own progress"
	on public.roadmap_progress for select
	using (auth.uid() = user_id);

create policy "Users can insert own progress"
	on public.roadmap_progress for insert
	with check (auth.uid() = user_id);

create policy "Users can delete own progress"
	on public.roadmap_progress for delete
	using (auth.uid() = user_id);


-- For Acceptance rate

create or replace function public.get_acceptance_stats(slugs text[]) returns table ( problem_slug text, accepted bigint, total bigint)
	language sql stable as $$

		select s.problem_slug, count(distinct s.user_id) filter (where s.verdict = 'AC') as accepted,
			count(distinct s.user_id) as total from public.submissions s where s.problem_slug = any(slugs)
			and s.verdict is not null
			group by s.problem_slug;
	$$;

grant execute on function public.get_acceptance_stats(text[]) to service_role;

create index if not exists submissions_slug_user_verdict_idx
	on public.submissions (problem_slug, user_id, verdict)
	where verdict is not null;