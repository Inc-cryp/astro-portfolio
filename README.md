# Astro Portfolio

Personal portfolio and blog for **Abdillah Fazri** — backend-focused developer
building fast, scalable web applications.

Built with [Astro](https://astro.build) (static output), Tailwind CSS and a
small amount of React for the interactive parts.

Live: <https://astro-portfolio-oy77-inc-cryps-projects.vercel.app>

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
```

No configuration is required to start. With no `.env` file the site builds from
the local content files in `src/data`, so a fresh clone works offline.

## Commands

| Command           | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                                |
| `npm run build`   | Production build into `dist/` (statically pre-rendered)    |
| `npm run preview` | Serve the contents of `dist/` locally                      |
| `npm run check`   | `astro check` — TypeScript and template diagnostics        |
| `npm run lint`    | `astro check` (alias kept for tooling that expects it)     |

## Content

Every page is pre-rendered at build time, so the content source has to be
resolvable *during the build*.

There are two sources:

1. **Local files** — `src/data/posts.ts` and `src/data/projects.ts`. This is the
   default, and it is what makes a clean clone build with no CMS and no `.env`.
2. **Strapi** — used automatically when `PUBLIC_STRAPI_URL` is set.

`src/lib/content.ts` is the only module that knows which one is active. Pages
import `getPosts()`, `getPostBySlug()`, `getProjects()` and `getProjectBySlug()`
from it and never talk to Strapi directly.

```ts
import { getPosts } from "@/lib/content";

const posts = await getPosts();
```

Because the blog list and the blog routes are both derived from `getPosts()`, a
link can never point at a page that was not generated.

### Using Strapi

Copy `.env.example` to `.env` and set the URL of your Strapi instance:

```bash
PUBLIC_STRAPI_URL=https://your-strapi-host
```

The instance must expose the `posts` and `projects` collections. Each item is
normalised out of Strapi's `{ id, attributes }` envelope into the plain shapes in
`src/lib/types/content.ts`, so the rest of the site is unaware of the CMS.

> `PUBLIC_` variables are inlined into the client bundle — never put a secret in
> one.

## Project structure

```
src/
├── components/        # UI building blocks (Astro + a few .jsx islands)
│   └── Project/       # project-detail-only components
├── data/              # local content, used when Strapi is not configured
│   ├── posts.ts
│   └── projects.ts
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   ├── content.ts     # the single entry point for content
│   ├── seo.ts
│   └── types/
│       └── content.ts
└── pages/
    ├── blog/[slug].astro
    ├── projects/[slug].astro
    └── ...
```

## Deployment

Deployed on Vercel. The `site` value in `astro.config.mjs` is what the sitemap
and canonical URLs are built from; override it per environment with `SITE_URL`
when deploying to a different origin:

```bash
SITE_URL=https://example.com npm run build
```

## License

MIT — see [LICENSE](./LICENSE).
