# LearnToCP

This is the official open source repository of [learntocp.com](https://www.learntocp.com) - A 100% FREE website for learning competitive programming in English and Serbian!


### Description 

This project is made in order to help people learn to competitively program, it features an **interactive roadmap**, over **70 Lessons**, over **70** hand-picked **Problems with detailed Solutions** and a built in online judge! 

### Tech Stack

The project is written in TypeScript with the [Next.js](https://nextjs.org/) framework with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/). Following external tools are used:

- For the roadmap [React Flow](https://reactflow.dev/) is used in order to render the nodes.

- For the problems [Judge0 API](https://judge0.com/) is used as an online judge.

- The project is connected to [Supabase](https://supabase.com/) as a database.

- For analytics (and hosting the website version) [Vercel](https://vercel.com) is used.

- For internationalization [i18n](https://www.i18next.com/)

### Getting Started

In order to run the repository locally you need to set the environment variables and set up a database.  

1. Open `database.txt`, and inside are all PostgreSQL functions needed to set-up the database, create a [Supabase](https://supabase.com/) account and set them up.

2. Create a `.env` file, and begin filling it out following `.example.env.local`.

3. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, are all from Supabase

4. `JUDGE0_RAPIDAPI_KEY` is gotten from [here](https://rapidapi.com/judge0-official/api/judge0-ce)

5. `NEXT_PUBLIC_URL` and `NEXT_PUBLIC_SITE_URL` are just for Metadata and can remain as default.

6. You can now run the repository with `pnpm dev`

### Notice

This repository is a rewrite of [the old repository](https://github.com/ZippyBagi/LearnToCP)

## Documentation

### Structure

We have 4 main folders:

1. `/app` - for the code of the project

2. `/build-time-scripts` - for functions that run on build

3. `/content` - where all Lessons, Problems and Roadmap Data lives

4. `/messages` - where all translations live

### `/app` 

The code inside `/app` is split into 5 parts

1. `/[locale]` - for pages

2. `/scripts` - for server side functions

3. `/ui` - for client side components

4. `/styles` for css that tailwind couldn't handle cleanly

5. `/api` for api endpoints that are needed for code submissions to work

### `/content`

We have 3 types of folders:

1. `/en` and `/sr` are Lesson pages for different languages, lessons are structured like: `/language/ID topic/ID lesson` where `ID` is a number used to determine it's order in the sidebar and more.

2. `/problems` stores all the problems, inside there are `problem.json` which describes it, descriptions and solutions for each language and the testcases for it under `/tests`

3.  `/roadmap_data` has a folder for each layer titled `LX` where `X` is a number. Then there are folders that describe nodes with `ID`'s that describe their order. Inside each node is a `meta.json` file and `.txt` files that represent the contents of the node. 
